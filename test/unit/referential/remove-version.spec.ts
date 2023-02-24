import {
    Criteria,
    CriteriaProps,
    ReferentialSyncModeEnum,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../../src/referential/domain';
import { ReferentialVersionRepositoryMock } from './mock';
import { RemoveVersionUsecases } from '../../../src/referential/usecases';

describe('Remove version', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    it('Remove version [HAPPY FLOW]', async () => {
        const versionProps = {
            url: 'http://referentialUrl.fr',
            syncMode: ReferentialSyncModeEnum.MANUAL, // Manual creation deactivated for api syncmode version!
            version: 'v1',
            referentialId: 'FAKE_UUID',
        };
        const version = await ctx.givenVersion(versionProps);

        await ctx.whenUserRemoveVersion(version.id);
        await ctx.thenIShouldNotFoundVersion(version.id);
    });

    it('Remove version in published version [ERROR FLOW]', async () => {
        const versionProps = {
            url: 'http://referentialUrl.fr',
            syncMode: ReferentialSyncModeEnum.MANUAL, // Manual creation deactivated for api syncmode version!
            version: 'v1',
            referentialId: 'FAKE_UUID',
        };
        const version = await ctx.givenVersion(versionProps);

        await ctx.publishVersion(version.id);
        await ctx.whenUserRemoveVersion(version.id);
        await ctx.thenVersionMustBeNotRemoved(version.id);
    });
});

const createCtx = () => {
    const referentialVersionRepository: ReferentialVersionRepositoryInterface =
        new ReferentialVersionRepositoryMock();
    const removeVersionUsecases = new RemoveVersionUsecases(
        referentialVersionRepository,
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
        async whenUserRemoveVersion(versionId: string): Promise<void> {
            try {
                await removeVersionUsecases.execute('FAKE_OWNER_ID', versionId);
            } catch (error) {
                expect(error.message).toBe(
                    'Vous ne pouvez pas supprimer une version publié',
                );
            }
        },
        async thenIShouldNotFoundVersion(id: string) {
            const version = await referentialVersionRepository.find(id);
            expect(version).toBeUndefined();
        },
        async thenVersionMustBeNotRemoved(id: string) {
            const version = await referentialVersionRepository.find(id);
            expect(version).not.toBeUndefined();
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
