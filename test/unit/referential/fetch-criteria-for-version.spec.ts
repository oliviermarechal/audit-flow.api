import { FetchCriteriaForVersionUsecases } from '../../../src/referential/usecases';
import {
    CriteriaRepositoryInterface,
    ReferentialGatewayInterface,
    Referential,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialDataMapping,
    ReferentialVersionRepositoryInterface,
    Criteria,
} from '../../../src/referential/domain';
import {
    CriteriaRepositoryMock,
    ReferentialGatewayMock,
    ReferentialRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';

describe('Fetch referential', () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const referentialGateway: ReferentialGatewayInterface =
        new ReferentialGatewayMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const fetchCriteriaForVersionUsecases: FetchCriteriaForVersionUsecases =
        new FetchCriteriaForVersionUsecases(
            criteriaRepository,
            referentialVersionRepository,
            referentialGateway,
        );
    const ownerId = 'FAKE_OWNER_ID';

    let version = ReferentialVersion.create({
        url: 'http://referentialUrl.fr',
        syncMode: ReferentialSyncModeEnum.API,
        version: 'v1',
        referentialId: 'FAKE_UUID',
        dataMapping: ReferentialDataMapping.create({
            referentialCriteria: 'criètre',
            identifier: 'identifier',
            label: 'label',
            category: 'category',
            description: 'description',
            versionId: 'FAKE_UUID',
        }),
    });

    test('Fetch referential [HAPPY FLOW]', async () => {
        version = await referentialVersionRepository.save(version);
        const criteriasFixtures: Criteria[] = [
            Criteria.create({
                label: 'criteria 1',
                externalId: '1.1',
                category: 'cat 1',
                description: 'description',
                versionId: version.id,
            }),
            Criteria.create({
                label: 'criteria 2',
                externalId: '1.2',
                category: 'cat 1',
                description: 'description',
                versionId: version.id,
            }),
        ];

        jest.spyOn(referentialGateway, 'fetchReferential').mockImplementation(
            async () => criteriasFixtures,
        );
        await fetchCriteriaForVersionUsecases.execute(ownerId, version.id);
        const criterias = await criteriaRepository.findAll();

        expect(criterias.length).toBe(2);
        const firstCriteria = criteriasFixtures[0];
        expect(firstCriteria.label).toBe('criteria 1');
        expect(firstCriteria.externalId).toBe('1.1');
        expect(firstCriteria.category).toBe('cat 1');
        expect(firstCriteria.description).toBe('description');
    });
});
