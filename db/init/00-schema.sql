
CREATE TABLE projects (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    public_id VARCHAR NOT NULL UNIQUE,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE proposals (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    public_id VARCHAR NOT NULL UNIQUE,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL UNIQUE,
    description TEXT NOT NULL,
    html TEXT NOT NULL,
    categories JSON
);

CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    auth_key VARCHAR NOT NULL UNIQUE,
    other_data JSON NOT NULL DEFAULT '{}'
);

CREATE TABLE user_data (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    data_name VARCHAR NOT NULL,
    data_value JSON NOT NULL,
    PRIMARY KEY (user_id, data_name)
);

CREATE TABLE user_proposal_card_views (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposal_id BIGINT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP NOT NULL
);

CREATE TABLE user_proposal_views (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposal_id BIGINT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP NOT NULL
);

CREATE TABLE user_votes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposal_id BIGINT NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    vote_cycle_id VARCHAR NOT NULL,
    vote_power NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL
);
