const progress = document.querySelector(".progress");
import groupLabel from "../group.js"

function showStandings(data) {
	
	progress.style.display = "none";
	let allStandings = ``;
	for (let i = 0; i < groupLabel.length; i++) {
		allStandings += `<div class="group-label">${groupLabel[i].name}</div>`;
		data.standings.forEach(function(x) {
			if (x.type === "TOTAL" && x.group === groupLabel[i].id) {
				x.table.forEach(function(y) {
					let teamLogo = y.team.crestUrl;
					teamLogo = teamLogo.replace(/^http:\/\//i, 'https://');
					
					allStandings += `
						<div class="per-team">
							<div class="row custom-mb2 custom-bg">
								<div class="col s2 m1"><p class="pos">${y.position}</p></div>
								<div class="col s2 m1 mini-logo"><img class="std-icon" src="${teamLogo}" onError="this.onerror=null;this.src='../assets/icons/unavailable.png';"/></div>
								<div class="col s8 m10 team-name"><a href="./team.html?id=${y.team.id}">${y.team.name}</a></div>
							</div>
							<div class="row custom-mb all-det">
								<div class="col s2 det-1">
									<div class="row custom-mb det-std">
										<div class="col s12">GD</div><div class="col s12">${y.goalDifference}</div>
									</div>
								</div>
								<div class="col s2 det-1 ">
									<div class="row custom-mb det-std">
										<div class="col s12">GA</div><div class="col s12">${y.goalsAgainst}</div>
									</div>
								</div>
								<div class="col s2 det-1">
									<div class="row custom-mb det-std">
									<div class="col s12">GF</div><div class="col s12">${y.goalsFor}</div>
									</div>
								</div>
								<div class="col s2 det-1">
									<div class="row custom-mb det-std">
										<div class="col s12">Lost</div><div class="col s12">${y.lost}</div>
									</div>
								</div>
								<div class="col s2 det-1">
									<div class="row custom-mb det-std">
										<div class="col s12">Play</div><div class="col s12">${y.playedGames}</div>
									</div>
								</div>
								<div class="col s2 det-1">
									<div class="row custom-mb det-std">
										<div class="col s12">Pts</div><div class="col s12">${y.points}</div>
									</div>
								</div>
							</div>
						</div>
					`;
				})
			}
		})
	}
	standings.innerHTML = allStandings;
	data.standings.forEach(function(x) {
		if (x.type === "TOTAL") {
			x.table.forEach(function(y) {
			})
		}
	})
}

export default showStandings;