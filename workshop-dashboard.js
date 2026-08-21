const workshopData =
    localStorage.getItem(
        "workshopAccount"
    );


const workshopLoggedIn =
    localStorage.getItem(
        "workshopLoggedIn"
    );


/*
    حماية لوحة الورشة
*/

if (
    !workshopData ||
    workshopLoggedIn !== "true"
) {

    window.location.href =
        "workshop-login.html";

}


const workshop =
    JSON.parse(workshopData);


/*
    اسم الورشة
*/

document.getElementById(
    "workshopName"
).textContent =
    workshop.workshopName ||
    "ورشتك";



/*
    الحجوزات
*/

const bookings =
    JSON.parse(
        localStorage.getItem(
            "workshopBookings"
        ) || "[]"
    );


document.getElementById(
    "totalBookings"
).textContent =
    bookings.length;


/*
    الحجوزات الجديدة
*/

const newBookings =
    bookings.filter(
        booking =>
            booking.status === "pending"
    );


document.getElementById(
    "newBookings"
).textContent =
    newBookings.length;


/*
    حجوزات اليوم
*/

const today =
    new Date()
        .toISOString()
        .split("T")[0];


const todayBookings =
    bookings.filter(
        booking =>
            booking.date === today
    );


document.getElementById(
    "todayBookings"
).textContent =
    todayBookings.length;



/*
    عرض آخر الحجوزات
*/

const container =
    document.getElementById(
        "dashboardBookings"
    );


if (bookings.length === 0) {

    container.innerHTML = `

        <div class="dashboard-booking">

            <div>

                <h3>
                    لا توجد حجوزات حتى الآن
                </h3>

                <p>
                    ستظهر حجوزات العملاء هنا.
                </p>

            </div>

        </div>

    `;

} else {

    bookings
        .slice(0,5)
        .forEach(
            booking => {

                container.innerHTML += `

                    <div class="dashboard-booking">

                        <div>

                            <h3>
                                ${booking.name || "عميل"}
                            </h3>

                            <p>
                                ${booking.phone || ""}
                            </p>

                        </div>


                        <div class="booking-time">

                            ${booking.date || ""}
                            <br>
                            ${booking.time || ""}

                        </div>


                        <div class="booking-status">

                            ${
                                booking.status === "confirmed"
                                ? "مؤكد"
                                : "جديد"
                            }

                        </div>

                    </div>

                `;

            }
        );

}



/*
    تسجيل الخروج
*/

function workshopLogout() {

    localStorage.removeItem(
        "workshopLoggedIn"
    );

    window.location.href =
        "workshop-login.html";

}
