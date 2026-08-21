let bookings =
    JSON.parse(
        localStorage.getItem(
            "workshopBookings"
        ) || "[]"
    );


const container =
    document.getElementById(
        "bookingsContainer"
    );


let currentFilter = "all";


/* =========================
   عرض الحجوزات
========================= */

function renderBookings() {

    container.innerHTML = "";


    const filtered =
        bookings.filter(
            booking => {

                if (
                    currentFilter === "all"
                ) {
                    return true;
                }

                return (
                    booking.status ||
                    "pending"
                ) === currentFilter;

            }
        );


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-bookings">

                <strong>
                    لا توجد حجوزات هنا
                </strong>

                <p>
                    ستظهر طلبات العملاء
                    عند وصولها.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(
        booking => {

            const status =
                booking.status ||
                "pending";


            let statusText =
                "جديد";


            if (
                status === "confirmed"
            ) {

                statusText =
                    "مؤكد";

            }


            if (
                status === "rejected"
            ) {

                statusText =
                    "مرفوض";

            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "booking-card";


            card.innerHTML = `

                <div class="booking-main">

                    <div>

                        <div class="customer-name">

                            ${
                                booking.name ||
                                "عميل"
                            }

                        </div>

                        <div class="customer-phone">

                            ${
                                booking.phone ||
                                "لا يوجد رقم"
                            }

                        </div>

                    </div>


                    <div class="
                        booking-status
                        status-${status}
                    ">

                        ${statusText}

                    </div>

                </div>


                <div class="booking-details">

                    <div class="booking-detail">

                        <span>
                            التاريخ
                        </span>

                        <strong>
                            ${
                                booking.date ||
                                "—"
                            }
                        </strong>

                    </div>


                    <div class="booking-detail">

                        <span>
                            الوقت
                        </span>

                        <strong>
                            ${
                                booking.time ||
                                "—"
                            }
                        </strong>

                    </div>


                    <div class="booking-detail">

                        <span>
                            المبلغ
                        </span>

                        <strong>
                            ${
                                booking.price ||
                                "يحدد لاحقًا"
                            }
                        </strong>

                    </div>

                </div>

                ${
                    status === "pending"
                    ? `

                    <div class="booking-actions">

                        <button
                            class="confirm-button"
                            onclick="updateBookingStatus(
                                '${booking.id}',
                                'confirmed'
                            )">

                            تأكيد الحجز

                        </button>


                        <button
                            class="reject-button"
                            onclick="updateBookingStatus(
                                '${booking.id}',
                                'rejected'
                            )">

                            رفض الحجز

                        </button>

                    </div>

                    `
                    : ""
                }

            `;


            container.appendChild(card);

        }
    );

}


/* =========================
   تغيير حالة الحجز
========================= */

function updateBookingStatus(
    id,
    status
) {

    bookings =
        bookings.map(
            booking => {

                if (
                    String(booking.id) ===
                    String(id)
                ) {

                    return {
                        ...booking,
                        status: status
                    };

                }

                return booking;

            }
        );


    localStorage.setItem(
        "workshopBookings",
        JSON.stringify(bookings)
    );


    renderBookings();

    updateCounters();

}


/* =========================
   العدادات
========================= */

function updateCounters() {

    document.getElementById(
        "allCount"
    ).textContent =
        bookings.length;


    document.getElementById(
        "pendingCount"
    ).textContent =
        bookings.filter(
            b =>
                (b.status || "pending")
                === "pending"
        ).length;


    document.getElementById(
        "confirmedCount"
    ).textContent =
        bookings.filter(
            b =>
                b.status === "confirmed"
        ).length;


    document.getElementById(
        "rejectedCount"
    ).textContent =
        bookings.filter(
            b =>
                b.status === "rejected"
        ).length;

}


/* =========================
   الفلاتر
========================= */

document
    .querySelectorAll(".filter")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(
                            ".filter"
                        )
                        .forEach(
                            b =>
                                b.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    this.classList.add(
                        "active"
                    );


                    currentFilter =
                        this.dataset.filter;


                    renderBookings();

                }
            );

        }
    );


updateCounters();

renderBookings();
