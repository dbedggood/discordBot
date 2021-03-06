# Waery Discord Bot

## Setup

Make sure there is a `.env` file with appropriate API keys.
In the terminal run `npm i` to install dependencies.

Then run either:

- `npm run start` to start the bot regularly
- `npm run dev` to start the bot with nodemon

## Current Features

**Play Music**
When a user is in a voice channel, they can use the `play` command with a youtube video link to listen to the audio. Use `skip` to skip songs and `stop` to kick the bot from the voice channel.

This feature is a work in progress, I am planning to add:

- More controls
- Support to queue a whole playlist

I may also merge this command with the youtube search one so users do not need the youtube video url to play what they want.

**Youtube Search:**
A user can trigger a youtube video search by beginning their search with `yt`, the bot will take whatever comes after it and retrieve 5 matching videos to select from. The user can then reply with a number between 1-5 for a video URL in the chat.

**Dad Jokes:**
When a user mentions the work `joke`, the bot tells a random dad joke from icanhazdadjoke.com
Also if a user mentions any variation of the words `I am` or `I'm`, the bot will reply accordingly.

**Roasts:**
The `roast` command will trigger the bot to reply with a randomised insult.

**Roll a Random Number:**
Typing `roll` and a number will generate a random number from 1 to the number user entered.

**Weather:**
When using the command `weather` with a city name, the bot will return the current weather and temperature for the given city.

**XKCD:**
`xkcd` retrieves a random xkcd comic and posts it in the chat.

_More suggestions welcome!_

![Waery Emoji Icon](resources/waery.png 'Waery Emoji Icon')
