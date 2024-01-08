import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { firebaseConfig } from "../firebaseConfig.js";
import {
	getFirestore,
	collection,
	onSnapshot,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

/**
 * @typedef {{name:String, password:String}} UserData
 * @typedef {{user:String, date:number, text:String, docID:any, element:HTMLElement,hasBeenFound:bool}} MessageData
 */

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
const messageList = document.getElementById("messages");
const messageText = document.getElementById("message-box");
const sendBtn = document.getElementById("send-message");
/**
 * @type {Array<MessageData>}
 */
const messages = [];

sendBtn.addEventListener("click", () => {
	sendMessage(messageText.value, userData.name);
	messageText.value = "";
});

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "messages");

onSnapshot(colRef, (snapshot) => {
	snapshot.docs
		.sort((a, b) => {
			return a.data().date - b.data().date;
		})
		.forEach((doc) => {
			const data = doc.data();
			if (data.user == "") {
				return;
			}
			/**
			 * @type {MessageData}
			 */
			const msgData = {
				user: data.user,
				date: data.date,
				text: data.text,
				docID: doc.id,
				hasBeenFound: false,
			};
			if (hasMessage(messages, doc.id)) {
				msgData.hasBeenFound = true;
				return;
			}
			const message = createMessage(data.text, data.user);
			if (userData.name === data.user) {
				message.classList.add("s_your-message");
			}
			msgData.element = message;
			messages.push(msgData);
			messageList.appendChild(message);
		});
});
/**
 * @param {Array<MessageData>} messages
 * @param {any} id
 * @returns {bool}
 */
function hasMessage(messages, id) {
	for (let i = 0; i < messages.length; i++) {
		if (messages[i].docID === id) {
			return true;
		}
	}
	return false;
}
function sendMessage(text, user) {
	addDoc(colRef, { text: text, user: user, date: Date.now() });
}
function createMessage(text, name) {
	const message = document.createElement("il");
	message.classList.add("s_message-container");
	{
		const content = document.createElement("div");
		content.classList.add("s_message-content");
		content.innerText = text;
		message.appendChild(content);

		const user = document.createElement("label");
		user.classList.add("s_user");
		user.innerText = name;
		message.appendChild(user);
	}
	return message;
}
