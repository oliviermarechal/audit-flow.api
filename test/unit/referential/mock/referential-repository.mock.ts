import {
    Referential,
    ReferentialRepositoryInterface,
} from '../../../../src/referential/domain';
import * as crypto from 'crypto';

export class ReferentialRepositoryMock
    implements ReferentialRepositoryInterface
{
    private referentials = new Map<string, Referential>();

    async create(referential: Referential): Promise<Referential> {
        referential.id = crypto.randomBytes(16).toString('hex');

        this.referentials.set(referential.id, referential);

        return referential;
    }

    async findAll(): Promise<Referential[]> {
        const referentials = [];
        for (const criteria of this.referentials.values()) {
            referentials.push(criteria);
        }

        return referentials;
    }

    async findByOwnerOrPublic(ownerId: string): Promise<Referential[]> {
        const referentials = [];
        for (const referential of this.referentials.values()) {
            if (referential.isPublic || referential.ownerId === ownerId) {
                referentials.push(referential);
            }
        }

        return referentials;
    }

    async find(id: string): Promise<Referential> {
        return this.referentials.get(id);
    }

    async update(referential: Referential): Promise<Referential> {
        this.referentials.set(referential.id, referential);

        return referential;
    }
}
