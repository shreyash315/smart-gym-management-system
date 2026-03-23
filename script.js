function flipCard(){
document.getElementById("card").classList.toggle("flip");
}
function toggleDropdown() {
    document.getElementById("dropdownOptions").classList.toggle("show");
}

function selectRole(role, icon) {
    document.getElementById("selectedRole").innerText = "Login as " + role;

    document.querySelector(".selected i").className = "fa-solid " + icon;

    document.getElementById("dropdownOptions").classList.remove("show");
}
function openForgot() {
    document.getElementById("forgotModal").style.display = "flex";
}

function closeForgot() {
    document.getElementById("forgotModal").style.display = "none";
}