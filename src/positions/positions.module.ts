import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { PositionsGateway } from './positions.gateway';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PositionsGateway]
})
export class PositionsModule {}
