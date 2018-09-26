# Express/Passport with React
This version uses React to control the login requests and redirection in coordination with client-side routing.

We **STONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `person` table:

```SQL
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

CREATE TABLE "person" (
	"id" serial primary key,
	"username" varchar (240) UNIQUE, 
	"password" varchar (1024),
	"first_name" varchar (240), 
	"phone_number" int, 
	"image_path" varchar (500), 
	"household_id" int, 
	"role" int,
	"text_alert_walk" boolean default true, 
	"text_alert_fed" boolean default true,
	"text_alert_litterbox" boolean default true,
	"text_alert_medications" boolean default true,
	FOREIGN KEY (household_id) REFERENCES "households" (id),
	FOREIGN KEY (role) REFERENCES "roles" (id)
);
CREATE TABLE "roles" (
	"id" serial primary key,
	"role" varchar(240)
);
CREATE TABLE "pets" (
	"id" serial primary key, 
	"name" varchar (240), 
	"species_id" int, 
	"birthday" date, 
	"image_path" varchar (500), 
	"household_id" int, 
	FOREIGN KEY (species_id) REFERENCES "species" (id)
);

CREATE TABLE "households" (
	"id" serial primary key, 
	"primary_owner" int,
	"nickname" varchar (240) UNIQUE,
	FOREIGN KEY (primary_owner) REFERENCES "users" (id)
);

CREATE TABLE "species" (
	"id" serial primary key, 
	"species" varchar (240)
);

CREATE TABLE "activity_details" (
	"id" serial primary key, 
	"activity_id" int,
	"pet_id" int,
	"person_id" int,  
	"date" date, 
	"time" time, 
	"time_start" time, 
	"time_end" time, 
	"notes" varchar,
	"poop_check" boolean,
	FOREIGN KEY (activity_id) REFERENCES "activities" (id),
	FOREIGN KEY (pet_id) REFERENCES "pets" (id),
	FOREIGN KEY (owner_id) REFERENCES "users" (id)
);
CREATE TABLE "activities" (
	"id" serial primary key, 
	"type" varchar(240),
	"text_alerts" boolean,
	FOREIGN KEY (species) REFERENCES "species" (id)
);

CREATE TABLE "inbox" (
	"id" serial primary key, 
	"sender" int,
	"receiver" int,
	"message" varchar,
	FOREIGN KEY (sender) REFERENCES "person" (id),
	FOREIGN KEY (receiver) REFERENCES "person" (id)
);

CREATE TABLE "household_members" (
	"id" serial primary key,
	"member" int, 
	"household_id" int,
	FOREIGN KEY (member) REFERENCES "person" (id),
	FOREIGN KEY (household_id) REFERENCES "households" (id)
);
INSERT INTO "species" ("species") VALUES ('cat'), ('dog');
INSERT INTO "pets" ("name", "household_id", "species_id") VALUES ('reed', 1, 2), ('chicken', 1, 1), ('ouisey', 1, 2);
INSERT INTO "activities" ("type", "restrict_to_species") VALUES ('feeding', null), ('walking', 2), ('litterbox', 1), ('medications', null);
INSERT INTO "users" ("username") VALUES ('lars'); 

-- adding a feeding/medication/litterbox entry
INSERT INTO "activity_details" ("activity_id", "pet_id", "owner_id", "date", "time", "notes") VALUES (1, 2, 1, '09-12-18', '8:00am', 'eating went really well');
--adding a walk entry 
INSERT INTO "activity_details" ("activity_id", "pet_id", "owner_id", "date", "time_start", "time_end", "notes", "poop_check") VALUES (2, 1, 1, '09-12-2018', '7:00am', '7:30am', 'reed pulled a lot on his leash this morning. should work on more training on walks.', true); 

--creating a household -- occurs before a user is created and then a put request to add the user to the household? 
INSERT INTO "households" ("person_id", "nickname", "authorized") VALUES (2, 'Mackenzie-Records', true); 
INSERT INTO "roles" ("role") VALUES ('admin'), ('user'); 

SELECT "username", "id" FROM "person" WHERE "username" ILIKE 'Lars';

UPDATE "person" SET "household_id" = 3 WHERE "id" = 2;

INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes") VALUES (1, 2, 4, '12-01-2017', '12:00PM', 'this was good'); 
INSERT INTO "inbox" ("sender", "receiver", "message") VALUES (2, 10, 'hi there'); 
--testing to get all activities by species 
SELECT "pets"."name", "image_path", "activities"."id" as "activity", "medications" FROM "pets" JOIN "activities" ON "pets"."species_id" = "activities"."restrict_to_species" WHERE "household_id" = 17; 

SELECT "pets"."name", "pets"."image_path", "medications", "feeding", "litterbox", "walking" FROM "pets" JOIN "households" ON "pets"."household_id" = "households"."id" WHERE "households"."id" = 17;

SELECT "person"."id", "username", "first_name", "household_id", "image_path", "role", "text_alert_walk", "text_alert_fed", "text_alert_litterbox", "text_alert_medications", "households"."nickname" as "household_nickname" FROM person JOIN "households" ON "households"."id" = "person"."household_id" WHERE "person"."id" = 7;
SELECT "person"."id", "username", "first_name" FROM "person" WHERE "household_id" = 31;
UPDATE "pets" SET "image_path" = 'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg' WHERE "id" = 2; 
UPDATE "person" SET "image_path" = 'https://hubstaff-talent.s3.amazonaws.com/avatars/52d59f7a58d0ddfc27cce95abfe81170', "first_name" = 'Lars', "phone_number" = '+14139231552', "role" = '1' WHERE "id" = 2; 
UPDATE "person" SET "text_alert_litterbox" = true, "text_alert_medications" = false, "text_alert_walk" = true, "text_alert_fed" = true WHERE "id" = 2;
UPDATE "pets" SET "feeding" = true, "walking" = false, "litterbox" = true, "medications" = true WHERE "id" = 13; 

UPDATE "households" SET "authorized" = true WHERE "person_id" = 2 AND "id" = 3;
DELETE FROM "households" WHERE "person_id" = 3 AND "id" = 4;

SELECT "person"."id", "username", "first_name", "household_id", "phone_number", "image_path", "role", "text_alert_walk", "text_alert_fed", "text_alert_litterbox", "text_alert_medications", "households"."nickname" as "household_nickname", "households"."authorized" as "authorized" FROM person JOIN "households" ON "households"."id" = "person"."household_id" WHERE "person"."id" = 11;
UPDATE "person" SET "household_id" = 31 WHERE "id" = 10;  
SELECT "pets"."id", "pets"."name", "pets"."species_id", "pets"."birthday", "pets"."image_path", "pets"."household_id", "pets"."medications", "pets"."feeding", "pets"."walking", "pets"."litterbox" FROM "pets" JOIN "households" ON "pets"."household_id" = "households"."id" WHERE "households"."id" = $1;
SELECT "person"."id", "username", "first_name", "authorized" FROM "person" JOIN "households" ON "households"."id" = "person"."household_id" WHERE "household_id" = 31;

INSERT INTO "pets" ("name", "species_id", "birthday", "image_path", "household_id", "medications", "feeding", "litterbox", "walking") VALUES ('reed', 2, '12-01-2011', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCE8G24Fu4UsrfZl8M9pL9OX4zWwyUwGe2tlYgrORGKsllVPuw', 31, true, true, false, true);
INSERT INTO "activity_details" ("date", "time", "pet_id") VALUES ('09-15-2018', '09:00:00', 12); 

SELECT "time", "date", "pet_id" FROM "activity_details" WHERE "pet_id" = 12 AND "activity_id" = 4 ORDER BY "id" DESC LIMIT 1;

SELECT "receiver", "message", "inbox"."id", "first_name" as "sender", "archived" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."receiver" WHERE "archived" = false AND "receiver" = 2;

UPDATE "inbox" SET "archived" = true WHERE "id" = 1;
SELECT "id", "nickname" from "households" WHERE "nickname" ILIKE '%work%';
INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "time_start", "time_end", "notes", "poop_check") VALUES (2, 14, 2, '09-25-2018', '00:00:00', '09:00:00', '09:45:00', 'Reed behaved well this walk.', true); 
--reports data for feeding and litterbox: 
SELECT "pets"."name" as "pet_name", "time", "date", "person"."first_name" as "owner_name", "activities"."type" FROM "activity_details" JOIN "pets" ON "pets"."id" = "activity_details"."pet_id" JOIN "activities" ON "activities"."id" = "activity_details"."activity_id" JOIN "person" ON "activity_details"."person_id" = "person"."id" WHERE "activity_id" = 1 AND "pet_id" = 14; 
--reports data for walking and medications
SELECT "pets"."name" as "pet_name", "time", "time_end", "time_start", "medication_name", "poop_check", "notes", "date", "person"."first_name" as "owner_name", "activities"."type" FROM "activity_details" JOIN "pets" ON "pets"."id" = "activity_details"."pet_id" JOIN "activities" ON "activities"."id" = "activity_details"."activity_id" JOIN "person" ON "activity_details"."person_id" = "person"."id" WHERE "activity_id" = 1 AND "pet_id" = 14 ORDER BY "date" DESC LIMIT 5; 
SELECT * FROM "households" WHERE "person_id" = 2; 
INSERT INTO "household_members" ("member", "household_id") VALUES (2, 10); 
SELECT "person"."id", "username", "first_name", "household_members"."authorized", "phone_number", "role", "text_alert_walk", "text_alert_fed", "text_alert_litterbox", "text_alert_medications" FROM "person" JOIN "household_members" ON "household_members"."member" = "person"."id" WHERE "household_members"."household_id" = 31;
SELECT "household_id", "nickname" FROM "household_members" JOIN "households" ON "household_members"."household_id" = "households"."id" WHERE "member" = 10;
SELECT "household_members"."household_id", "username", "first_name" FROM "household_members" JOIN "person" ON "person"."id" = "household_members"."member" WHERE "member" = 2; 