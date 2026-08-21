const form =
    document.getElementById(
        "workshopRegisterForm"
    );

const errorBox =
    document.getElementById(
        "registerError"
    );

const imageInput =
    document.getElementById(
        "workshopImage"
    );

const imagePreview =
    document.getElementById(
        "imagePreview"
    );


/*
    =========================
    معاينة الصورة
    =========================
*/

let workshopImage =
    "";


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

                workshopImage =
                    event.target.result;


                imagePreview.innerHTML = `

                    <img
                        src="${workshopImage}"
                        alt="صورة الورشة">

                `;

            };


        reader.readAsDataURL(file);

    }
);


/*
    =========================
    التسجيل
    =========================
*/

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        errorBox.classList.remove(
            "show"
        );


        const name =
            document.getElementById(
                "workshopName"
            ).value.trim();


        const bio =
            document.getElementById(
                "workshopBio"
            ).value.trim();


        const city =
            document.getElementById(
                "workshopCity"
            ).value.trim();


        const district =
            document.getElementById(
                "workshopDistrict"
            ).value.trim();


        const location =
            document.getElementById(
                "workshopLocation"
            ).value.trim();


        const price =
            Number(
                document.getElementById(
                    "workshopPrice"
                ).value
            );


        const service =
            document.getElementById(
                "workshopService"
            ).value.trim();


        const phone =
            document.getElementById(
                "workshopPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "workshopPassword"
            ).value;


        const passwordConfirm =
            document.getElementById(
                "workshopPasswordConfirm"
            ).value;


        /*
            =========================
            التحقق
            =========================
        */

        if (
            !/^5\d{8}$/.test(phone)
        ) {

            showError(
                "اكتب رقم جوال سعودي صحيح."
            );

            return;

        }


        if (price < 700) {

            showError(
                "السعر يجب أن يبدأ من 700 ريال."
            );

            return;

        }


        if (
            password !==
            passwordConfirm
        ) {

            showError(
                "كلمتا المرور غير متطابقتين."
            );

            return;

        }


        /*
            =========================
            جلب الورش
            =========================
        */

        const workshops =
            JSON.parse(
                localStorage.getItem(
                    "workshops"
                ) || "[]"
            );


        /*
            منع تكرار الجوال
        */

        const exists =
            workshops.some(
                workshop =>
                    workshop.phone === phone
            );


        if (exists) {

            showError(
                "رقم الجوال مسجل مسبقاً."
            );

            return;

        }


        /*
            =========================
            إنشاء الورشة
            =========================
        */

        const workshop = {

            id:
                Date.now(),

            name:
                name,

            bio:
                bio,

            city:
                city,

            district:
                district,

            location:
                location,

            price:
                price,

            service:
                service,

            phone:
                phone,

            password:
                password,

            image:
                workshopImage,

            role:
                "workshop",

            status:
                "active",

            createdAt:
                new Date()
                    .toISOString()

        };


        workshops.push(
            workshop
        );


        localStorage.setItem(
            "workshops",
            JSON.stringify(
                workshops
            )
        );


        /*
            تسجيل دخول الورشة
        */

        localStorage.setItem(
            "currentWorkshop",
            JSON.stringify(
                workshop
            )
        );


        /*
            دخول مباشر للوحة
        */

        window.location.href =
            "workshop-dashboard.html";

    }
);


/*
    =========================
    رسالة الخطأ
    =========================
*/

function showError(message) {

    errorBox.textContent =
        message;

    errorBox.classList.add(
        "show"
    );

}
