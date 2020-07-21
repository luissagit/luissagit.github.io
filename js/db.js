const dbPromised = idb.open("infootball", 1, function (upgradeDb) {
    const teamDetailsObjectStore = upgradeDb.createObjectStore("team-info", {
        keyPath: "id"
    });
	
    teamDetailsObjectStore.createIndex("id", "id", { unique: true });

});

function error(error) {
	console.log(error);
}

function saveTeamForLater(teamInfo) {
	dbPromised
	.then(function (db) {
		const tx = db.transaction("team-info", "readwrite");
		const store = tx.objectStore("team-info");
		store.add(teamInfo);
		return tx.complete;
	})
	.then(function(data) {
		console.log(`team info has been saved`);
		M.toast({html: `Team info has been saved`});
	})
	.then(function() {
		const btnSave = document.getElementById("save");
		btnSave.style.display = "none";
	})
	.catch(function() {
		const btnSave = document.getElementById("save");
		btnSave.style.display = "none";
		M.toast({html: `Failed to save team info`});
	});
}


function delTeamById(team) {
	let urlParams = new URLSearchParams(window.location.search);
	let idParam = urlParams.get("id");
	let id = parseInt(idParam);
	
	return new Promise(function(resolve, reject) {
		dbPromised.then(function(db) {
			const tx = db.transaction("team-info", "readwrite");
			const store = tx.objectStore("team-info");
			store.delete(id);
			return tx.complete;
		})
		.then(function() {
			console.log('Item deleted');
			M.toast({html: `Team info has been deleted`});
		})
		.then(function() {
			setTimeout(() => {
				window.history.back();
			}, 2000);
			
		})
		.then(function() {
			const btnDel = document.getElementById("delete");
			btnDel.style.display = "none";
		})
		.catch(error);
	});
}

function getAll() {
	return new Promise(function(resolve, reject) {
		dbPromised
		.then(function(db) {
			const tx = db.transaction("team-info", "readonly");
			const store = tx.objectStore("team-info");
			return store.getAll();
		})
		.then(function(data) {
			resolve(data);
		});
	});
}

function getById(idParam) {
	return new Promise(function(resolve, reject) {
		dbPromised
		.then(function(db) {
			var tx = db.transaction("team-info", "readonly");
			var store = tx.objectStore("team-info");
			return store.get(idParam);
		})
		.then(function(data) {
			resolve(data);
		});
	});
}
