const checkForKey = () => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(["openai-key"], (result) => {
			resolve(result["openai-key"]);
		});
	});
};

const encode = (input) => {
	return btoa(input);
};

const saveKey = () => {
	const input = document.getElementById("key_input");

	if (input) {
		const { value } = input;

		// Encode String
		const encodedValue = encode(value);

		// Save to google storage
		chrome.storage.local.set({ "openai-key": encodedValue }, () => {
			console.log("saved api key")
			document.getElementById("key_needed").style.display = "none";
			document.getElementById("key_entered").style.display = "block";
		});
	}
};

const changeKey = () => {
	document.getElementById("key_needed").style.display = "block";
	document.getElementById("key_entered").style.display = "none";
};

document.getElementById("save_key_button").addEventListener("click", saveKey);
document
	.getElementById("change_key_button")
	.addEventListener("click", changeKey);

checkForKey().then((response) => {
	if (response) {
		console.log("api key found")
		document.getElementById("key_needed").style.display = "none";
		document.getElementById("key_entered").style.display = "block";
	} else {
		console.log("no api key found")
	}
});
