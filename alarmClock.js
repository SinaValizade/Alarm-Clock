//$in@
const selectMenu = document.querySelectorAll('select');
const timeBox = document.querySelector('p.time');
const setAlarmBtn = document.querySelector("button");
const container = document.querySelector('div.set-time');
let option, alertTime, ringTone, alarmState = 'isSet';
ringTone = new Audio("./files/Beep.mp3");

setInterval( function (){
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (h < 10){h = '0'+h}
    if (m < 10){m = '0'+m}
    if (s < 10){s = '0'+s}
    timeBox.innerHTML = `${h}:${m}:${s}`;
    if (alertTime === `${h}:${m}`){
        ringTone.play();
        ringTone.loop;
    }
}, 1000);

setSelectMenus();

setAlarmBtn.addEventListener("click", settingAlarm);

function setSelectMenus() {
    for (let i = 23; i >= 0; i--) {
        if (i < 10) {
            i = '0' + i;
        }
        option = `<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
    }
    for (let i = 59; i >= 0; i--){
        if (i < 10) {
            i = '0' + i;
        }
        option = `<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML('afterend' , option);
    }
}
function settingAlarm() {
    let h = selectMenu[0].value;
    let m = selectMenu[1].value;
    alertTime = `${h}:${m}`;
    if (alertTime.includes('Hour') || alertTime.includes('Minute')) {
        return alert('لطفا زمان را به درستی مشخص کنید !');
    }
    checkState(alarmState);
}
function checkState(x) {
    if (x === 'noSet'){
        setAlarmBtn.innerHTML ='set alarm';
        container.classList.remove('disable');
        alertTime = '';
        ringTone.pause();
        alarmState = 'isSet';
    } else if (x === 'isSet') {
        setAlarmBtn.innerHTML ='clear alarm';
        container.classList.add('disable');
        alarmState = "noSet";
    }
}