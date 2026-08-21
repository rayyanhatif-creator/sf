const registerForm =
    document.getElementById(
        "registerForm"
    );


const registerError =
    document.getElementById(
        "registerError"
    );


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


        registerError.classList.remove(
            "show"
        );


        /*
            التحقق من كلمة المرور
        */

        if (
            password !==
            confirmPassword
        ) {

            registerError.textContent =
                "كلمتا المرور غير متطابقتين.";

            registerError.classList.add(
                "show"
            );

            return;

        }


        /*
            التحقق من رقم الجوال
        */

        if (
            !/^5\d{8}$/.test(phone)
        ) {

            registerError.textContent =
                "اكتب رقم جوال سعودي صحيح.";

            registerError.classList.add(
                "show"
            );

            return;

        }


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
            منع تكرار الجوال
        */

        const phoneExists =
            users.some(
                user =>
                    user.phone === phone
            );


        if (phoneExists) {

            registerError.textContent =
                "رقم الجوال مسجل مسبقاً.";

            registerError.classList.add(
                "show"
            );

            return;

        }


        /*
            منع تكرار البريد
        */

        const emailExists =
            users.some(
                user =>
                    user.email === email
            );


        if (emailExists) {

            registerError.textContent =
                "البريد الإلكتروني مسجل مسبقاً.";

            registerError.classList.add(
                "show"
            );

            return;

        }


        /*
            إنشاء الحساب
        */

        const user = {

            id:
                Date.now(),

            name:
                name,

            phone:
                phone,

            email:
                email,

            location:
                location,

            password:
                password,

            role:
                "customer",

            createdAt:
                new Date()
                    .toISOString()

        };


        users.push(user);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        /*
            تسجيل دخول مباشر
        */

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        /*
            إذا كان المستخدم
            جاء من صفحة حجز
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
