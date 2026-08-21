/*
    =========================
    التحقق من تسجيل الدخول
    =========================
*/

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        ) || "null"
    );


if (!currentUser) {

    window.location.href =
        "login.html";

}


/*
    =========================
    بيانات المستخدم
    =========================
*/

document.getElementById(
    "userName"
).textContent =
    currentUser.name;


document.getElementById(
    "accountName"
).textContent =
    currentUser.name;


document.getElementById(
    "accountEmail"
).textContent =
    currentUser.email;


document.getElementById(
    "accountPhone"
).textContent =
    "+966 " +
    currentUser.phone;


document.getElementById(
    "accountLocation"
).textContent =
    currentUser.location;


/*
    أول حرف من الاسم
*/

document.getElementById(
    "avatarLetter"
).textContent =
    currentUser.name
        .trim()
        .charAt(0);



/*
    =========================
    جلب الحجوزات
    =========================
*/

const allBookings =
    JSON.parse(
        localStorage.getItem(
            "workshopBookings"
        ) || "[]"
    );


/*
    حجوزات هذا العميل فقط
*/

const userBookings =
    allBookings.filter(
        booking =>
            booking.phone ===
            currentUser.phone
    );



/*
    =========================
    الإحصائيات
    =========================
*/

const pending =
    userBookings.filter(
        booking =>
            booking.status ===
            "pending"
    ).length;


const confirmed =
    userBookings.filter(
        booking =>
            booking.status ===
            "confirmed"
    ).length;


document.getElementById(
    "totalBookings"
).textContent =
    userBookings.length;


document.getElementById(
    "pendingBookings"
).textContent =
    pending;


document.getElementById(
    "confirmedBookings"
).textContent =
    confirmed;



/*
    =========================
    عرض الحجوزات
    =========================
*/

const bookingsList =
    document.getElementById(
        "bookingsList"
    );


const emptyBookings =
    document.getElementById(
        "emptyBookings"
    );


if (userBookings.length === 0) {

    emptyBookings.style.display =
        "block";

} else {

    userBookings.forEach(
        booking => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "booking-card";


            let statusText =
                "بانتظار المراجعة";


            let statusClass =
                "pending";


            if (
                booking.status ===
                "confirmed"
            ) {

                statusText =
                    "تم التأكيد";

                statusClass =
                    "confirmed";

            }


            if (
                booking.status ===
                "cancelled"
            ) {

                statusText =
                    "ملغي";

                statusClass =
                    "cancelled";

            }


            const date =
                new Date(
                    booking.date +
                    "T00:00:00"
                );


            const formattedDate =
                date.toLocaleDateString(
                    "ar-SA",
                    {
                        weekday:
                            "long",
                        year:
                            "numeric",
                        month:
                            "long",
                        day:
                            "numeric"
                    }
                );


            card.innerHTML = `

                <div class="booking-top">

                    <div>

                        <h3>
                            ${booking.workshop}
                        </h3>

                        <div class="booking-number">
                            WS-${String(booking.id).slice(-6)}
                        </div>

                    </div>

                    <span class="booking-status ${statusClass}">
                        ${statusText}
                    </span>

                </div>


                <div class="booking-details">

                    <div class="booking-detail">

                        <span>
                            التاريخ
                        </span>

                        <strong>
                            ${formattedDate}
                        </strong>

                    </div>


                    <div class="booking-detail">

                        <span>
                            الوقت
                        </span>

                        <strong>
                            ${booking.time}
                        </strong>

                    </div>


                    <div class="booking-detail">

                        <span>
                            الخدمة
                        </span>

                        <strong>
                            ${booking.service}
                        </strong>

                    </div>

                </div>

            `;


            bookingsList.appendChild(
                card
            );

        }
    );

}



/*
    =========================
    تسجيل الخروج
    =========================
*/

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";

}
