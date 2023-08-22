const usersList = document.querySelector(".users-list");
const addUserBtn = document.querySelector(".add-user");
const myself = document.querySelector(".you");

{
	const username = myself.querySelector(".username");
	username.innerText = sessionStorage.getItem("username");

	const addItemBtn = myself.querySelector(".add-item");
	addItemBtn.addEventListener("click", addItemYourself);
}

addUserBtn.addEventListener("click", addUser);
function removeItem(event) {
	const bringItemsList = event.target.closest(".bring-items-list");
	const item = event.target.closest(".bring-item");
	item.remove();

	if (bringItemsList.childElementCount === 0) {
		bringItemsList.style.display = "none";
	}
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
function addItemYourself(event) {
	addItem(event);

	const deliveryStatus = document.createElement("input");
	deliveryStatus.classList.add("change-deliver");
	deliveryStatus.setAttribute("type", "checkbox");

	const bringItemsList = event.target.closest(".user").querySelector(".bring-items-list");
	bringItemsList.lastChild.querySelector(".delivery-status-container").prepend(deliveryStatus);
}
function addItem(event) {
	const user = event.target.closest(".user");
	const bringItemsList = user.querySelector(".bring-items-list");

	if (bringItemsList.childElementCount === 0) {
		bringItemsList.style.display = "flex";
	}

	const name = user.querySelector(".add-item-name");

	const itemElement = document.createElement("li");
	itemElement.classList.add("bring-item", "item-not-deliverd");

	const itemName = document.createElement("label");
	itemName.innerText = name.value;
	itemElement.appendChild(itemName);

	const deliveryStatusContainer = document.createElement("label");
	deliveryStatusContainer.classList.add("delivery-status-container");
	deliveryStatusContainer.addEventListener("click", onDeliveryStatusChanged);

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
function addUser(event) {
	// <il class="user">
	// 	<div class="user-info">
	// 		<label class="username">Name</label>
	// 		<button class="remove-user">
	// 			Remove
	// 		</button>
	// 	</div>
	// 	<ul class="bring-items-list">
	// 	</ul>
	// 	<input type="text" class="add-item-name"><button class="add-item">Add item</button>
	// </il>

	const user = document.createElement("il");
	user.classList.add("user");

	const userInfo = document.createElement("div");
	userInfo.classList.add("user-info");

	const username = document.createElement("label");
	username.classList.add("username");
	username.innerText = "[INSERT USERNAME HERE]";
	userInfo.appendChild(username);

	const removeUserBtn = document.createElement("button");
	removeUserBtn.classList.add("remove-user");
	removeUserBtn.innerText = "Remove";
	removeUserBtn.addEventListener("click",removeUser);
	userInfo.appendChild(removeUserBtn);

	user.appendChild(userInfo);

	const bringItemsList = document.createElement("ul");
	bringItemsList.classList.add("bring-items-list");
	user.appendChild(bringItemsList);

	const addItemName = document.createElement("input");
	addItemName.classList.add("add-item-name");
	addItemName.setAttribute("type", "text");
	user.appendChild(addItemName);

	const addItemBtn = document.createElement("button");
	addItemBtn.classList.add("add-item");
	addItemBtn.innerText = "Add item";
	addItemBtn.addEventListener("click", addItem);
	user.appendChild(addItemBtn);

	usersList.appendChild(user);
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
