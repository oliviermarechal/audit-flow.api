import { CreateReferentialUsecases } from '../../../src/referential/usecases';
import { ReferentialRepositoryInterface } from '../../../src/referential/domain';
import { ReferentialRepositoryMock } from './mock';

describe('create referential', () => {
    const referentialRepository: ReferentialRepositoryInterface =
        new ReferentialRepositoryMock();
    const createReferentialUseCase: CreateReferentialUsecases =
        new CreateReferentialUsecases(referentialRepository);
    const ownerId = 'FAKE_UUID';

    it('Create referential [HAPPY FLOW]', async () => {
        const dto = {
            label: 'Eco-conception',
            description:
                "Référentiel d'éco conception afin d'établir si un projet numérique est eco conçus",
        };
        const model = await createReferentialUseCase.execute(
            dto.label,
            dto.description,
            false,
            ownerId,
        );

        expect(model.id).not.toBeNull();
        expect(model.label).toBe(dto.label);
        expect(model.description).toBe(dto.description);
    });
});
