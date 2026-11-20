import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PositionsModule } from './positions/positions.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    UsersModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
