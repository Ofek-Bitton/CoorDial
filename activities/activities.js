// I'm sorry for anyone seeing this.

const userList = document.querySelector(".users-list");
const itemsList = document.querySelector(".items-list");
const unassignedFilterBtn = document.querySelector(".unassigned-filter");
const removeFiltersBtn = document.querySelector(".remove-filters");

unassignedFilterBtn.addEventListener("click", unassignedFilterBtnClicked);

setUsers();
function setUsers() {
	// Add logic to add user to userList.

	// Subscribe to click event on filters.
	const you = userList.children[0];
	const btn = you.querySelector(".user-filter");
	btn.addEventListener("click", yourFilterBtnClicked);

	for (let i = 1; i < userList.children.length; i++) {
		const user = userList.children[i];
		const btn = user.querySelector(".user-filter");
		btn.addEventListener("click", userFilterBtnClicked);
	}
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
function unassignedFilterBtnClicked(event) {
	const btn = event.target;
	if (btn.classList.contains("filter-on")) {
		removeFilters();
		btn.classList.remove("filter-on");
		return;
	}
	resetFilterDisplay();
	btn.classList.add("filter-on");
	applyFilter((item) => {
		return item.classList.contains("unassigned-item");
	});
}
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
