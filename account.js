/*
    حماية الصفحة
*/

const userData =
    localStorage.getItem("workshopUser");


if (!userData) {

    window.location.href =
        "login.html";

}


/*
    بيانات المستخدم
*/

const user =
    JSON.parse(userData);


document.getElementById(
    "userName"
).textContent =
    user.name || "عميلنا";


document.getElementById(
    "profileName"
).textContent =
    user.name || "—";


document.getElementById(
    "profilePhone"
).textContent =
    user.phone || "—";


document.getElementById(
    "profileEmail"
).textContent =
    user.email || "—";


document.getElementById(
    "profileLocation"
).textContent =
    user.location || "—";



/*
    قراءة آخر حجز
*/

const latestBooking =
    localStorage.getItem(
        "latestBooking"
    );


const bookingsList =
    document.getElementById(
        "bookingsList"
    );


let bookings = [];


if (latestBooking) {

    bookings.push(
        JSON.parse(latestBooking)
    );

}



/*
    الإحصائيات
*/

document.getElementById(
    "totalBookings"
).textContent =
    bookings.length;


document.getElementById(
    "upcomingBookings"
).textContent =
    bookings.length;


document.getElementById(
    "completedBookings"
).textContent =
    "0";



/*
    عرض الحجوزات
*/

if (bookings.length === 0) {

    bookingsList.innerHTML = `

        <div class="empty-bookings">

            <strong>
                ما عندك حجوزات حتى الآن
            </strong>

            <p>
                اختر إحدى الورش وابدأ حجزك الأول.
            </p>

            <a
                href="workshops.html"
                class="new-booking">

                استعرض الورش
                <span>←</span>

            </a>

        </div>

    `;

} else {


    bookings.forEach(
        booking => {

            bookingsList.innerHTML += `

                <div class="booking-card">

                    <div class="booking-info">

                        <h3>
                            ${booking.workshop}
                        </h3>

                        <p>
                            ${booking.time || ""}
                        </p>

                    </div>


                    <div class="booking-meta">

                        <div class="booking-date">

                            <strong>
                                ${booking.date || "—"}
                            </strong>

                            <span>
                                موعد الحجز
                            </span>

                        </div>


                        <div class="
                            booking-status
                            status-pending
                        ">

                            قيد المراجعة

                        </div>

                    </div>

                </div>

            `;

        }
    );

}



/*
    تسجيل الخروج
*/

function logout() {

    localStorage.removeItem(
        "workshopUser"
    );

    window.location.href =
        "login.html";

}
