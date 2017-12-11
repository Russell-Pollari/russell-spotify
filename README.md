# Spotify stats

A simple dashboard to explore your spotify listening statistics.
(At least the stats that made available through Spotify's Web API)

Built with Meteor with the hope of building this into something bigger.

# Running locally

Register an app with Spotify

create a file name `settings.json`:

```
{
	"private": {
		"spotify": {
			"clientId": "",
			"clientSecret": "",
			"redirectUri": ""
		}
	}
}
```

`meteor run -s settings.json`
