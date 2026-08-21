const workshopLoginForm =
    document.getElementById(
        "workshopLoginForm"
    );


const loginError =
    document.getElementById(
        "workshopLoginError"
    );


workshopLoginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "workshopName"
            ).value.trim();


        const phone =
            document.getElementById(
                "workshopPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "workshopPassword"
            ).value;


        loginError.classList.remove(
            "show"
        );


        /*
            جلب الورش المسجلة
        */

        const workshops =
            JSON.parse(
                localStorage.getItem(
                    "workshops"
                ) || "[]"
            );


        /*
            البحث عن الورشة
        */

        const workshop =
            workshops.find(
                item =>

                    item.name === name &&
                    item.phone === phone &&
                    item.password === password
            );


        /*
            الورشة غير موجودة
        */

        if (!workshop) {

            loginError.textContent =
                "بيانات الدخول غير صحيحة.";

            loginError.classList.add(
                "show"
            );

            return;

        }


        /*
            تسجيل دخول الورشة
        */

        localStorage.setItem(
            "currentWorkshop",
            JSON.stringify(workshop)
        );


        /*
            الانتقال للوحة الورشة
        */

        window.location.href =
            "workshop-dashboard.html";

    }
);
