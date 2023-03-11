-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.controls_id_seq;

CREATE SEQUENCE public.controls_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.controls_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.controls_id_seq TO postgres;

-- DROP SEQUENCE public.people_id_seq;

CREATE SEQUENCE public.people_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.people_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.people_id_seq TO postgres;

-- DROP SEQUENCE public.rol_id_seq;

CREATE SEQUENCE public.rol_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.rol_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.rol_id_seq TO postgres;

-- DROP SEQUENCE public.roles_id_seq;

CREATE SEQUENCE public.roles_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.roles_id_seq TO postgres;

-- DROP SEQUENCE public.state_id_seq;

CREATE SEQUENCE public.state_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.state_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.state_id_seq TO postgres;

-- DROP SEQUENCE public."typeVehicle_id_seq";

CREATE SEQUENCE public."typeVehicle_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public."typeVehicle_id_seq" OWNER TO postgres;
GRANT ALL ON SEQUENCE public."typeVehicle_id_seq" TO postgres;

-- DROP SEQUENCE public.users_id_seq;

CREATE SEQUENCE public.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.users_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.users_id_seq TO postgres;
-- public.people definition

-- Drop table

-- DROP TABLE public.people;

CREATE TABLE public.people (
	id bigserial NOT NULL,
	identification int8 NOT NULL,
	"name" text NOT NULL,
	phone int8 NOT NULL,
	address text NOT NULL,
	CONSTRAINT people_identification_key UNIQUE (identification),
	CONSTRAINT people_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.people OWNER TO postgres;
GRANT ALL ON TABLE public.people TO postgres;


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id bigserial NOT NULL,
	"name" varchar(20) NOT NULL,
	CONSTRAINT roles_name_key UNIQUE (name),
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.roles OWNER TO postgres;
GRANT ALL ON TABLE public.roles TO postgres;


-- public.state definition

-- Drop table

-- DROP TABLE public.state;

CREATE TABLE public.state (
	id bigserial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT state_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.state OWNER TO postgres;
GRANT ALL ON TABLE public.state TO postgres;


-- public.type_vehicle definition

-- Drop table

-- DROP TABLE public.type_vehicle;

CREATE TABLE public.type_vehicle (
	id int8 NOT NULL DEFAULT nextval('"typeVehicle_id_seq"'::regclass),
	"name" text NOT NULL,
	CONSTRAINT "typeVehicle_name_key" UNIQUE (name),
	CONSTRAINT "typeVehicle_pkey" PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.type_vehicle OWNER TO postgres;
GRANT ALL ON TABLE public.type_vehicle TO postgres;


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id bigserial NOT NULL,
	id_person int8 NOT NULL,
	id_rol int8 NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_user_key UNIQUE (email),
	CONSTRAINT "idPerson_fkey" FOREIGN KEY (id_person) REFERENCES public.people(id),
	CONSTRAINT "idRol_fkey" FOREIGN KEY (id_rol) REFERENCES public.roles(id)
);
CREATE INDEX "fki_idPerson_fkey" ON public.users USING btree (id_person);
CREATE INDEX "fki_idRol_fkey" ON public.users USING btree (id_rol);

-- Permissions

ALTER TABLE public.users OWNER TO postgres;
GRANT ALL ON TABLE public.users TO postgres;


-- public.vehicles definition

-- Drop table

-- DROP TABLE public.vehicles;

CREATE TABLE public.vehicles (
	id int8 NOT NULL DEFAULT nextval('rol_id_seq'::regclass),
	serial text NOT NULL,
	id_tipo_vehicle int8 NOT NULL,
	license_plate varchar(7) NOT NULL,
	id_user int8 NOT NULL,
	CONSTRAINT "vehicles_licensePlate_key" UNIQUE (license_plate),
	CONSTRAINT vehicles_pkey PRIMARY KEY (id),
	CONSTRAINT "idTipoVehicle_fkey" FOREIGN KEY (id_tipo_vehicle) REFERENCES public.type_vehicle(id),
	CONSTRAINT "idUser_pkey" FOREIGN KEY (id_user) REFERENCES public.users(id)
);
CREATE INDEX "fki_idTipoVehicle" ON public.vehicles USING btree (id_tipo_vehicle);
CREATE INDEX "fki_idUser_pkey" ON public.vehicles USING btree (id_user);

-- Permissions

ALTER TABLE public.vehicles OWNER TO postgres;
GRANT ALL ON TABLE public.vehicles TO postgres;


-- public.controls definition

-- Drop table

-- DROP TABLE public.controls;

CREATE TABLE public.controls (
	id bigserial NOT NULL,
	"date" timestamptz NOT NULL,
	id_state int8 NOT NULL,
	id_vehicle int8 NOT NULL,
	CONSTRAINT controls_pkey PRIMARY KEY (id),
	CONSTRAINT controls_fk FOREIGN KEY (id_state) REFERENCES public.state(id),
	CONSTRAINT "idVehicle_fkey" FOREIGN KEY (id_vehicle) REFERENCES public.vehicles(id)
);
CREATE INDEX "fki_idState_fkey" ON public.controls USING btree (id_state);
CREATE INDEX "fki_idVehicle_fkey" ON public.controls USING btree (id_vehicle);

-- Permissions

ALTER TABLE public.controls OWNER TO postgres;
GRANT ALL ON TABLE public.controls TO postgres;




-- Permissions

GRANT ALL ON SCHEMA public TO pg_database_owner;
GRANT USAGE ON SCHEMA public TO public;

