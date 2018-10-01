# Our Pets
A React.js mobile first web application to help people communicate about daily pet care. 

## Built With
    * React.js
    * React-Redux
    * Redux-Sagas
    * Node.js
    * Express 
    * Material UI
    * PostgreSQL
    * Passport 
    * Moment.js
    * Twilio 
    * Filestack 
    * SweetAlerts

## Getting Started

### Setup
Create a new database called `our_pets`. 

Use the database.sql file to create all of the tables you will need to run this project.

* Start postgres if not running already by using `brew services start postgresql`
* `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* `npm run server`

* Now that the server is running, start the client
`npm run client`

* Navigate to `localhost:3000`

## Screenshots
![ScreenShot of Dashboard View](https://github.com/larsz-o/our-pets/blob/master/screenshots/dashboard-view.png)![ScreenShot of Dashboard View](https://github.com/larsz-o/our-pets/blob/master/screenshots/inbox-view.png)

![ScreenShot of Dashboard View](https://github.com/larsz-o/our-pets/blob/master/screenshots/edit-notifications-view.png)![ScreenShot of Dashboard View](https://github.com/larsz-o/our-pets/blob/master/screenshots/manage-households-view.png)



## Completed Features
- [x] Users can register for an account and create a new household or join an existing household. 
- [x] Upon registering, they can add all of the pets in their household -- entering information about the pet's species, its name, birthday, and upload a picture of the pet for its profile. 
- [x] Users can also search for existing users, for instance, a pet-sitter with an account, on the site to add to their household. 
- [x] Users can be a part of multiple households and switch between households as they use the app. 
- [x] The dashboard view features photos and activity buttons for all of the pets for the household they are currently managing.
- [x] Users can log when pets in their household have been fed, walked, had their litterboxes changed, or been given medications. 
- [x] When a user logs an activity, the date and time are automatically captured and the dashboard is updated to reflect the last time that this activity occurred. A text message is also sent to all other users in that household if they have opted-in to text message alerts.
- [x] Users can decide which activities they'd like text messages updates for, and for which pets.
- [x] Users can always see a log of the last activity data on their dasboard and a report of anywhere from 5-30 of the last data points for each activity for each pet on the pet's profile page. 
- [x] Users can be invited to a household, or request to join a household. This is all managed through the internal messaging system. 
- [x] The messaging system allows users to send messages to anyone else in any of their shared households and to reply to messages send to them by other users. 
- [x] Users can also upload photos to messages. This is especially great for pet sitters who want to send a quick update pet owners. 
- [x] Users can update their personal user photos and their pet photos. 
- [x] Household administrators are able to approve new household members or remove existing household members. 

## Author
* @larsz-o, Lars Mackenzie 



