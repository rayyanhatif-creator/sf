/*
    =========================
    جلب الورشة
    =========================
*/

const workshopId =
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
            String(workshopId)
    );


/*
    إذا ما حصلنا الورشة
*/

if (!workshop) {

    window.location.href =
        "workshops.html";

}


/*
    =========================
    تعبئة البيانات
    =========================
*/

document.title =
    `${workshop.name} | ورش السعودية`;


document.getElementById(
    "detailsName"
).textContent =
    workshop.name;


document.getElementById(
    "detailsCity"
).textContent =
    `${workshop.city || "السعودية"}${
        workshop.district
            ? " - " + workshop.district
            : ""
    }`;


document.getElementById(
    "detailsBio"
).textContent =
    workshop.bio;


document.getElementById(
    "fullBio"
).textContent =
    workshop.bio;


document.getElementById(
    "detailsService"
).textContent =
    workshop.service;


document.getElementById(
    "serviceName"
).textContent =
    workshop.service;


document.getElementById(
    "detailsPrice"
).textContent =
    Number(
        workshop.price || 700
    ).toLocaleString("ar-SA");


document.getElementById(
    "locationText"
).textContent =
    workshop.location ||
    `${workshop.city || "السعودية"}${
        workshop.district
            ? " - " + workshop.district
            : ""
    }`;


/*
    =========================
    الصورة
    =========================
*/

const image =
    document.getElementById(
        "detailsImage"
    );


if (workshop.image) {

    image.innerHTML = `

        <img
            src="${workshop.image}"
            alt="${workshop.name}">

    `;

} else {

    image.innerHTML = `

        <div style="
            height:100%;
            min-height:560px;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#6f6b63;
            font-size:11px;
        ">

            صورة الورشة

        </div>

    `;

}


/*
    =========================
    الخرائط
    =========================
*/

const locationLink =
    document.getElementById(
        "locationLink"
    );


if (workshop.location) {

    locationLink.href =
        workshop.location;

} else {

    locationLink.style.display =
        "none";

}


/*
    =========================
    زر الحجز
    =========================
*/

document.getElementById(
    "bookButton"
).addEventListener(
    "click",
    function() {

        /*
            نحفظ الورشة المختارة
            قبل الانتقال للحجز
        */

        localStorage.setItem(
            "selectedWorkshopId",
            workshop.id
        );


        /*
            هل العميل مسجل؟
        */

        const currentCustomer =
            JSON.parse(
                localStorage.getItem(
                    "currentCustomer"
                ) || "null"
            );


        if (!currentCustomer) {

            /*
                نحفظ الصفحة التي
                جاء منها العميل
            */

            localStorage.setItem(
                "afterLogin",
                "booking.html"
            );


            window.location.href =
                "login.html";

            return;

        }


        /*
            إذا كان مسجل
            يروح مباشرة للحجز
        */

        window.location.href =
            "booking.html";

    }
);
