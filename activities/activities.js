const username = document.querySelector(".username");
const password = document.querySelector(".password");
const enterBtn = document.querySelector(".login-enter");

enterBtn.addEventListener("click",login);

function login(event){
    event.preventDefault();
    sessionStorage.setItem("username", username.value);
    sessionStorage.setItem("password", password.value);
    window.location.replace("../create-group/create-group.html");
}