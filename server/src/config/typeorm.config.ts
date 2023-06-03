import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';


export default class TypeOrmConfig{
    static getOrmConfig(configService:ConfigService): TypeOrmModuleOptions{
        return {
            type: 'postgres',
            host: configService.get('DB_HOST') ,
            port: parseInt (configService.get('DB_PORT') ),
            username: configService.get('DB_USERNAME') ,
            password: configService.get('DB_PASSWORD') ,
            database: configService.get('DB_NAME') ,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
        }
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {

    imports: [ConfigModule],
    
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService), 
    inject: [ConfigService],
}