const surveyBtn = document.querySelector(".create-survey-btn");
const survey = document.querySelector(".create-survey");
const showSurveysBtn = document.querySelector(".show-surveys")
const surveyQuestionInput = document.querySelector(
	".create-survey-question input"
);
const surveyAnswerAdd = document.querySelector(".create-survey-answer-add");
const surveyCancel = document.querySelector(".create-survey-cancel");
const surveyPost = document.querySelector(".create-survey-post");
const surveyAnswerList = document.querySelector(".create-survey-answer-list");
const surveyList = document.querySelector(".survey-list");

showSurveysBtn.addEventListener("click", showSurveys);
surveyBtn.addEventListener("click", openSurvey);
surveyPost.addEventListener("click", postSurvey);
surveyAnswerAdd.addEventListener("click", addAnswer);
surveyCancel.addEventListener("click", cancelSurvey);

function showSurveys(event) {
	surveyBtn.style.display = "block";
	surveyList.style.display = "block";

	showSurveysBtn.innerText = "Hide surveys";
	showSurveysBtn.removeEventListener("click", showSurveys);
	showSurveysBtn.addEventListener("click", hideSurveys);
}
function hideSurveys(event) {
	surveyBtn.style.display = "none";
	surveyList.style.display = "none";

	showSurveysBtn.innerText = "Show surveys";
	showSurveysBtn.removeEventListener("click", hideSurveys);
	showSurveysBtn.addEventListener("click", showSurveys);
	cancelSurvey();
}
// Function to open the survey in a new window
function openSurvey(event) {
	surveyBtn.disabled = true;
	survey.style.display = "flex";
}
function addAnswer(event) {
	const surveyAnswer = document.createElement("div");
	surveyAnswer.classList.add("create-survey-answer");
	surveyAnswerList.appendChild(surveyAnswer);

	const surveyAnswerRemove = document.createElement("button");
	surveyAnswerRemove.classList.add("create-survey-answer-remove");
	surveyAnswerRemove.innerText = "X";
	surveyAnswerRemove.addEventListener("click", removeAnswer);
	surveyAnswer.appendChild(surveyAnswerRemove);

	const answerInput = document.createElement("input");
	surveyAnswer.appendChild(answerInput);
}
function removeAnswer(event) {
	const answer = event.target.closest(".create-survey-answer");
	answer.remove();
}
function postSurvey(event) {
	const question = surveyQuestionInput.value;
	if (question == "") {
		console.warn("Can't post survey without question.");
		return;
	}
	if (surveyAnswerList.childElementCount < 2) {
		console.warn("Can't post survey without at least two answer.");
		return;
	}
	// Add posting survey here.

	// <div class="survey">
	//     <div class="survey-question">
	//         Am I cool?
	//     </div>
	//     <ul class="survey-answer-list">
	//         <div class="survey-answer-container">
	//             <div class="survey-answer">
	//                 <input type="checkbox">
	//                 <label>Yes</label>
	//             </div>
	//             <div class="survey-answer-stats">
	//                 <progress min="0" max="100"></progress>
	//                 <label class="survey-answer-votes">32%</label>
	//             </div>
	//         </div>
	//     </ul>
	// </div>

	const surveyEntry = document.createElement("div");
	surveyEntry.classList.add("survey");
	surveyList.appendChild(surveyEntry);

	const surveyQuestion = document.createElement("label");
	surveyQuestion.innerText = question;
	surveyQuestion.classList.add("survey-question");
	surveyEntry.appendChild(surveyQuestion);

	const surveyAnswers = document.createElement("ul");
	surveyAnswers.classList.add("survey-answer-list");
	surveyEntry.appendChild(surveyAnswers);

	for (let i = 0; i < surveyAnswerList.childElementCount; i++) {
		const answer = surveyAnswerList.children[i].querySelector("input").value;

		const answerContainer = document.createElement("div");
		answerContainer.classList.add("survey-answer-container");
		surveyAnswers.appendChild(answerContainer);

		const surveyAnswer = document.createElement("div");
		surveyAnswer.classList.add("survey-answer");
		answerContainer.appendChild(surveyAnswer);

		const voteBtn = document.createElement("input");
		voteBtn.setAttribute("type", "checkbox");
		voteBtn.addEventListener("change", updateSurveyVotes);
		surveyAnswer.appendChild(voteBtn);

		const answerText = document.createElement("label");
		answerText.innerText = answer;
		surveyAnswer.appendChild(answerText);

		const answerStats = document.createElement("div");
		answerStats.classList.add("survey-answer-stats");
		answerContainer.appendChild(answerStats);

		const answerVoteBar = document.createElement("progress");
		answerVoteBar.setAttribute("min", "0");
		answerVoteBar.setAttribute("max", "100");
		answerVoteBar.setAttribute("value", "50");
		answerStats.appendChild(answerVoteBar);

		const votePrecentage = document.createElement("label");
		votePrecentage.classList.add("survey-answer-votes");
		votePrecentage.innerText = "50%";
		answerStats.appendChild(votePrecentage);
	}
	//
	surveyBtn.disabled = false;
	survey.style.display = "none";

	resetSurvey();
}
function cancelSurvey() {
	surveyBtn.disabled = false;
	survey.style.display = "none";

	resetSurvey();
}
function resetSurvey() {
	surveyQuestionInput.value = "";
	surveyAnswerList.innerHTML = "";
}
function updateSurveyVotes(event) {
	const list = event.target.closest(".survey-answer-list");
	let total = 0;
	const answers = list.querySelectorAll(".survey-answer input");
	for (let i = 0; i < answers.length; i++){
		const answer = answers[i];
		if (answer.checked) {
			total += 1;
		}
	}
	for (let i = 0; i < list.childElementCount; i++){
		
	}
}