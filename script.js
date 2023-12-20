const SUNDAY = "sunday";
const MONDAY = "monday";
const TEUSDAY = "tuesday";
const WEDENSDAY = "wedensday";
const THURSDAY = "thursday";
const FRIDAY = "friday";
const SATURDAY = "saturday";

const weekdayValues = {
  SUNDAY: {
    label: "Sunday",
    name: "sunday",
    baseVaalue: 1,
    isWeekend: false,
  },
  MONDAY: {
    label: "Monday",
    name: "monday",
    baseVaalue: 2,
    isWeekend: false,
  },
  TEUSDAY: {
    label: "Tuesday",
    name: "tuesday",
    baseVaalue: 3,
    isWeekend: false,
  },

  WEDENSDAY: {
    label: "Wedensday",
    name: "wedensday",
    baseVaalue: 4,
    isWeekend: false,
  },

  THURSDAY: {
    label: "Thursday",
    name: "thursday",
    baseVaalue: 5,
    isWeekend: false,
  },
  FRIDAY: {
    label: "Friday",
    name: "friday",
    baseVaalue: 6,
    isWeekend: true,
  },
  SATURDAY: {
    label: "Saturday",
    name: "saturday",
    baseVaalue: 7,
    isWeekend: true,
  },
};
// console.log(weekdayValues.SUNDAY);
// console.log(weekdayValues.MONDAY.label);
// console.log(weekdayValues.TEUSDAY.label);
// console.log(weekdayValues.WEDENSDAY.label);
// console.log(weekdayValues.THURSDAY.label);
// console.log(weekdayValues.FRIDAY.label);
// console.log(weekdayValues.SATURDAY.label);

const weekKeys = Object.keys(weekdayValues);

console.log(weekKeys);
weekKeys.map((day) => console.log(weekdayValues[day].label));

const weekValues = Object.values(weekdayValues);
weekValues.map((day) => console.log(day.label));
