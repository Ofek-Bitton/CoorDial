const reminderBoard = document.querySelector(".reminder-board-content");
const reminderBoardAdd = document.querySelector(".reminder-board-add");

reminderBoardAdd.addEventListener("click", AddReminderNote);
function AddReminderNote(event) {
    const note = document.createElement("textarea");
    note.classList.add("reminder-board-note");
    reminderBoard.appendChild(note);
}

setGroupInfo();

function setGroupInfo() {
	const groupName = document.querySelector(".group-info-name");
	const groupDate = document.querySelector(".group-info-date");

	const groupInfoData = JSON.parse(sessionStorage.getItem("groupInfo"));
	groupName.innerHTML = `${groupInfoData.name}`;
	groupDate.innerHTML = `date: ${groupInfoData.date}`;

}