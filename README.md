# Vidar

Copyright (c) 2022-2023 [Antmicro](https://www.antmicro.com)

![Vidar](img/vidar-logo.png)

Vidar is a lightweight, open-source video sharing platform that allows you to quickly and easily host your video content with a minimal, straightforward setup that requires only one computer.
Designed especially for post-event video content dissemination, it is easily extendible and allows you to add other assets to accompany your videos (such as slideshows or presentation files).

## Features

- Show upcoming event on the main page
- Link to a page with presentations and attach them to events
- Add timestamps to your videos
- View events history
- Search events by name or speaker
- Categorize your materials using tags
- Filter events by tags, date, or speaker

## Technology

Vidar is built from reusable Svelte components.

Svelte is a web framework that allows developers to build highly performant web applications using a concise syntax.
Svelte's lightweight nature and focus on compile-time optimizations make it a great choice for easily maintainable and modifiable projects like Vidar.

Vidar stores all your event-related data in JSON files to provide a simple project structure and eliminate the need to develop complex backend solutions.

## Requirements

To install Vidar, you need the following packages:

| Package name | Version   |
| ------------ | --------- |
| Node         | >=18.9.0  |
| yarn         | >=1.22.19 |

You can install [node](https://nodejs.org/en/) using your distribution's package manager, for example in Debian:

```sh
apt install nodejs
```

To install [yarn](https://yarnpkg.com/), run the following command in your terminal:

```sh
npm install --global yarn
```

## Adding your own content

Information about events in Vidar is stored in `data.json` files, each in a separate subfolder, one per event, in the `event_data` directory.
You should add assets for each video to the folder containing the JSON file.
In the root folder, you can find `event-data-template.json`, which contains descriptions of each field making it easy to fill with your own data.
Remember to change the name of your newly created JSON file to `data.json` and place it in an appropriate folder in `event_data`.

### Adding upcoming events

The `upcoming` field refers to a video displayed on the main page as an upcoming event.
Upcoming events must have the `upcoming` field set to `true`.

If you want to add a link to a live stream of the upcoming event, you have to add the `livestream` property to your `data.json` file:

```json
"livestream": "link to the livestream"
```

### Defining the date and time of the event

The `datetime` field describes the time and date of the event using Unix time (e.g., January 1, 2022, 8 am in Unix time is 1641024000).
To convert your dates to Unix time, use the `date` command in your terminal:

```
date -d '01/01/2022 08:00:00' +'%s'
```

### Adding timestamps

The field timestamps describe sections of your video, which will be visible in the video player.
The start and end of the timestamp need to be expressed as seconds from the beginning of the video.

If you don't want to use timestamps, change `from` and `to` values to 0.
This will cause timestamps to not be visible in the video player.
Timestamps have to be defined, otherwise they will generate an error during the build process.

### Creating speaker profiles

After defining all of your events in the appropriate `data.json` files, you must add all of the speakers from the `authors` sections of all `data.json` files to the `authors.json` file, which must be placed in the `event_data` folder.

Adding a speaker to `authors.json` will enable you to click their name and visit their speaker profile with additional information about them.

If the speaker does not have an entry in `authors.json`, clicking their name will generate a page not found error.

In the root folder, you can find `authors-template.json`, which contains descriptions of each field making it easy to fill with your own data.
Remember to change the name of your JSON file to `authors.json` and place it in `event_data`.

### Generating tags

After you have filled the events' `data.json` files with your event data, you need to run the `GenerateTags.py` Python script located in the root folder to generate tags based on all the events' JSON files.

To run the `GenerateTags.py` script, use the following in the Vidar root directory:

```sh
python3 GenerateTags.py
```

You should run this script whenever you use a new tag in one of your `event_data` JSON files or with every new deployment to ensure everything works correctly.
Otherwise, the newly added tags will not be visible on the main page.

## Deployment

After filling the `data.json` files in the appropriate `event_data` subdirectories and the `authors.json` fils with your data and generating tags using the `GenerateTags.py` script, you can build Vidar.
To install the project's dependencies, run the following command in Vidar's root directory:

```sh
yarn install
```

Then, you can build Vidar using:

```sh
yarn build
```

## License

[Apache-2.0](LICENSE)
