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
let selectedRole = "Admin"; // default

function toggleDropdown() {
    document.getElementById("dropdownOptions").classList.toggle("show");
}

function selectRole(role, icon) {
    selectedRole = role;

    document.getElementById("selectedRole").innerText = "Login as " + role;

    document.querySelector(".selected i").className = "fa-solid " + icon;

    document.getElementById("dropdownOptions").classList.remove("show");
}

// MAIN LOGIN FUNCTION
function handleLogin() {
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    // Simple role-based redirection
    if (selectedRole === "Admin") {
        window.location.href = "main.html";
    } 
    else if (selectedRole === "Manager") {
        window.location.href = "manager.html";
    } 
    else if (selectedRole === "Member") {
        window.location.href = "member.html";
    }
}
function handleSignup() {
    alert("Account created successfully! You can now login.");
}
function sendResetLink() {
    alert("Password reset link has been sent to your email!");

    // Close modal after sending
    closeForgot();
}