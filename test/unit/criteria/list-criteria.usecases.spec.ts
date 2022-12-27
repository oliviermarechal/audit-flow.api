import { CriteriaInterface } from '../../../src/referential/domain/model';
import { CqrsAdapterInterface } from '../../../src/app/domain';
import { CqrsAdapterMock } from '../mock/cqrs-adapter.mock';
import { ListCriteriaUsecases } from '../../../src/referential/usecases';

describe('List criteria use case', () => {
    const cqrsAdapter: CqrsAdapterInterface = new CqrsAdapterMock();

    it('should return an array of criteria', async () => {
        const result: CriteriaInterface[] = [
            {
                id: '1',
                externalId: '1.1',
                url: 'john doe',
                category: 'john doe',
                target: 'john doe',
                implement: 'john doe',
                control: 'john doe',
            },
            {
                id: '2',
                externalId: '2.1',
                url: 'john doe',
                category: 'john doe',
                target: 'john doe',
                implement: 'john doe',
                control: 'john doe',
            },
        ];

        jest.spyOn(cqrsAdapter, 'executeQuery').mockImplementation(
            async () => result,
        );

        expect(await new ListCriteriaUsecases(cqrsAdapter).execute()).toBe(
            result,
        );
    });
});
