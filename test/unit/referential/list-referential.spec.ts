import { ReferentialRepositoryMock } from './mock';
import {
    Referential,
    ReferentialRepositoryInterface,
    ReferentialVersionProps,
} from '../../../src/referential/domain';
import { ListReferentialUsecases } from '../../../src/referential/usecases';

describe('List referential', () => {
    let ctx: Ctx;

    beforeEach(() => {
        ctx = createCtx();
    });

    test('List referential [HAPPY FLOW]', async () => {
        const referential = await ctx.givenReferential(
            Referential.create({
                label: 'Eco-conception',
                ownerId: 'FAKE_OWNER_ID',
                description:
                    "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
            }),
        );

        const referentials = await ctx.whenUserListReferential();
        await ctx.checkReferentials(referentials);
    });
});

const createCtx = () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const listReferentialUseCases: ListReferentialUsecases =
        new ListReferentialUsecases(referentialRepository);

    return {
        async givenReferential(referential: Referential): Promise<Referential> {
            await referentialRepository.create(referential);

            return referential;
        },
        async whenUserListReferential() {
            return listReferentialUseCases.execute('FAKE_OWNER_ID');
        },
        async checkReferentials(referentials: Referential[]) {
            expect(referentials).toHaveLength(1);
        },
    };
};

type Ctx = ReturnType<typeof createCtx>;
