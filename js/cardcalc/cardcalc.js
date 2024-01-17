function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    handleFiles(files)
}

function handleFiles(files) {
    files = [...files]
    files.forEach(previewFile)
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async function () {
        let img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('filename', file.name);
        document.getElementById('gallery').appendChild(img);
    }
}

let loadedScript = []
async function loadJavascript(name) {
    if (!loadedScript.includes(name.split('?')[0])) {
        let scriptElement = document.createElement('script');
        scriptElement.src = name;
        document.head.appendChild(scriptElement);

        await new Promise(r => {
            scriptElement.onload = r
            loadedScript.push(name.split('?')[0]);
        })
    }
}

function isWantSize(element, width, height) {
    let targetScreen = element;
    let screenWidth = targetScreen.naturalWidth;
    let screenHeight = targetScreen.naturalHeight;

    return screenWidth == width && screenHeight == height ? true : false;
}

function isWide() {
    let firstImg = document.querySelectorAll('#gallery > img')[0];

    let canvas = document.createElement('canvas');
    canvas.width = firstImg.naturalWidth;
    canvas.height = firstImg.naturalHeight;
    canvas.getContext('2d').drawImage(firstImg, 0, 0, firstImg.naturalWidth, firstImg.naturalHeight);

    let topPixelData = canvas.getContext('2d').getImageData(firstImg.naturalWidth / 2, 0, 1, 10).data;
    let botPixelData = canvas.getContext('2d').getImageData(firstImg.naturalWidth / 2, firstImg.naturalHeight - 10, 1, 10).data;

    let topPixel = 0;
    let botPixel = 0;
    for (let i = 0, n = topPixelData.length; i < n; i += 4) {
        topPixel += topPixelData[i + 0] + topPixelData[i + 1] + topPixelData[i + 2];
        botPixel += botPixelData[i + 0] + botPixelData[i + 1] + botPixelData[i + 2];
    }

    return topPixel + botPixel == 0 ? true : false;
}

function toastAlert(txt, dura) {
    Toastify({
        text: txt,
        position: "center",
        gravity: "bottom",
        duration: dura,
        close: false
    }).showToast();
}

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)

    if (eventName in ['dragenter', 'dragover']) {
        dropArea.addEventListener(eventName, highlight, false)
    } else {
        dropArea.addEventListener(eventName, unhighlight, false)
    }
})

document.querySelector("#matchstart").addEventListener('click', async function () {
    let uploadFirstImg = document.querySelectorAll('#gallery > img')[0];
    if (document.querySelectorAll('#gallery > img').length == 0) {
        toastAlert("인식할 이미지를 선택해 주세요.", 3000);
        return;
    }

    if ([
        1051, 1076, //FHD
        1411, 1426 //QHD
    ].includes(uploadFirstImg.naturalHeight)) {
        toastAlert("[전체 창 모드] 또는 [전체 화면]으로 설정을 바꿔주시고 다시 시도해 주세요.", 5000)
        return;
    }
    if (!isWantSize(uploadFirstImg, 1920, 1080)      //FHD
        && !isWantSize(uploadFirstImg, 2560, 1440)      //QHD
        && !isWantSize(uploadFirstImg, 2560, 1080)      //WFHD
        && !isWantSize(uploadFirstImg, 3440, 1440)) {    //WQHD
        toastAlert("현재 FHD(1920x1080), QHD(2560x1440)만 지원하고있습니다. 죄송합니다.", 5000)
        return;
    }
    if (isWide()) {
        toastAlert("[21:9 강제 설정] 옵션이 설정된 이미지입니다. 옵션을 끄고 다시 시도해 주세요.", 5000)
        return;
    }

    this.style.display = "none";
    document.querySelector('#drop-area').style.display = "none";
    document.querySelector('#helpbtn').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
    document.querySelector('#notice').style.display = "none";

    await loadJavascript('/js/cardcalc/cardocr.js?v=01171705');
});

document.querySelector('#finishyes').addEventListener('click', async function () {
    //카드 수동 추가
    if (document.querySelector("#cardpushzone").childElementCount >= 1) {
        cardpushlength = document.querySelector("#cardpushzone").childElementCount;
        for (let i = 0; i < cardpushlength; i++) {
            hasCardDeck[document.querySelector(`#cardname${i}`).value] = [parseInt(document.querySelector(`#cardstar${i}`).value), parseInt(document.querySelector(`#cardqty${i}`).value)]
        }
    }
    await loadJavascript('/js/cardcalc/cardcalcul.js?v=01171705');
    await cardsetcalcstart();
    document.querySelector('#bonusdamageBtns > button:nth-child(1)').click();
}, false)

document.querySelector('#finishno').addEventListener('click', function () {
    toastAlert('조건에 맞춰 다시 해주시거나 그래도 안되시면 sjssj7777@naver.com로 인식하기로 한 사진을 보내주세요')
});

let hasCardDeck = {};
if (getCookie('savecarddeck') != '') {
    (async () => {
        getCVal = '{"' + getCookie('savecarddeck') + '}';
        getCVal = getCVal.replace(/:/gi, '":');
        getCVal = getCVal.replace(/],/gi, '],"');
        getCVal = getCVal.replace(/],"}/gi, ']}');

        cObject = JSON.parse(getCVal);

        await loadJavascript('/js/cardcalc/cardeffect.js?v=01171705');

        for (let i = 0; i < Object.keys(cObject).length; i++) {
            cNum = Object.keys(cObject)[i]
            hasCardDeck[Object.keys(cardgrade)[Object.keys(cObject)[i]]] = cObject[cNum];
        }

        await loadJavascript('/js/cardcalc/cardcalcul.js?v=01171705');
        cardsetcalcstart();
    })();
}

document.querySelector('#helpbtn').addEventListener('click', function () {
    let helpimage = document.createElement('img');
    helpimage.src = "img/card1.jpg";
    helpimage.addEventListener('click', function () { window.open("img/card1.jpg"); })
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/card2.jpg";
    helpimage.addEventListener('click', function () { window.open("img/card2.jpg"); })
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/warning.jpg";
    helpimage.addEventListener('click', function () { window.open("img/warning.jpg"); })
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg2').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/cardNormal.jpg";
    helpimage.addEventListener('click', function () { window.open("img/cardNormal.jpg"); })
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "33%";
    document.querySelector('#modalimg3').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/cardError.jpg";
    helpimage.addEventListener('click', function () { window.open("img/cardError.jpg"); })
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "33%";
    document.querySelector('#modalimg3').appendChild(helpimage);

    document.querySelector('#helpbtn').removeEventListener('click', arguments.callee);
}, false);
