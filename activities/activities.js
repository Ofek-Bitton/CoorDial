const usersList = document.querySelector(".users-list");
const bringItemsList = document.querySelector(".bring-items-list");
const addUserBtn = document.querySelector(".add-user");
const addI = document.querySelector(".add-user");

for (let i = 0; i < usersList.childElementCount; i++) {
	const user = usersList.children[i];

	const removeUserBtn = user.querySelector(".remove-user");
	removeUserBtn.addEventListener("click", removeUser);

	const addItemBtn = user.querySelector(".add-item");
	addItemBtn.addEventListener("click", addItem);

}
function removeItem(event) {
	const item = event.target.closest(".bring-item");
	item.remove();
	// if (bringItemsList.childElementCount === 0) {
	// 	bringItemsList.style.display = "none";
	// }
}
/*
    <li class="bring-item item-not-deliverd">
		<label>Food</label>
		<label>
			<input class="change-deliver" type="checkbox">
			<span class="deliver-text">Not delivered</span>
		</label>
		<button class="remove-item">X</button>
	</li>
 */
function addItem(event) {
    if (bringItemsList.childElementCount===0) {
        bringItemsList.style.display = "flex";
    }

	const name = usersList.querySelector(".add-item-name");

	const itemElement = document.createElement("li");
	itemElement.classList.add("bring-item", "item-not-deliverd");

	const itemName = document.createElement("label");
	itemName.innerText = name.value;
	itemElement.appendChild(itemName);

	const deliveryStatusContainer = document.createElement("label");
	deliveryStatusContainer.addEventListener("click", onDeliveryStatusChanged);

	const deliveryStatus = document.createElement("input");
	deliveryStatus.classList.add("change-deliver");
	deliveryStatus.setAttribute("type", "checkbox");
	deliveryStatusContainer.appendChild(deliveryStatus);

	const deliveryStatusText = document.createElement("span");
	deliveryStatusText.classList.add("deliver-text");
	deliveryStatusText.innerText = "Not delivered";
	deliveryStatusContainer.appendChild(deliveryStatusText);

	itemElement.appendChild(deliveryStatusContainer);

	const removeItemBtn = document.createElement("button");
	removeItemBtn.classList.add("remove-item");
	removeItemBtn.innerText = "X";
	removeItemBtn.addEventListener("click", removeItem);
	itemElement.appendChild(removeItemBtn);

	bringItemsList.appendChild(itemElement);
}
function removeUser(event) {
	const user = event.target.closest(".user");
	user.remove();
}
function onDeliveryStatusChanged(event) {
	const itemBring = event.target.closest(".bring-item");
	if (event.target.checked) {
		itemBring.classList.remove("item-not-deliverd");
		itemBring.classList.add("item-deliverd");
		itemBring.querySelector(".deliver-text").innerText = "Delivered";
	} else {
		itemBring.classList.remove("item-deliverd");
		itemBring.classList.add("item-not-deliverd");
		itemBring.querySelector(".deliver-text").innerText = "Not delivered";
	}
}
