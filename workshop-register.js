const workshopRegisterForm =
    document.getElementById(
        "workshopRegisterForm"
    );


function toggleWorkshopPassword() {

    const password =
        document.getElementById(
            "workshopPassword"
        );

    const button =
        document.querySelector(
            ".password-field button"
        );


    if (password.type === "password") {

        password.type = "text";

        button.textContent =
            "إخفاء";

    } else {

        password.type = "password";

        button.textContent =
            "إظهار";

    }

}


workshopRegisterForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const ownerName =
            document.getElementById(
                "ownerName"
            ).value.trim();


        const workshopName =
            document.getElementById(
                "workshopName"
            ).value.trim();


        const phone =
            document.getElementById(
                "workshopPhone"
            ).value.trim();


        const email =
            document.getElementById(
                "workshopEmail"
            ).value.trim();


        const location =
            document.getElementById(
                "workshopLocation"
            ).value.trim();


        const password =
            document.getElementById(
                "workshopPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "workshopPasswordConfirm"
            ).value;


        const bio =
            document.getElementById(
                "workshopBio"
            ).value.trim();


        if (password !== confirmPassword) {

            alert(
                "كلمتا المرور غير متطابقتين."
            );

            return;

        }


        const workshop = {

            ownerName:
                ownerName,

            workshopName:
                workshopName,

            phone:
                phone,

            email:
                email,

            location:
                location,

            bio:
                bio,

            type:
                "workshop",

            createdAt:
                new Date().toISOString()

        };


        /*
         * تخزين مؤقت للواجهة.
         * قاعدة البيانات الحقيقية نركبها لاحقًا.
         */

        localStorage.setItem(
            "workshopAccount",
            JSON.stringify(workshop)
        );


        /*
         * تسجيل دخوله مباشرة
         */

        localStorage.setItem(
            "workshopLoggedIn",
            "true"
        );


        alert(
            "تم تسجيل ورشتك بنجاح."
        );


        /*
         * ينتقل مباشرة إلى لوحة الورشة
         */

        window.location.href =
            "workshop-dashboard.html";

    }
);
