var webPush = require('web-push');
const vapidKeys = {
	"publicKey": "BA6MR_MCHAlFrtvuNwi_MpbWSUrQNAtPTTu9F_hVPQc8zxHuMk9ctNOQwKFC9eoNX4d4vEsUFPVLwD5UrjqLP1w",
	"privateKey": "g5gfk2vJn0A6FP6TLUvqbDolJ_NAe2C6L81pSkVj8Ro"
};
 
 
webPush.setVapidDetails(
	'mailto:casualulie@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

var pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/cnbop17EezY:APA91bG0gwuJ5h2qGCojqnokLy4tH7SNRJzD85_DjdHxdpwFPCq9nM5eFAYiggXU3jid0rVgUrGT4Usm9SuY_CNUcg3PbyekCMqIIAMESW36eJC6xGMih2fOYbv9fAWUJvkirRoaFpCl",
	"keys": {
		"p256dh": "BJU7QyqA9DhrAnTB4uKnpy/M0y4+jGL40NTvGwFNXD4jnUwuK4ZlLRwXClzOzXo0Tl1sEVqQuDExa/dYsvu3MHo=",
		"auth": "XyT2owXBD8oFfXJPMTUbkw=="
	}
};

var payload = 'Get Info with infootball!';

var options = {
	gcmAPIKey: '634160817015',
	TTL: 60
};

webPush.sendNotification(
	pushSubscription,
	payload,
	options
);