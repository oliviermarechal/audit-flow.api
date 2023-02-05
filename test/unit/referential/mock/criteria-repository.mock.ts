import {
    CriteriaRepositoryInterface,
    Criteria,
} from '../../../../src/referential/domain';
import * as crypto from 'crypto';

export class CriteriaRepositoryMock implements CriteriaRepositoryInterface {
    private criterias = new Map<string, Criteria>();

    async save(criteria: Criteria): Promise<Criteria> {
        criteria.id = crypto.randomBytes(16).toString('hex');
        this.criterias.set(criteria.id, criteria);

        return criteria;
    }

    async findAll(): Promise<Criteria[]> {
        const criterias = [];
        for (const criteria of this.criterias.values()) {
            criterias.push(criteria);
        }

        return criterias;
    }
}
