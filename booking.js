const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /*
         * مؤقتًا:
         * نتأكد أن المستخدم سجل دخوله.
         *
         * لاحقًا بنربطه بنظام الحسابات الحقيقي.
         */

        const loggedIn =
            localStorage.getItem("workshopUser");


        if (!loggedIn) {

            alert(
                "لازم تسجل دخولك أولاً حتى تقدر تحجز."
            );

            window.location.href =
                "login.html?redirect=booking";

            return;

        }


        const booking = {

            name:
                document.getElementById(
                    "bookingName"
                ).value,

            phone:
                document.getElementById(
                    "bookingPhone"
                ).value,

            date:
                document.getElementById(
                    "bookingDate"
                ).value,

            time:
                document.getElementById(
                    "bookingTime"
                ).value,

            notes:
                document.getElementById(
                    "bookingNotes"
                ).value,

            workshop:
                "ورشة حرفة",

            createdAt:
                new Date().toISOString()

        };


        /*
         * تخزين مؤقت للمتصفح.
         * لاحقًا نستبدله بقاعدة بيانات حقيقية.
         */

        localStorage.setItem(
            "latestBooking",
            JSON.stringify(booking)
        );


        window.location.href =
            "booking-success.html";

    }
);
