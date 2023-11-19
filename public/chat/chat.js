import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { firebaseConfig } from "../firebaseConfig.js";
import {
	getFirestore,
	collection,
	onSnapShot,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const messageList = document.getElementById("messages");
const messageText = document.getElementById("message-box");
const sendBtn = document.getElementById("send-message");

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbGroupColRef = collection(db, "messages");

// const socket = new WebSocket("ws://localhost:8080/ws");
// 
// socket.addEventListener("open", (event) => {
// 	console.log("Connected to WebSocket server");
// 	// socket.send("Hello, WebSocket server!");
// });
// 
// socket.addEventListener("message", (event) => {
// 	console.log(`Received: ${event.data}`);
// 	if (event.data === undefined) {
// 		return;
// 	}
// 	reciveMessage(event.data);
// });
// 
// socket.addEventListener("close", (event) => {
// 	console.log("WebSocket connection closed");
// });

sendBtn.addEventListener("click", sendMessage);

function loadChat() {
	// load 
}

function sendMessage(event) {
	const text = messageText.value;
	socket.send(text);
	const message = document.createElement("il");
	message.classList.add("message-container");
	{
		const content = document.createElement("div");
		content.classList.add("message-content");
		content.classList.add("your-message");
		content.innerText = text;
		message.appendChild(content);

		const senderName = document.createElement("label");
		
	}
	messageList.appendChild(message);
	// add message to database
}

function reciveMessage(data) {
	const message = document.createElement("il");
	message.classList.add("message-container");
	{
		const content = document.createElement("div");
		content.classList.add("message-content");
		content.innerText = data;
		message.appendChild(content);
	}
	messageList.appendChild(message);
}

// <li class="message-container">
// 	<div class="message-content">Content</div>
// 	<label>Sender Name</label>
// 	<label>Date</label>
// </li>

// python -m http.server 4000
