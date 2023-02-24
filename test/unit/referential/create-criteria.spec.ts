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
        let id = '';
        if (criteria) {
            id = criteria.id;
        }

        await ctx.thenIShouldVerifyCriteria(id, criteriaProps);
    });

    it('Create criteria on published version [ERROR FLOW]', async () => {
        const versionProps = {
            url: 'http://referentialUrl.fr',
            syncMode: ReferentialSyncModeEnum.MANUAL, // Manual creation deactivated for api syncmode version!
            version: 'v1',
            referentialId: 'FAKE_UUID',
        };
        const version = await ctx.givenVersion(versionProps);
        await ctx.publishVersion(version.id);

        const criteriaProps = {
            externalId: '1.1',
            label: 'label',
            description: 'Description',
            versionId: version.id,
        };
        await ctx.whenUserAddCriteriaToVersion(version.id, criteriaProps);
        await ctx.thenTheCriteriaWasNotCreated();
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
        async publishVersion(versionId: string) {
            const version = await referentialVersionRepository.find(versionId);
            version.status = ReferentialVersionStatusEnum.Published;
            await referentialVersionRepository.save(version);
        },
        async whenUserAddCriteriaToVersion(
            versionId: string,
            props: CriteriaProps,
        ): Promise<Criteria | void> {
            let criteria;
            try {
                criteria = await createCriteriaUsecases.execute(
                    'FAKE_USER_UUID',
                    versionId,
                    props,
                );
            } catch (error) {
                expect(error.message).toBe(
                    'Vous ne pouvez pas ajouter de critères sur une version publié',
                );
            }

            return criteria;
        },
        async thenIShouldVerifyCriteria(id: string, props: CriteriaProps) {
            const criteria = await criteriaRepository.find(id);
            expect(criteria).not.toBeNull();
            expect(criteria.label).toBe(props.label);
            expect(criteria.externalId).toBe(props.externalId);
        },
        async thenTheCriteriaWasNotCreated() {
            const criteria = await criteriaRepository.findAll();
            expect(criteria.length).toBe(0);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
