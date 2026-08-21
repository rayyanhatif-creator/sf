const lastBookingId =
    localStorage.getItem(
        "lastBookingId"
    );


const bookings =
    JSON.parse(
        localStorage.getItem(
            "bookings"
        ) || "[]"
    );


const booking =
    bookings.find(
        item =>
            item.id ===
            lastBookingId
    );


if (!booking) {

    window.location.href =
        "index.html";

}


/*
    رقم الحجز
*/

document.getElementById(
    "bookingId"
).textContent =
    booking.id;


/*
    الورشة
*/

document.getElementById(
    "bookingWorkshop"
).textContent =
    booking.workshopName;


/*
    العميل
*/

document.getElementById(
    "bookingCustomer"
).textContent =
    booking.customerName;


/*
    التاريخ
*/

const bookingDate =
    new Date(
        booking.date + "T00:00:00"
    );


document.getElementById(
    "bookingDate"
).textContent =
    bookingDate.toLocaleDateString(
        "ar-SA",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


/*
    عدد السبح
*/

document.getElementById(
    "bookingBeads"
).textContent =
    `${booking.beadCount} سبحة`;
