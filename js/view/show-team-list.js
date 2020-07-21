const league = "2001";
const progress = document.querySelector(".progress");

function showTeamList(data) {
	let allTeams = ``;
	data.standings.forEach(function(x) {
		if(x.type === "TOTAL") {
			x.table.forEach(function(y) {
				let teamLogo = y.team.crestUrl;
				teamLogo = teamLogo.replace(/^http:\/\//i, 'https://');
					
				progress.style.display = "none";
				const teamName = y.team.name.substring(0,14);
				allTeams += `
						<div class="team-container col s6 m3">
							<a href="./team.html?id=${y.team.id}">
								<div class="teams-logo-area"><img class ="teams-logo" src="${teamLogo}" onError="this.onerror=null;this.src='../assets/icons/unavailable.png';"/></div>
								<div class="teams-name"><p>${teamName}...</p></div>
							</a>
						</div>
				`;
			})
		}
	})
	teams.innerHTML = allTeams;
}

function showSavedTeamList(data) {
	let allTeams = ``;
	data.forEach(function(y) {
		let teamLogo = y.crestUrl;
		teamLogo = teamLogo.replace(/^http:\/\//i, 'https://');
		
		progress.style.display = "none";
		const teamName = y.name.substring(0,14);
		allTeams += `
			<div class="team-container col s6 m3">
				<a href="./team.html?id=${y.id}&saved=true">
					<div class="teams-logo-area"><img class ="teams-logo" src="${teamLogo}" onError="this.onerror=null;this.src='../assets/icons/unavailable.png';"/></div>
					<div class="teams-name"><p>${teamName}...</p></div>
				</a>
			</div>
		`;
	})
	teams.innerHTML = allTeams;
}

export { showTeamList, showSavedTeamList };