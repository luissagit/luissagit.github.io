const baseUrl = "https://api.football-data.org/v2";
const authToken = "7c3c13c4d2284fde9123543173d0b47d"
const progress = document.querySelector(".progress");


function status(response) {
	if (response.status !== 200) {
		console.log("Error : " + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log("Error : " + error);
	progress.style.display = "none";
}

function getPlayerInfo () {
	let urlParams = new URLSearchParams(window.location.search);
	let playerId = urlParams.get("id");
	
	if ('caches' in window) {
		caches.match(`${baseUrl}/players/${playerId}`).then(function(response) {
			if (response) {
				response.json()
				.then(function (data) {
					showPlayerInfo(data);
				})
			}
		})
	}
	
	fetch(`${baseUrl}/players/${playerId}`, {
		headers : {
			"X-Auth-Token": authToken
		}
	})
	.then(status)
	.then(json)
	.then(function(data) {
		showPlayerInfo(data);
	})
	.catch(error);
}

function reviewData(data) {
	if (data.name === null) {
		data.name = `<i>-</i>`;
	}
	if (data.firstName === null) {
		data.firstName = `<i>-</i>`;
	}
	if (data.lastName === null) {
		data.lastName = `<i>-</i>`;
	}
	if (data.dateOfBirth === null) {
		data.dateOfBirth = `<i>-</i>`;
	}
	if (data.countryOfBirth === null) {
		data.countryOfBirth = `<i>-</i>`;
	}
	if (data.nationality === null) {
		data.nationality = `<i>-</i>`;
	}
	if (data.position === null) {
		data.position = `<i>-</i>`;
	}
	if (data.shirtNumber === null) {
		data.shirtNumber = `<i>-</i>`;
	}
}

function backButtonClick() {
	const backButton = document.querySelector(".back-button");
	
	backButton.addEventListener("click", function(){
		window.history.back();
	})
}

function showPlayerInfo(data) {
	const bodyContent = document.querySelector("#body-content");
	let allPlayerInfo = ``;
	progress.style.display = "none";
	reviewData(data);
	allPlayerInfo += `
		<div class="squad-name">Name : ${data.name}</div>
		<div class="squad-name">First Name : ${data.firstName}</div>
		<div class="squad-name">Last Name : ${data.lastName}</div>
		<div class="squad-name">Date of Birth : ${data.dateOfBirth}</div>
		<div class="squad-name">Country of Birth : ${data.countryOfBirth}</div>
		<div class="squad-name">Nationality : ${data.nationality}</div>
		<div class="squad-name">Position : ${data.position}</div>
		<div class="squad-name">Shirt Number : ${data.shirtNumber}</div>
		<div class="jarak"><p></div>
	`;
	bodyContent.innerHTML = allPlayerInfo;
}