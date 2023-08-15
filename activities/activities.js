const usersList = document.querySelector(".users-list");


for (let i = 0; usersList.childElementCount; i++) {
    const user = usersList.children[i];
    const bringItems = user.querySelector(".bring-items-list").children;
    for (let j = 0; j < bringItems.length; j++) {
        const changeDeliver = bringItems[j].querySelector(".change-deliver");
        changeDeliver.addEventListener("click", onDeliveryStatusChanged);
    }
}

function onDeliveryStatusChanged(event) {

}