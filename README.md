# 2PLAY

a full stack web application that "makes a mixtape" for you and your co-pilot. Created using Bootstrap, React MDB, React.js, CSS, HTML, JAVASCRIPT, jQuery, NPM, Node, Ajax/JSON, MySQL, Bootstrap 4, Handlebars, and APIs. 

## Table of Contents

- [Deployment](#Deployment)
- [About](#about)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support](#support)
- [Authors](#authors)

## Deployment

Deployed application: 

## About

2PLAY is an interactive app for building playlists, designed to help two people come to one mind on your music. 
We wanted our houses and road-trips to rock out to the same music that everyone agrees to. 

During quarantine our team has spent more time with our Co-Pilots, especially in the car. We created this site to let you and your co-pilot build a playlist for your quarantine 
adventures or relaxing at home together. We took the Spotify API and made a MixTape making app. The Spotify API does all the information gathering for you, but we took 
the experience and expanded on it ourselves using Node.js, Handlebars, and Javascript to make it server ready. Users will have the option to Create, Edit, or View playlists. 
They will also have the option to rate songs with a second user to finish their playlists so that both parties can agree on the final product.

## Usage

DEMO VIDEO COMING SOON

After hitting the "play" button on the landing page, the app will redirect the user to Spotify's login page. After logging in, the user will be redirected back to the app, where
they will be able to either create a room or enter an existing room. Having a room will allow the other user to login on the same server so both users can access different playlsits.
After either logging in or signing up, the user will either be able to create a new playlist, edit existing playlists, or view completed playlists.

- New Playlist: Criteria to create a new playlist will require the first user's name (Pilot), second user's name (Co-Pilot) and a name for the playlist.

- Edit Playlists: Both users can see what playlists still need to be finished. Upon creating a new playlist or editing an existing one, both users choose songs using the search form
requiring the name of a song and artist, or just the name of a song. Song suggestions will then appear in the middle column. When clicking the "Suggest" button next to the song, 
that song will then append to the left column that will then be available to rate from 1-5 stars. Both users have access to this for any song either user chooses. Once 12 songs have 
an average of 3.5 stars and up, those 12 songs will then be pushed to a completed playlist using a "Generate Playlist" button and stops users from adding more songs to that playlist.

- View Playlists: Both users can view completed playlists and a list of songs for each playlist follows. The user then has the option to push their playlist to their Spotify account.

## Roadmap

Future Development:

- Chat window for if not in the same room
- Push your playlist to Spotify for access through the app

## Support

Please [open an issue](https://github.com/92til-infinity/Project2x4/issues/new) for support.

## Authors

Alexandra Noto, Anthony Simone, Ryan Skog, and Scott Glover. 

## Application Requirements

* Must use MERN stack

* Must use a CSS framework _other than_ Bootstrap