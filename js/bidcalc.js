
var personcount = 8;
var price = 0;

function othercountevent(e){
    personcount = parseInt(e.value);
    if(e.value == "" || e.value < 0){
        return;
    }
    if(personcount < 2){
        return; 
    }
    document.querySelectorAll('.personcount').forEach(function(f){
        f.classList.remove('active');
    });
    if(document.querySelector('#price').value == ""){
        return;
    }
    calc();
}

function priceeditevent(e){
    if(e.value == ""){
        return;
    }
    price = parseInt(e.value);
    calc();
}

function calc(){
    price = document.querySelector('#price').value;
    var tax = Math.ceil(price * 0.05);
    document.querySelector('#tax').innerText = "- " + tax;
    document.querySelector('#tax').setAttribute('tooltipcontent', String(price) + " x 0.05<br>(소수점 올림)");

    var distribution = Math.floor(price / (personcount-1));
    document.querySelector('#distribution').innerText = "- " + distribution;
    document.querySelector('#distribution').setAttribute('tooltipcontent', `${price} / ${personcount-1}[인]<br>(소수점 버림)`);

    var breakpoint = Math.floor((price-tax)*((personcount-1)/personcount));
    document.querySelector('#breakpoint').innerText = breakpoint;
    document.querySelector('#breakpoint').setAttribute('tooltipcontent', `${price} - ${tax} = <FONT color='orange'>${price-tax}</FONT><br>${personcount-1}[인] / ${personcount}[인] = <FONT color='green'>${(personcount-1)/personcount}</FONT><br><FONT color='orange'>${price-tax}</FONT> x <FONT color='green'>${(personcount-1)/personcount}</FONT> = ${breakpoint}<br>(소수점 버림)`);
    document.querySelector('#breakpoint').style.cursor = "pointer";

    var fairprice = Math.floor(breakpoint*100/(110));
    document.querySelector('#fairprice').innerText = fairprice;
    document.querySelector('#fairprice').setAttribute('tooltipcontent', String(breakpoint) + " ÷ 1.1");
    document.querySelector('#fairprice').style.cursor = "pointer";

    var giveme = Math.floor(fairprice*100/(110));
    document.querySelector('#giveme').innerText = giveme;
    document.querySelector('#giveme').setAttribute('tooltipcontent', String(fairprice) + " ÷ 1.1");
    document.querySelector('#giveme').style.cursor = "pointer";
}

document.addEventListener("DOMContentLoaded", function(){
    // target elements with the "draggable" class
    interact('#top')
        .draggable({
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],

        listeners: {
                // call this function on every dragmove event
                move: dragMoveListener
            }
        })

    function dragMoveListener (event) {
        let target = event.target.offsetParent;
        
        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        localStorage.setItem("screenKeypadPosition", `${x},${y}`);

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener

    document.querySelectorAll('.clickcount').forEach(function(e){
        e.addEventListener("click", function(){
            sumA = this.querySelector('#countvalue').innerText;
            sumB = document.querySelector('#price').value;
            if(sumB == ""){sumB = 0};

            document.querySelector('#price').value = parseInt(sumA) + parseInt(sumB);
            calc();
        });
    });
    
    let onScreenKeypad = localStorage.getItem("onScreenKeypad");
    if (onScreenKeypad != undefined && onScreenKeypad == "true"){
        document.querySelector("#screenKeypadBtn").textContent = "화상 키패드 창 위치 리셋";
        document.querySelector("#screenKeypadBtn").classList.add("active");
        document.querySelector("#keypad").style.display = "";

        let keypadPosition = localStorage.getItem("screenKeypadPosition") ? localStorage.getItem("screenKeypadPosition").split(",") : [0, 0];
        document.querySelector("#keypad").style.transform = 'translate(' + keypadPosition[0] + 'px, ' + keypadPosition[1] + 'px)';
        document.querySelector("#keypad").setAttribute('data-x', keypadPosition[0]);
        document.querySelector("#keypad").setAttribute('data-y', keypadPosition[1]);
    }

    document.querySelector("#screenKeypadBtn").addEventListener("click", (e)=>{
        if(e.target.classList.contains("active")){
            document.querySelector("#keypad").style.transform = 'translate(0px, 0px)';
            document.querySelector("#keypad").setAttribute('data-x', 0);
            document.querySelector("#keypad").setAttribute('data-y', 0);
        }else{
            document.querySelector("#screenKeypadBtn").textContent = "화상 키패드 창 위치 리셋";
            document.querySelector("#screenKeypadBtn").classList.add("active");
            document.querySelector("#keypad").style.display = "";
            localStorage.setItem("onScreenKeypad", "true");
        }
    })

    document.querySelector("#keypadCloseBtn").addEventListener("click", ()=>{
        document.querySelector("#screenKeypadBtn").textContent = "화상 키패드";
        document.querySelector("#screenKeypadBtn").classList.remove("active");
        localStorage.setItem("onScreenKeypad", "false");
        document.querySelector("#keypad").style.display = "none";
    })

    var input_value = document.querySelector("#price");
    document.querySelectorAll(".calc").forEach(function(e){
        e.addEventListener('click', function(){
            var value = this.value;
            field(value);
        });
    });
    function field(value) {
        if(input_value.value == 0){
        input_value.value = "";
        }
        input_value.value = input_value.value + value;
        calc();
    }
    document.querySelector("#clear").addEventListener('click', function(){
        input_value.value = "";
        calc();
    });
    document.querySelector("#backspace").addEventListener('click', function(){
        input_value.value = input_value.value.slice(0, -1);
        if(input_value.value == ""){
            input_value.value = "";
        }
        calc();
    });

    document.querySelector('#priceclear').addEventListener('click',function(){
        document.querySelector('#price').value = "";
        calc();
    });

    document.querySelector('#breakpoint').addEventListener("click", clickToCopy);
    document.querySelector('#fairprice').addEventListener("click", clickToCopy);
    document.querySelector('#giveme').addEventListener("click", clickToCopy);

    document.querySelectorAll('.personcount').forEach(function(e){
        e.addEventListener('click', function(){
            document.querySelector('#othercount').value = "";
            this.parentNode.parentNode.querySelectorAll('.personcount').forEach(function(f){
                f.classList.remove('active');
            })
            this.classList.add('active');
            personcount = parseInt(this.getAttribute('forI'));
            if(document.querySelector('#price').value == ""){
                return;
            }
            calc();
        });
    });

    document.querySelector('#othercount').addEventListener('keyup', function(){
        othercountevent(this);
    });
    document.querySelector('#othercount').addEventListener('change', function(){
        othercountevent(this);
    });

    document.querySelector('#price').addEventListener('keyup', function(){
        priceeditevent(this);
    });
    document.querySelector('#price').addEventListener('change', function(){
        priceeditevent(this);
    });
        
    tippy('table td:nth-child(2)', {
        allowHTML: true, 
        onShow(instance) {
            instance.setContent(instance.reference.getAttribute('tooltipcontent'));
        },
        theme: 'light', 
        placement: 'right',
    });
    tippy("#top", {
        allowHTML: true, 
        triggerTarget: document.querySelector("#screenKeypadBtn"),
        content: "여기를 누르면서 움직이면<br>원하는 위치로 창을 옮길 수 있습니다.",
        trigger: "click",
        theme: "light", 
        placement: "top",
        onShow(instance) {
          setTimeout(() => {
            instance.hide();
          }, 10000);
        }
    });
});