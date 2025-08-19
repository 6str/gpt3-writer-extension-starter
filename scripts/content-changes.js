// Declare new function
const insert = (content) => {
	// Find Calmly editor input section
	const elements = document.getElementsByClassName("droid");
	console.log(elements)
	console.log(elements[0])

	let elements2 = document.getElementById("main");
	console.log(elements2)
	
	let elements3 = window.getSelection().anchorNode.parentNode.parentNode
	console.log(elements3)
	

	console.log("same:", elements == elements[0])

	// return	

	if (elements.length === 0) {
		return;
	}
	const element = elements3
	// orig code : const element = elements[0];
	// Grab the first p tag so we can replace it with our injection
	const pToRemove = element.childNodes[0];
	pToRemove.remove();


console.log("here1")

	// Split content by \n
	const splitContent = content.split('\n');

	// Wrap in p tags
	splitContent.forEach((content) => {
	const p = document.createElement('p');

console.log("here2")

	if (content === '') {
		const br = document.createElement('br');
		p.appendChild(br);
	} else {
		p.textContent = content;
	}

	// Insert into HTML one at a time
	element.appendChild(p);
	});

console.log("here3")

	// On success return true
	return true;
};

chrome.runtime.onMessage.addListener(
	// This is the message listener
	(request, sender, sendResponse) => {
		if (request.message === "inject") {
			const { content } = request;

			// Call this insert function
			const result = insert(content);

			// If something went wrong, send a failes status
			if (!result) {
				sendResponse({ status: "failed" });
			}

			sendResponse({ status: "success" });
		}
	}
);
