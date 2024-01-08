// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import {
// 	getFirestore,
// 	collection,
// 	getDocs,
// } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// const col = collection(db, "groups");
// getDocs(col).then((snapshot)=> {console.log(snapshot.docs); })
// const analytics = getAnalytics(app);

/**
 * @type {HTMLButtonElement}
 */
const loginBtn = document.getElementById("login");
/**
 * @type {HTMLInputElement}
 */
const nameField = document.getElementById("name-field");
/**
 * @type {HTMLInputElement}
 */
const passwordField = document.getElementById("password-field");
/**
 * @param {MouseEvent} event
 */
function login(event) {
	if (nameField.value == "" || passwordField.value == "") {
		return;
	}
	event.preventDefault();
	sessionStorage.setItem(
		"user-data",
		JSON.stringify({ name: nameField.value, password: passwordField.value })
	);
	localStorage.setItem(
		"last-login",
		JSON.stringify({ name: nameField.value, password: passwordField.value })
	);
	document.location.href = "create-group/create-group.html";
}

const lastLogin = JSON.parse(localStorage.getItem("last-login"));

if (lastLogin != null) {
	nameField.value = lastLogin.name;
	passwordField.value = lastLogin.password;
}

loginBtn.addEventListener("click", login);
