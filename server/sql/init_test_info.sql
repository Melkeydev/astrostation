CREATE TABLE IF NOT EXISTS info (
    id bigserial PRIMARY KEY,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    title text NOT NULL,
    description text UNIQUE NOT NULL,
    version integer NOT NULL DEFAULT 1
);

