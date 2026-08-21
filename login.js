const loginForm =
    document.getElementById("loginForm");


/*
    إظهار وإخفاء كلمة المرور
*/

function togglePassword() {

    const password =
        document.getElementById("loginPassword");

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


/*
    تسجيل الدخول المؤقت
*/

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const phone =
            document.getElementById(
                "loginPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        if (!phone || !password) {

            alert(
                "فضلاً أكمل البيانات."
            );

            return;

        }


        /*
            مؤقتًا نحفظ المستخدم
            داخل المتصفح.

            لاحقًا نستبدل هذا
            بقاعدة البيانات.
        */

        const user = {

            phone: phone,

            type: "customer",

            loginAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "workshopUser",
            JSON.stringify(user)
        );


        /*
            إذا جاء من صفحة الحجز
            يرجعه للحجز.
        */

        const params =
            new URLSearchParams(
                window.location.search
            );


        if (
            params.get("redirect")
            === "booking"
        ) {

            window.location.href =
                "booking.html";

            return;

        }


        /*
            إذا دخول طبيعي
        */

        window.location.href =
            "account.html";

    }
);
