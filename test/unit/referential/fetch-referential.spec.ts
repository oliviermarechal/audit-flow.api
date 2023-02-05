import { FetchReferentialUsecases } from '../../../src/referential/usecases';
import {
    CriteriaRepositoryInterface,
    ReferentialGatewayInterface,
    Referential,
    ReferentialRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialDataMapping,
} from '../../../src/referential/domain';
import {
    CriteriaRepositoryMock,
    ReferentialGatewayMock,
    ReferentialRepositoryMock,
} from './mock';

describe('Fetch referential', () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const referentialGateway: ReferentialGatewayInterface =
        new ReferentialGatewayMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const fetchReferentialUseCase: FetchReferentialUsecases =
        new FetchReferentialUsecases(
            criteriaRepository,
            referentialRepository,
            referentialGateway,
        );

    let referential = Referential.create({
        label: 'Eco-conception',
        description:
            "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
        versions: [
            ReferentialVersion.create({
                url: 'http://referentialUrl.fr',
                syncMode: ReferentialSyncModeEnum.API,
                versionInUrl: true,
                version: 'v1',
                referentialId: 'FAKE_UUID',
                dataMapping: ReferentialDataMapping.create({
                    referentialCriteria: 'criètre',
                    identifier: 'identifier',
                    label: 'label',
                    category: 'category',
                    description: 'description',
                    implement: 'implement',
                    control: 'control',
                    versionId: 'FAKE_UUID',
                }),
            }),
        ],
    });

    test('Fetch referential [HAPPY FLOW]', async () => {
        referential = await referentialRepository.create(referential);
        const criteriasFixtures = [
            {
                label: 'criteria 1',
                externalId: '1.1',
                category: 'cat 1',
                description: 'description',
                implement: 'implement',
                control: 'control',
                referentialId: referential.id,
            },
            {
                label: 'criteria 2',
                externalId: '1.2',
                category: 'cat 1',
                description: 'description',
                implement: 'implement',
                control: 'control',
                referentialId: referential.id,
            },
        ];

        jest.spyOn(referentialGateway, 'fetchReferential').mockImplementation(
            async () => criteriasFixtures,
        );
        await fetchReferentialUseCase.execute(referential.id, 'v1');
        const criterias = await criteriaRepository.findAll();

        expect(criterias.length).toBe(2);
        expect(criterias).toMatchObject(criteriasFixtures);
    });

    test('Fetch referential [ERROR FLOW]', async () => {
        referential = await referentialRepository.create(referential);

        await expect(
            fetchReferentialUseCase.execute(referential.id, 'BAD_VERSION'),
        ).rejects.toThrow('Version BAD_VERSION was not found');
    });
});
