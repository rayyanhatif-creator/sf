const registerForm =
    document.getElementById("registerForm");


function toggleRegisterPassword() {

    const password =
        document.getElementById(
            "registerPassword"
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


registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "registerPhone"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const location =
            document.getElementById(
                "registerLocation"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "registerPasswordConfirm"
            ).value;


        if (password !== confirmPassword) {

            alert(
                "كلمتا المرور غير متطابقتين."
            );

            return;

        }


        const user = {

            name: name,

            phone: phone,

            email: email,

            location: location,

            type: "customer",

            createdAt:
                new Date().toISOString()

        };


        /*
         * تخزين مؤقت.
         * لاحقًا نربطه بقاعدة بيانات حقيقية.
         */

        localStorage.setItem(
            "workshopUser",
            JSON.stringify(user)
        );


        alert(
            "تم إنشاء حسابك بنجاح."
        );


        window.location.href =
            "account.html";

    }
);
