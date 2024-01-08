import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { firebaseConfig } from "../firebaseConfig.js";

/**
 * @typedef {HTMLElement & {groupName: String,groupDate:Date, groupId:any}} Group
 * @typedef {{name:String, password:String}} UserData
 * */


/**
 * @type {UserData}
 */
const userData = JSON.parse(sessionStorage.getItem("user-data"));
if (userData == null) {
	userData = {};
	console.error("User data was not found. Restart this session.");
}
if (userData.name === undefined) {
	console.error("No name in user data found.");
	userData["name"] = "NO_NAME";
}
if (userData.password === undefined) {
	console.error("No password in user data found.");
	userData["password"] = "NO_PASSWORD";
}

/**
 * @type {HTMLHeadingElement}
 */
const welcomeHeader = document.getElementById("welcome");
if (welcomeHeader == null) {
	console.error("Welcome header was not found.");
}
welcomeHeader.innerText = "Welcome, " + userData.name;
/**
 * @type {HTMLUListElement}
 */
const groupsList = document.getElementById("groups");
if (groupsList == null) {
	console.error("The list of groups was not found.");
}
/**
 * @type {HTMLInputElement}
 */
const newGroupName = document.getElementById("new-group-name");
if (newGroupName == null) {
	console.error(
		"The name of the new group in the group creation tab was not found."
	);
}
/**
 * @type {HTMLInputElement}
 */
const newGroupDate = document.getElementById("new-group-date");
if (newGroupDate == null) {
	console.error(
		"The date of the new group in the group creation tab was not found."
	);
}
/**
 * @type {HTMLButtonElement}
 */
const createGroupBtn = document.getElementById("create-group-btn");
if (createGroupBtn == null) {
	console.error(
		"The button for creating a new group was not found."
	);
}
createGroupBtn.addEventListener("click", (e) => {
	e.preventDefault();
	createGroup(newGroupName.value, new Date(newGroupDate.value));
});

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbGroupColRef = collection(db, "groups");

getDocs(dbGroupColRef).then((snapshot) => {
	snapshot.docs.forEach((doc) => {
		const data = doc.data();
		const group = createGroupElement(data.name, data.date.toDate());
		group["groupName"] = data.name;
		group["groupDate"] = data.date.toDate();
		group["groupId"] = doc.id;
		groupsList.appendChild(group);
	});
});

/**
 * Creates an element represenging a group. Does not add it to the DOM.
 * @param {string} name
 * @param {Date} date
 * @returns {HTMLElement}
 */
function createGroupElement(name, date) {
	const group = document.createElement("il");
	group.classList.add("s_group");
	group.classList.add("q_group");
	{
		const nameElement = document.createElement("h2");
		nameElement.classList.add("q_name");
		nameElement.innerText = name;
		group.appendChild(nameElement);

		const dateElement = document.createElement("h3");
		dateElement.classList.add("q_date");
		dateElement.innerText = date.toLocaleString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			day: "numeric",
			year: "2-digit",
			month: "numeric",
		});
		group.appendChild(dateElement);

		const enterBtn = document.createElement("button");
		enterBtn.innerText = "Enter";
		// Use closure to capture the group.
		enterBtn.addEventListener("click", (e) => enterGroup(group));
		group.appendChild(enterBtn);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("s_delete-btn");
		deleteBtn.innerText = "Delete";
		// Use closure to capture the group.
		deleteBtn.addEventListener("click", (e) => deleteGroup(group));
		group.appendChild(deleteBtn);
	}

	return group;
}
/**
 * @param {Group} group Group to enter into
 */
function enterGroup(group) {
	localStorage.setItem(
		"group-data",
		JSON.stringify({
			name: group.groupName,
			date: group.groupDate,
		})
	);
	document.location.href = "../group-view/group-view.html";
}
/**
 * Creates and add new group to the DOM.
 * @param {String} name
 * @param {Date} date
 */
function createGroup(name, date) {
	/**
	 * @type {Group}
	 */
	const group = createGroupElement(name, date);
	group["groupName"] = name;
	group["groupDate"] = date;

	addDoc(dbGroupColRef, { name: group.groupName, date: group.groupDate }).then(
		(docRef) => {
			group["groupId"] = docRef.id;
		}
	);

	groupsList.appendChild(group);
}
/**
 * @param {Group} group Group to delete.
 */
function deleteGroup(group) {
	const docRef = doc(db, "groups", group.groupId);
	deleteDoc(docRef);

	group.remove();
}
