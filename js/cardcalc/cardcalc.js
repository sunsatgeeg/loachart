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

    await loadJavascript('/js/cardcalc/cardocr.js?v=02040346');
});

document.querySelector('#finishyes').addEventListener('click', async function () {
    //카드 수동 추가
    if (document.querySelector("#cardpushzone").childElementCount >= 1) {
        cardpushlength = document.querySelector("#cardpushzone").childElementCount;
        for (let i = 0; i < cardpushlength; i++) {
            hasCardDeck[document.querySelector(`#cardname${i}`).value] = [parseInt(document.querySelector(`#cardstar${i}`).value), parseInt(document.querySelector(`#cardqty${i}`).value)]
        }
    }
    await loadJavascript('/js/cardcalc/cardcalcul.js?v=02040346');
    await cardsetcalcstart();
    document.querySelector('#bonusdamageBtns > button:nth-child(1)').click();
}, false)

document.querySelector('#finishno').addEventListener('click', function () {
    toastAlert('조건에 맞춰 다시 해주시거나 그래도 안되시면 admin@loachart.com << 로 인식하기로 한 사진을 보내주세요')
});

let hasCardDeck = {};
//TODO: 시간 좀 지나면 없애기 - 24-02-04 작성
if (getCookie('savecarddeck') != '') {
    (async () => {
        getCVal = '{"' + getCookie('savecarddeck') + '}';
        getCVal = getCVal.replace(/:/gi, '":');
        getCVal = getCVal.replace(/],/gi, '],"');
        getCVal = getCVal.replace(/],"}/gi, ']}');

        cObject = JSON.parse(getCVal);

        // await loadJavascript('/js/cardcalc/cardeffect.js?v=02040346');
        const cardgrade = { "게메트": 1, "네페르": 1, "프타": 1, "까미": 1, "베스칼": 3, "가디언 루": 4, "가룸": 2, "가르가디스": 3, "가비슈": 1, "갈기파도 항구 네리아": 2, "감사를 전하는 실리안 카드": 3, "감사를 전하는 아만 카드": 3, "객주도사": 1, "거신 카스피엘": 2, "검은이빨": 3, "게르디아": 2, "고르곤": 2, "고르카그로스": 2, "고블린 장로 발루": 0, "고비우스 24세": 1, "광기를 잃은 쿠크세이튼": 4, "국왕 실리안": 4, "굴딩": 2, "그노시스": 3, "금강": 1, "기드온": 2, "기자 마티아스": 0, "길달": 2, "나기": 2, "나루니": 0, "나베갈": 1, "나베르": 2, "나비": 0, "나잔": 2, "나크라세나": 3, "나크슌": 1, "나히니르": 3, "난민 파밀리아": 0, "네스": 0, "녹스": 2, "니나브": 4, "니아": 3, "닐라이": 1, "다단": 1, "다람쥐 욤": 0, "다르시": 3, "다이나웨일": 2, "다쿠쿠": 1, "단델라이온": 3, "데런 아만": 4, "데메타르": 0, "데스칼루다": 3, "도굴단장 우고": 2, "도륙자 아르르": 1, "도발하는 사샤 카드": 3, "도철": 2, "두키칼리버": 0, "두키킹": 2, "디오게네스": 2, "라우리엘": 3, "라자람": 3, "라카이서스": 3, "라하르트": 3, "레나": 1, "레바노스": 3, "레온하트 네리아": 2, "레이든": 1, "레퓌스": 1, "로블롬": 2, "로웬 젠로드": 1, "로잘린 베디체": 2, "루기네": 2, "루드릭": 2, "루드벡": 1, "루메루스": 3, "루벤스타인 델 아르코": 1, "루아브": 2, "루테란 성 네리아": 2, "루티아": 1, "리게아스": 2, "리루": 2, "리비아의 게롤트": 3, "리웰라": 0, "릭투스": 2, "마네스": 2, "마레가": 2, "마리 파우렌츠": 3, "마리나": 2, "마리우": 2, "마법사 로나운": 3, "만포": 2, "멜피셔스": 0, "모르페오": 1, "모리나": 1, "모카모카": 3, "몬테르크": 1, "몽환의 나이트": 1, "몽환의 룩": 1, "몽환의 비숍": 1, "몽환의 퀸": 2, "몽환의 킹": 2, "몽환의 폰": 0, "문학소녀 아나벨 카드": 3, "뮨 히다카": 3, "미령": 2, "미스틱": 3, "미카엘과 노메드": 1, "미한": 2, "바루투": 2, "바르칸": 4, "바스키아": 2, "바스티안": 3, "바에단": 2, "바훈투르": 4, "반다": 3, "발탄": 4, "베나르": 1, "베라드": 1, "베르베로": 0, "베르투스": 3, "베르하트": 1, "베른 젠로드": 2, "베아트리스": 4, "베히모스": 3, "벤거버그의 예니퍼": 3, "벨가누스": 3, "벨루마테": 2, "벨리타": 0, "벨크루제": 3, "변절자 제페토": 2, "별자리 큰뱀": 1, "불칸": 2, "붉은 남작 에디": 2, "브리아레오스": 2, "비비안": 0, "비슈츠": 1, "비아키스": 4, "비올레": 2, "빌헬름": 2, "빙결의 레기오로스": 3, "빛을 맞이하는 바훈투르": 3, "빛을 맞이하는 샨디&진저웨일": 3, "빛을 맞이하는 실리안": 3, "빛을 맞이하는 아제나": 3, "빛을 맞이하는 카단": 3, "사교도 대제사장": 2, "사샤": 3, "사이카": 3, "사일러스": 2, "사자탈": 0, "사트라": 1, "삭월": 1, "샐리": 2, "샤나": 3, "샨디": 4, "세리아": 2, "세비엘": 1, "세토": 2, "세티노": 2, "세헤라데": 3, "소금거인": 2, "소나벨": 3, "솔 그랑데": 2, "수령도사": 1, "수신 아포라스": 2, "수호자 에오로": 2, "수호자 티르": 2, "수호자 페오스": 1, "슈테른 네리아": 2, "슈헤리트": 3, "스텔라": 2, "시그나투스": 2, "시릴라": 3, "시안": 2, "시이라": 1, "신디": 2, "신뢰의 아크 아스타": 3, "실리안": 4, "실페리온": 3, "실험체 타르마쿰": 2, "아나벨": 3, "아델": 3, "아드린느": 2, "아드모스": 2, "아르고스": 3, "아르노": 2, "아르카디아": 3, "아만": 4, "아벤": 2, "아브렐슈드": 4, "아비시나": 2, "아이작": 2, "아이히만 박사": 2, "아자란": 1, "아자키엘": 2, "아제나&이난나": 4, "아카테스": 3, "아크의 수호자 오셀": 2, "안토니오 주교": 2, "안톤": 2, "알레그로": 3, "알리페르": 2, "알베르토": 0, "알비온": 3, "알폰스 베디체": 2, "앙케": 2, "어둠의 레기오로스": 3, "어린 아만": 3, "에라스모": 2, "에르제베트": 3, "에버그레이스": 4, "에스": 2, "에스더 갈라투르": 4, "에스더 루테란": 4, "에스더 시엔": 4, "에아달린": 3, "에이케르": 2, "에페르니아": 3, "엔비스카": 3, "엘레노아": 2, "엘버하스틱": 3, "여우 사피아노": 0, "여울": 1, "역병 인도자": 2, "역병군단 바르토": 2, "영원의 아크 카양겔": 3, "예지의 아크 아가톤": 3, "오렐다": 2, "오스피어": 3, "오크 장로 질록": 1, "오픈을 축하하는 마리 카드": 3, "용병 세이라": 1, "용암 크로마니움": 3, "우르닐": 3, "우르르": 1, "운다트": 3, "원포": 2, "월향도사": 1, "웨이": 4, "위대한 성 네리아": 2, "윌리윌리": 2, "유클리드": 1, "이그렉시온": 3, "이마르": 1, "이와르": 0, "일리아칸": 4, "자간": 3, "자베른": 1, "자이언트 웜": 1, "자크라": 2, "자하라": 2, "자히아": 2, "절망의 레키엘": 2, "제레온": 2, "제복 검은이빨 카드": 3, "제이": 2, "중갑 나크라세나": 3, "지그문트": 3, "지혜의 아크 라디체": 3, "지휘관 솔": 1, "진 매드닉": 3, "진멸의 창": 2, "진저웨일": 4, "진화의 군주 카인": 3, "집행관 솔라스": 1, "참크리": 0, "창조의 아크 오르투스": 3, "창조의 알": 1, "천둥": 2, "천둥날개": 3, "첼라": 0, "축제를 즐기는 니나브": 3, "축제를 즐기는 사샤": 3, "축제를 즐기는 에르제베트": 3, "카단": 4, "카도건": 1, "카드리": 0, "카마인": 4, "카멘": 4, "카이슈르": 3, "카이슈테르": 3, "카인": 3, "칸다리아 네리아": 2, "칼도르": 3, "칼라도세": 2, "칼리나리 네리아": 2, "칼바서스": 3, "칼벤투스": 3, "칼스 모론토": 2, "칼엘리고스": 3, "칼테이야": 3, "칼트말루스": 3, "케이사르": 3, "코니": 0, "쿠크세이튼": 4, "쿤겔라니움": 3, "크누트": 2, "크란테루스": 0, "크로마니움": 3, "크리스마스 눈꽃 사슴 카드": 2, "크리스틴": 3, "클라우디아": 2, "키르케": 1, "키에사": 0, "키즈라": 2, "키케라": 2, "킬리언": 1, "타나토스": 3, "타냐 벤텀": 1, "타르실라": 2, "타이탈로스": 3, "테르나크": 0, "텔파": 0, "토토마": 2, "토토이끼": 1, "투란": 0, "트리스 메리골드": 3, "티엔": 1, "파르쿠나스": 3, "파이어혼": 3, "파파": 1, "파한": 2, "판다 푸푸": 2, "패자의 검": 2, "페데리코": 3, "페일린": 2, "포포": 1, "표류소녀 엠마": 1, "푸름 전사 브리뉴": 1, "프랭크": 1, "프록시마": 2, "프리우나": 1, "피에르": 2, "피엘라": 2, "피요르긴": 3, "하누마탄": 3, "하눈": 2, "하늘 고래": 1, "하르잘": 2, "하리": 1, "하리야": 1, "하백": 3, "하셀링크": 2, "하울로크": 2, "하이거": 2, "하이비 집행관": 2, "하템": 0, "한손": 1, "한이 서린 여인": 1, "헌신의 아크 카르타": 3, "헨리": 1, "헬가이아": 3, "호동": 1, "혹한의 헬가이아": 3, "혼돈의 사이카": 3, "혼재의 추오": 2, "홍염의 요호": 3, "흑야의 요호": 3, "희망의 아크 엘피스": 3, "히바이크": 2 };

        for (let i = 0; i < Object.keys(cObject).length; i++) {
            cNum = Object.keys(cObject)[i]
            hasCardDeck[Object.keys(cardgrade)[Object.keys(cObject)[i]]] = cObject[cNum];
        }

        localStorage.setItem("CardStorage", JSON.stringify(hasCardDeck));
        delCookie('savecarddeck');

        await loadJavascript('/js/cardcalc/cardcalcul.js?v=02040346');
        cardsetcalcstart();
    })();
} else if (localStorage.getItem("CardStorage")) {
    (async () => {
        hasCardDeck = JSON.parse(localStorage.getItem("CardStorage"));
        await loadJavascript('/js/cardcalc/cardcalcul.js?v=02040346');
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
