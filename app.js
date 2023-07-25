btnSignIn = document.querySelector(".sign-in");
newBtn = document.querySelector(".create-new");
welcomePage = document.querySelector(".welcome-page");
signInPage = document.querySelector(".sign-in-page");
newPage = document.querySelector(".create-new-page");

btnSignIn.addEventListener("click", signIn);
newBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    newPage.style = "display: flex";
    welcomePage.style.display = "none";
});

function signIn(event) {
    event.preventDefault();
    signInPage.style = "display: flex";
    welcomePage.style.display = "none";
}
function login(event){

}
// div=document.querySelector(".div-temp");


