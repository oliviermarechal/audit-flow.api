import {
    Criteria,
    Referential,
    ReferentialGatewayInterface,
} from '../../../../src/referential/domain';

export class ReferentialGatewayMock implements ReferentialGatewayInterface {
    async fetchReferential(
        referential: Referential,
        version: string,
    ): Promise<Criteria[]> {
        return [
            {
                externalId: '1.1',
                label: 'https://test.com',
                category: 'Stratégie',
                description: 'Éviter le service numérique inutile',
                implement:
                    "Pour évaluer l'utilité du service, se référer à des référentiels et déterminer en amont du projet si son utilité est avéré",
                control: 'Comment a été évalué le service',
                referentialId: referential.id,
            },
            {
                externalId: '1.2',
                label: 'https://test.com',
                category: 'Stratégie',
                description: 'Éviter le service numérique inutile',
                implement:
                    "Pour évaluer l'utilité du service, se référer à des référentiels et déterminer en amont du projet si son utilité est avéré",
                control: 'Comment a été évalué le service',
                referentialId: referential.id,
            },
        ];
    }
}
