const workshop =
    JSON.parse(
        localStorage.getItem(
            "workshopAccount"
        ) || "{}"
    );


/*
    إذا ما فيه ورشة محفوظة
*/

if (!workshop.workshopName) {

    alert(
        "لم يتم العثور على بيانات الورشة."
    );

    window.location.href =
        "workshops.html";

}


/* =========================
   البيانات
========================= */

document.getElementById(
    "workshopTitle"
).textContent =
    workshop.workshopName ||
    "ورشة حرفة";


document.getElementById(
    "workshopLocation"
).textContent =
    workshop.location ||
    "السعودية";


document.getElementById(
    "locationText"
).textContent =
    workshop.location ||
    "السعودية";


document.getElementById(
    "workshopBio"
).textContent =
    workshop.bio ||
    "ورشة متخصصة في صناعة وخرط السبح، نهتم بالتفاصيل ونقدم أعمالاً مصنوعة بعناية.";


document.getElementById(
    "workshopService"
).textContent =
    workshop.service ||
    "خرط السبح";


const price =
    workshop.price ||
    700;


document.getElementById(
    "workshopPrice"
).textContent =
    price;


document.getElementById(
    "sidebarPrice"
).textContent =
    price;


document.getElementById(
    "openingTime"
).textContent =
    workshop.openingTime ||
    "16:00";


document.getElementById(
    "closingTime"
).textContent =
    workshop.closingTime ||
    "23:00";



/* =========================
   الصورة
========================= */

const hero =
    document.getElementById(
        "workshopHeroImage"
    );


if (workshop.image) {

    hero.innerHTML = `

        <img
            src="${workshop.image}"
            alt="${workshop.workshopName}">

    `;

} else {

    hero.innerHTML = `

        <div class="image-loading">

            صورة الورشة

        </div>

    `;

}



/* =========================
   زر الحجز
========================= */

document
    .getElementById("bookButton")
    .addEventListener(
        "click",
        function() {

            /*
                نحفظ الورشة المختارة
                حتى صفحة الحجز تعرف
                أي ورشة اختار العميل.
            */

            localStorage.setItem(
                "selectedWorkshop",
                JSON.stringify(workshop)
            );


            /*
                الانتقال لصفحة الحجز
            */

            window.location.href =
                "booking.html";

        }
    );
