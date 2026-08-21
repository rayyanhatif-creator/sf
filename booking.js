const selectedWorkshop =
    JSON.parse(
        localStorage.getItem(
            "selectedWorkshop"
        ) || "{}"
    );


/* =========================
   التأكد من وجود الورشة
========================= */

if (!selectedWorkshop.workshopName) {

    alert(
        "اختر ورشة أولاً."
    );

    window.location.href =
        "workshops.html";

}


/* =========================
   بيانات الورشة
========================= */

document.getElementById(
    "summaryName"
).textContent =
    selectedWorkshop.workshopName ||
    "ورشة";


document.getElementById(
    "summaryLocation"
).textContent =
    selectedWorkshop.location ||
    "السعودية";


document.getElementById(
    "summaryService"
).textContent =
    selectedWorkshop.service ||
    "خرط السبح";


document.getElementById(
    "summaryPrice"
).textContent =
    selectedWorkshop.price ||
    700;



/* =========================
   صورة الورشة
========================= */

const summaryImage =
    document.getElementById(
        "summaryImage"
    );


if (selectedWorkshop.image) {

    summaryImage.innerHTML = `

        <img
            src="${selectedWorkshop.image}"
            alt="${selectedWorkshop.workshopName}">

    `;

}



/* =========================
   التاريخ
========================= */

const dateInput =
    document.getElementById(
        "bookingDate"
    );


/*
    منع اختيار تاريخ قديم
*/

const today =
    new Date()
        .toISOString()
        .split("T")[0];


dateInput.min = today;



/* =========================
   إرسال الحجز
========================= */

document
    .getElementById("bookingForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const date =
                document.getElementById(
                    "bookingDate"
                ).value;


            const time =
                document.getElementById(
                    "bookingTime"
                ).value;


            const service =
                document.getElementById(
                    "bookingService"
                ).value;


            const notes =
                document.getElementById(
                    "bookingNotes"
                ).value.trim();



            /* =========================
               إنشاء الحجز
            ========================= */

            const booking = {

                id:
                    Date.now(),

                workshop:
                    selectedWorkshop.workshopName,

                workshopPhone:
                    selectedWorkshop.phone || "",

                name:
                    name,

                phone:
                    phone,

                date:
                    date,

                time:
                    time,

                service:
                    service,

                notes:
                    notes,

                price:
                    selectedWorkshop.price ||
                    700,

                status:
                    "pending",

                createdAt:
                    new Date()
                        .toISOString()

            };



            /* =========================
               حفظ الحجز
            ========================= */

            const bookings =
                JSON.parse(
                    localStorage.getItem(
                        "workshopBookings"
                    ) || "[]"
                );


            bookings.unshift(
                booking
            );


            localStorage.setItem(
                "workshopBookings",
                JSON.stringify(
                    bookings
                )
            );



            /* =========================
               حفظ آخر حجز
            ========================= */

            localStorage.setItem(
                "lastBooking",
                JSON.stringify(
                    booking
                )
            );



            /*
                الانتقال لصفحة النجاح
            */

            window.location.href =
                "booking-success.html";

        }
    );
