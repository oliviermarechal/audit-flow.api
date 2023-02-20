import {
    CriteriaRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
import {
    Criteria,
    CriteriaRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
} from '../../../src/referential/domain';
import { ListCriteriaUsecases } from '../../../src/referential/usecases';

describe('List criteria', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('List criteria [HAPPY FLOW]', async () => {
        const versionProps: ReferentialVersionProps = {
            id: 'VERSION_FAKE_UUID',
            version: '1.2',
            url: 'https://fake.test',
            syncMode: ReferentialSyncModeEnum.MANUAL,
            referentialId: 'todo',
        };

        const version = await ctx.givenReferentialVersion(versionProps);
        const criterias: Criteria[] = [
            Criteria.create({
                label: 'critères 1',
                externalId: '1.1',
                versionId: version.id,
            }),
            Criteria.create({
                label: 'critères 2',
                externalId: '1.2',
                versionId: version.id,
            }),
            Criteria.create({
                label: 'critères autres version',
                externalId: '1.1',
                versionId: 'OTHERS_UUID',
            }),
        ];
        await ctx.andCriterias(criterias);
        const result = await ctx.whenUserListCriteria(version.id);
        await ctx.checkResult(result);
    });
});

const createCtx = () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const listCriteriaUsecases = new ListCriteriaUsecases(
        referentialVersionRepository,
        criteriaRepository,
    );

    return {
        async givenReferentialVersion(
            versionProps: ReferentialVersionProps,
        ): Promise<ReferentialVersion> {
            const version = ReferentialVersion.create({
                ...versionProps,
                referentialId: 'REF_UUID',
            });

            return referentialVersionRepository.save(version);
        },
        async andCriterias(criterias: Criteria[]) {
            for (const criteria of criterias) {
                await criteriaRepository.save(criteria);
            }
        },
        async whenUserListCriteria(versionId: string) {
            return listCriteriaUsecases.execute('FAKE_UUID', versionId);
        },
        async checkResult(criterias: Criteria[]) {
            expect(criterias).toHaveLength(2);
            expect(criterias[0].externalId).toBe('1.1');
            expect(criterias[1].externalId).toBe('1.2');
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
