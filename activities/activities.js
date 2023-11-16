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
                <span class="like-icon" >👍</span>
                <span class="dislike-icon">👎</span>
                <span class="like-count">0</span>
                <span class="dislike-count">0</span>
                <button class="add-responsible-button">+</button>
                <div class="responsible-list"></div>
            `;
            newActivity.querySelector(".like-icon").addEventListener("click", likeActivity);
            newActivity.querySelector(".dislike-icon").addEventListener("click", dislikeActivity);

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

/**
 * @param {MouseEvent} event 
 */
function likeActivity(event) {
    const activity = event.target.parentElement;
    const likeCount = event.target.parentElement.querySelector(".like-count");
    if (activity.classList.contains("activity-liked")) {
        activity.classList.remove("activity-liked");
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        return;
    } else if (activity.classList.contains("activity-disliked")) {
        const dislikeCount = event.target.parentElement.querySelector(".dislike-count");
        dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
        activity.classList.remove("activity-disliked");
    }
    
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    activity.classList.add("activity-liked");
}

/**
 * @param {MouseEvent} event 
 */
function dislikeActivity(event) {
    const activity = event.target.parentElement;
    const dislikeCount = event.target.parentElement.querySelector(".dislike-count");
    if (activity.classList.contains("activity-disliked")) {
        activity.classList.remove("activity-disliked");
        dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
        return;
    } else if (activity.classList.contains("activity-liked")) {
        const likeCount = event.target.parentElement.querySelector(".like-count");
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        activity.classList.remove("activity-liked");
    }
    
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
    activity.classList.add("activity-disliked");
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