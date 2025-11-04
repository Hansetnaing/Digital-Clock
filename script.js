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

document.addEventListener('DOMContentLoaded', () => {
    const zones = {
        utc: [{ value: 0, label: 'UTC', title: 'Coordinated Universal Time' }],
        south: [
            { value: 5.75, label: 'UTC+5:45 — Nepal', title: 'Nepal (UTC+5:45)' },
            { value: 5.5,  label: 'UTC+5:30 — India', title: 'India / Sri Lanka (UTC+5:30)' },
            { value: 5,    label: 'UTC+5:00 — Pakistan', title: 'Pakistan (UTC+5:00)' },
            { value: 4.5,  label: 'UTC+4:30 — Afghanistan', title: 'Afghanistan (UTC+4:30)' }
        ],
        se: [
            { value: 6,   label: 'UTC+6:00 — Bangladesh', title: 'Bangladesh / Bhutan (UTC+6:00)' },
            { value: 6.5, label: 'UTC+6:30 — Myanmar', title: 'Myanmar (UTC+6:30)' },
            { value: 7,   label: 'UTC+7:00 — SE Asia', title: 'Thailand / Vietnam / Indonesia (WIB)' },
            { value: 8,   label: 'UTC+8:00 — China/SEA', title: 'China / Singapore / Malaysia / Philippines' }
        ],
        east: [
            { value: 9,  label: 'UTC+9:00 — Japan/Korea', title: 'Japan / Korea (UTC+9:00)' },
            { value: 10, label: 'UTC+10:00 — Australia (parts)', title: 'Parts of Australia (UTC+10:00)' }
        ],
        west: [
            { value: 4,   label: 'UTC+4:00 — Dubai', title: 'UAE (UTC+4:00)' },
            { value: 3.5, label: 'UTC+3:30 — Iran', title: 'Iran (UTC+3:30)' },
            { value: 3,   label: 'UTC+3:00 — Saudi', title: 'Saudi Arabia (UTC+3:00)' }
        ]
    };

    const regionEl = document.getElementById('region');
    const tzEl = document.getElementById('timezone');

    function populate(region = 'all') {
        tzEl.innerHTML = '';
        const list = region === 'all' ? Object.values(zones).flat() : (zones[region] || []);
        list.forEach(z => {
            const opt = document.createElement('option');
            opt.value = z.value;
            opt.textContent = z.label;
            opt.title = z.title;
            tzEl.appendChild(opt);
        });
        // keep existing code behavior: if you have a default read by clock, it will work
    }

    populate('south'); // default selection (change if you prefer)
    regionEl.addEventListener('change', (e) => populate(e.target.value));
});

setInterval(updateClock, 1000);
updateClock();


