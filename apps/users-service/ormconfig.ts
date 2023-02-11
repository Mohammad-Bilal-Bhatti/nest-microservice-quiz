import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: 'apps/users-service/.env'
});

const typeOrmConfig = new DataSource({
  type: process.env.DATABASE_TYPE as '' || 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : null,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
});

export default typeOrmConfig;
