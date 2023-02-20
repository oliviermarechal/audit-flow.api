import {
    Criteria,
    CriteriaProps,
    CriteriaRepositoryInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
} from '../../../src/referential/domain';
import {
    CriteriaRepositoryMock,
    ReferentialVersionRepositoryMock,
} from './mock';
import { UpdateCriteriaUsecases } from '../../../src/referential/usecases';

describe('Edit criteria', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    it('Edit criteria [HAPPY FLOW]', async () => {
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

        const updateCriteriaProps = {
            externalId: '1.1',
            label: 'label - updated',
            description: 'Description',
            versionId: version.id,
        };
        await ctx.whenUserUpdateCriteria(criteria.id, updateCriteriaProps);
        await ctx.thenIShouldVerifyCriteria(criteria.id, updateCriteriaProps);
    });
});

const createCtx = () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const updateCriteriaUsecases = new UpdateCriteriaUsecases(
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
        async whenUserUpdateCriteria(
            criteriaId: string,
            props: CriteriaProps,
        ): Promise<Criteria> {
            return updateCriteriaUsecases.execute(
                'FAKE_OWNER_ID',
                criteriaId,
                props,
            );
        },
        async thenIShouldVerifyCriteria(id: string, props: CriteriaProps) {
            const criteria = await criteriaRepository.find(id);
            expect(criteria).not.toBeNull();
            expect(criteria.label).toBe(props.label);
            expect(criteria.externalId).toBe(props.externalId);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
