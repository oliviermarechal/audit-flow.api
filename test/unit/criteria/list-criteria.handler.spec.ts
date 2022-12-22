import { CriteriaRepositoryInterface } from '../../../src/referential/domain/repository';
import { CriteriaInterface } from '../../../src/referential/domain/model';
import { CriteriaRepositoryMock } from '../mock';
import {
    ListCriteriaHandler,
    ListCriteriaQuery,
} from '../../../src/referential/app/query';

describe('List criteria handler', () => {
    const criteriaRepository: CriteriaRepositoryInterface =
        new CriteriaRepositoryMock();

    it('should return an array of criteria', async () => {
        const result: CriteriaInterface[] = [
            {
                id: '1',
                externalId: 1,
                url: 'john doe',
                category: 'john doe',
                target: 'john doe',
                implement: 'john doe',
                control: 'john doe',
            },
            {
                id: '2',
                externalId: 2,
                url: 'john doe',
                category: 'john doe',
                target: 'john doe',
                implement: 'john doe',
                control: 'john doe',
            },
        ];

        jest.spyOn(criteriaRepository, 'findAll').mockImplementation(
            async () => result,
        );

        expect(
            await new ListCriteriaHandler(criteriaRepository).execute(
                new ListCriteriaQuery(),
            ),
        ).toBe(result);
    });
});
