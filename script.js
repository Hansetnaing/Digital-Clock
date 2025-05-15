// let now = new Date();
// console.log(now);
// console.log(now.getHours(), now.getMinutes(), now.getSeconds());



// let hours = 24;
// console.log(hours);

// let ampm = hours>=12 ? "PM" : "AM" ;
// console.log(ampm);

// let formattedhours = hours%12 || 12;
// console.log(`${formattedhours} ${ampm}`);

// hours(24)       hour%12         formatted
// 0(midnight)         0               12
// 12(noon)            0               12
// 13(1PM)             1               1

// -------------------------
// Selected value
// document.getElementById('timezone').addEventListener('change',function(){
//     let selectedvalue = this.value;
//     console.log(selectedvalue);
// });

// 1s = 1000Ms
// 60s = 60000Ms

let is24HourFormat = true; // default format 24
let timeoffset = 0; // default utc time

function updateClock(){
  
    let now = new Date();
    let utc = now.getTime() + now.getTimezoneOffset() * 60000; // minutes to milliseconds

    let localTime = new Date(utc + (timeoffset * 3600000)); // hours to milliseconds

    let hours = localTime.getHours();
    let minutes = localTime.getMinutes().toString().padStart(2,"0");
    let seconds = localTime.getSeconds().toString().padStart(2,"0");

    let ampm = ""; // store AM and PM


    // ! logical operator (not) mean false
    // || logical operator (or)
    if(!is24HourFormat){
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert to 12 format
    }
    else{
        hours = hours.toString().padStart(2,"0");
    }

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

};

//handle format toggleformat btn to 12 - 24

document.getElementById('toggleformat').addEventListener('click',function(){
    is24HourFormat = !is24HourFormat;
    this.textContent = is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour";
    updateClock();
});

//handle time zone change
document.getElementById('timezone').addEventListener('change',function(){
    timeoffset = this.value;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();


