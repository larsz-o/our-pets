CREATE TABLE person (
    "id" SERIAL PRIMARY KEY,
    "username" varchar (80) UNIQUE NOT NULL,
    "password" varchar (1000) NOT NULL,
	"first_name" varchar (240), 
	"phone_number" int, 
	"image_path" varchar (500), 
	"household_id" int, 
	"role" int,
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
	"person_id" int,
	"nickname" varchar (240),
    "authorized" boolean,
	FOREIGN KEY (person_id) REFERENCES "person" (id)
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
	FOREIGN KEY (person_id) REFERENCES "person" (id)
);
CREATE TABLE "activities" (
	"id" serial primary key, 
	"type" varchar(240),
	"restrict_to_species" int,
	"text_alerts" boolean,
	FOREIGN KEY (species) REFERENCES "species" (id)
);
INSERT INTO "species" ("species") VALUES ('cat'), ('dog');
INSERT INTO "pets" ("name", "household_id", "species_id") VALUES ('reed', 1, 2), ('chicken', 1, 1), ('ouisey', 1, 2);
INSERT INTO "activities" ("type", "restrict_to_species") VALUES ('feeding', null), ('walking', 2), ('litterbox', 1), ('medications', null);

-- adding a feeding/medication/litterbox entry
INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes") VALUES (1, 2, 1, '09-12-18', '8:00am', 'eating went really well');
--adding a walk entry 
INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time_start", "time_end", "notes", "poop_check") VALUES (2, 1, 1, '09-12-2018', '7:00am', '7:30am', 'reed pulled a lot on his leash this morning. should work on more training on walks.', true); 

--creating a household -- occurs before a user is created and then a put request to add the user to the household? 
INSERT INTO "households" ("person_id", "nickname", "authorized") VALUES (1, 'Mackenzie-Records', true); 