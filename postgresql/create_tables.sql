CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE cats (
	id UUID DEFAULT uuid_generate_v4() NOT NULL,
	name TEXT NOT NULL,
	age INTEGER NOT NULL,
	breed TEXT NOT NULL,
	PRIMARY KEY (id)
);
