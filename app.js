function toggleMenu() {

    const menu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");

    if (!menu || !overlay) return;

    menu.classList.toggle("active");

    overlay.classList.toggle("active");

}
