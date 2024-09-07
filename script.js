let changable = document.getElementById('changable');
let fruitsArr = ['🍒', '🍇', '🍉', '🍌', '🥭', '🍍'];
let boxes = document.getElementsByClassName('sub_div');
let timer = document.getElementById('timer');
let ranNumArr1 = [];
let ranNumArr2 = [];

while (ranNumArr1.length != 6) {
    let rn = Math.floor(Math.random() * 6);
    if (!ranNumArr1.includes(rn)) {
        ranNumArr1.push(rn);
    }
}

while (ranNumArr2.length != 6) {
    let rn = Math.floor(Math.random() * 6);
    if (!ranNumArr2.includes(rn)) {
        ranNumArr2.push(rn);
    }
}

let moves = 0;
let boardFruitsArrNumber = ranNumArr1.concat(ranNumArr2);
let boardFruitsArr = [];
let elemsArr;
boardFruitsArrNumber.forEach((element) => {
    boardFruitsArr.push(fruitsArr[element]);
});
console.log(boardFruitsArr);
let i = 0;

Array.from(boxes).forEach((element, index) => {
    element.innerText = boardFruitsArr[index];
    element.style.fontSize = "40px";
});

setTimeout(() => {
    Array.from(boxes).forEach((element) => {
        element.innerText = "";
    });
}, 6000);

let wait = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, 1000);
    });
};

async function printingNum() {
    for (let i = 5; i >= 0; i--) {
        await wait();
        timer.innerText = "";
        timer.innerText = i;
    }
    timer.innerText = "XX";
}

printingNum();

Array.from(boxes).forEach((element, index) => {
    element.setAttribute('value', boardFruitsArr[index]);
    if (i < 2) {
        element.addEventListener('click', async () => {
            if (!element.classList.contains('done')) {
                moves++;
                changable.innerText = moves;
                element.innerText = element.getAttribute('value');
                element.style.fontSize = "40px";
                element.classList.add('clicked');
                i++;
                if (i == 2) {
                    let elems = document.getElementsByClassName('clicked');
                    elemsArr = Array.from(elems);
                    if (elemsArr[0].getAttribute('value') == elemsArr[1].getAttribute('value')) {
                        i = 0;
                        elemsArr[0].classList.remove('clicked');
                        elemsArr[1].classList.remove('clicked');
                        elemsArr[0].classList.add('done');
                        elemsArr[1].classList.add('done');
                        elemsArr = [];
                    } else {
                        setTimeout(() => {
                            elemsArr[0].classList.remove('clicked');
                            elemsArr[1].classList.remove('clicked');
                            elemsArr[0].innerText = "";
                            elemsArr[1].innerText = "";
                            elemsArr = [];
                            i = 0;
                        }, 200);
                    }
                }
            }
        });
    }
});
