// Declare new function
const insert = (content) => {
	// Find Calmly editor input section
	// const elements = document.getElementsByClassName("droid");

	// if (elements.length === 0) {
	// 	return;
	// }

	// const element = elements[0];
	// // Grab the first p tag so we can replace it with our injection
	// const pToRemove = element.childNodes[0];
	// pToRemove.remove();

	let mainDiv = window.getSelection().anchorNode
	//document.getElementById("main") 
	console.log(mainDiv)
	console.log("1:", mainDiv.tagName)
	console.log("2:", mainDiv.nodeName)
	console.log("3:", mainDiv.type)

	let mainDiv2 = window.getSelection().anchorNode.parentNode
	//document.getElementById("main") 
	console.log(mainDiv2)
	console.log("1a:", mainDiv2.tagName)
	console.log("2a:", mainDiv2.nodeName)
	console.log("3a:", mainDiv2.type)

	let mainDiv3 = window.getSelection().anchorNode.parentNode.parentNode
	//document.getElementById("main") 
	console.log(mainDiv3)
	console.log("1b:", mainDiv3.tagName)
	console.log("2b:", mainDiv3.nodeName)
	console.log("3b:", mainDiv3.type)

	let element1 = window.getSelection().anchorNode
	console.log("element:", element1);
	console.log("element type:", element1.type);
	console.log("element type:", element1.tagName);

	

	let element = window.getSelection().anchorNode.parentNode
	console.log("parent element:", element);
	console.log("parent element type:", element.type);
	
return

	// let pToRemove = window.getSelection().anchorNode;
	// window.getSelection().
	// console.log("p tag:", pToRemove);
	// pToRemove.remove();
	

	// Split content by \n
	const splitContent = content.split("\n");

	// Wrap in p tags
	splitContent.forEach((content) => {
		const p = document.createElement("p");

		if (content === "") {
			const br = document.createElement("br");
			p.appendChild(br);
		} else {
			p.textContent = content;
		}

		// Insert into HTML one at a time
		element.appendChild(p);
	});

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
