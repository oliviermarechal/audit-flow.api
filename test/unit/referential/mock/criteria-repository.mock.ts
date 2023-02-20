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

    async update(criteria: Criteria): Promise<Criteria> {
        this.criterias.set(criteria.id, criteria);

        return criteria;
    }

    async find(id: string): Promise<Criteria> {
        return this.criterias.get(id);
    }

    async findAll(): Promise<Criteria[]> {
        const criterias = [];
        for (const criteria of this.criterias.values()) {
            criterias.push(criteria);
        }

        return criterias;
    }

    async findByVersion(versionId: string): Promise<Criteria[]> {
        const criterias = [];
        for (const criteria of this.criterias.values()) {
            if (criteria.versionId === versionId) {
                criterias.push(criteria);
            }
        }

        return criterias;
    }

    async remove(id): Promise<void> {
        this.criterias.delete(id);
    }
}
