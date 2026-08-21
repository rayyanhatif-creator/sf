/*
    =========================
    التحقق من تسجيل الدخول
    =========================
*/

const customer =
    JSON.parse(
        localStorage.getItem(
            "currentCustomer"
        ) || "null"
    );


if (!customer) {

    localStorage.setItem(
        "afterLogin",
        "my-bookings.html"
    );


    window.location.href =
        "login.html";

}


/*
    =========================
    العناصر
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


const totalBookings =
    document.getElementById(
        "totalBookings"
    );


const filters =
    document.querySelectorAll(
        ".filter"
    );


/*
    =========================
    الحجوزات
    =========================
*/

const allBookings =
    JSON.parse(
        localStorage.getItem(
            "bookings"
        ) || "[]"
    );


/*
    نعرض حجوزات العميل فقط
*/

const customerBookings =
    allBookings.filter(
        booking => {

            return (
                booking.customerId ===
                    customer.id
                ||
                booking.customerPhone ===
                    customer.phone
            );

        }
    );


totalBookings.textContent =
    customerBookings.length;


/*
    =========================
    الحالة
    =========================
*/

function getStatus(
    status
) {

    const statuses = {

        pending: {
            text: "قيد المراجعة",
            class: "status-pending"
        },

        confirmed: {
            text: "مؤكد",
            class: "status-confirmed"
        },

        completed: {
            text: "مكتمل",
            class: "status-completed"
        },

        cancelled: {
            text: "ملغى",
            class: "status-cancelled"
        }

    };


    return (
        statuses[status] ||
        statuses.pending
    );

}


/*
    =========================
    التاريخ
    =========================
*/

function formatDate(
    date
) {

    if (!date) return "—";


    const parsed =
        new Date(
            date + "T00:00:00"
        );


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return date;

    }


    return parsed.toLocaleDateString(
        "ar-SA",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/*
    =========================
    عرض الحجوزات
    =========================
*/

function renderBookings(
    filter = "all"
) {

    bookingsList.innerHTML = "";


    let filtered =
        customerBookings;


    if (
        filter !== "all"
    ) {

        filtered =
            customerBookings.filter(
                booking =>
                    booking.status ===
                    filter
            );

    }


    if (
        filtered.length === 0
    ) {

        bookingsList.style.display =
            "none";

        emptyBookings.style.display =
            "block";

        return;

    }


    bookingsList.style.display =
        "flex";

    emptyBookings.style.display =
        "none";


    filtered
        .slice()
        .reverse()
        .forEach(
            booking => {

                const status =
                    getStatus(
                        booking.status
                    );


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "booking-card";


                card.innerHTML = `

                    <div class="booking-main">

                        <div class="booking-id">

                            ${booking.id}

                        </div>


                        <h2>

                            ${booking.workshopName}

                        </h2>


                        <div class="booking-location">

                            حجز خرط سبحة

                        </div>


                        <div class="booking-meta">

                            <span>

                                📅
                                ${formatDate(
                                    booking.date
                                )}

                            </span>


                            <span>

                                ${booking.beadCount}
                                سبحة

                            </span>


                            <span>

                                من
                                ${Number(
                                    booking.priceFrom || 700
                                ).toLocaleString("ar-SA")}
                                ريال

                            </span>

                        </div>

                    </div>


                    <div class="booking-status">

                        <span
                            class="status-badge ${status.class}">

                            ${status.text}

                        </span>


                        <div class="booking-date">

                            تم إنشاء الطلب

                            <br>

                            ${new Date(
                                booking.createdAt
                            ).toLocaleDateString(
                                "ar-SA"
                            )}

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
    الفلاتر
    =========================
*/

filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            function() {

                filters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                renderBookings(
                    this.dataset.filter
                );

            }
        );

    }
);


/*
    التشغيل
    =========================
*/

renderBookings();
