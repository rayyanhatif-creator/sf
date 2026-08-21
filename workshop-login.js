const workshopLoginForm =
    document.getElementById(
        "workshopLoginForm"
    );


function toggleLoginPassword() {

    const password =
        document.getElementById(
            "loginPassword"
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


workshopLoginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const identifier =
            document.getElementById(
                "loginIdentifier"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const savedWorkshop =
            localStorage.getItem(
                "workshopAccount"
            );


        if (!savedWorkshop) {

            alert(
                "لا يوجد حساب ورشة مسجل. سجل ورشتك أولاً."
            );

            window.location.href =
                "workshop-register.html";

            return;

        }


        const workshop =
            JSON.parse(savedWorkshop);


        /*
         * في النسخة التجريبية:
         * نتحقق من الجوال أو البريد.
         */

        const identifierCorrect =
            identifier === workshop.phone ||
            identifier === workshop.email;


        if (!identifierCorrect) {

            alert(
                "رقم الجوال أو البريد الإلكتروني غير صحيح."
            );

            return;

        }


        /*
         * في النسخة التجريبية
         * يتم الدخول بعد التحقق.
         */

        localStorage.setItem(
            "workshopLoggedIn",
            "true"
        );


        window.location.href =
            "workshop-dashboard.html";

    }
);
