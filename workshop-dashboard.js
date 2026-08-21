/*
    =========================
    التحقق من دخول الورشة
    =========================
*/

const currentWorkshop =
    JSON.parse(
        localStorage.getItem(
            "currentWorkshop"
        ) || "null"
    );


if (!currentWorkshop) {

    window.location.href =
        "workshop-login.html";

}


/*
    =========================
    بيانات الورشة
    =========================
*/

document.getElementById(
    "headerWorkshopName"
).textContent =
    currentWorkshop.name;


document.getElementById(
    "welcomeWorkshopName"
).textContent =
    currentWorkshop.name;


document.getElementById(
    "infoWorkshopName"
).textContent =
    currentWorkshop.name;


document.getElementById(
    "infoWorkshopBio"
).textContent =
    currentWorkshop.bio;


document.getElementById(
    "infoCity"
).textContent =
    currentWorkshop.city +
    " - " +
    currentWorkshop.district;


document.getElementById(
    "infoPrice"
).textContent =
    Number(
        currentWorkshop.price
    ).toLocaleString("ar-SA");


document.getElementById(
    "infoService"
).textContent =
    currentWorkshop.service;


/*
    =========================
    صورة الورشة
    =========================
*/

const workshopImage =
    document.getElementById(
        "workshopImage"
    );


if (currentWorkshop.image) {

    workshopImage.innerHTML = `

        <img
            src="${currentWorkshop.image}"
            alt="${currentWorkshop.name}">

    `;

} else {

    workshopImage.innerHTML = `

        <div style="
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#77736b;
            font-size:10px;
        ">

            لا توجد صورة

        </div>

    `;

}


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


const workshopBookings =
    allBookings.filter(
        booking =>
            booking.workshopId ===
            currentWorkshop.id
    );


/*
    =========================
    الإحصائيات
    =========================
*/

const pending =
    workshopBookings.filter(
        booking =>
            booking.status ===
            "pending"
    ).length;


const confirmed =
    workshopBookings.filter(
        booking =>
            booking.status ===
            "confirmed"
    ).length;


const today =
    new Date();


today.setHours(
    0,
    0,
    0,
    0
);


const upcoming =
    workshopBookings.filter(
        booking => {

            const date =
                new Date(
                    booking.date +
                    "T00:00:00"
                );

            return (
                date >= today &&
                booking.status !==
                "cancelled"
            );

        }
    ).length;


document.getElementById(
    "totalBookings"
).textContent =
    workshopBookings.length;


document.getElementById(
    "pendingBookings"
).textContent =
    pending;


document.getElementById(
    "confirmedBookings"
).textContent =
    confirmed;


document.getElementById(
    "upcomingBookings"
).textContent =
    upcoming;


/*
    =========================
    عرض الحجوزات
    =========================
*/

const bookingsContainer =
    document.getElementById(
        "workshopBookings"
    );


const noBookings =
    document.getElementById(
        "noBookings"
    );


if (
    workshopBookings.length === 0
) {

    noBookings.style.display =
        "block";

} else {

    workshopBookings
        .slice()
        .reverse()
        .forEach(
            booking => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "workshop-booking";


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

                    <div class="booking-main">

                        <div class="booking-customer">

                            <h3>
                                ${booking.customerName}
                            </h3>

                            <div class="booking-id">
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


                    ${
                        booking.status ===
                        "pending"

                        ? `

                        <div class="booking-actions">

                            <button
                                class="confirm-button"
                                onclick="updateBooking(
                                    ${booking.id},
                                    'confirmed'
                                )">

                                تأكيد الحجز

                            </button>


                            <button
                                class="cancel-button"
                                onclick="updateBooking(
                                    ${booking.id},
                                    'cancelled'
                                )">

                                رفض الحجز

                            </button>

                        </div>

                        `

                        : ""

                    }

                `;


                bookingsContainer.appendChild(
                    card
                );

            }
        );

}


/*
    =========================
    تحديث الحجز
    =========================
*/

function updateBooking(
    bookingId,
    newStatus
) {

    const bookings =
        JSON.parse(
            localStorage.getItem(
                "workshopBookings"
            ) || "[]"
        );


    const booking =
        bookings.find(
            item =>
                item.id === bookingId
        );


    if (!booking) return;


    booking.status =
        newStatus;


    localStorage.setItem(
        "workshopBookings",
        JSON.stringify(
            bookings
        )
    );


    window.location.reload();

}


/*
    =========================
    تسجيل الخروج
    =========================
*/

function logoutWorkshop() {

    localStorage.removeItem(
        "currentWorkshop"
    );

    window.location.href =
        "index.html";

}
