const progress = document.querySelector(".progress");

function showMatches(data) {
	let allMatches = ``;
	const matchesArea = document.getElementById("matches");
	data.matches.forEach(function(matches) {
		let score = matches.score;
		let awayTeamScore = (matches.score.extraTime.awayTeam + matches.score.fullTime.awayTeam + score.halfTime.awayTeam);
		let homeTeamScore = (matches.score.extraTime.homeTeam + matches.score.fullTime.homeTeam + score.halfTime.homeTeam);
		let areaImg = matches.competition.area.ensignUrl;
		let compName = matches.competition.name;
		let lastUpdated = matches.lastUpdated.substring(0, 10);
		
		
		progress.style.display = "none";
		allMatches += `
			<div class="col s12 m6 custom-mb">
				<div class="per-matches">
					<div class="row custom-mb team-link">
						<div class="col s5"><p class="pos">${awayTeamScore}</p><br><a href="./team.html?id=${matches.awayTeam.id}">${matches.awayTeam.name}</a></div>
						<div class="col s2"><br>VS</div>
						<div class="col s5"><p class="pos">${homeTeamScore}</p><br><a href="./team.html?id=${matches.homeTeam.id}">${matches.homeTeam.name}</a></div>	
					</div>
					<div class="comp-info">
						<img src="${areaImg}" class="area-icon cust-icon" onError="this.onerror=null;this.src='../assets/icons/unavailable.png';"/> <span class="comp-name">${compName}</span>
					</div>
					<div class="comp-detail">
						<div class="comp-date">
							<i class="cust-icon small material-icons">date_range</i><div class="date-det">${matches.season.startDate} to ${matches.season.endDate}</div>
						</div>
						<div class="matchday">Current Matchday : ${matches.season.currentMatchday}</div>
						<div class="match-status">Status : ${matches.status}</div>
						<div class="row custom-mb">
							<div class="col s12">
								<div class="last-update">Last Update : ${lastUpdated}</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		`;
	})
	
	matchesArea.innerHTML = allMatches;
}

export default showMatches;