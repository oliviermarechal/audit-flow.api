INSERT INTO referential (id, label, description) VALUES
    ('33e33d18-893b-4752-91c1-a338cf47dfe5', 'Eco-conception', 'Referentiel D''éco-conception'),
    ('12e848cc-7ea3-45e9-a19b-8d2147bc8898', 'RGAA', 'Ref D''accessibilité'),
    ('d8a0cc3b-3b1c-442f-ab7e-a320c45335e2', 'Custom', 'Mon Ref d''audit archi web')
;

INSERT INTO referential_version (id, version, sync_mode, version_in_url, referential_id) VALUES
    ('d6be08f1-f295-4b06-abb3-6ead632de1c8', 'V1', 'API', 'f', '33e33d18-893b-4752-91c1-a338cf47dfe5'),
    ('a323dfa9-7fae-470f-a04a-979df61d7862', 'V2', 'API', 't', '33e33d18-893b-4752-91c1-a338cf47dfe5'),
    ('1354e116-42e7-4dbd-b3cf-cf8e8216ec5c', 'V1', 'API', 'f', '12e848cc-7ea3-45e9-a19b-8d2147bc8898'),
    ('ca72bb77-2137-49be-9779-8f498618d0eb', 'V2', 'API', 't', '12e848cc-7ea3-45e9-a19b-8d2147bc8898'),
    ('b12c33e2-2bb1-41dd-98d8-45a2d3014794', 'V1', 'API', 'f', 'd8a0cc3b-3b1c-442f-ab7e-a320c45335e2'),
    ('ce404383-337e-401d-900f-72d24df16a22', 'V2', 'API', 't', 'd8a0cc3b-3b1c-442f-ab7e-a320c45335e2')
;
