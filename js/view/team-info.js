const baseUrl = "https://api.football-data.org/v2";
const authToken = "7c3c13c4d2284fde9123543173d0b47d"
const progress = document.querySelector(".progress");
const bodyContent = document.querySelector("#body-content");

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

const getTeamInfo = () => {
	return new Promise(function(resolve, reject) {
		let urlParams = new URLSearchParams(window.location.search);
		let team_id = urlParams.get("id");
		
		if ('caches' in window) {
			caches.match(`${baseUrl}/teams/${team_id}`).then(function(response) {
				if (response) {
					response.json()
					.then(function (data) {
						showTeamInfo(data);
						resolve(data);
					})
				}
			})
		}
		
		fetch(`${baseUrl}/teams/${team_id}`, {
			headers : {
				"X-Auth-Token": authToken
			}
		})
		.then(status)
		.then(json)
		.then(function(data) {
			showTeamInfo(data);
			resolve(data);
		})
		.catch(error);
	});
}

const getSavedTeamInfo = () => {
	let urlParams = new URLSearchParams(window.location.search);
	let idParam = urlParams.get("id");
	let id = parseInt(idParam);
	
	getById(id).then(function(data) {
		showTeamInfo(data);
	});
}

function reviewData(data) {
	if (data.clubColors === null) {
		data.clubColors = `<i>unavailable</i>`;
	}
	if (data.venue === null) {
		data.venue = `<i>unavailable</i>`;
	}
	if (data.website === null) {
		data.website = `<i>unavailable</i>`;
	}
	if (data.phone === null) {
		data.phone = `<i>unavailable</i>`;
	}
	if (data.email === null) {
		data.email = `<i>unavailable</i>`;
	}
}

function backButtonClick() {
	const backButton = document.querySelector(".back-button");
	
	backButton.addEventListener("click", function(){
		window.history.back();
	})
}

function showTeamInfo(data) {	
	let allTeamInfo =``;
	
	reviewData(data);
	progress.style.display = "none";
	
	allTeamInfo += `
		<div class="team-identity">
			<div class="row">
				<div class="team-identitiy-logo col s12 m4">
					<img src="${data.crestUrl}" onError="this.onerror=null;this.src='../../assets/icons/unavailable.png';"/>
				</div>
				<div class="team-identitiy-detail col s12 m8 row">
					<div class"col s12">
						<p>Name : ${data.name}</p>
						<p>Short Name : ${data.shortName}</p>
						<p>Venue : ${data.venue}</p>
						<p>Colors : ${data.clubColors}</p>
						<div class="divider"></div>
						<p><i class="material-icons tiny">link</i> <a href="${data.website}" target="_blank">${data.website}</a></p>
						<p><i class="material-icons tiny">phone</i> ${data.phone}</p>
						<p><i class="material-icons tiny">email</i> ${data.email}</p>
					</div>
				</div>
			</div>
		</div>
	`;
	
	
	data.squad.forEach(function(squad) {
		allTeamInfo += `
			<div class="squad-name">${squad.name}<a href="./player.html?id=${squad.id}"><i id="myBtn" class="small material-icons right">info_outline</i></a></div>
		`;
	})
		
		allTeamInfo += `<p>`;
		
	bodyContent.innerHTML = allTeamInfo;
	
}