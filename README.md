# Spotify stats

A simple dashboard/hobby project to explore your spotify libraries statistics.

(At least the stats made available through Spotify's Web API, no play count unfortunatley).

# Running locally

Register an app with Spotify, create a file in the root directory named
`settings.json` with the following:

```
{
	"private": {
		"spotify": {
			"clientId": "", // your clientId
			"clientSecret": "", // your client secret
			"redirectUri": "http://localhost:3000/callback"
		}
	}
}
```

Start the app and access from http://localhost:3000

`meteor run -s settings.json`
