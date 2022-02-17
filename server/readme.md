# nativeflix-server
:warning: Currently works only on windows.  

This is the back-end wrapper for the [nativeflix app](https://github.com/msmaiaa/nativeflix). It basically talks with the app through sockets, streams the magnet using [peerflix](https://github.com/mafintosh/peerflix) and its opened on a electron based video player, giving the user full control of the player without need to being on the computer.

## Features

* Auto download the best subtitles based on the given language from the opensubtitles api
* Clears the download cache after the player is closed
* Listens for the app commands to control the window (pause, close, etc)


## Preview
![gif1](./src/assets/gif/server1.gif)
![gif2](./src/assets/gif/server2.gif)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.  

```bash
npm install
```

Create the .env file on the root of the project and put the information based on the example below

```bash
LOGIN=<opensubtitles login>
PASS=<opensubtitles password>
PORT=<port>
torrentsPath=<G:/torrents/movies>
subtitlesLanguage=<iso639-1 or iso639-2 code (use pob for pt-br)>
```

## Usage

To start the app:
```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[here](https://github.com/msmaiaa/nativeflix-server/blob/main/LICENSE)
