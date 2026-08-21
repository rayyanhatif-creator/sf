const profileForm =
    document.getElementById(
        "workshopProfileForm"
    );


let workshop =
    JSON.parse(
        localStorage.getItem(
            "workshopAccount"
        ) || "{}"
    );


/* =========================
   تحميل البيانات
========================= */

document.getElementById(
    "profileWorkshopName"
).value =
    workshop.workshopName || "";


document.getElementById(
    "profileOwnerName"
).value =
    workshop.ownerName || "";


document.getElementById(
    "profilePhone"
).value =
    workshop.phone || "";


document.getElementById(
    "profileLocation"
).value =
    workshop.location || "";


document.getElementById(
    "profileBio"
).value =
    workshop.bio || "";


document.getElementById(
    "profilePrice"
).value =
    workshop.price || 700;


document.getElementById(
    "profileService"
).value =
    workshop.service || "خرط السبح";


document.getElementById(
    "openingTime"
).value =
    workshop.openingTime || "16:00";


document.getElementById(
    "closingTime"
).value =
    workshop.closingTime || "23:00";


document.getElementById(
    "workshopVisible"
).checked =
    workshop.visible !== false;



/* =========================
   الصورة
========================= */

const imageInput =
    document.getElementById(
        "workshopImage"
    );


const imagePreview =
    document.getElementById(
        "imagePreview"
    );


if (workshop.image) {

    imagePreview.innerHTML = `

        <img
            src="${workshop.image}"
            alt="صورة الورشة">

    `;

}


imageInput.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];

        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                const image =
                    event.target.result;


                workshop.image =
                    image;


                imagePreview.innerHTML = `

                    <img
                        src="${image}"
                        alt="صورة الورشة">

                `;

            };


        reader.readAsDataURL(file);

    }
);



/* =========================
   حفظ
========================= */

profileForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        workshop.workshopName =
            document.getElementById(
                "profileWorkshopName"
            ).value.trim();


        workshop.ownerName =
            document.getElementById(
                "profileOwnerName"
            ).value.trim();


        workshop.phone =
            document.getElementById(
                "profilePhone"
            ).value.trim();


        workshop.location =
            document.getElementById(
                "profileLocation"
            ).value.trim();


        workshop.bio =
            document.getElementById(
                "profileBio"
            ).value.trim();


        workshop.price =
            document.getElementById(
                "profilePrice"
            ).value;


        workshop.service =
            document.getElementById(
                "profileService"
            ).value.trim();


        workshop.openingTime =
            document.getElementById(
                "openingTime"
            ).value;


        workshop.closingTime =
            document.getElementById(
                "closingTime"
            ).value;


        workshop.visible =
            document.getElementById(
                "workshopVisible"
            ).checked;


        localStorage.setItem(
            "workshopAccount",
            JSON.stringify(workshop)
        );


        const message =
            document.getElementById(
                "saveMessage"
            );


        message.textContent =
            "تم حفظ التغييرات ✓";


        setTimeout(
            () => {

                message.textContent = "";

            },
            3000
        );

    }
);
