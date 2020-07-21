/*
const CACHE_NAME = "submission2-v1.0.12";
const urlsToCache = [
	"/",
	"/manifest.json",
	"/nav.html", "/index.html", "/player.html", "/team.html",
	"/push.js",
	"/pages/home.html", "/pages/matches.html", "/pages/saved.html", "/pages/standings.html", "/pages/teams.html",
	"/css/materialize.min.css", "/css/materialize-icon.css", "/css/custom.css",
	"/js/materialize.min.js", "/js/nav.js", "/js/api.js", "/js/db.js", "/js/group.js", "/js/idb.js", "/js/register-sw.js", 
	"/js/view/about-champions.js", "/js/view/home.js", "/js/view/player-info.js", "/js/view/saved.js", "/js/view/show-matches.js", "/js/view/show-standings.js", "/js/view/show-team-list.js", "/js/view/team-info.js", 
	"/assets/images/for-carousel1.webp", "/assets/images/for-carousel2.webp", "/assets/images/for-carousel3.webp",
	"/assets/icons/unavailable.png", "/assets/icons/favicon.ico", "/assets/icons/icon-128x128.png", "/assets/icons/icon-144x144.png", "/assets/icons/icon-152x152.png", "/assets/icons/icon-192x192.png", "/assets/icons/icon-384x384.png", "/assets/icons/icon-512x512.png", "/assets/icons/icon-72x72.png", "/assets/icons/icon-96x96.png", 
	"/assets/font/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];
 
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function(event) {
	const baseUrl = "https://api.football-data.org/v2";
	if (event.request.url.indexOf(baseUrl) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function(cache) {
				return fetch(event.request).then(function(response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
				return response || fetch (event.request);
			})
		)
	}
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js');
 
const precachingUrl = [
	{url : '/', revision : '1'},
	{url : '/manifest.json', revision : '1'},
	{url : '/nav.html', revision : '1'}, {url : '/index.html', revision : '1'}, {url : '/player.html', revision : '1'}, {url : '/team.html', revision : '1'},
	{url : '/push.js', revision : '1'},
	{url : '/pages/home.html', revision : '1'}, {url : '/pages/matches.html', revision : '1'}, {url : '/pages/saved-matches.html', revision : '1'}, {url : '/pages/saved.html', revision : '1'}, {url : '/pages/standings.html', revision : '1'}, {url : '/pages/teams.html', revision : '1'},
	{url : '/css/materialize.min.css', revision : '1'}, {url : '/css/materialize-icon.css', revision : '1'}, {url : '/css/custom.css', revision : '1'},
	{url : '/js/materialize.min.js', revision : '1'}, {url : '/js/api.js', revision : '1'}, {url : '/js/db.js', revision : '1'}, {url : '/js/group.js', revision : '1'}, {url : '/js/idb.js', revision : '1'}, {url : 'js/nav.js', revision : '1'}, {url : '/js/register-sw.js', revision : '1'},
	{url : '/js/view/about-champions.js', revision : '1'}, {url : '/js/view/home.js', revision : '1'}, {url : '/js/view/player-info.js', revision : '1'}, {url : '/js/view/saved.js', revision : '1'}, {url : '/js/view/show-matches.js', revision : '1'}, {url : '/js/view/show-standings.js', revision : '1'}, {url : '/js/view/show-team-list.js', revision : '1'}, {url : '/js/view/team-info.js', revision : '1'}, 
	{url : '/assets/images/for-carousel1.webp'}, {url : '/assets/images/for-carousel2.webp'}, {url : '/assets/images/for-carousel3.webp'}, 
	{url : '/assets/icons/icon-128x128.png'}, {url : '/assets/icons/icon-144x144.png'}, {url : '/assets/icons/icon-152x152.png'}, {url : '/assets/icons/icon-192x192.png'}, {url : '/assets/icons/icon-384x384.png'}, {url : '/assets/icons/icon-512x512.png'}, {url : '/assets/icons/icon-72x72.png'}, {url : '/assets/icons/icon-96x96.png'}, {url : '/assets/icons/favicon.ico'}, {url : '/assets/icons/unavailable.png'}, 
	{url : '/assets/font/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision : '1'},
]


if (workbox) {
	console.log(`Workbox berhasil dimuat 🎉`);
	
	workbox.precaching.precacheAndRoute(precachingUrl, {ignoreURLParametersMatching: [/.*/]});
	
	workbox.routing.registerRoute(
		new RegExp('/pages/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'pages'
		})
	);
	
	workbox.routing.registerRoute(
		/\.(?:js)$/,
		workbox.strategies.cacheFirst({
			cacheName: 'javascript'
		})
	);
	
	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
		workbox.strategies.cacheFirst({
			cacheName: 'images',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
				}),
			],
		}),
	);
	
	workbox.routing.registerRoute(
		new RegExp('https://api.football-data.org/v2/'),
		workbox.strategies.staleWhileRevalidate()
	);
	
} else {
	console.log(`Workbox gagal dimuat 😬`);
}



self.addEventListener('push', function(event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'assets/icons/icon-128x128.png',
		badge: 'assets/icons/icon-96x96.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});