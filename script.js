const zones = {
  utc: [{ value: 'UTC', label: 'UTC', name: 'Coordinated Universal Time' }],
  south: [
    { value: 'Asia/Kathmandu', label: 'UTC+5:45 — Nepal', name: 'Kathmandu, Nepal' },
    { value: 'Asia/Kolkata', label: 'UTC+5:30 — India', name: 'New Delhi, India' },
    { value: 'Asia/Karachi', label: 'UTC+5:00 — Pakistan', name: 'Karachi, Pakistan' },
    { value: 'Asia/Kabul', label: 'UTC+4:30 — Afghanistan', name: 'Kabul, Afghanistan' }
  ],
  se: [
    { value: 'Asia/Dhaka', label: 'UTC+6:00 — Bangladesh', name: 'Dhaka, Bangladesh' },
    { value: 'Asia/Yangon', label: 'UTC+6:30 — Myanmar', name: 'Yangon, Myanmar' },
    { value: 'Asia/Bangkok', label: 'UTC+7:00 — Thailand', name: 'Bangkok, Thailand' },
    { value: 'Asia/Singapore', label: 'UTC+8:00 — Singapore', name: 'Singapore' }
  ],
  east: [
    { value: 'Asia/Tokyo', label: 'UTC+9:00 — Japan', name: 'Tokyo, Japan' },
    { value: 'Australia/Sydney', label: 'UTC+10/+11 — Australia', name: 'Sydney, Australia' }
  ],
  west: [
    { value: 'Asia/Dubai', label: 'UTC+4:00 — UAE', name: 'Dubai, United Arab Emirates' },
    { value: 'Asia/Tehran', label: 'UTC+3:30 — Iran', name: 'Tehran, Iran' },
    { value: 'Asia/Riyadh', label: 'UTC+3:00 — Saudi Arabia', name: 'Riyadh, Saudi Arabia' }
  ]
};

const clock = document.querySelector('#clock');
const date = document.querySelector('#date');
const period = document.querySelector('#period');
const locationText = document.querySelector('#location');
const region = document.querySelector('#region');
const timezone = document.querySelector('#timezone');
const formatButton = document.querySelector('#toggleformat');
const localButton = document.querySelector('#use-local-time');

let is24HourFormat = true;
let selectedZone = 'Asia/Yangon';

function getZoneDetails(zone) {
  return Object.values(zones).flat().find((item) => item.value === zone);
}

function populate(regionName, preferredZone = selectedZone) {
  const list = regionName === 'all' ? Object.values(zones).flat() : zones[regionName];
  timezone.replaceChildren();
  list.forEach((zone) => {
    const option = new Option(zone.label, zone.value, false, zone.value === preferredZone);
    timezone.add(option);
  });
  selectedZone = timezone.value;
}

function updateClock() {
  const now = new Date();
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: selectedZone, hour: '2-digit', minute: '2-digit', second: '2-digit',
    hourCycle: is24HourFormat ? 'h23' : 'h12'
  }).formatToParts(now);
  const get = (type) => timeParts.find((part) => part.type === type)?.value || '';
  const time = `${get('hour')}:${get('minute')}:${get('second')}`;
  const dayPeriod = get('dayPeriod');

  clock.textContent = time;
  clock.dateTime = now.toISOString();
  period.textContent = dayPeriod;
  date.textContent = new Intl.DateTimeFormat('en-GB', {
    timeZone: selectedZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(now);

  const details = getZoneDetails(selectedZone);
  locationText.textContent = details ? details.name : selectedZone.replace('_', ' ');
}

region.addEventListener('change', () => {
  populate(region.value);
  updateClock();
});

timezone.addEventListener('change', () => {
  selectedZone = timezone.value;
  updateClock();
});

formatButton.addEventListener('click', () => {
  is24HourFormat = !is24HourFormat;
  formatButton.textContent = is24HourFormat ? 'Use 12-hour time' : 'Use 24-hour time';
  formatButton.setAttribute('aria-pressed', String(!is24HourFormat));
  updateClock();
});

localButton.addEventListener('click', () => {
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  selectedZone = localZone;
  region.value = 'all';
  if (getZoneDetails(localZone)) {
    populate('all', localZone);
  } else {
    timezone.replaceChildren(new Option(localZone.replace('_', ' '), localZone, true, true));
  }
  updateClock();
});

populate('se', selectedZone);
updateClock();
setInterval(updateClock, 1000);
