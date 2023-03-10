import {
    Criteria,
    ReferentialGatewayInterface,
    ReferentialVersion,
} from '../../../../src/referential/domain';

export class ReferentialGatewayMock implements ReferentialGatewayInterface {
    async fetchReferential(version: ReferentialVersion): Promise<Criteria[]> {
        return [
            Criteria.create({
                externalId: '1.1',
                label: 'https://test.com',
                category: 'Stratégie',
                description: 'Éviter le service numérique inutile',
                versionId: version.id,
            }),
            Criteria.create({
                externalId: '1.2',
                label: 'https://test.com',
                category: 'Stratégie',
                description: 'Éviter le service numérique inutile',
                versionId: version.id,
            }),
        ];
    }
}
