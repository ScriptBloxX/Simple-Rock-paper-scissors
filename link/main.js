loadscreen(true, 'Loading');

var select = {}
function check(){
    if(select.p1==="paper"&&select.p2==="rock" || select.p1==="rock"&&select.p2==="scissors" || select.p1==="scissors"&&select.p2==="paper"){
        return true;
    }else if(select.p1===select.p2){
        return null;
    }
    else{
        return false;
    }
}

var start_btn = document.querySelector('.start-btn');
start_btn.addEventListener('click', () => {
    setTimeout(() => {
        loadscreen(true, 'Matching');
    }, 0 * 1000)
    setTimeout(() => {
        loadscreen(true, 'Found Bot!');
    }, 2 * 1000)
    setTimeout(() => {
        loadscreen(true, 'Starting Game!!');
    }, 3 * 1000)
    setTimeout(() => {
        loadscreen(false, 'N/A');
    },4*1000)
    setTimeout(() => {
        start_btn.style.visibility = "hidden";
        document.querySelector('.loading-bar').style.visibility = "visible";
        document.querySelector('.bar').classList.add('bar-animate');
        setTimeout(() => {
            document.querySelectorAll('.item').forEach(item => {
                item.style.visibility = "hidden";
                item.style.opacity = "0";
                document.querySelector('.loading-bar').style.visibility = "hidden";
                document.querySelector('.bar').classList.remove('bar-animate');
                randomItem();
            })
            if(!select.p1){
                var items = ["paper", "rock", "scissors"]
                var randomNum = Math.floor(Math.random() * items.length);
                document.querySelector('#p1').src = `/client/image/${items[randomNum]}.png`
            }
            if(check()===true){
                document.querySelector('#p1').classList.add('win');
                document.querySelector('#p2').classList.add('lost');
                loadscreen(true,"You are .. Winner!");
            }else if(check()===false){
                document.querySelector('#p1').classList.add('lost');
                document.querySelector('#p2').classList.add('win');
                loadscreen(true,"You are .. Loser!");
            }else{
                document.querySelector('#p1').classList.add('draw');
                document.querySelector('#p2').classList.add('draw');  
                loadscreen(true,"Draw!");
            }
            setTimeout(() => {
                document.querySelectorAll('.item').forEach(item => {
                    item.style.visibility = "visible";
                    item.style.opacity = "1";
                })

                start_btn.style.visibility = "visible";
                loadscreen(false,"N/A");
                Reset();
            }, 3*1000);
        }, 4 * 1000);
    }, 4*1000);  
})

function Reset(){
    select = {};
    document.querySelector('#p1').classList.remove('win','lost','draw');
    document.querySelector('#p2').classList.remove('win','lost','draw');
    document.querySelector('#p1').src = "";
    document.querySelector('#p2').src = "https://c.tenor.com/lcuvD0zkFNMAAAAd/question-mark.gif";
}

function randomItem(){
    var items = ["paper","rock","scissors"]
    var randomNum = Math.floor(Math.random()*items.length);
    var selected = items[randomNum];
    document.querySelector('#p2').src = `/client/image/${selected}.png`
    select.p2 = selected;
}

function itemChange(player, id) {
    select.p1 = id
    var image = document.querySelector(`#${player}`);
    image.src = `/client/image/${id}.png`
    image.classList.add('resize');
    setTimeout(() => {
        image.classList.remove('resize');
    }, 100);

}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', e => {
        itemChange('p1', e.target.id)
    })
})

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        loadscreen(false);
    }
};

function loadscreen(value, msg) {
    var ls = document.querySelector('.loading-screen');
    var lm = document.querySelector('#loading-message');
    if (value === true) {
        ls.style.zindex = "1";
        ls.style.visibility = "visible";
        lm.textContent = msg;
    } else {
        ls.style.zindex = "0";
        ls.style.visibility = "hidden";
        lm.textContent = "N/A";
    }
}
