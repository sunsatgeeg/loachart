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
        toastAlert("Please upload an image to match.", 3000);
        return;
    }
    if ([
        1051, 1076, //FHD
        1411, 1426 //QHD
    ].includes(uploadFirstImg.naturalHeight)) {
        toastAlert("Please [Bordeless] Or [Full Screen] change the setting to and try again.", 5000)
        return;
    }
    if (!isWantSize(uploadFirstImg, 1920, 1080)      //FHD
        && !isWantSize(uploadFirstImg, 2560, 1440)      //QHD
        && !isWantSize(uploadFirstImg, 2560, 1080)      //WFHD
        && !isWantSize(uploadFirstImg, 3440, 1440)) {    //WQHD
        toastAlert("Currently, only FHD (1920x1080) and QHD (2560x1440) are supported. I'm sorry.", 5000)
        return;
    }
    if (isWide()) {
        toastAlert("[Force 21:9 Aspect Ratio] Image with option set. Please turn off the option and try again.", 5000)
        return;
    }

    this.style.display = "none";
    document.querySelector('#drop-area').style.display = "none";
    document.querySelector('#helpbtn').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = 'Required operation in progress... (up to 30 seconds depending on environment)';
    document.querySelector('#notice').style.display = "none";

    await loadJavascript('/js/cardcalc_steam/cardocr.js?v=02040352');
});

document.querySelector('#finishyes').addEventListener('click', async function () {
    //카드 수동 추가
    if (document.querySelector("#cardpushzone").childElementCount >= 1) {
        cardpushlength = document.querySelector("#cardpushzone").childElementCount;
        for (let i = 0; i < cardpushlength; i++) {
            hasCardDeck[document.querySelector(`#cardname${i}`).value] = [parseInt(document.querySelector(`#cardstar${i}`).value), parseInt(document.querySelector(`#cardqty${i}`).value)]
        }
    }
    await loadJavascript('/js/cardcalc_steam/cardcalcul.js?v=02040352');
    await cardsetcalcstart();
    document.querySelector('#bonusdamageBtns > button:nth-child(1)').click();
}, false)

document.querySelector('#finishno').addEventListener('click', function () {
    toastAlert("Please do it again according to the conditions or if you still can't, please send me a picture that I decided to recognize as admin@loachart.com")
});

let hasCardDeck = {};
//TODO: 시간 좀 지나면 없애기 - 24-02-04 작성
if (getCookie('savecarddeck_steam') != '') {
    (async () => {
        getCVal = '{"' + getCookie('savecarddeck_steam') + '}';
        getCVal = getCVal.replace(/:/gi, '":');
        getCVal = getCVal.replace(/],/gi, '],"');
        getCVal = getCVal.replace(/],"}/gi, ']}');

        cObject = JSON.parse(getCVal);

        // await loadJavascript('/js/cardcalc_steam/cardeffect.js?v=02040352');
        const cardgrade = { "Joytide Snowflake Reindeer Card": 2, "Literary Girl Anabel Card": 3, "Smiling Mari Card": 3, "Posh Sasha Card": 3, "Uniformed Blackfang Card": 3, "Grateful Thirain Card": 3, "Grateful Armen Card": 3, "Shandi and Zinnervale Under the Starlight": 3, "Kadan Under the Starlight": 3, "Thirain Under the Starlight": 3, "Balthorr Under the Starlight": 3, "Azena Under the Starlight": 3, "Dandelion": 3, "Triss Merigold": 3, "Cirilla": 3, "Yennefer of Vengerberg": 3, "Geralt of Rivia": 3, "Sasha enjoying the festival": 3, "Ezrebet enjoying the festival": 3, "Nineveh enjoying the festival": 3, "Veskal": 3, "Firehorn": 3, "Kaltaya": 3, "Nilai": 1, "Verad": 1, "Rakathus": 3, "Lazaram": 3, "Kalinar Neria": 2, "Marega": 2, "Isaac": 2, "Behemoth": 3, "Mariu": 2, "Zeherade": 3, "Varkan": 4, "Rosaline Vediche": 2, "Bishop Antonio": 2, "Zakra": 2, "Alfonso Vediche": 2, "Claudia": 2, "Young Armen": 3, "Gargadeth": 3, "Sonavel": 3, "Vairgrys": 4, "Ark of Eternity Kayangel": 3, "Cahni": 0, "Great Celestial Serpent": 1, "Sky Whale": 1, "Kirke": 1, "Euclid": 1, "Tienis": 1, "Prunya": 1, "Dyna": 2, "Diogenes": 2, "Belomet": 2, "Azakiel": 2, "Lauriel": 3, "Marinna": 2, "Hanun": 2, "Revellos": 1, "Wilhelm": 2, "Piela": 2, "Anke": 2, "Rowen Zenlord": 1, "Sylus": 2, "Baskia": 2, "Arno": 2, "Danika": 3, "Osphere": 3, "Myun Hidaka": 3, "Hanumatan": 3, "Papa": 1, "Kungelanium": 3, "Hartem": 0, "Kiessa": 0, "Alberto": 0, "Ludwig": 1, "Gillock": 1, "Killian": 1, "Satra": 1, "Cindy": 2, "Candaria Neria": 2, "Vern Zenlord": 2, "Xereon": 2, "Lujean": 2, "Haiger": 2, "Deskaluda": 3, "Argos": 3, "Weakened Kakul-Saydon": 4, "Stella": 2, "Cicerra": 2, "Seto": 2, "Hariya": 1, "Berver": 0, "Albion": 3, "Nagi": 2, "Liru": 2, "Jahara": 2, "Shana": 3, "Nia": 3, "Mathias": 0, "Sapiano the Fox": 0, "Yom the Squirrel": 0, "Refugee Pamil": 0, "Neth": 0, "Bellita": 0, "Tookalibur": 0, "Demetar": 0, "Nabi": 0, "Chella": 0, "Indar": 0, "Telpa": 0, "Phantom Pawn": 0, "Chamkuri": 0, "Turan": 0, "Cadri": 0, "Ternark": 0, "Goblin Elder Balu": 0, "Lion Mask": 0, "Naruni": 0, "Mephitious": 0, "Kranterus": 0, "Vivian": 0, "Riwella": 0, "Mercenary Zeira": 1, "Gobius XXIV": 1, "Tanay": 1, "Stranded Temma": 1, "Dakudaku": 1, "Madam Moonscent": 1, "Morina": 1, "Morpheo": 1, "Lutia": 1, "Imar": 1, "Rubenstein del Orzo": 1, "Siera": 1, "Phantom Bishop": 1, "Phantom Rook": 1, "Phantom Knight": 1, "Mikeel and Nomed": 1, "Zenri": 1, "Favreau": 1, "Lena": 1, "Navegal": 1, "Butcher Arre": 1, "Poppy": 1, "Nakshun": 1, "Ramis": 1, "Javern": 1, "Commander Sol": 1, "Seville": 1, "Sir Valleylead": 1, "Sir Druden": 1, "Sakkul": 1, "Gumga": 1, "Hodon": 1, "Onehand": 1, "Hari": 1, "Yuul": 1, "Guardian Peroth": 1, "Egg of Creation": 1, "Totoiki": 1, "Executor Solas": 1, "Gabrian": 1, "Azaran": 1, "Brinewt": 1, "Berhart": 1, "Bishu": 1, "Monterque": 1, "Cadogan": 1, "Benard": 1, "Urr": 1, "Giant Worm": 1, "Dadan": 1, "Vengeful Spirit": 1, "Adrinne": 2, "Knut": 2, "Samly": 2, "Panda Puppa": 2, "Abyssina": 2, "Wavestrand Port Neria": 2, "Spear of Extinction": 2, "Vanquisher": 2, "Bergstrom": 2, "Admos": 2, "Geppetto": 2, "Goulding": 2, "Levi": 2, "Naber": 2, "Eikerr": 2, "Kyzra": 2, "Nazan": 2, "Piyer": 2, "Great Castle Neria": 2, "Phantom King": 2, "Phantom Queen": 2, "Orelda": 2, "Gherdia": 2, "Aven": 2, "Lenora": 2, "Sol Grande": 2, "Experimental Tarmakum": 2, "Sea God Aporas": 2, "Kagros": 2, "Brealeos": 2, "Tooki King": 2, "Erasmo": 2, "Proxima": 2, "Gorgon": 2, "Payla": 2, "Garum": 2, "Gideon": 2, "Maneth": 2, "Sian": 2, "Ruave": 2, "Tarsila": 2, "Vrad": 2, "Anton": 2, "J": 2, "S": 2, "Signatus": 2, "Stern Neria": 2, "Chaotic Chuo": 2, "Dochul": 2, "Plague Legion Varto": 2, "Rekiel of Despair": 2, "Gildal": 2, "Wonpho": 2, "Miru": 2, "Manpo": 2, "Pahan": 2, "Ark Guardian Occel": 2, "Caspiel the Giant God": 2, "Guardian Tir": 2, "Ed the Red": 2, "Guardian Eolh": 2, "Hybee Executioner": 2, "Totoma": 2, "Setino": 2, "Nox": 2, "Hiebike": 2, "Cals Moronto": 2, "Halrock": 2, "Ligheas": 2, "Jahia": 2, "Heretic High Priest": 2, "Seria": 2, "Wili-Wili": 2, "Luterra Castle Neria": 2, "Alifer": 2, "Rovlen": 2, "Cassleford": 2, "Rictus": 2, "Meehan": 2, "Celedan": 2, "Thunder": 2, "Salt Giant": 2, "Harzal": 2, "Plaguebringer": 2, "Velkan": 2, "Ugo": 2, "Rudric": 2, "Prideholme Neria": 2, "Varut": 2, "Calvasus": 3, "Krissa": 3, "Ezrebet": 3, "Ark of Devotion Karta": 3, "Ark of Wisdom Ratik": 3, "Ark of Hope Elpon": 3, "Ark of Prescience Agaton": 3, "Ark of Creation Ortuus": 3, "Ark of Trust Asta": 3, "Navinos": 3, "Perkunas": 3, "Fjorgin": 3, "Alaric": 3, "Alberhastic": 3, "Kaishuter": 3, "Mystic": 3, "Igrexion": 3, "Achates": 3, "Caliligos": 3, "Velganos": 3, "Night Fox Yoho": 3, "Tytalos": 3, "Frost Helgaia": 3, "Flame Fox Yoho": 3, "Armored Nacrasena": 3, "Lava Chromanium": 3, "Calventus": 3, "Ur'nil": 3, "Lumerus": 3, "Enviska": 3, "Ealyn": 3, "Avele": 3, "Chaotic Zaika": 3, "Kalmaris": 3, "Jederico": 3, "Kaldor": 3, "Zaika": 3, "Kaishur": 3, "Velcruze": 3, "Kaysarr": 3, "Sylperion": 3, "Undart": 3, "Gnosis": 3, "Ephernia": 3, "Dark Legoros": 3, "Icy Legoros": 3, "Helgaia": 3, "Chromanium": 3, "Vertus": 3, "Levanos": 3, "Nacrasena": 3, "Sigmund": 3, "Anabel": 3, "Thar": 3, "Madnick": 3, "Lord of Evolution Krause": 3, "Mari": 3, "Krause": 3, "Sasha": 3, "Bastian": 3, "Banda": 3, "Habeck": 3, "Mokamoka": 3, "Blackfang": 3, "Jagan": 3, "Mage Nahun": 3, "Allegro": 3, "Scherrit": 3, "Thunderwings": 3, "Thanatos": 3, "Kadan": 4, "Nineveh": 4, "Galatur": 4, "Sidereal Sien": 4, "Luterra": 4, "Guardian Luen": 4, "Balthorr": 4, "Azena and Inanna": 4, "Beatrice": 4, "Brelshaza": 4, "Thaemine": 4, "Kharmine": 4, "Akkan": 4, "Vykas": 4, "Wei": 4, "Kakul-Saydon": 4, "Delain Armen": 4, "Zinnervale": 4, "Shandi": 4, "King Thirain": 4, "Valtan": 4, "Thirain": 4, "Armen": 4 };

        for (let i = 0; i < Object.keys(cObject).length; i++) {
            cNum = Object.keys(cObject)[i]
            hasCardDeck[Object.keys(cardgrade)[Object.keys(cObject)[i]]] = cObject[cNum];
        }

        localStorage.setItem("CardStorage_steam", JSON.stringify(hasCardDeck));
        delCookie('savecarddeck_steam');

        await loadJavascript('/js/cardcalc_steam/cardcalcul.js?v=02040352');
        cardsetcalcstart();
    })();
} else if (localStorage.getItem("CardStorage_steam")) {
    (async () => {
        hasCardDeck = JSON.parse(localStorage.getItem("CardStorage_steam"));
        await loadJavascript('/js/cardcalc_steam/cardcalcul.js?v=02040352');
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

    document.querySelector('#helpbtn').removeEventListener('click', arguments.callee);
}, false);
