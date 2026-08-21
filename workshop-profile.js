const workshop =
    JSON.parse(
        localStorage.getItem(
            "currentWorkshop"
        ) || "null"
    );


/*
    =========================
    التحقق من الدخول
    =========================
*/

if (!workshop) {

    window.location.href =
        "workshop-login.html";

}


/*
    =========================
    العناصر
    =========================
*/

const form =
    document.getElementById(
        "profileForm"
    );


const message =
    document.getElementById(
        "profileMessage"
    );


const imageInput =
    document.getElementById(
        "profileImage"
    );


/*
    =========================
    تعبئة البيانات
    =========================
*/

function loadWorkshopData() {

    document.getElementById(
        "profileName"
    ).value =
        workshop.name || "";


    document.getElementById(
        "profileBio"
    ).value =
        workshop.bio || "";


    document.getElementById(
        "profileCity"
    ).value =
        workshop.city || "";


    document.getElementById(
        "profileDistrict"
    ).value =
        workshop.district || "";


    document.getElementById(
        "profileLocation"
    ).value =
        workshop.location || "";


    document.getElementById(
        "profilePrice"
    ).value =
        workshop.price || 700;


    document.getElementById(
        "profileService"
    ).value =
        workshop.service || "خرط السبح";


    updatePreview();

}


loadWorkshopData();


/*
    =========================
    تحديث المعاينة
    =========================
*/

function updatePreview() {

    const name =
        document.getElementById(
            "profileName"
        ).value;


    const bio =
        document.getElementById(
            "profileBio"
        ).value;


    const city =
        document.getElementById(
            "profileCity"
        ).value;


    const district =
        document.getElementById(
            "profileDistrict"
        ).value;


    const price =
        document.getElementById(
            "profilePrice"
        ).value;


    const service =
        document.getElementById(
            "profileService"
        ).value;


    document.getElementById(
        "previewName"
    ).textContent =
        name;


    document.getElementById(
        "previewBio"
    ).textContent =
        bio;


    document.getElementById(
        "previewCity"
    ).textContent =
        city +
        " - " +
        district;


    document.getElementById(
        "previewPrice"
    ).textContent =
        Number(price)
            .toLocaleString("ar-SA");


    document.getElementById(
        "previewService"
    ).textContent =
        service;


    const previewImage =
        document.getElementById(
            "previewImage"
        );


    if (workshop.image) {

        previewImage.innerHTML = `

            <img
                src="${workshop.image}"
                alt="${name}">

        `;

    } else {

        previewImage.innerHTML = "";

    }

}


/*
    =========================
    تغيير الصورة
    =========================
*/

imageInput.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];

        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                workshop.image =
                    event.target.result;

                updatePreview();

            };


        reader.readAsDataURL(file);

    }
);


/*
    =========================
    تحديث المعاينة
    =========================
*/

form.addEventListener(
    "input",
    updatePreview
);


/*
    =========================
    حفظ التعديلات
    =========================
*/

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const price =
            Number(
                document.getElementById(
                    "profilePrice"
                ).value
            );


        if (price < 700) {

            showMessage(
                "السعر يجب أن يبدأ من 700 ريال."
            );

            return;

        }


        /*
            تحديث البيانات
        */

        workshop.name =
            document.getElementById(
                "profileName"
            ).value.trim();


        workshop.bio =
            document.getElementById(
                "profileBio"
            ).value.trim();


        workshop.city =
            document.getElementById(
                "profileCity"
            ).value.trim();


        workshop.district =
            document.getElementById(
                "profileDistrict"
            ).value.trim();


        workshop.location =
            document.getElementById(
                "profileLocation"
            ).value.trim();


        workshop.price =
            price;


        workshop.service =
            document.getElementById(
                "profileService"
            ).value.trim();


        /*
            تحديث قائمة الورش
        */

        const workshops =
            JSON.parse(
                localStorage.getItem(
                    "workshops"
                ) || "[]"
            );


        const index =
            workshops.findIndex(
                item =>
                    item.id ===
                    workshop.id
            );


        if (index !== -1) {

            workshops[index] =
                workshop;

        }


        localStorage.setItem(
            "workshops",
            JSON.stringify(
                workshops
            )
        );


        /*
            تحديث الجلسة الحالية
        */

        localStorage.setItem(
            "currentWorkshop",
            JSON.stringify(
                workshop
            )
        );


        showMessage(
            "تم حفظ تعديلات الورشة بنجاح."
        );

    }
);


/*
    =========================
    الرسالة
    =========================
*/

function showMessage(text) {

    message.textContent =
        text;

    message.classList.add(
        "show"
    );


    setTimeout(
        () => {

            message.classList.remove(
                "show"
            );

        },
        3500
    );

}
