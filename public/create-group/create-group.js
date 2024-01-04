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
 */
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbGroupColRef = collection(db, "groups");

let userData = JSON.parse(localStorage.getItem("user-data"));
if (userData == null) {
	console.error("No user data found.");
	userData = { name: "NO_USER", password: "NO_USER" };
} else if (userData.name === undefined) {
	console.error("No name in user data found.");
	userData["name"] = "NO_NAME";
} else if (userData.password === undefined) {
	console.error("No password in user data found.");
	userData["password"] = "NO_PASSWORD";
}

/**
 * @type {HTMLHeadingElement}
 */
const welcomeHeader = document.getElementById("welcome");
welcomeHeader.innerText = "Welcome, " + userData.name;

const groupsList = document.getElementById("groups");
/**
 * @type {HTMLInputElement}
 */
const newGroupName = document.getElementById("new-group-name");
/**
 * @type {HTMLInputElement}
 */
const newGroupDate = document.getElementById("new-group-date");
/**
 * @type {HTMLButtonElement}
 */
const createGroupBtn = document.getElementById("create-group-btn");
createGroupBtn.addEventListener("click", createGroup);

getDocs(dbGroupColRef).then((snapshot) => {
	snapshot.docs.forEach((doc) => {
		const data = doc.data();
		const group = createGroupElement(data.name, data.date.toDate());
		group["groupId"] = doc.id;
		groupsList.appendChild(group);
	});
});

/**
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
		enterBtn.addEventListener("click", enterGroup);
		group.appendChild(enterBtn);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("s_delete-btn");
		deleteBtn.innerText = "Delete";
		deleteBtn.addEventListener("click", deleteGroup);
		group.appendChild(deleteBtn);
	}

	return group;
}
/**
 * @param {Event} event
 */
function enterGroup(event) {
	/**
	 * @type {Group}
	 */
	const group = event.target.closest(".q_group");
	localStorage.setItem(
		"group-data",
		JSON.stringify({
			name: group.groupName,
		})
	);
	document.location.href = "../group-view/group-view.html";
}
/**
 * @param {Event} event
 */
function createGroup(event) {
	const name = newGroupName.value;
	const date = new Date(newGroupDate.value);

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
 * @param {Event} event
 */
function deleteGroup(event) {
	/**
	 * @type {Group}
	 */
	const group = event.target.closest(".q_group");

	const docRef = doc(db, "groups", group.groupId);
	deleteDoc(docRef);

	group.remove();
}
