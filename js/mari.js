document.querySelector("#crystalprice").addEventListener('mouseover', ()=>{
    document.querySelector("#crystalprice").focus()
})
document.querySelector('#crystalprice').addEventListener('input', ()=>{
    calc()
});

function calc(price){
    price = parseInt(document.querySelector("#crystalprice").value);
    if(price == 0){
        return;
    }
    document.querySelectorAll('.card').forEach(function(e){
        exgold = parseInt((e.querySelector('#itemamount').innerText / (100 * 0.95)) * price);
        totalgold = (e.querySelector('#itemprice').innerText*((e.querySelector('#itempackcount').value*e.querySelector('#itemqty').value)/e.querySelector('#itemtradecount').innerText));
        profit = totalgold-exgold;
        profitper = ((profit/totalgold)*100).toFixed(1);

        if(profit >= 0){
            profitcolor = "#00ff00";
        }else if(profit < 0){
            profitcolor = "#9f1111";
        }

        e.querySelector('#exgold').innerText = exgold.toLocaleString();
        e.querySelector('#totalgold').innerText = totalgold.toLocaleString();
        e.querySelector('#profit').innerText = profit.toLocaleString();
        e.querySelector('#profitper').innerText = "(" + profitper + "%)";
        
        e.querySelector('#profit').style.color = profitcolor;
        e.querySelector('#profitper').style.color = profitcolor;
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

    var parenttable = document.querySelector('#mari_carousel');
    if(lasttime.length != 0){
        parenttable.innerHTML += `<div class="carousel-item" data-bs-interval="1000000">
                                    <div class="card">
                                        <div class="card-body px-0">
                                            <div class="card-title fs-3" id="lasttime"></div>
                                                <div class="card-text" id="lasttimelist"></div>`;
    }
    if(prevtime.length != 0){
        parenttable.innerHTML += `<div class="carousel-item" data-bs-interval="1000000">
                                    <div class="card">
                                        <div class="card-body px-0">
                                            <div class="card-title fs-3" id="prevtime"></div>
                                                <div class="card-text" id="prevtimelist"></div>`;
    }
    if(newtime.length != 0){
        parenttable.innerHTML += `<div class="carousel-item active"  data-bs-interval="1000000">
                                    <div class="card">
                                        <div class="card-body px-0">
                                            <div class="card-title fs-3" id="newtime"></div>
                                                <div class="card-text" id="newtimelist"></div>`;
    }

    var untilwhen = "";
    var untilwhenday = "";
    var untilwhenhour = "";
    try{
        untilwhen = String(newtime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#newtime").innerText = untilwhenday + "일 " + untilwhenhour + "시 까지 (첫차)";
        untilwhen = String(prevtime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#prevtime").innerText = untilwhenday + "일 " + untilwhenhour + "시 까지";
        untilwhen = String(lasttime[0]['untilwhen']);
        untilwhenday = untilwhen.slice(0,2);
        untilwhenhour = untilwhen.slice(-2);
        document.querySelector("#lasttime").innerText = untilwhenday + "일 " + untilwhenhour + "시 까지 (막차)";
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
            profitcolor = "9f1111";
        }

        content = `
            <div class="card bg-secondary mx-0 mb-3">
                <div class="row g-0">
                    <div class="col-md-3 my-auto">
                        <img src="https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/${itemimage}.png" data-grade="${itemgrade}" class="img-fluid rounded item-image" alt="이미지">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header ps-2 pe-0 py-1 item-name fs-5 text-start fw-bold text-white">${itemtitle}</div>
                            <div class="card-body px-1 py-1 text-white">
                                <input id="itemqty" value="${itemqty}" hidden>
                                <input id="itempackcount" value="${itempackcount}" hidden>
                                <div>
                                    <div class="row g-0">
                                        <div class="col-auto me-auto px-0 text-nowrap text-start my-auto">
                                            <span class="my-auto">크리스탈(골드) :</span>
                                        </div>
                                        <div class="col-auto px-0 text-end fw-bold my-auto">
                                            <span class="my-auto align-middle" id="itemamount">${itemamount}</span>
                                            <div  class="my-0 align-middle" style="background-image:url('https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_deal.png'); width:19px; height:21px; background-position: 0px -142px; display: inline-block;"></div>
                                            <span class="my-auto align-middle">(</span><span class="my-auto align-middle" id="exgold">${exgold.toLocaleString()}</span>
                                            <div  class="my-0 align-middle" style="background-image:url('https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_deal.png'); width:18px; height:19px; background-position: -20px -141px; display: inline-block;"></div><span class="my-auto align-middle">)</span>
                                        </div>
                                    </div>
                                    <div class="row g-0">
                                        <div class="col-auto me-auto px-0 text-nowrap text-start my-auto">
                                            <span class="my-auto">시세[<span id="itemtradecount">${itemtradecount}</span>개 단위] :</span>
                                        </div>
                                        <div class="col-auto px-0 text-end fw-bold my-auto">
                                            <span class="my-auto align-middle" id="itemprice">${marketdata[itemoriginaltitle].toLocaleString()}</span>
                                            <div  class="my-0 align-middle" style="background-image:url('https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_deal.png'); width:18px; height:19px; background-position: -20px -141px; display: inline-block;"></div>
                                        </div>
                                    </div>
                                    <div class="row g-0">
                                        <div class="col-auto me-auto px-0 text-nowrap text-start my-auto">
                                            <span class="my-auto">합계 :</span>
                                        </div>
                                        <div class="col-auto px-0 text-end fw-bold my-auto">
                                            <span class="my-auto align-middle" id="totalgold">${totalgold.toLocaleString()}</span>
                                            <div  class="my-0 align-middle" style="background-image:url('https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_deal.png'); width:18px; height:19px; background-position: -20px -141px; display: inline-block;"></div>
                                        </div>
                                    </div>
                                    <div class="row g-0">
                                        <div class="col-auto me-auto px-0 text-nowrap text-start my-auto">
                                            <span class="my-auto">이익(%) :</span>
                                        </div>
                                        <div class="col-auto px-0 text-end fw-bold my-auto" style="color:#${profitcolor};">
                                            <span class="my-auto align-middle" id="profit">${profit.toLocaleString()}</span>
                                            <div  class="my-0 align-middle" style="background-image:url('https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_deal.png'); width:18px; height:19px; background-position: -20px -141px; display: inline-block;"></div>
                                            <span class="my-auto align-middle" id="profitper">(${profitper}%)</span>
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

let multipleCardCarousel = document.querySelector("#carouselExampleControls");
if (window.matchMedia("(min-width: 854px)").matches) {
    let carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });
    let carouselWidth = document.querySelector(".carousel-inner").scrollWidth;
    let cardWidth = document.querySelector(".carousel-item").clientWidth;
    let scrollPosition = 0;
    document.querySelector("#carouselExampleControls .carousel-control-next").addEventListener("click", () => {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition += cardWidth;
            document.querySelector("#carouselExampleControls .carousel-inner").animate(
                { scrollLeft: scrollPosition },
                600
            );
        }
    });
    document.querySelector("#carouselExampleControls .carousel-control-prev").addEventListener("click", () => {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            document.querySelector("#carouselExampleControls .carousel-inner").animate(
                { scrollLeft: scrollPosition },
                600
            );
        }
    });
} else {
    multipleCardCarousel.classList.add("slide");
}
