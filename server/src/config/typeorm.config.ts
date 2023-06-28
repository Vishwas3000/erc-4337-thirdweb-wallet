import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';


export default class TypeOrmConfig{
    static getOrmConfig(configService:ConfigService): TypeOrmModuleOptions{
        return {
            type: 'mongodb',
            url: configService.get<string>('MONGODB_URI'),
            logging: true,
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