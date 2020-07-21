const progress = document.querySelector(".progress");

function error(error) {
	console.log("Error : " + error);
}

function init() {
	 M.AutoInit();
}

function getSaved(data) {
	fetch("../../pages/saved.html")
	.then(function() {
		progress.style.display = "none";
		const savedElem = document.querySelector("#saved-elem");
		let allSaved;		
		allSaved = `
			
		`;
		
		savedElem.innerHTML = allSaved;
	})
	.then(init)
	.catch(error);
}

export default getSaved;