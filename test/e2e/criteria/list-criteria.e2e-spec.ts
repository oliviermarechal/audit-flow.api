import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FixturesLoaderService } from '../../../src/app/app/tools';
import { createTestApp } from '../tools/create-test-app';

describe('List criteria (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await createTestApp();
        const fixturesLoader: FixturesLoaderService =
            app.get<FixturesLoaderService>(FixturesLoaderService);

        await fixturesLoader.loadFixtures(
            process.cwd() + '/fixtures/dev',
            true,
        );
    });

    it('List criteria', async () => {
        return request(app.getHttpServer())
            .get('/api/criteria')
            .expect(200)
            .then(async (response) => {
                expect(response.body.length).toEqual(1);
            });
    });

    afterEach(async () => {
        await app.close();
    });
});
