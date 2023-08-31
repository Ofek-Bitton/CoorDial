// I'm sorry for anyone seeing this.

const userList = document.querySelector(".users-list");
const itemsList = document.querySelector(".items-list");
const addItemsDropdown = document.querySelector(".add-items-list");
// const unassignedFilterBtn = document.querySelector(".unassigned-filter");
const removeFiltersBtn = document.querySelector(".remove-filters");

// unassignedFilterBtn.addEventListener("click", unassignedFilterBtnClicked);
addItemsDropdown.addEventListener("change", addItem);

const availableItems = ["Gapple", "Bananaphone", "Ligma"];
const groupUsers = ["אנטון", "אופק", "אביאתר"];
const groupItemData = [
	{ user: "", itemName: "מים" },
	{ user: "אנטון", itemName: "עוגיות" },
	{ user: "אופק", itemName: "עוגיות" },
	{ user: "אביאתר", itemName: "תפוזים" },
	{ user: "אנטון", itemName: "דבק" },
];

setUsers();
function setUsers() {
	// Add logic to add user to userList.
	const username = sessionStorage.getItem("username");
	// if (!groupUsers.includes(username)) {
	// 	const header = document.querySelector("h1");
	// 	header.innerText = "YOU ARE NOT A MEMBER OF THIS GROUP! GET OUT!";
	// 	header.style.color = "red";
	// 	document.querySelector("main").style.display = "none";
	// 	return;
	// }
	// <il class="user">
	// 	<label class="group-user-name">אופק</label>
	// 	<button class="user-filter">סנן מוצרים</button>
	// </il>
	const userYou = document.createElement("il");
	userYou.classList.add("user");

	const name = document.createElement("label");
	name.classList.add("group-user-name");
	name.innerText = username;
	userYou.appendChild(name);

	const filterBtn = document.createElement("button");
	filterBtn.classList.add("user-filter");
	filterBtn.innerText = "סנן מוצרים";
	filterBtn.addEventListener("click", yourFilterBtnClicked);
	userYou.appendChild(filterBtn);

	userList.appendChild(userYou);
	for (let i = 0; i < groupUsers.length; i++) {
		const user = groupUsers[i];
		if (user === username) {
			continue;
		}

		const userContainer = document.createElement("il");
		userContainer.classList.add("user");

		const name = document.createElement("label");
		name.classList.add("group-user-name");
		name.innerText = user;
		userContainer.appendChild(name);

		const filterBtn = document.createElement("button");
		filterBtn.classList.add("user-filter");
		filterBtn.innerText = "סנן מוצרים";
		filterBtn.addEventListener("click", userFilterBtnClicked);
		userContainer.appendChild(filterBtn);
		userList.appendChild(userContainer);
	}
	setAddItems();
	setExistingItems();
}

function setAddItems() {
	for (let i = 0; i < availableItems.length; i++) {
		const item = availableItems[i];
		const option = document.createElement("option");
		option.value = item;
		option.text = item;
		addItemsDropdown.appendChild(option);
	}
}

function setExistingItems() {
	// <il class="item promised-item">
	//
	// 	<label>תפוזים</label>
	// 	<label class="item-user-name">אביאתר</label>
	// </il>;
	const username = sessionStorage.getItem("username");
	for (let i = 0; i < groupItemData.length; i++) {
		item = groupItemData[i];
		const itemContainer = document.createElement("il");
		itemContainer.classList.add("item");
		itemsList.appendChild(itemContainer);

		const nameLabel = document.createElement("label");
		nameLabel.classList.add("item-user-name");

		const itemName = document.createElement("label");
		itemName.innerText = item.itemName;

		if (item.user === "") {
			itemContainer.classList.add("unassigned-item");

			const promiseItem = document.createElement("button");
			promiseItem.classList.add("promise-item");
			promiseItem.innerText = "V";
			promiseItem.addEventListener("click", onPromisingItem);
			itemContainer.appendChild(promiseItem);
			nameLabel.innerText = "אף אחד";
		} else if (item.user === username) {
			itemContainer.classList.add("your-item");
			nameLabel.innerText = username+"(את/ה)";
		} else {
			itemContainer.classList.add("promised-item");
			nameLabel.innerText = item.user;
		}

		itemContainer.appendChild(itemName);

		itemContainer.appendChild(nameLabel);

		// const item = document.createElement("il");
	}
}
function addItem(event) {
	const value = addItemsDropdown.value;
	if (value === "") {
		return;
	}
	const option = addItemsDropdown.options[addItemsDropdown.selectedIndex];
	addItemsDropdown.value = "";
	option.remove();

	// <il class="item unassigned-item">
	// 	<button class="promise-item">V</button>
	// 	<label>מים</label>
	// 	<label class="item-user-name">אף אחד</label>
	// </il>

	const item = document.createElement("il");
	item.classList.add("item");
	item.classList.add("unassigned-item");

	const promiseItem = document.createElement("button");
	promiseItem.classList.add("promise-item");
	promiseItem.innerText = "V";
	promiseItem.addEventListener("click", onPromisingItem);
	item.appendChild(promiseItem);

	const itemName = document.createElement("label");
	itemName.innerText = value;
	item.appendChild(itemName);

	const userName = document.createElement("label");
	userName.innerText = "אף אחד";
	userName.classList.add("item-user-name");
	item.appendChild(userName);
	itemsList.prepend(item);
}
function onPromisingItem(event) {
	const item = event.target.parentElement;
	item.remove();
	event.target.remove();
	item.classList.remove("unassigned-item");
	item.classList.add("your-item");

	const userName = item.querySelector(".item-user-name");
	userName.innerText = sessionStorage.getItem("username") + "(את/ה)";

	itemsList.appendChild(item);
}
function userFilterBtnClicked(event) {
	const btn = event.target;
	const user = btn.closest(".user");
	if (btn.classList.contains("filter-on")) {
		removeFilters();
		btn.classList.remove("filter-on");
		return;
	}
	resetFilterDisplay();
	btn.classList.add("filter-on");
	applyFilter((item) => {
		if (!item.classList.contains("promised-item")) {
			return true;
		}
		const itemName = item.querySelector(".item-user-name").innerText;
		const userName = user.querySelector(".group-user-name").innerText;

		return itemName !== userName;
	});
}
function yourFilterBtnClicked(event) {
	const btn = event.target;
	const user = btn.closest(".user");
	if (btn.classList.contains("filter-on")) {
		removeFilters();
		btn.classList.remove("filter-on");
		return;
	}
	resetFilterDisplay();
	btn.classList.add("filter-on");
	applyFilter((item) => {
		return !item.classList.contains("your-item");
	});
}
// function unassignedFilterBtnClicked(event) {
// 	const btn = event.target;
// 	if (btn.classList.contains("filter-on")) {
// 		removeFilters();
// 		btn.classList.remove("filter-on");
// 		return;
// 	}
// 	resetFilterDisplay();
// 	btn.classList.add("filter-on");
// 	applyFilter((item) => {
// 		return item.classList.contains("unassigned-item");
// 	});
// }
// Take predicate that take the item as parameter.
// If it returns true the item will be hidden, otherwise display flex.
function applyFilter(predicate) {
	const children = itemsList.children;
	for (let i = 0; i < children.length; i++) {
		const result = predicate(children[i]);
		if (result) {
			children[i].style.display = "none";
			continue;
		}
		children[i].style.display = "flex";
	}
}
function removeFilters() {
	const children = itemsList.children;
	for (let i = 0; i < children.length; i++) {
		children[i].style.display = "flex";
	}
}
function resetFilterDisplay() {
	userList
		.querySelectorAll(".user-filter")
		.forEach((user) => user.classList.remove("filter-on"));
	unassignedFilterBtn.classList.remove("filter-on");
}
