function preventDefaultBehavior(e) {
	e.preventDefault();
	e.stopPropagation();
}

// Handle the file drop event
function handleFileDrop(e) {
	preventDefaultBehavior(e);

	const files = e.dataTransfer.files;

	for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageURL = URL.createObjectURL(file);
        const imageList = document.querySelector('.gallery-photos-grid');
        const imageElement = document.createElement("img");
        imageElement.classList.add("gallery-photo");

        imageElement.src = imageURL;
        imageElement.alt = file.name;
        imageList.appendChild(imageElement);
	}
}
function handleFileSelect(e) {
	preventDefaultBehavior(e);

	const files = e.target.files;

	for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageURL = URL.createObjectURL(file);
        const imageList = document.querySelector('.gallery-photos-grid');
        const imageElement = document.createElement("img");
        imageElement.classList.add("gallery-photo");

        imageElement.src = imageURL;
        imageElement.alt = file.name;
        imageList.appendChild(imageElement);
    }
    e.target.value="";
}

// Set up event listeners
const imageUpload = document.querySelector(".upload-image");
imageUpload.addEventListener("dragenter", preventDefaultBehavior);
imageUpload.addEventListener("dragover", preventDefaultBehavior);
imageUpload.addEventListener("drop", handleFileDrop);
imageUpload.addEventListener("change", handleFileSelect);
