function calc(price){
    document.querySelectorAll('.card').forEach(function(e){
        exgold = parseInt((e.querySelector('#itemamount').innerText / (100 * 0.95)) * price);
        totalgold = (e.querySelector('#itemprice').innerText*((e.querySelector('#itempackcount').value*e.querySelector('#itemqty').value)/e.querySelector('#itemtradecount').innerText));
        profit = totalgold-exgold;
        profitper = ((profit/totalgold)*100).toFixed(1);

        if(profit >= 0){
            profitcolor = "00ff00";
        }else if(profit < 0){
            profitcolor = "ff6b6b";
        }

        e.querySelector('#exgold').innerText = exgold.toLocaleString();
        e.querySelector('#totalgold').innerText = totalgold.toLocaleString();
        e.querySelector('#profit').innerText = profit.toLocaleString();
        e.querySelector('#profitper').innerText = "(" + profitper + "%)";
    });
}

function findLastChild(parentNode) {
    lastNode = parentNode.lastChild;
    while (lastNode.nodeType != 1) {
        lastNode = lastNode.previousSibling;
    }
    return lastNode;
}
function findFirstChild(parentNode) {
    firstNode = parentNode.firstChild;
    while (firstNode.nodeType != 1) {
        firstNode = firstNode.nextSibling;
    }
    return firstNode;
}

function crtystalpriceeditevent(e){
    if(e.value == ""){
        return;
    }
    price = parseInt(e.value);
    calc(price);
}

document.querySelector('#crystalprice').addEventListener('change', function(){
    crtystalpriceeditevent(this);
});
document.querySelector('#crystalprice').addEventListener('keyup', function(){
    crtystalpriceeditevent(this);
});

fetch(url + '/mari', {method: 'POST'}).then((response) => response.json()).then((response) =>{
    json = response;
    var newtime = [];
    var prevtime = [];
    var lasttime = [];

    var marketdata = json[json.length - 1];
    json.pop()

    var temparr = [];
    for (var i = 0; i < json.length; i++) {
        temparr.push(json[i]);
        if(temparr.length == 6){
            if(newtime.length == 0){
                newtime = temparr;
            }else if(prevtime.length == 0){
                prevtime = temparr;
            }else{
                lasttime = temparr;
            }
            temparr = [];
        }
    }

    var parenttable = document.querySelector('.maritable');
    if(lasttime.length != 0){
        findFirstChild(findFirstChild(parenttable)).innerHTML += '<th id="lasttime" width="33.33%"></th>';
        findFirstChild(findLastChild(parenttable)).innerHTML += '<td id="lasttimelist"></td>';
    }
    if(prevtime.length != 0){
        console.log()
        findFirstChild(findFirstChild(parenttable)).innerHTML += '<th id="prevtime" width="33.33%"></th>';
        findFirstChild(findLastChild(parenttable)).innerHTML += '<td id="prevtimelist"></td>';
    }
    if(newtime.length != 0){
        findFirstChild(findFirstChild(parenttable)).innerHTML += '<th id="newtime" width="33.33%"></th>';
        findFirstChild(findLastChild(parenttable)).innerHTML += '<td id="newtimelist"></td>';
    }

    var untilwhen = "";
    var untilwhenday = "";
    var untilwhenhour = "";
    try{
        untilwhen = String(newtime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#newtime").innerText = untilwhenday + "일 " + untilwhenhour + "시까지 판매";
        untilwhen = String(prevtime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#prevtime").innerText = untilwhenday + "일 " + untilwhenhour + "시까지 판매";
        untilwhen = String(lasttime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#lasttime").innerText = untilwhenday + "일 " + untilwhenhour + "시까지 판매";
    }catch{
    }
    
    var content;
    var item;
    var itemimage;
    var itemgrade;
    var itemtitle;
    var itemoriginaltitle;
    var itemtradecount;
    var itempackcount;
    var itemamount;
    var itemqty;
    var exgold;
    var totalgold;
    var profit;
    var profitcolor;
    function cardContent(item){
        itemimage = item['image'];
        itemgrade = item['grade'];
        itemtitle = item['name'];
        itemtradecount = item['tradecount'];
        itempackcount = item['packcount'];
        itemamount = item['amount'];
        itemqty = item['qty'];
        
        itemoriginaltitle = item['name'].replace(" 주머니 (귀속)","").replace(" (귀속)","");
        itemoriginaltitle = itemoriginaltitle.slice(0, itemoriginaltitle.lastIndexOf(' ['));
        
        exgold = parseInt((itemamount / (100 * 0.95)) * parseInt(document.querySelector('#crystalprice').value));
        totalgold = (marketdata[itemoriginaltitle]*((itempackcount*itemqty)/itemtradecount));
        profit = totalgold-exgold;
        profitper = ((profit/totalgold)*100).toFixed(1);

        if(profit >= 0){
            profitcolor = "00ff00";
        }else if(profit < 0){
            profitcolor = "ff6b6b";
        }

        content = `
            <div class="card bg-secondary mb-3">
                <div class="row g-0">
                    <div class="col-md-3 my-auto">
                        <img src="https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/${itemimage}.png" data-grade="${itemgrade}" class="img-fluid rounded-start item-image" alt="이미지">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header ps-2 pe-0 py-1 item-name fs-5 text-start fw-bold">${itemtitle}</div>
                            <div class="card-body px-1 py-1 text-white">
                                <input id="itemqty" value="${itemqty}" hidden>
                                <input id="itempackcount" value="${itempackcount}" hidden>
                                <div class="container">
                                    <div class="row row-cols-2 g-0">
                                        <div class="col-md-5 px-0 text-nowrap text-start">
                                            <p class="my-0">크리스탈(골드) : </p>
                                        </div>
                                        <div class="col-md-7 px-0 text-end fw-bold">
                                            <p class="my-0">
                                                <span id="itemamount">${itemamount}<img src="img/crystal.png" class="ms-1 img-crystal"></span>
                                                <span>(</span><span id="exgold">${exgold.toLocaleString()}</span><span><img src="img/gold.png" class="ms-1 img-gold">)</span>
                                                
                                            </p>
                                        </div>

                                        <div class="col-md-5 px-0 text-nowrap text-start">
                                            <p class="my-0">시세[<span id="itemtradecount">${itemtradecount}</span>개 단위] : </p>
                                        </div>
                                        <div class="col-md-7 px-0 text-end fw-bold">
                                            <p class="my-0" id="itemprice">${marketdata[itemoriginaltitle].toLocaleString()}<img src="img/gold.png" class="ms-1 img-gold"></p>
                                        </div>

                                        <div class="col-md-5 px-0 text-nowrap text-start">
                                            <p class="my-0">합계 : </p>
                                        </div>
                                        <div class="col-md-7 px-0 text-end fw-bold">
                                            <span class="my-0" id="totalgold">${totalgold.toLocaleString()}</span><span><img src="img/gold.png" class="ms-1 img-gold"></span>
                                        </div>

                                        <div class="col-md-5 px-0 text-nowrap text-start">
                                            <p class="my-0">이익(%) : </p>
                                        </div>
                                        <div class="col-md-7 px-0 text-end fw-bold">
                                            <p class="my-0" style="color:#${profitcolor};">
                                                <span id="profit">${profit.toLocaleString()}</span><img src="img/gold.png" class="ms-1 img-gold">
                                                <span id="profitper">(${profitper}%)</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        return content;
    }
    
    try{
        for (var i = 0; i < newtime.length; i++) {
            item = newtime[i];
            itemlist = document.querySelector('#newtimelist');
            itemlist.innerHTML += cardContent(item);
        }
        for (var i = 0; i < prevtime.length; i++) {
            item = prevtime[i];
            itemlist = document.querySelector('#prevtimelist');
            itemlist.innerHTML += cardContent(item);
        }
        for (var i = 0; i < lasttime.length; i++) {
            item = lasttime[i];
            itemlist = document.querySelector('#lasttimelist');
            itemlist.innerHTML += cardContent(item);
        }
    } catch (e){
        console.log(e)
    }

});