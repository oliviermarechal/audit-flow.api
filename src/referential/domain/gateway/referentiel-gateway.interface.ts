import { Criteria, Referential } from '../model';

export interface ReferentialGatewayInterface {
    fetchReferential(
        referential: Referential,
        version: string,
    ): Promise<Criteria[]>;
}

export const ReferentialGatewayInterface = Symbol(
    'ReferentialGatewayInterface',
);
