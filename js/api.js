const baseUrl = "https://api.football-data.org/v2";
const authToken = "7c3c13c4d2284fde9123543173d0b47d"
import groupLabel from "./group.js"
import showStandings from "./view/show-standings.js";
import showMatches from "./view/show-matches.js";
import { showTeamList, showSavedTeamList } from "./view/show-team-list.js";
const league = "2001";
const progress = document.querySelector(".progress");

const urlMatches = `${baseUrl}/matches`;
const urlStandings = `${baseUrl}/competitions/${league}/standings`;
const urlTeamList = `${baseUrl}/competitions/${league}/standings`;

const fetchApi = (url) => {    
	return fetch(url, {
		headers: {
			'X-Auth-Token': authToken
		}
	});
};

function status(response) {
	if (response.status !== 200) {
		console.log(`Error ${response.status}`);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log(`Error :  ${error}`);
	progress.style.display = "none";
}

const getMatches = () => {
	if ('caches' in window) {
		caches.match(`${baseUrl}/matches`).then(function(response) {
			if (response) {
				response.json()
				.then(function (data) {
					showMatches(data);
				});
			}
		})
	}
		
	fetchApi(urlMatches)
	.then(status)
	.then(json)
	.then(function(data) {
		showMatches(data);
	})
	.catch(error);
}

const getStandings = () => {
	
	if ('caches' in window) {
		caches.match(`${baseUrl}/competitions/${league}/standings`).then(function(response) {
			if (response) {
				response.json()
				.then(function (data) {
					showStandings(data);
				});
			}
		})
	}

	fetchApi(urlStandings)
	.then(status)
	.then(json)
	.then(function(data) {
		showStandings(data);
	})
	.catch(error);
}

const getTeamList = () => {
	const areaTeamList = document.getElementById("teams");
	let team_id;
	if ('caches' in window) {
		caches.match(`${baseUrl}/competitions/${league}/standings`).then(function(response) {
			if (response) {
				response.json()
				.then(function (data) {
					showTeamList(data);
				});
			}
		})
	}
	
	fetchApi(urlTeamList)
	.then(status)
	.then(json)
	.then(function(data) {
		showTeamList(data);
	})
	.catch(error);
}

function getSavedTeams() {
	getAll()
	.then(function(data) {
		if (data.length === 0) {
			teams.innerHTML = `<h4>You have not saved anything here</h4>`;
		} else {
			showSavedTeamList(data);
		}
		progress.style.display = "none";
	})
}



export {getMatches, getStandings, progress, getTeamList, getSavedTeams};