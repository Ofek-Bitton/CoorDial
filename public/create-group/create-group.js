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

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbGroupColRef = collection(db, "groups");

const groupList = document.querySelector(".group-list");
const groupAddBtn = document.querySelector(".add-group");
const username = document.querySelector(".username");
const groupTimeInput = document.querySelector(".create-group-time input");
const groupNameInput = document.querySelector(".create-group-name input");

groupAddBtn.addEventListener("click", addGroup);
username.innerText = "Welcome, " + sessionStorage.getItem("username") + "!";

// Load saved groups on page load
document.addEventListener("DOMContentLoaded", loadSavedGroups);

function getSavedGroups() {
	const savedGroupsString = localStorage.getItem("saved-groups");
	if (savedGroupsString) {
		// Convert the JSON string back to an array of objects
		return JSON.parse(savedGroupsString);
	} else {
		return [];
	}
}

function loadSavedGroups() {
	// const savedGroups = getSavedGroups();

	getDocs(dbGroupColRef).then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			const data = doc.data();
			const group = createGroupElement(
				groupNameInput.value,
				new Date(data.date)
			);
			group["dataId"] = doc.id;
		});
	});
}

function addGroup(event) {
	// const date = getDateString();
	// if (date === null) {
	// 	return;
	// }
	// console.log(date);

	// Create and append the group element

	const time = groupTimeInput.value;
	const date = new Date(time);

	const group = createGroupElement(groupNameInput.value, date);
	addDoc(dbGroupColRef, { name: groupNameInput.value, date: date }).then(
		(docRef) => {
			group["dataId"] = docRef.id;
		}
	);
	// Save the groups to localStorage
	saveGroups();
}

// Array to store the opened group windows
const openedGroupWindows = [];

function createGroupElement(name, date) {
	const group = document.createElement("div");
	group.classList.add("group");
	groupList.appendChild(group);

	const groupName = document.createElement("div");
	groupName.classList.add("group-name");
	groupName.innerText = name;
	group.appendChild(groupName);

	const groupDate = document.createElement("div");
	groupDate.classList.add("group-date");
	groupDate["dataDate"] = date;
	groupDate.innerText = toDateString(date);
	group.appendChild(groupDate);

	const removeBtn = document.createElement("button");
	removeBtn.innerText = "Remove";
	group.appendChild(removeBtn);

	// Function to open the group entry in a new window
	const openGroupEntry = () => {
		// const groupInfo = `Group Name: ${name}<br>Group Date: ${date}`;
		const groupInfo = { name: name, date: date };
		window.location.replace("../group-view/group-view.html");
		sessionStorage.setItem("groupInfo", JSON.stringify(groupInfo));
	};

	// Add the event listener to the "Remove" button
	removeBtn.addEventListener("click", (e) => {
		const groupToRemove = e.target.parentElement;

		const name = groupToRemove.querySelector(".group-name").innerText;
		const time = groupToRemove.querySelector(".group-date").dataDate;
		const docRef = doc(db, "groups", groupToRemove.dataId);

		groupToRemove.remove();
		// saveGroups();
	});

	// Create the "View Group" button
	const viewGroupBtn = document.createElement("button");
	viewGroupBtn.innerText = "View Group";
	group.appendChild(viewGroupBtn);

	// Add the event listener to the "View Group" button
	viewGroupBtn.addEventListener("click", openGroupEntry);
	return group;
}

function saveGroups() {
	const groupSave = [];
	for (let i = 0; i < groupList.children.length; i++) {
		// const name = groupList.children[i].querySelector(".group-name").innerText;
		// const time = groupList.children[i].querySelector(".group-date").dataDate;
	}
	// localStorage.setItem("saved-groups", JSON.stringify(groupSave));
}
function toDateString(date) {
	return date.toLocaleString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		day: "numeric",
		year: "2-digit",
		month: "numeric",
	});
}

function closeGroupWindows() {
	openedGroupWindows.forEach((window) => window.close());
	openedGroupWindows.length = 0;
}
