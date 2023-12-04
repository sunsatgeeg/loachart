let nocommu = ['bidcalc','cardcalc','cardcalc_old','cardcalc_steam','/','simulation','simulation_jewel','simulation_card_legendary_dark','simulation_card_legendary',
'simulation_card_LegendaryToEpic','simulation_card_LegendaryToRare','simulation_card_LegendaryToUncommon','simulation_card_all','simulation_stone'
]

function delCookie(cname){
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function clickToCopy(){
    try{value = this.value;}catch{};

    if(value == undefined){
        try{value = this.innerText;}catch{};
    }

    navigator.clipboard.writeText(value);

    Toastify({
        text: "복사!",
        position: "center",
        gravity: "bottom",
        duration: 1000,
        close: false
    }).showToast();
}

let servererror = false;
if(servererror){
    document.querySelector('body').removeChild(document.querySelector('body').firstChild)
    document.querySelector('main').innerHTML = `
    <hr>
    <div class="clearfix">
        <h1>현재 집에서 돌리고 있는 db 서버가 연결되지 않네요;;<br> 원인이 인터넷 연결이 끊어져있는데 갑자기?;;<br>출근길에 돌아가고 있는 것도 확인됐었는데<br> 19시 즈음에 퇴근하고 집에 도착해서<br> 인터넷 끊긴 원인 찾고 복구하겠습니다...</h1>
    </div>
    <hr>
    `;
}

let allNotice = false;
if(allNotice){
    (async () => {
        let scriptElement = document.createElement('script');
        scriptElement.src = `https://cdn.jsdelivr.net/npm/toastify-js`;
        document.head.appendChild(scriptElement);
        await new Promise(r => {
            scriptElement.onload = r
        })

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.href = `https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css`;
        document.head.appendChild(linkElement);
        await new Promise(r => {
            linkElement.onload = r
        })
    
        Toastify({
            text: `2월 2일 목요일 14시 25분이후 거래소 집계 정상화`,
            position: "center",
            gravity: "bottom",
            duration: 3000,
            close: true
        }).showToast();
    })();
}

try{
    if(nocommu.indexOf(here) != -1){
        bodydata = new FormData();
        bodydata.append(here,"")
        fetch(url + '/visitor', {
            method: 'POST',
            body: bodydata
        });
    }
}catch{
    
}

// 베나투스 스크립트
if(document.querySelector("#ad-container-1")) {
    window.top.__vm_add = window.top.__vm_add || [];
    (function (success) {
        if (window.document.readyState !== "loading") {
            success();
        } else {
            window.document.addEventListener("DOMContentLoaded", function () {
                success();
            });
        }
    })(function () {
        var placement = document.createElement("div");
        placement.setAttribute("class", "vm-placement");
        if (window.innerWidth > 1000) {
            placement.setAttribute("data-id", "654f12299f8443109e9358e1");
            placement.setAttribute("data-display-type", "hybrid-banner");
        } else {
            placement.setAttribute("data-id", "654f12472188b029d79c682b");
        }
        document.querySelector("#ad-container-1").appendChild(placement);
        window.top.__vm_add.push(placement);
    });
}

if(document.querySelector("#rich-media-placement")) {
    if(document.querySelector("#rich-media-placement").getAttribute("data-instream") === "true") {
        // 인스트림 비디오 있는 페이지
        window.top.__vm_add = window.top.__vm_add || [];
        (function (success) {
            if (window.document.readyState !== "loading") {
                success();
            } else {
                window.document.addEventListener("DOMContentLoaded", function () {
                    success();
                });
            }
        })(function () {
            var placement = document.createElement("div");
            placement.setAttribute("class", "vm-placement");
            placement.setAttribute("data-id", "654f129a9f8443109e9358e7");
            document.querySelector("#rich-media-placement").appendChild(placement);
            window.top.__vm_add.push(placement);
        });
    } else {
        // 인스트림 비디오 없는 페이지
        window.top.__vm_add = window.top.__vm_add || [];
        (function (success) {
            if (window.document.readyState !== "loading") {
                success();
            } else {
                window.document.addEventListener("DOMContentLoaded", function () {
                    success();
                });
            }
        })(function () {
            var placement = document.createElement("div");
            placement.setAttribute("class", "vm-placement");
            placement.setAttribute("data-id", "654f128d9f8443109e9358e5");
            document.querySelector("#rich-media-placement").appendChild(placement);
            window.top.__vm_add.push(placement);
        });
    }
}

if(document.querySelector("#ad-container-2")) {
    window.top.__vm_add = window.top.__vm_add || [];
    (function (success) {
        if (window.document.readyState !== "loading") {
            success();
        } else {
            window.document.addEventListener("DOMContentLoaded", function () {
                success();
            });
        }
    })(function () {
        var placement = document.createElement("div");
        placement.setAttribute("class", "vm-placement");
        if (window.innerWidth > 1000) {
            placement.setAttribute("data-id", "654f12299f8443109e9358e1");
        } else {
            placement.setAttribute("data-id", "654f12609f8443109e9358e3");
        }
        document.querySelector("#ad-container-2").appendChild(placement);
        window.top.__vm_add.push(placement);
    });
}