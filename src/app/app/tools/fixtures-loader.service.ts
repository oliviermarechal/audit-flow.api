import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as path from 'path';
import {
    Builder,
    fixturesIterator,
    Loader,
    Parser,
    Resolver,
} from 'typeorm-fixtures-cli/dist';

@Injectable()
export class FixturesLoaderService {
    constructor(private readonly dataSource: DataSource) {}

    getDataSource() {
        return this.dataSource;
    }

    loadFixtures = async (
        fixturesPath: string | string[],
        dropDatabase?: boolean,
    ) => {
        try {
            if (dropDatabase) {
                await this.dataSource.synchronize(true);
            }

            const loader = new Loader();
            if (!Array.isArray(fixturesPath)) {
                fixturesPath = [fixturesPath];
            }

            for (const fixturePath of fixturesPath) {
                loader.load(path.resolve(fixturePath));
            }

            const resolver = new Resolver();
            const fixtures = resolver.resolve(loader.fixtureConfigs);
            const builder = new Builder(this.dataSource, new Parser(), false);

            for (const fixture of fixturesIterator(fixtures)) {
                const entity: any = await builder.build(fixture);
                await this.dataSource
                    .getRepository(entity.constructor.name)
                    .save(entity);
            }
        } catch (err) {
            throw err;
        }
    };
}
