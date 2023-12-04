loadJavascript('/js/cardcalc_steam/opencv.js');

async function putBaseIntoImageTag(basetext){
    let image = new Image();
    image.src = basetext;
    await new Promise(r=>{
        image.onload = r;
    })
    return image;
}

async function featureMatch(canvas,cardbase){
    let matchCardMat = cv.imread(await putBaseIntoImageTag(cardbase));

    let im2Gray = new cv.Mat();
    cv.cvtColor(matchCardMat, im2Gray, cv.COLOR_BGRA2GRAY);

    let keypoints1 = new cv.KeyPointVector();
    let keypoints2 = new cv.KeyPointVector();
    let descriptors1 = new cv.Mat();
    let descriptors2 = new cv.Mat();
    let orb = new cv.AKAZE();

    orb.detectAndCompute(canvas, new cv.Mat(), keypoints1, descriptors1);
    orb.detectAndCompute(im2Gray, new cv.Mat(), keypoints2, descriptors2);

    for (let l = 0; l < keypoints1.size(); l++) {
        if (l === 5){break;}
    }

    let good_matches = new cv.DMatchVector();

    let bf = new cv.BFMatcher();
    let matches = new cv.DMatchVectorVector();

    bf.knnMatch(descriptors1, descriptors2, matches, 2);

    let counter = 0;
    let knnDistance_option = 0.7;
    for (let l = 0; l < matches.size(); ++l) {
        let match = matches.get(l);
        let dMatch1 = match.get(0);
        let dMatch2 = match.get(1);
        if (dMatch1.distance <= dMatch2.distance * parseFloat(knnDistance_option)) {
            good_matches.push_back(dMatch1);
            counter++;
        }
    }

    return counter;
}

function isWhite(src, x, y){
    return src.ucharPtr(y, x)[0] >= 230 && src.ucharPtr(y, x)[1] >= 230 && src.ucharPtr(y, x)[2] >= 230 ? true : false;
}
function isLowWhite(src, x, y){
    // console.log(x, y,':',src.ucharPtr(y, x)[0], src.ucharPtr(y, x)[1], src.ucharPtr(y, x)[2])
    return src.ucharPtr(y, x)[0] >= 205 && src.ucharPtr(y, x)[1] >= 205 && src.ucharPtr(y, x)[2] >= 205 ? true : false;
}
function isLowLowWhite(src, x, y){
    // console.log(x, y,':',src.ucharPtr(y, x)[0], src.ucharPtr(y, x)[1], src.ucharPtr(y, x)[2])
    return src.ucharPtr(y, x)[0] >= 180 && src.ucharPtr(y, x)[1] >= 180 && src.ucharPtr(y, x)[2] >= 180 ? true : false;
}

function tripleCheck(src,x1,y1,x2,y2,x3,y3){
    return isLowWhite(src, x1, y1) && isLowWhite(src, x2, y2) && isLowWhite(src, x3, y3) ? true : false;
}

let Module = {
    async onRuntimeInitialized() {
        // 업로드 카드 이미지 파일 이름순으로 정렬
        let uploadImages = document.querySelectorAll('#gallery > img');
        uploadImages = [...uploadImages];
        uploadImages.sort(function (a, b) {
            let textA = a.getAttribute('filename');
            let textB = b.getAttribute('filename');
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
        await loadJavascript('/js/cardcalc_steam/allCardImages.js?v=11200153');

        copycardlist = Object.keys(cardlist);
        let cardAllQty = Object.keys(cardlist).length;

        let estimatedTime = null;
        let start = null;
        let end = null;

        let cardRemoveMat = new cv.Mat();
        let deckIconMat = new cv.Mat();
        let uploadImageWidth = null;
        let sizeUpOffset = null;
        let sizeUpMethod = null;
        let lastK = 0;
        let starDistanceArr = null;
        let firstCardOffsetX, firstCardOffsetY = null;
        let cardLastStarX,    cardLastStarY = null;
        let cardDistanceX,    cardDistanceY = null;
        let cardSizeX,        cardSizeY = null;
        let plusOffsetX,  plusOffsetY = null;
        let deckIconMatchX,   deckIconMatchY = null;
        if(uploadImages[0].naturalHeight==1080){
            cardRemoveMat = cv.imread(await putBaseIntoImageTag(FHDcardremovebase64));
            deckIconMat = cv.imread(await putBaseIntoImageTag(FHDdeckIconbase64));
            firstCardOffsetX = 0;
            firstCardOffsetY = 98;
            cardDistanceX = 118;
            cardDistanceY = 182;
            cardLastStarX = 92;
            cardLastStarY = 22;
            cardSizeX = 118;
            cardSizeY = 164;
            uploadImageWidth = "FHD";
            sizeUpOffset = 2.4;
            sizeUpMethod = cv.INTER_CUBIC;
            starDistanceArr = [null,62,46,31,15,0];
            plusOffsetX = 26;
            plusOffsetY = 6;
            deckIconMatchX = [[55],[60]];
            deckIconMatchY = 1;
        }else if(uploadImages[0].naturalHeight==1440){
            cardRemoveMat = cv.imread(await putBaseIntoImageTag(QHDcardremovebase64));
            deckIconMat = cv.imread(await putBaseIntoImageTag(QHDdeckIconbase64));
            firstCardOffsetX = 0; 
            firstCardOffsetY = 131;
            cardDistanceX = 157;
            cardDistanceY = 243;
            cardLastStarX = 122;
            cardLastStarY = 40;
            cardSizeX = 155;
            cardSizeY = 219;
            uploadImageWidth = "QHD";
            sizeUpOffset = 1.8;
            sizeUpMethod = cv.INTER_CUBIC;
            starDistanceArr = [null,82,61,41,20,0];
            plusOffsetX = 34;
            plusOffsetY = 9;
            deckIconMatchX = [[72,73,74,75],[79,80,81,82]];
            deckIconMatchY = 11;
        }

        for (let imgindex = 0; imgindex < uploadImages.length; imgindex++) {
            let uploadImage = uploadImages[imgindex];
            let thispagecardlist = [];

            document.querySelector('#matchingment').textContent='';
            document.querySelector('#matchwhich').textContent=`Recognizing the ${imgindex+1} screenshot, `;

            let uploadImageMat = cv.imread(await putBaseIntoImageTag(uploadImage.src));
            let uploadImageGrayMat = new cv.Mat();
            cv.cvtColor(uploadImageMat, uploadImageGrayMat, cv.COLOR_RGBA2GRAY);

            let removeDst = new cv.Mat();
            let removeMask = new cv.Mat();
            cv.matchTemplate(uploadImageMat, cardRemoveMat, removeDst, cv.TM_CCOEFF_NORMED, removeMask);
            let removeResult = cv.minMaxLoc(removeDst, removeMask);
            let cardRemoveX = removeResult.maxLoc.x;
            let cardRemoveY = removeResult.maxLoc.y;

            let firstCardX = cardRemoveX + firstCardOffsetX;
            let firstCardY = cardRemoveY + firstCardOffsetY;

            document.querySelector('#searchingcardlist').innerHTML += `<br><br>${uploadImage.getAttribute('filename')}[<span id="page${imgindex}"></span>Pcs]`;
            for (let i = 0; i < 4; i++) {
                let y = firstCardY + (i * cardDistanceY);
                if(uploadImageWidth == "QHD" && [3].includes(i)) y = y-1;

                let thislinecardlist = [];
                for (let j = 0; j < 10; j++) {
                    if(start == null) start = new Date();

                    x = firstCardX + (j * cardDistanceX);
                    let rect = null;
                    if(uploadImageWidth == "FHD"){
                        rect = new cv.Rect(x, y, cardSizeX, cardSizeY);
                    }
                    else if(uploadImageWidth = "QHD"){
                        if([0,1,2,3].includes(j)) rect = new cv.Rect(x, y, cardSizeX, cardSizeY);
                        else if([4,6].includes(j)) rect = new cv.Rect(x+1, y, cardSizeX, cardSizeY);
                        else if([5,7,8].includes(j)) rect = new cv.Rect(x+2, y, cardSizeX, cardSizeY);
                        else if([9].includes(j)) rect = new cv.Rect(x+3, y, cardSizeX, cardSizeY);
                    }

                    let unitUploadCardMat = uploadImageGrayMat.roi(rect);

                    // 추후 수정
                    let halfRect = new cv.Rect(0, cardSizeY/2+30, cardSizeX, cardSizeY/2-30);
                    cv.imshow(`unitUploadHalfCard0`, unitUploadCardMat.roi(halfRect));
                    let unitUploadHalfCardMat = cv.imread(`unitUploadHalfCard0`);
                    //

                    let halfDst = new cv.Mat();
                    let halfMask = new cv.Mat();
                    cv.matchTemplate(unitUploadHalfCardMat, deckIconMat, halfDst, cv.TM_CCOEFF, halfMask);
                    let halfResult = cv.minMaxLoc(halfDst, halfMask);
                    let deckIconX = halfResult.maxLoc.x;
                    let deckIconY = halfResult.maxLoc.y;
                    
                    let im1 = new cv.Mat();
                    cv.resize(unitUploadCardMat, im1, new cv.Size(0, 0), sizeUpOffset, sizeUpOffset, sizeUpMethod);

                    for (let k = lastK; k < cardAllQty; k++) {
                        cardname = Object.keys(cardlist)[k];
                        cardbase = Object.values(cardlist)[k];

                        // console.log(cardname, featureMatch(im1,cardbase))
                        if(await featureMatch(im1,cardbase) >= 5){
                            thislinecardlist.push(cardname)
                            thispagecardlist.push(cardname)

                            // console.log(cardname,deckIconX)
                            //카드 갯수
                            let thisCardQty = 0;
                            // console.log(deckIconX,deckIconY)
                            if(deckIconY == deckIconMatchY){
                                plusX = deckIconX + plusOffsetX;
                                plusY = deckIconY + plusOffsetY;
                                // console.log(plusX,plusY)

                                if(deckIconMatchX[1].includes(deckIconX)){
                                    if(uploadImageWidth == "FHD"){
                                        if(isWhite(unitUploadHalfCardMat, plusX, plusY)){
                                            //1장
                                            if(isLowLowWhite(unitUploadHalfCardMat, plusX+8, plusY-3) && isLowWhite(unitUploadHalfCardMat, plusX+8, plusY-4)) thisCardQty=1;
                                            //2장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+9, plusY+4, plusX+10, plusY+4, plusX+11, plusY+4)) thisCardQty=2;
                                            //4장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+9, plusY+2, plusX+10, plusY+2, plusX+10, plusY+1)) thisCardQty=4;
                                            //5장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+6, plusY-1, plusX+7, plusY+4, plusX+8, plusY+4)) thisCardQty=5;
                                            //9장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+11, plusY+0, plusX+11, plusY-1, plusX+8, plusY+4)) thisCardQty=9;
                                            //6장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+6, plusY+0, plusX+10, plusY-1, plusX+9, plusY-1)) thisCardQty=6;
                                            //8장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+10, plusY+0, plusX+7, plusY-1, plusX+8, plusY+4)) thisCardQty=8;
                                            //7장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+7, plusY-5, plusX+8, plusY-5, plusX+10, plusY-5)) thisCardQty=7;
                                            //3장
                                            else thisCardQty=3;
                                            console.log(cardname ,thisCardQty,'장');
                                        }
                                    }
                                    else if(uploadImageWidth == "QHD"){
                                        if(isWhite(unitUploadHalfCardMat, plusX, plusY)){
                                            // 1장
                                            if(tripleCheck(unitUploadHalfCardMat, plusX+10, plusY-6, plusX+11, plusY-6, plusX+11, plusY-7)) thisCardQty=1;
                                            // 2장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+8, plusY+5, plusX+14, plusY+5, plusX+8, plusY+4)) thisCardQty=2;
                                            // 8장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+9, plusY-1, plusX+10, plusY-1, plusX+13, plusY-2)) thisCardQty=8;
                                            // 5장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+8, plusY-3, plusX+8, plusY-2, plusX+8, plusY-7)) thisCardQty=5;
                                            // 3장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+12, plusY-2, plusX+13, plusY-1, plusX+11, plusY+5)) thisCardQty=3;
                                            // 4장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+13, plusY+1, plusX+14, plusY+1, plusX+14, plusY+2)) thisCardQty=4;
                                            // 6장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+8, plusY+3, plusX+9, plusY+4, plusX+10, plusY+5)) thisCardQty=6;
                                            // 7장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+14, plusY-7, plusX+15, plusY-7, plusX+14, plusY-5)) thisCardQty=7;
                                            // 9장
                                            else thisCardQty=9;
                                        }
                                    }
                                }else if(deckIconMatchX[0].includes(deckIconX)){
                                    if(uploadImageWidth == "FHD"){
                                        if(isWhite(unitUploadHalfCardMat, plusX, plusY)){
                                            //10장
                                            if(tripleCheck(unitUploadHalfCardMat, plusX+15, plusY-1, plusX+15, plusY-2, plusX+15, plusY+0)) thisCardQty=10;
                                            //15장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+16, plusY-1, plusX+19, plusY-1, plusX+18, plusY+4)) thisCardQty=15;
                                            //12장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+20, plusY-1, plusX+20, plusY-4, plusX+16, plusY+3)) thisCardQty=12;
                                            //13장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+20, plusY-2, plusX+21, plusY+2, plusX+18, plusY+4)) thisCardQty=13;
                                            //14장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+19, plusY-4, plusX+19, plusY+2, plusX+20, plusY+2)) thisCardQty=14;
                                            //11장
                                            else thisCardQty=11;
                                        }
                                    }
                                    else if(uploadImageWidth == "QHD"){
                                        plusX = plusX+1;

                                        if(isWhite(unitUploadHalfCardMat, plusX, plusY)){
                                            //10장
                                            if(tripleCheck(unitUploadHalfCardMat, plusX+28, plusY-1, plusX+28, plusY-2, plusX+28, plusY-3)) thisCardQty=10;
                                            //11장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+24, plusY-1, plusX+24, plusY-2, plusX+24, plusY-3)) thisCardQty=11;
                                            //12장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+20, plusY+5, plusX+27, plusY+5, plusX+27, plusY-3)) thisCardQty=12;
                                            //13장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+25, plusY-1, plusX+25, plusY-2, plusX+26, plusY-1)) thisCardQty=13;
                                            //14장
                                            else if(tripleCheck(unitUploadHalfCardMat, plusX+26, plusY+0, plusX+26, plusY+1, plusX+26, plusY+2)) thisCardQty=14;
                                            //15장
                                            else thisCardQty=15;
                                        }
                                    }
                                }
                            }

                            //카드 각성 단계
                            let thisStar = 5;
                            for (let l = 5; l > 0; l--) {
                                if(unitUploadHalfCardMat.ucharPtr(cardLastStarY, (cardLastStarX - starDistanceArr[l]))[0] > 167){
                                    thisStar = l;
                                    break
                                }
                                else thisStar = 0;
                            }

                            lastK=k+1;
                            hasCardDeck[cardname] = [thisStar,thisCardQty];
                            document.querySelector('#matchingment').textContent=`Matching Cards ${Object.keys(hasCardDeck).length}Pcs`;
                            // console.log(cardname, thisStar,'각',thisCardQty,'장');

                            // 수동 카드 추가쪽
                            copycardlist.splice(copycardlist.indexOf(Object.keys(cardlist)[k]),1);

                            break;
                        }
                    }
                    
                    // 예상 남은 시간 안내
                    if(end == null){
                        end = new Date();
                        estimatedTime = new Date();
                        estimatedTime.setSeconds(estimatedTime.getSeconds() + parseInt((((end - start) * Object.keys(cardlist).length)*1.25)/1000))
                    }
                    document.querySelector('#matchtime').textContent = `Expected time remaining : ${(estimatedTime-new Date())/1000}Sec`;
                }

                if(thispagecardlist.length != 40) document.querySelector("#page"+imgindex).style.color = 'red';
                else document.querySelector("#page"+imgindex).style.color ='';

                let thislinecolor = '';
                if(thislinecardlist.length != 10) thislinecolor = 'red';

                document.querySelector('#searchingcardlist').innerHTML += `<br>${i+1}Line[<span style="color:${thislinecolor}">${thislinecardlist.length}Pcs</span>] : ${thislinecardlist}`;
                document.querySelector("#page"+imgindex).textContent = thispagecardlist.length;
            }
        }

        document.querySelector('#matchtime').textContent = "";
        document.querySelector('#matchwhich').textContent = ``;
        document.querySelector('#matchstatus').style.display = "none";
        document.querySelector('#matchingment').textContent = `Matching Total Cards ${Object.keys(hasCardDeck).length}Pcs`;
        document.querySelector('#matchfinish').style.display = "";
        // console.log(hasCardDeck)
        // console.log(Object.keys(hasCardDeck).length)
        
        let audio = new Audio('/audio/mokoko.mp3');
        audio.volume = 0.5;
        audio.play();
    }
};

let pushbuttonindex = 0;
let copycardlist = null;
document.querySelector('#cardpush').addEventListener('click', function(){
    if(copycardlist.length == 0){
        aler('There are no cards to add.',3000);
        return;
    }
    cardpushbuttoncreate();
});

function cardpushbuttoncreate(){
    cardpushelement = document.createElement('div');
    cardpushelement.setAttribute('class','input-group mb-3');
    
    tempelement = document.createElement('button');
    tempelement.setAttribute('class','btn btn-outline-secondary');
    tempelement.setAttribute('type','button');
    tempelement.setAttribute('onClick','cardpushbuttoncreate();');
    tempelement.innerText = '+';
    cardpushelement.appendChild(tempelement);
    
    //카드이름
    tempelement = document.createElement('select');
    tempelement.setAttribute('class','form-select');
    tempelement.setAttribute('id',`cardname${pushbuttonindex}`);
    for (let i = 0; i < copycardlist.length; i++) {
        continuesign = false;

        if(document.querySelector("#cardpushzone").childElementCount >= 1){
            cardpushlength = document.querySelector("#cardpushzone").childElementCount;
            for (let j = 0; j < cardpushlength; j++) {
                if(copycardlist[i] === document.querySelector(`#cardname${j}`).value){
                    continuesign = true;
                }
            }
        }
        if(continuesign){
            continue;
        }

        tempelement2 = document.createElement('option');
        if(i==0){
            tempelement2.setAttribute('value', copycardlist[i]);
            tempelement2.innerText = copycardlist[i];
        }else{
            tempelement2.setAttribute('value', copycardlist[i]);
            tempelement2.innerText = copycardlist[i];
        }
        tempelement.appendChild(tempelement2);
    }
    if(tempelement.childElementCount == 0){
        return;
    }
    cardpushelement.appendChild(tempelement);

    //카드각성
    tempelement = document.createElement('select');
    tempelement.setAttribute('class','form-select');
    tempelement.setAttribute('id',`cardstar${pushbuttonindex}`);
    for (let i = 0; i <= 5; i++) {
        tempelement2 = document.createElement('option');
        tempelement2.setAttribute('value', i);
        tempelement2.innerText = i+'Awake';
        tempelement.appendChild(tempelement2);
    }
    cardpushelement.appendChild(tempelement);

    //카드보유장수
    tempelement = document.createElement('select');
    tempelement.setAttribute('class','form-select');
    tempelement.setAttribute('id',`cardqty${pushbuttonindex}`);
    for (let i = 0; i <= 15; i++) {
        tempelement2 = document.createElement('option');
        tempelement2.setAttribute('value', i);
        tempelement2.innerText = i+'Pcs';
        tempelement.appendChild(tempelement2);
    }
    cardpushelement.appendChild(tempelement);
    
    document.querySelector("#cardpushzone").appendChild(cardpushelement);
    pushbuttonindex++;
}