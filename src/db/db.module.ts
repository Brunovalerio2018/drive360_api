import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './db.services';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}