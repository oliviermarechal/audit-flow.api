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
import { CreateCriteriaUsecases } from '../../../src/referential/usecases';

describe('Create criteria', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    it('Create criteria [HAPPY FLOW]', async () => {
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
        const criteria = await ctx.whenUserAddCriteriaToVersion(
            version.id,
            criteriaProps,
        );
        await ctx.thenIShouldVerifyCriteria(criteria.id, criteriaProps);
    });
});

const createCtx = () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();
    const createCriteriaUsecases = new CreateCriteriaUsecases(
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
        async whenUserAddCriteriaToVersion(
            versionId: string,
            props: CriteriaProps,
        ): Promise<Criteria> {
            return createCriteriaUsecases.execute(
                'FAKE_USER_UUID',
                versionId,
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
