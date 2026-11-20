import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';

config();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'drive360',
  password: process.env.DB_PASSWORD || 'drive360_dev_password',
  database: process.env.DB_DATABASE || 'drive360',
  entities: [User],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.NODE_ENV !== 'production',
};

const AppDataSource = new DataSource(ormConfig);

export default AppDataSource;