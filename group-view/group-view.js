// group-view.js
const surveyButton = document.querySelector(".survey-button");
const survey = document.querySelector(".create-survey");

// Function to open the survey in a new window
function openSurvey() {
    // Replace the URL below with the URL of your survey
    //   const surveyURL = "https://example.com/survey";
    //   window.open(surveyURL, "_blank");
    survey.style.display = "flex";
}

// Function to enable/disable the survey button
function toggleSurveyButton(enabled) {
    surveyButton.disabled = !enabled;
}

// Add click event listener to the survey button
surveyButton.addEventListener("click", openSurvey);

// Simulate group creation and update the survey button state
function simulateGroupCreation() {
    // Simulate a group being added to the group-info div
    const groupInfo = document.querySelector(".group-info");
    groupInfo.innerHTML = sessionStorage.getItem("groupInfo");

    // Enable the survey button since there's a group with information
    toggleSurveyButton(true);
}

// Call the simulation function to demonstrate the enabled survey button
simulateGroupCreation();
