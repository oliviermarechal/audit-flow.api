CREATE TABLE IF NOT EXISTS account (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR(100) NOT NULL,
    password text NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS referential (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    label VARCHAR(30) NOT NULL,
    url VARCHAR(100) DEFAULT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_public BOOLEAN DEFAULT TRUE,
    owner_id uuid DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS referential_version (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    url TEXT DEFAULT NULL,
    version VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(30) DEFAULT 'Draft',
    sync_mode VARCHAR(30) DEFAULT 'MANUAL',
    referential_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_configuration_referential
        FOREIGN KEY(referential_id)
            REFERENCES referential(id)
);

CREATE TABLE IF NOT EXISTS referential_data_mapping (
    referential_criteria VARCHAR(30) NOT NULL,
    identifier VARCHAR(30) NOT NULL,
    label VARCHAR(30) NOT NULL,
    category VARCHAR(30) DEFAULT NULL,
    description VARCHAR(30) DEFAULT NULL,
    version_id uuid NOT NULL REFERENCES referential_version(id),
    CONSTRAINT fk_version_data_mapping
        FOREIGN KEY(version_id)
            REFERENCES referential_version(id)
);

CREATE TABLE IF NOT EXISTS criteria (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    external_id TEXT NOT NULL,
    category VARCHAR(30) DEFAULT NULL,
    description TEXT NOT NULL,
    version_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_criteria_version
        FOREIGN KEY(version_id)
            REFERENCES referential_version(id)
);