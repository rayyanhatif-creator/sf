const lastBooking =
    JSON.parse(
        localStorage.getItem(
            "lastBooking"
        ) || "null"
    );


/*
    إذا ما فيه حجز سابق
*/

if (!lastBooking) {

    window.location.href =
        "workshops.html";

}


/*
    رقم الحجز
*/

document.getElementById(
    "bookingNumber"
).textContent =
    "WS-" +
    String(lastBooking.id).slice(-6);


/*
    الورشة
*/

document.getElementById(
    "successWorkshop"
).textContent =
    lastBooking.workshop;


/*
    التاريخ
*/

const date =
    new Date(
        lastBooking.date +
        "T00:00:00"
    );


document.getElementById(
    "successDate"
).textContent =
    date.toLocaleDateString(
        "ar-SA",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


/*
    الوقت
*/

let timeText =
    lastBooking.time;


if (lastBooking.time) {

    const [
        hours,
        minutes
    ] =
        lastBooking.time
            .split(":")
            .map(Number);


    const time =
        new Date();


    time.setHours(
        hours,
        minutes
    );


    timeText =
        time.toLocaleTimeString(
            "ar-SA",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

}


document.getElementById(
    "successTime"
).textContent =
    timeText;


/*
    الخدمة
*/

document.getElementById(
    "successService"
).textContent =
    lastBooking.service;
