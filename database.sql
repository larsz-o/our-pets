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
	"nickname" varchar (240) UNIQUE,
    "description" varchar (500)
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
	"notes" varchar,
	"poop_check" boolean,
    "medication_name" varchar (500),
	FOREIGN KEY (activity_id) REFERENCES "activities" (id),
	FOREIGN KEY (pet_id) REFERENCES "pets" (id),
	FOREIGN KEY (owner_id) REFERENCES "users" (id)
);
CREATE TABLE "activities" (
	"id" serial primary key, 
	"type" varchar(240),
);
CREATE TABLE "inbox" (
	"id" serial primary key, 
	"sender" int,
	"receiver" int,
	"message" varchar,
	"subject" varchar,
    "invitation" boolean,
    "household_id" int,
    "image_path" varchar,
    FOREIGN KEY (household_id) REFERENCES "households" (id),
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