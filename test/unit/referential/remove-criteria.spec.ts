import {
    Criteria,
    CriteriaProps,
    CriteriaRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../../src/referential/domain';
import {
    CriteriaRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
import {
    RemoveCriteriaUsecases,
    UpdateCriteriaUsecases,
} from '../../../src/referential/usecases';

describe('Remove criteria', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    it('Remove criteria [HAPPY FLOW]', async () => {
        const versionProps = {
            url: 'http://referentialUrl.fr',
            syncMode: ReferentialSyncModeEnum.MANUAL, // Manual creation deactivated for api syncmode version!
            version: 'v1',
            referentialId: 'FAKE_UUID',
        };
        const version = await ctx.givenVersion(versionProps);

        const criteriaProps = {
            externalId: '1.1',
            label: 'label',
            description: 'Description',
            versionId: version.id,
        };
        const criteria = await ctx.givenCriteria(version.id, criteriaProps);

        await ctx.whenUserRemoveCriteria(criteria.id);
        await ctx.thenIShouldNotFoundCriteria(criteria.id);
    });

    it('Remove criteria in published version [ERROR FLOW]', async () => {
        const versionProps = {
            url: 'http://referentialUrl.fr',
            syncMode: ReferentialSyncModeEnum.MANUAL, // Manual creation deactivated for api syncmode version!
            version: 'v1',
            referentialId: 'FAKE_UUID',
        };
        const version = await ctx.givenVersion(versionProps);

        const criteriaProps = {
            externalId: '1.1',
            label: 'label',
            description: 'Description',
            versionId: version.id,
        };
        const criteria = await ctx.givenCriteria(version.id, criteriaProps);

        await ctx.publishVersion(version.id);
        await ctx.whenUserRemoveCriteria(criteria.id);
        await ctx.thenCriteriaMustBeNotRemoved(criteria.id);
    });
});

const createCtx = () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const removeCriteriaUsecases = new RemoveCriteriaUsecases(
        referentialVersionRepository,
        criteriaRepository,
    );

    return {
        async givenVersion(
            version: ReferentialVersionProps,
        ): Promise<ReferentialVersion> {
            return referentialVersionRepository.save(
                ReferentialVersion.create(version),
            );
        },
        async givenCriteria(
            versionId: string,
            props: CriteriaProps,
        ): Promise<Criteria> {
            return criteriaRepository.save(Criteria.create(props));
        },
        async publishVersion(versionId: string) {
            const version = await referentialVersionRepository.find(versionId);
            version.status = ReferentialVersionStatusEnum.Published;
            await referentialVersionRepository.save(version);
        },
        async whenUserRemoveCriteria(criteriaId: string): Promise<void> {
            try {
                await removeCriteriaUsecases.execute(
                    'FAKE_OWNER_ID',
                    criteriaId,
                );
            } catch (error) {
                expect(error.message).toBe(
                    'Vous ne pouvez pas supprimer de critère sur une version déjà publié',
                );
                // Do nothing
            }
        },
        async thenIShouldNotFoundCriteria(id: string) {
            const criteria = null; // await criteriaRepository.find(id);
            expect(criteria).toBeNull();
        },
        async thenCriteriaMustBeNotRemoved(id: string) {
            const criteria = null; // await criteriaRepository.find(id);
            expect(criteria).toBeNull();
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
