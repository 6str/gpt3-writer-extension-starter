// Function to get + decode API key
const getKey = () => {
	console.log("get API key");
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(["openai-key"], (result) => {
			if (result["openai-key"]) {
				const decodedKey = atob(result["openai-key"]);
				resolve(decodedKey);
			}
		});
	});
};

const sendMessage = (content) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const activeTab = tabs[0].id;

		chrome.tabs.sendMessage(
			activeTab,
			{ message: "inject", content },
			(response) => {
				if (response.status === "failed") {
					console.log("injection failed.");
				}
			}
		);
	});
};

const generate = async (prompt) => {
	// Get your API key from storage
	const key = await getKey();
	const url = "https://api.openai.com/v1/completions";

	// Call completions endpoint
	console.log("AI generating ....");
	const completionResponse = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify({
			model: "text-davinci-003",
			prompt: prompt,
			max_tokens: 1250,
			temperature: 0.7,
		}),
	});

	// Select the top choice and send back
	const completion = await completionResponse.json();
	return completion.choices.pop();
};

const generateCompletionAction = async (info) => {
	try {
		// Send mesage with generating text (this will be like a loading indicator)
		sendMessage("generating...");

		const { selectionText } = info;
		// const basePromptPrefix = `
        // Write me a detailed table of contents for a blog post with the title below.
              
        // Title:
        // `;

		const basePromptPrefix = `Provide info about or answer question from the following text :
        `;


		const baseCompletion = await generate(
			`${basePromptPrefix}${selectionText}`
		);

		// added for single pass
		console.log(baseCompletion.text);
        // Send the output when we're all done
        sendMessage(baseCompletion.text);

		// // Add your second prompt here
		// const secondPrompt = `
        // Take the table of contents and title of the blog post below and generate a blog post written in thwe style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.
        
        // Title: ${selectionText}
        
        // Table of Contents: ${baseCompletion.text}
        
        // Blog Post:
        // `;

		// // Call your second prompt
		// const secondPromptCompletion = await generate(secondPrompt);
		// console.log(secondPromptCompletion.text);
        // // Send the output when we're all done
        // sendMessage(secondPromptCompletion.text);


	} catch (error) {
		console.log(error);
        // Add this here as well to see if we run into any errors!
        sendMessage(error.toString());
	}
};

// context menu option
chrome.contextMenus.create({
	id: "context-run",
	title: "Generate blog post",
	contexts: ["selection"],
});

// Add listener
chrome.contextMenus.onClicked.addListener(generateCompletionAction);
