/*
    =========================
    الورشة المختارة
    =========================
*/

const selectedId =
    localStorage.getItem(
        "selectedWorkshopId"
    );


const workshops =
    JSON.parse(
        localStorage.getItem(
            "workshops"
        ) || "[]"
    );


const workshop =
    workshops.find(
        item =>
            String(item.id) ===
            String(selectedId)
    );


if (!workshop) {

    window.location.href =
        "workshops.html";

}


/*
    =========================
    بيانات العميل
    =========================
*/

const customer =
    JSON.parse(
        localStorage.getItem(
            "currentCustomer"
        ) || "null"
    );


if (!customer) {

    localStorage.setItem(
        "afterLogin",
        "booking.html"
    );


    window.location.href =
        "login.html";

}


/*
    =========================
    بيانات الورشة
    =========================
*/

document.getElementById(
    "bookingWorkshopName"
).textContent =
    workshop.name;


document.getElementById(
    "bookingWorkshopCity"
).textContent =
    `${workshop.city || "السعودية"}${
        workshop.district
            ? " - " + workshop.district
            : ""
    }`;


document.getElementById(
    "bookingPrice"
).textContent =
    Number(
        workshop.price || 700
    ).toLocaleString("ar-SA");


/*
    الصورة
*/

const bookingImage =
    document.getElementById(
        "bookingImage"
    );


if (workshop.image) {

    bookingImage.innerHTML = `

        <img
            src="${workshop.image}"
            alt="${workshop.name}">

    `;

}


/*
    =========================
    تعبئة بيانات العميل
    =========================
*/

if (customer) {

    document.getElementById(
        "customerName"
    ).value =
        customer.name || "";


    document.getElementById(
        "customerPhone"
    ).value =
        customer.phone || "";

}


/*
    =========================
    التاريخ
    =========================
*/

const dateInput =
    document.getElementById(
        "bookingDate"
    );


/*
    منع اختيار الأيام الماضية
*/

const today =
    new Date();


const localDate =
    new Date(
        today.getTime() -
        today.getTimezoneOffset() * 60000
    )
    .toISOString()
    .split("T")[0];


dateInput.min =
    localDate;


/*
    =========================
    إرسال الحجز
    =========================
*/

const form =
    document.getElementById(
        "bookingForm"
    );


const message =
    document.getElementById(
        "bookingMessage"
    );


form.addEventListener(
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


        const beadCount =
            Number(
                document.getElementById(
                    "beadCount"
                ).value
            );


        const date =
            document.getElementById(
                "bookingDate"
            ).value;


        const notes =
            document.getElementById(
                "bookingNotes"
            ).value.trim();


        if (!name || !phone || !date) {

            showMessage(
                "تأكد من تعبئة جميع البيانات المطلوبة.",
                "error"
            );

            return;

        }


        if (beadCount < 1) {

            showMessage(
                "عدد السبح يجب أن يكون واحدًا على الأقل.",
                "error"
            );

            return;

        }


        /*
            إنشاء رقم الحجز
        */

        const bookingId =
            "WS-" +
            Date.now()
            .toString()
            .slice(-8);


        const booking = {

            id:
                bookingId,

            workshopId:
                workshop.id,

            workshopName:
                workshop.name,

            customerId:
                customer?.id || null,

            customerName:
                name,

            customerPhone:
                phone,

            beadCount:
                beadCount,

            date:
                date,

            notes:
                notes,

            priceFrom:
                workshop.price || 700,

            status:
                "pending",

            createdAt:
                new Date().toISOString()

        };


        /*
            حفظ الحجوزات
        */

        const bookings =
            JSON.parse(
                localStorage.getItem(
                    "bookings"
                ) || "[]"
            );


        bookings.push(
            booking
        );


        localStorage.setItem(
            "bookings",
            JSON.stringify(
                bookings
            )
        );


        /*
            نجاح
        */

        showMessage(
            `تم إرسال طلب الحجز رقم ${bookingId} بنجاح.`,
            "success"
        );


        /*
            بعد ثانيتين
            ننتقل لصفحة الطلب
        */

        setTimeout(
            function() {

                localStorage.setItem(
                    "lastBookingId",
                    bookingId
                );


                window.location.href =
                    "booking-success.html";

            },
            1800
        );

    }
);


/*
    =========================
    الرسائل
    =========================
*/

function showMessage(
    text,
    type
) {

    message.textContent =
        text;

    message.className =
        `booking-message show ${type}`;

}
