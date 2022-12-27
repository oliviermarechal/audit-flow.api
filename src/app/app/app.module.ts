import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReferentialModule } from '../../referential/app/referential.module';
import { AppAdapters } from './app.adapters';
import { CqrsModule } from '@nestjs/cqrs';
import { FixturesLoaderService } from './tools';

@Module({
    imports: [
        CqrsModule,
        ReferentialModule.forRoot(),
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: ['dist/**/**/*.entity.js'],
                synchronize: false,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [...AppAdapters, FixturesLoaderService],
})
export class AppModule {}
