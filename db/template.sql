CREATE TABLE IF NOT EXISTS template (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    version_id uuid NOT NULL,
    owner_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_template_version_id
        FOREIGN KEY(version_id)
            REFERENCES referential_version(id)
);

CREATE TABLE IF NOT EXISTS template_element (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    template_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_template_id_element
        FOREIGN KEY(template_id)
            REFERENCES template(id)
);

CREATE TABLE IF NOT EXISTS template_question (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    label text NOT NULL,
    criteria_id uuid NOT NULL,
    template_id uuid DEFAULT NULL,
    template_element_id uuid DEFAULT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_template_question_template
        FOREIGN KEY(template_id)
            REFERENCES template(id),
    CONSTRAINT fk_template_question_template_element
        FOREIGN KEY(template_element_id)
            REFERENCES template_element(id)
);

CREATE TABLE IF NOT EXISTS template_answer (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    label text NOT NULL,
    question_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_template_answer_template_question
        FOREIGN KEY(question_id)
            REFERENCES template_question(id)
);