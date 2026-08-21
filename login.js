const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginError =
    document.getElementById(
        "loginError"
    );


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


        loginError.classList.remove(
            "show"
        );


        /*
            جلب المستخدمين
        */

        const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                ) || "[]"
            );


        /*
            البحث عن الحساب
        */

        const user =
            users.find(
                function(item) {

                    return (
                        item.phone === phone &&
                        item.password === password
                    );

                }
            );


        /*
            الحساب غير موجود
        */

        if (!user) {

            loginError.textContent =
                "رقم الجوال أو كلمة المرور غير صحيحة.";

            loginError.classList.add(
                "show"
            );

            return;

        }


        /*
            تسجيل دخول المستخدم
        */

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        /*
            إذا كان فيه ورشة
            اختارها المستخدم قبل الدخول
        */

        const selectedWorkshop =
            localStorage.getItem(
                "selectedWorkshop"
            );


        if (selectedWorkshop) {

            window.location.href =
                "booking.html";

        } else {

            window.location.href =
                "customer-dashboard.html";

        }

    }
);
