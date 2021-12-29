import { Module } from '@nestjs/common';
import { ToriiController } from './torii.controller';
import { ToriiService } from './torii.service';

@Module({
  imports: [],
  controllers: [ToriiController],
  providers: [ToriiService],
})
export class ToriiModule {}
