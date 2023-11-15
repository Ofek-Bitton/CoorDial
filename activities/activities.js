document.addEventListener("DOMContentLoaded", function () {
    const addActivityButton = document.querySelector(".add-activity-button");
    const addResponsibleButton = document.querySelector(".add-responsible-button");
    const activityCreateTextbox = document.querySelector(".activity-create-textbox");
    const activityIdeasList = document.querySelector(".activity-ideas-list");

    addActivityButton.addEventListener("click", function () {
        if (activityCreateTextbox.value.trim() !== "") {
            const newActivity = document.createElement("div");
            newActivity.classList.add("activity-idea");
            newActivity.innerHTML = `
                <span class="activity-text">${activityCreateTextbox.value}</span>
                <span class="like-icon" onclick="likeActivity(this)">👍</span>
                <span class="dislike-icon" onclick="dislikeActivity(this)">👎</span>
                <span class="like-count">0</span>
                <span class="dislike-count">0</span>
                <button class="add-responsible-button">+</button>
                <div class="responsible-list"></div>
            `;
            activityIdeasList.appendChild(newActivity);
            activityCreateTextbox.value = "";
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-responsible-button")) {
            const responsibleList = event.target.nextElementSibling;
            const responsibleDescription = document.createElement("div");
            responsibleDescription.classList.add("responsible-description");
            responsibleDescription.innerHTML = `
                <span class="responsible-text">Responsible ${responsibleList.children.length + 1}</span>
                <button class="delete-responsible-button" onclick="deleteResponsible(this)">X</button>
            `;
            responsibleList.appendChild(responsibleDescription);
        }
    });

});

function likeActivity(element) {
    const likeCount = element.parentElement.querySelector(".like-count");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function dislikeActivity(element) {
    const dislikeCount = element.parentElement.querySelector(".dislike-count");
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
}

function deleteResponsible(element) {
    const responsibleList = element.parentElement.parentElement;
    responsibleList.removeChild(element.parentElement);
    // Update the responsible numbers after deletion
    updateResponsibleNumbers(responsibleList);
}

function updateResponsibleNumbers(responsibleList) {
    const responsibleDescriptions = responsibleList.getElementsByClassName("responsible-description");
    for (let i = 0; i < responsibleDescriptions.length; i++) {
        const responsibleText = responsibleDescriptions[i].querySelector(".responsible-text");
        responsibleText.textContent = `Responsible ${i + 1}`;
    }
}