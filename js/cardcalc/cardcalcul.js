const allCardTotalExp = 54388200;
const docapack = {
    '삭막한 초원의 카드 팩': ['마리 파우렌츠', '바스티안', '사샤', '예지의 아크 아가톤', '진화의 군주 카인', '카인', '타나토스', '도굴단장 우고', '레온하트 네리아', '루드릭', '바루투', '불칸', '소금거인', '슈테른 네리아', '시그나투스', '아드모스', '아이히만 박사', '안톤', '에스', '역병 인도자', '제이', '천둥', '칼라도세', '하르잘', '다단', '모리나', '세비엘', '시이라', '용병 세이라', '자이언트 웜', '지휘관 솔', '한이 서린 여인', '기자 마티아스'],
    '용감한 기사의 카드 팩': ['검은이빨', '마법사 로나운', '슈헤리트', '신뢰의 아크 아스타', '알레그로', '자간', '천둥날개', '갈기파도 항구 네리아', '녹스', '로블롬', '루테란 성 네리아', '리게아스', '릭투스', '미한', '사교도 대제사장', '세리아', '윌리윌리', '자히아', '칼스 모론토', '패자의 검', '하셀링크', '하울로크', '히바이크', '가비슈', '모르페오', '몬테르크', '베나르', '베르하트', '비슈츠', '아자란', '집행관 솔라스', '카도건', '푸름 전사 브리뉴', '리웰라', '멜피셔스', '비비안', '크란테루스'],
    '노래하는 혹한 카드 팩': ['반다', '진 매드닉', '하백', '희망의 아크 엘피스', '길달', '도철', '루아브', '마네스', '만포', '미령', '바에단', '시안', '역병군단 바르토', '원포', '절망의 레키엘', '타르실라', '파한', '혼재의 추오', '객주도사', '금강', '나크슌', '도륙자 아르르', '레이든', '삭월', '수령도사', '여울', '월향도사', '자베른', '포포', '하리', '한손', '호동', '사자탈'],
    '새벽 잎사귀의 카드 팩': ['라하르트', '루메루스', '모카모카', '미스틱', '베르투스', '빙결의 레기오로스', '아나벨', '아델', '에아달린', '우르닐', '지그문트', '창조의 아크 오르투스', '가룸', '거신 카스피엘', '고르곤', '기드온', '붉은 남작 에디', '세티노', '수호자 에오로', '수호자 티르', '아크의 수호자 오셀', '토토마', '페일린', '프록시마', '하이비 집행관', '나베갈', '다쿠쿠', '수호자 페오스', '창조의 알', '토토이끼', '고블린 장로 발루', '나루니', '테르나크'],
    '신비한 풍류의 카드 팩': ['그노시스', '나크라세나', '반다', '실페리온', '에페르니아', '엔비스카', '운다트', '지혜의 아크 라디체', '크로마니움', '타이탈로스', '하백', '홍염의 요호', '게르디아', '길달', '도철', '만포', '몽환의 퀸', '몽환의 킹', '미령', '아벤', '알리페르', '엘레노아', '역병군단 바르토', '오렐다', '원포', '절망의 레키엘', '파한', '혼재의 추오', '객주도사', '금강', '도륙자 아르르', '몽환의 나이트', '몽환의 룩', '몽환의 비숍', '삭월', '수령도사', '여울', '월향도사', '하리', '한손', '호동', '몽환의 폰', '사자탈', '참크리', '투란'],
    '단단한 용기의 카드 팩': ['검은이빨', '벨크루제', '신뢰의 아크 아스타', '아카테스', '알레그로', '어둠의 레기오로스', '천둥날개', '카이슈르', '카이슈테르', '칼벤투스', '케이사르', '피요르긴', '헬가이아', '갈기파도 항구 네리아', '나베르', '나잔', '녹스', '루테란 성 네리아', '리게아스', '미한', '사교도 대제사장', '에이케르', '위대한 성 네리아', '윌리윌리', '자히아', '칼스 모론토', '키즈라', '피에르', '하셀링크', '하울로크', '히바이크', '가비슈', '모르페오', '몬테르크', '비슈츠', '아자란', '우르르', '이마르', '집행관 솔라스', '푸름 전사 브리뉴', '멜피셔스', '비비안', '이와르', '텔파'],
    '어두운 잎사귀 카드 팩': ['레바노스', '모카모카', '사이카', '아르카디아', '엘버하스틱', '용암 크로마니움', '창조의 아크 오르투스', '칼도르', '칼트말루스', '파르쿠나스', '페데리코', '헌신의 아크 카르타', '혹한의 헬가이아', '혼돈의 사이카', '거신 카스피엘', '굴딩', '변절자 제페토', '붉은 남작 에디', '비올레', '세티노', '수호자 에오로', '수호자 티르', '아크의 수호자 오셀', '진멸의 창', '토토마', '하이비 집행관', '다쿠쿠', '루티아', '수호자 페오스', '창조의 알', '토토이끼', '나루니', '나비', '데메타르', '두키칼리버', '첼라'],
    '춤추는 혹한의 카드 팩': ['나히니르', '니아', '벨가누스', '샤나', '아르고스', '알비온', '이그렉시온', '중갑 나크라세나', '진 매드닉', '흑야의 요호', '희망의 아크 엘피스', '나기', '루아브', '리루', '마네스', '바에단', '세토', '스텔라', '시안', '자하라', '키케라', '타르실라', '나크슌', '레이든', '자베른', '포포', '하리야', '베르베로'],
    '조화로운 바다 카드 팩': ['에르제베트', '칼바서스', '크리스틴', '고르카그로스', '두키킹', '브리아레오스', '샐리', '솔 그랑데', '수신 아포라스', '실험체 타르마쿰', '아드린느', '아비시나', '에라스모', '크누트', '판다 푸푸', '고비우스 24세', '레나', '루벤스타인 델 아르코', '미카엘과 노메드', '타냐 벤텀', '표류소녀 엠마', '프랭크', '헨리', '난민 파밀리아', '네스', '다람쥐 욤', '벨리타', '여우 사피아노', '카드리'],
};

let bonusDamageBtns = document.querySelectorAll('#bonusdamageBtns button');
document.querySelector('#allBonusDmg').addEventListener('click', allBonusDmg);

// 되돌리기 기능
const myHistory = [];
function historyADD(dict) {
    myHistory.push(dict)

    if (myHistory.length >= 1) document.querySelector('#undoBtn').removeAttribute('disabled');
    else document.querySelector('#undoBtn').setAttribute('disabled', '');
}
document.querySelector('#undoBtn').addEventListener('click', async () => {
    let recentDict = myHistory[myHistory.length - 1];
    for (let i = 0; i < Object.keys(recentDict).length; i++) {
        let cardName = Object.keys(recentDict)[i];
        let cardAwake = recentDict[cardName][0];
        let cardQty = recentDict[cardName][1];

        hasCardDeck[cardName] = [hasCardDeck[cardName][0] - cardAwake,
        hasCardDeck[cardName][1] + cardQty]
    }
    myHistory.pop();

    if (document.querySelector("#allBonusDmg").classList.contains('active')) {
        allBonusDmg();
    } else {
        bonusdamagelistup();
    }
    await cardsetcalcstart();

    if (myHistory.length >= 1) document.querySelector('#undoBtn').removeAttribute('disabled');
    else document.querySelector('#undoBtn').setAttribute('disabled', '');
});

// 수동 수정
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;

    function autocompleteEvent(e) {
        let a, b, i, val = e.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", e.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        e.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].toUpperCase().indexOf(val.toUpperCase()) > -1) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i];
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (f) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = f.target.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    manualEditInfo(f.target.getElementsByTagName("input")[0].value);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    inp.addEventListener('click', (e) => { autocompleteEvent(e.target) })
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", (e) => { autocompleteEvent(e.target) });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            } else {
                if (x) x[0].click();
            }
        } else if (e.keyCode == 18) {
            // 알트 누르니까 마지막 키 입력 취소해서
            e.preventDefault();
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        manualEditInfo(x[currentFocus].querySelector('input').value);
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
function manualEditInfo(name) {
    document.querySelector('#manualEditQtyInput').value = '';
    if (cardgrade?.[name] == undefined) {
        document.querySelector('#manualEditAwakeInput').value = '';
    } else if (hasCardDeck[name]?.[0] == undefined) {
        document.querySelector('#manualEditAwakeInput').value = -1;
    } else {
        document.querySelector('#manualEditAwakeInput').value = hasCardDeck[name][0];
        document.querySelector('#manualEditQtyInput').value = hasCardDeck[name][1];
    }

}
async function manualEdit() {
    if (cardgrade?.[document.querySelector('#manualEditNameInput').value] == undefined) {
        return;
    }
    if (document.querySelector('#manualEditAwakeInput').value == '-1') {
        delete hasCardDeck[document.querySelector('#manualEditNameInput').value];
        await cardsetcalcstart();
        bonusdamagelistup();
        return;
    }
    hasCardDeck[document.querySelector('#manualEditNameInput').value] = [parseInt(document.querySelector('#manualEditAwakeInput').value), parseInt(document.querySelector('#manualEditQtyInput').value || 0)];
    await cardsetcalcstart();
    bonusdamagelistup();
}

document.querySelector('#manualEditNameInput').addEventListener('input', e => manualEditInfo(e.target.value));
document.querySelector('#manualEditAwakeInput').addEventListener('change', manualEdit)
document.querySelector('#manualEditQtyInput').addEventListener('change', manualEdit);

function allBonusDmg() {
    bonusDamageBtns.forEach(function (f) {
        if (f.classList.contains('active')) {
            f.classList.remove('active');
            return false;
        }
    })
    if (tippyToggle) {
        tippyToggle.destroy();
        tippyToggle = null;
    }
    document.querySelector('#allBonusDmg').classList.add('active');
    document.querySelector('#allBonusDmgDiv').style.display = '';
    document.querySelector('#unitBonusDmgDiv').style.display = 'none';

    let targetTable = document.querySelector('#allBonusDmgTable');
    while (targetTable.hasChildNodes()) {
        targetTable.removeChild(targetTable.firstChild);
    }

    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        let cardName = Object.keys(hasCardDeck)[i];
        let cardAwake = hasCardDeck[cardName][0];
        if (cardAwake == 5) continue;

        let finishAwakeDmg = {
            '악마': 0.00,
            '야수': 0.00,
            '인간': 0.00,
            '불사': 0.00,
            '물질': 0.00,
            '정령': 0.00,
            '식물': 0.00,
            '기계': 0.00,
            '곤충': 0.00,
        };
        let totalDmg = 0;
        for (let j = 0; j < Object.keys(cardeffect).length; j++) {
            let setName = Object.keys(cardeffect)[j];
            let setCardList = cardeffect[setName][0];
            let setBonusDmgTri = cardeffect[setName][3];
            let setAwakeInfoList = cardeffect[setName][4];

            if (setCardList.includes(cardName)) {
                let simulSetTotalAwake = 0;
                let k = 0
                for (k = 0; k < setCardList.length; k++) {
                    try {
                        simulSetTotalAwake += parseInt(hasCardDeck[setCardList[k]][0]);
                    } catch { break; }
                }
                if (k != setCardList.length) {
                    continue;
                }

                let targetSetTotalAwake, targetSetTotalAwakeDmg = null;
                for (let k = Object.keys(setAwakeInfoList).length - 1; k >= 0; k--) {
                    if (parseInt(Object.keys(setAwakeInfoList)[k]) <= simulSetTotalAwake) {
                        targetSetTotalAwake = parseInt(Object.keys(setAwakeInfoList)[k + 1]);
                        targetSetTotalAwakeDmg = setAwakeInfoList[targetSetTotalAwake];
                        break;
                    } else if (k == 0) {
                        targetSetTotalAwake = parseInt(Object.keys(setAwakeInfoList)[0]);
                        targetSetTotalAwakeDmg = setAwakeInfoList[targetSetTotalAwake];
                    }
                }

                if ((5 - cardAwake) + simulSetTotalAwake >= targetSetTotalAwake) {
                    finishAwakeDmg[setBonusDmgTri] = finishAwakeDmg[setBonusDmgTri] + parseFloat(targetSetTotalAwakeDmg);
                    totalDmg += parseFloat(targetSetTotalAwakeDmg);
                }
            }
        }

        let content = "";
        for (let j = 0; j < Object.keys(finishAwakeDmg).length; j++) {
            let triName = Object.keys(finishAwakeDmg)[j];
            let triDmg = finishAwakeDmg[triName];
            if (triDmg == 0) continue;

            if (content == "") content += `${triName} : ${(triDmg.toFixed(2)).padEnd(4, '0')}`;
            else content += `<br>${triName} : ${(triDmg.toFixed(2)).padEnd(4, '0')}`;
        }


        if (content != "") {
            let needExp = 0;
            let cardQty = hasCardDeck[cardName][1];
            for (let j = cardAwake; j < 5; j++) {
                needExp += cardLevelUpExp[cardgrade[cardName]][j];
                cardQty -= j + 1;
            }

            let trElement = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdExp = document.createElement('td');
            let tdTotal = document.createElement('td');
            let tdDmg = document.createElement('td');

            if (cardQty == 0) {
                trElement.style.setProperty('--bs-table-color', 'orange');
                trElement.style.setProperty('--hover-color-var', 'orange');
            }
            trElement.style.cursor = 'pointer';
            trElement.addEventListener('click', async (e) => {
                let thisTr = e.target.parentElement;
                let thisName = thisTr.childNodes[0].textContent;

                let temp = {}
                temp[thisName] = [5 - hasCardDeck[thisName][0], hasCardDeck[thisName][1]]
                historyADD(temp)

                hasCardDeck[thisName] = [5, 0];

                await cardsetcalcstart();
                allBonusDmg();
            })

            tdName.textContent = cardName;
            tdExp.textContent = (needExp).toLocaleString();
            tdTotal.textContent = (totalDmg.toFixed(2)).padEnd(4, '0');
            tdDmg.innerHTML = content;

            trElement.appendChild(tdName);
            trElement.appendChild(tdExp);
            trElement.appendChild(tdTotal);
            trElement.appendChild(tdDmg);

            targetTable.appendChild(trElement);
        }
    }

    let sortables = document.querySelectorAll('.sortable');
    sortables.forEach((t) => {
        t.classList.remove('asc');
        t.classList.remove('desc');
        t.classList.add('ascdesc');
    });
    multiSort(document.querySelector("#allBonusDmgDiv table th:nth-child(2)"), 'exp')
}

function multiSort(e, what) {
    let sortables = document.querySelectorAll('.sortable');
    sortables.forEach((t) => {
        if (t != e) {
            t.classList.remove('asc');
            t.classList.remove('desc');
            t.classList.add('ascdesc');
        } else {
            t.classList.add('desc');
            t.classList.remove('ascdesc');
        }
    });

    let sortMethodA, sortMethodB = 0;
    if (e.classList.contains('asc')) {
        e.classList.add('desc');
        e.classList.remove('asc');
        sortMethodA = -1;
        sortMethodB = 1;
    } else {
        e.classList.remove('desc');
        e.classList.add('asc');
        sortMethodA = 1;
        sortMethodB = -1;
    }

    let targetTable = document.querySelector('#allBonusDmgTable');
    let tagarr = Array.from(document.querySelectorAll("#allBonusDmgTable tr"));
    while (targetTable.hasChildNodes()) {
        targetTable.removeChild(targetTable.firstChild);
    }

    tagarr.sort(function (a, b) {
        let exp1 = parseInt(a.querySelectorAll('td')[1].textContent.replace(',', ''));
        let exp2 = parseInt(b.querySelectorAll('td')[1].textContent.replace(',', ''));
        let dmg1 = parseFloat(a.querySelectorAll('td')[2].textContent);
        let dmg2 = parseFloat(b.querySelectorAll('td')[2].textContent);

        if (what == 'bonus') {
            if (dmg1 < dmg2) return sortMethodB;
            if (dmg1 > dmg2) return sortMethodA;
            if (exp1 < exp2) return sortMethodB;
            if (exp1 > exp2) return sortMethodA;
            return 0;
        } else {
            if (exp1 < exp2) return sortMethodB;
            if (exp1 > exp2) return sortMethodA;
            if (dmg1 < dmg2) return sortMethodB;
            if (dmg1 > dmg2) return sortMethodA;
            return 0;
        }
    });


    for (let i = 0; i < tagarr.length; i++) {
        targetTable.append(tagarr[i])
    }
}

let tri;
bonusDamageBtns = document.querySelectorAll('#bonusdamageBtns button');
bonusDamageBtns.forEach(function (e) {
    e.addEventListener('click', function () {
        document.querySelector('#allBonusDmg').classList.remove('active');
        bonusDamageBtns.forEach(function (f) {
            if (f.classList.contains('active')) {
                f.classList.remove('active');
                return false;
            }
        })
        if (tippyToggle) {
            tippyToggle.destroy();
            tippyToggle = null;
        }

        document.querySelector('#allBonusDmgDiv').style.display = 'none';
        document.querySelector('#unitBonusDmgDiv').style.display = '';

        e.classList.add('active');

        tri = this.innerText;

        bonusdamagelistup();
    })
});

document.querySelector('#reconBtn').addEventListener('click', function () {
    delCookie('savecarddeck');
    location.reload();
});

let thisTriCardList = {};

let recommendExp = null;
let recommendCard = null;
async function cardsetcalcstart() {
    document.querySelector('#matchfinish').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';

    await loadJavascript('/js/cardcalc/cardeffect.js?v=01182203');
    autocomplete(document.getElementById("manualEditNameInput"), Object.keys(cardgrade));

    document.querySelector('#matchingment').textContent = '도감작 계산 시작';
    let myStat = {
        "힘": 0,
        "체력": 0,
        "치명": 0,
        "특화": 0,
        "제압": 0,
        "신속": 0,
        "인내": 0,
        "숙련": 0,
        "방어력": 0,
    }
    let myBonusDamage = {
        "인간": 0,
        "악마": 0,
        "물질": 0,
        "불사": 0,
        "식물": 0,
        "곤충": 0,
        "정령": 0,
        "야수": 0,
        "기계": 0
    };

    let cardeffectlength = Object.keys(cardeffect).length;

    recommendExp = {};
    recommendCard = {};
    for (let i = 0; i < cardeffectlength; i++) {
        let leveltotal = 0;
        let nextlevels = [];
        let nextLevelExp = 0;
        let nextUpSetLevel = [];
        let nextbonusdamage = 0;
        let nextleveldiff = 0;
        let setname = Object.keys(cardeffect)[i];
        let set = cardeffect[setname];
        let setcardlist = set[0];
        let setStatInfo = set[1];
        let setStatPlus = set[2];
        let setBonusDmgInfo = set[3];
        let setBonusDmgPlusList = set[4];

        let j = null;
        for (j = 0; j < setcardlist.length; j++) {
            let unitName = setcardlist[j];
            let unitLevel = null;

            try {
                if (!thisTriCardList[setBonusDmgInfo].includes(unitName)) thisTriCardList[setBonusDmgInfo].push(unitName);
            } catch { thisTriCardList[setBonusDmgInfo] = [unitName]; }

            try {
                unitLevel = hasCardDeck[unitName][0];
            } catch { break; }

            leveltotal += unitLevel;

            for (let k = 4; k > -1 + unitLevel; k--) {
                nextlevels.push([unitName, cardLevelUpExp[cardgrade[unitName]][k]])
            }
        }

        // console.log(setname, setcardlist.length)
        // 기존에 있던 도감에 카드가 추가된 도감
        if (
            (setname == "트리시온" && setcardlist.length >= 6)
        ) {
            // Pass
        }
        else if (j != setcardlist.length) continue;

        nextlevels.sort((a, b) => {
            return a[1] - b[1];
        })

        myStat[setStatInfo] += setStatPlus;

        // if(setBonusDmgInfo == "곤충") console.log(setname);
        for (let j = 0; j < Object.keys(setBonusDmgPlusList).length; j++) {
            if (Object.keys(setBonusDmgPlusList)[j] <= leveltotal) {
                // if(setBonusDmgInfo == "곤충") console.log(setBonusDmgPlusList[Object.keys(setBonusDmgPlusList)[j]])
                myBonusDamage[setBonusDmgInfo] += setBonusDmgPlusList[Object.keys(setBonusDmgPlusList)[j]];
            } else {
                nextbonusdamage = setBonusDmgPlusList[Object.keys(setBonusDmgPlusList)[j]];
                nextleveldiff = parseInt(Object.keys(setBonusDmgPlusList)[j]) - leveltotal;

                for (var k = 0; k < nextleveldiff; k++) {
                    try { nextLevelExp += nextlevels[k][1]; }
                    catch { };
                    nextUpSetLevel.push(nextlevels[k]);
                }
                break;
            }
        }

        try {
            recommendCard[set[3]].push({ [setname]: nextUpSetLevel });
            recommendExp[set[3]].push({ [setname]: [nextLevelExp, nextbonusdamage] });
        } catch {
            recommendCard[set[3]] = [{ [setname]: nextUpSetLevel }];
            recommendExp[set[3]] = [({ [setname]: [nextLevelExp, nextbonusdamage] })];
        }
    }

    for (let i = 0; i < Object.keys(myStat).length; i++) {
        document.querySelectorAll('#' + Object.keys(myStat)[i]).forEach(e => {
            e.textContent = myStat[Object.keys(myStat)[i]];
        });
    }
    for (let i = 0; i < Object.keys(myBonusDamage).length; i++) {
        document.querySelectorAll('#' + Object.keys(myBonusDamage)[i]).forEach(e => {
            e.textContent = myBonusDamage[Object.keys(myBonusDamage)[i]].toFixed(2) + "%";
        });
    }

    document.querySelector('#matchzone').style.display = "none";
    document.querySelector('#mycard').style.display = "";

    let saveCVal = "";
    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        saveCVal += `${Object.keys(cardgrade).indexOf(Object.keys(hasCardDeck)[i])}:[${Object.values(hasCardDeck)[i]}],`;
    }
    setCookie('savecarddeck', saveCVal, 365)
};

let tippyToggle = null;
function newTippy(ele, content, toggle, trigger, zindex) {
    if (toggle == null) toggle = true;
    if (trigger == null) trigger = 'mouseenter focus';
    if (zindex == null) zindex = 5555;

    let popup = tippy(ele, {
        allowHTML: true,
        content: content,
        theme: 'light',
        hideOnClick: toggle,
        trigger: trigger,
        zIndex: zindex
    });
    return popup
}
function bonusdamagelistup() {
    let target = document.querySelector('#bookstbody');
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    }

    try {
        targetLength = recommendExp[tri].length;
    } catch {
        return;
    }

    for (let i = 0; i < targetLength; i++) {
        let name = Object.keys(recommendExp[tri][i]);
        tr = document.createElement('tr');
        tdsetname = document.createElement('td');
        tdsetexp = document.createElement('td');
        tdsetdmg = document.createElement('td');

        let exp = recommendExp[tri][i][name][0];
        let bonusDamage = recommendExp[tri][i][name][1];
        let orderCardList = recommendCard[tri][i][name];
        if (exp == 0) continue;

        let myEffectStar = 0;
        for (let j = 0; j < cardeffect[name][0].length; j++) {
            try { myEffectStar += hasCardDeck[cardeffect[name][0][j]][0]; }
            catch { continue; }
        }

        let targetEffectStar = null;
        for (let j = Object.keys(cardeffect[name][4]).length - 1; j >= 0; j--) {
            if (parseInt(Object.keys(cardeffect[name][4])[j]) <= myEffectStar) {
                targetEffectStar = parseInt(Object.keys(cardeffect[name][4])[j + 1]);
                break;
            } else if (j == 0) {
                targetEffectStar = parseInt(Object.keys(cardeffect[name][4])[0]);
            }
        }

        let nextlevels = [];
        for (let j = 0; j < cardeffect[name][0].length; j++) {
            let cardname$ = cardeffect[name][0][j];

            let tempMyHasQty = null;
            try { tempMyHasQty = parseInt(hasCardDeck[cardname$][1]); }
            catch { continue; }


            let tempk = 0;
            for (let k = parseInt(hasCardDeck[cardname$][0]) + 1; k < 6; k++) {
                if (tempMyHasQty >= k) {
                    tempk += k;
                    tempMyHasQty -= k;
                    nextlevels.push([cardname$, cardLevelUpExp[cardgrade[cardname$]][k - 1]]);
                    if (k != 5) continue;
                }
                else break;
            }
        }

        nextlevels.sort(function (a, b) {
            return a[1] - b[1];
        })

        let star = null;
        let needcard = null;
        let simulNeedExp = 0;
        let simulTempDict = {};
        let tempdict = {};
        for (let j = 0; j < nextlevels.length; j++) {
            myEffectStar++;
            simulNeedExp += nextlevels[j][1];

            try {
                star = simulTempDict[nextlevels[j][0]][0] + 1;
            } catch {
                star = 1;
            }
            try {
                needcard = simulTempDict[nextlevels[j][0]][1] + (cardLevelUpExp[cardgrade[nextlevels[j][0]]].indexOf(nextlevels[j][1]) + 1);
            } catch {
                needcard = (cardLevelUpExp[cardgrade[nextlevels[j][0]]].indexOf(nextlevels[j][1])) + 1;
            }

            simulTempDict[nextlevels[j][0]] = [star, needcard];
            if (myEffectStar >= targetEffectStar) {
                tr.style.setProperty('--bs-table-color', 'orange');
                tr.style.setProperty('--hover-color-var', 'orange');
                tempdict = simulTempDict;
                exp = simulNeedExp;
                break;
            }
        }

        if (Object.keys(tempdict).length == 0) {
            for (let j = 0; j < orderCardList.length; j++) {
                try {
                    star = tempdict[orderCardList[j][0]][0] + 1;
                } catch {
                    star = 1;
                }
                try {
                    needcard = tempdict[orderCardList[j][0]][1] + (cardLevelUpExp[cardgrade[orderCardList[j][0]]].indexOf(orderCardList[j][1]) + 1);
                } catch {
                    needcard = (cardLevelUpExp[cardgrade[orderCardList[j][0]]].indexOf(orderCardList[j][1])) + 1;
                }

                tempdict[orderCardList[j][0]] = [star, needcard];
            }
        }

        let tooltipcontent = '<div class="text-center"><FONT SIZE="5pt">'
        let clickcontent = "";
        for (let j = 0; j < Object.keys(tempdict).length; j++) {
            tooltipcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]}각(${tempdict[Object.keys(tempdict)[j]][1]}장)<br>`;
            clickcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]}각, `
        }
        tooltipcontent += "</FONT></div>"

        tdsetname.textContent = name;
        tdsetexp.textContent = `${(exp).toLocaleString()}`;
        tdsetdmg.innerHTML = `${bonusDamage}%<br>[${(parseInt(exp / (bonusDamage / 0.01))).toLocaleString()}]`;

        tdsetexp.setAttribute('tooltipcontent', tooltipcontent);
        tdsetexp.setAttribute('clickcontent', clickcontent);
        tr.setAttribute('data', JSON.stringify(tempdict));

        tr.append(tdsetname);
        tr.append(tdsetexp);
        tr.append(tdsetdmg);
        tr.style.cursor = 'pointer';
        target.appendChild(tr);
    }

    //각성률, 도카팩 추천 start
    let myAllCardTotalExp = 0;
    let myThisTriTotalExp = 0;
    let thisTriTotalExp = 0;
    let recDocapack = {};
    Object.keys(docapack).forEach(capack => recDocapack[capack] = 0);

    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        let myCardName = Object.keys(hasCardDeck)[i];
        let myCardStar = hasCardDeck[myCardName][0];
        myAllCardTotalExp += cardNeedExp[cardgrade[myCardName]][myCardStar];
    }
    for (let i = 0; i < thisTriCardList[tri].length; i++) {
        let myCardName = thisTriCardList[tri][i];
        let myCardStar, myCardQty = null;

        thisTriTotalExp += cardNeedExp[cardgrade[myCardName]][5];
        try {
            myCardStar = hasCardDeck[myCardName][0];
            myCardQty = hasCardDeck[myCardName][1];
        } catch {
            myCardStar = 0;
            myCardQty = 0;
        }
        myThisTriTotalExp += cardNeedExp[cardgrade[myCardName]][myCardStar];

        for (let j = 0; j < Object.keys(docapack).length; j++) {
            let capackName = Object.keys(docapack)[j];
            if (docapack[capackName].includes(myCardName)) {
                let tempvalue = null;
                if (myCardStar == 0) tempvalue = 0;
                else if (myCardStar == 1) tempvalue = 1;
                else if (myCardStar == 2) tempvalue = 3;
                else if (myCardStar == 3) tempvalue = 6;
                else if (myCardStar == 4) tempvalue = 10;
                else if (myCardStar == 5) break;

                recDocapack[capackName] = recDocapack[capackName] + (15 - (tempvalue + myCardQty))
            }
        }

    }
    let sortRecDocapack = Object.entries(recDocapack).sort(function ([, a], [, b]) {
        return b - a;
    })

    target = document.querySelector('#recCardTbody');
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    }
    for (let i = 0; i < sortRecDocapack.length; i++) {
        let temptr = document.createElement('tr');
        let tmeptdname = document.createElement('td');
        let tmeptdqty = document.createElement('td');

        tmeptdname.textContent = `${i + 1}. ${sortRecDocapack[i][0]}`;
        tmeptdqty.textContent = `${sortRecDocapack[i][1]}장`;

        temptr.appendChild(tmeptdname);
        temptr.appendChild(tmeptdqty);

        target.appendChild(temptr);
    }

    document.querySelector('#all-exp-progress-bar').textContent = `${(myAllCardTotalExp).toLocaleString()} / ${(allCardTotalExp).toLocaleString()} [${((myAllCardTotalExp / allCardTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#all-exp-progress-bar').previousElementSibling.style.width = `${(myAllCardTotalExp / allCardTotalExp) * 100}%`;
    document.querySelector('#this-exp-progress-bar').textContent = `${(myThisTriTotalExp).toLocaleString()} / ${(thisTriTotalExp).toLocaleString()} [${((myThisTriTotalExp / thisTriTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#this-exp-progress-bar').previousElementSibling.style.width = `${(myThisTriTotalExp / thisTriTotalExp) * 100}%`;
    document.querySelector('#this-progress').textContent = `${tri.substring(0, 1)}추피 각성률`
    //각성률, 도카팩 추천 end

    let regex = /[^0-9]/g;
    let tagarr = Array.from(document.querySelectorAll("#bookstbody tr"));
    document.querySelector("#bookstbody").innerHTML = "";
    tagarr.sort(function (a, b) {
        let val1 = parseInt(a.querySelectorAll('td')[1].textContent.replace(regex, ""));
        let val2 = parseInt(b.querySelectorAll('td')[1].textContent.replace(regex, ""));
        return (val2 > val1) ? -1 : (val2 < val1) ? 1 : 0;
    });

    for (let i = 0; i < tagarr.length; i++) {
        document.querySelector("#bookstbody").append(tagarr[i])
    }

    document.querySelectorAll('#bookstbody > tr > td:nth-child(2)').forEach((e) => {
        newTippy(e, `${e.getAttribute('tooltipcontent')}<div class="text-center"><FONT SIZE='2pt'>[오른쪽 클릭시 고정, 복사]</FONT></div>`, null, null, null)
        e.addEventListener('contextmenu', (event) => {
            if (tippyToggle) {
                tippyToggle.destroy();
                tippyToggle = null;
            } else {
                tippyToggle = newTippy(e, `${e.getAttribute('tooltipcontent')}<div class="text-center"><FONT SIZE='2pt'>[오른쪽 클릭시 고정 해제]</FONT></div>`, 'toggle', 'click', 9999);
                tippyToggle.show()
            }
            event.preventDefault();
            navigator.clipboard.writeText(e.getAttribute('clickcontent'));
        });
    });

    document.querySelectorAll('#bookstbody > tr').forEach(function (e) {
        e.addEventListener('click', async function () {
            data = this.getAttribute('data');
            parsedata = JSON.parse(data);
            for (let i = 0; i < Object.keys(parsedata).length; i++) {
                let upCardName = Object.keys(parsedata)[i];
                let addStar = parseInt(Object.values(parsedata)[i][0]);
                let subQty = parseInt(Object.values(parsedata)[i][1]);

                hasCardDeck[upCardName] = [parseInt(hasCardDeck[upCardName][0]) + addStar, parseInt(hasCardDeck[upCardName][1]) - subQty];
            }

            if (tippyToggle) {
                tippyToggle.destroy();
                tippyToggle = null;
            }

            historyADD(parsedata);

            await cardsetcalcstart();

            bonusdamagelistup();
        });
    })
}
