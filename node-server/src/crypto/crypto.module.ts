import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { DBService } from "./db.service";

@Module({
  imports: [],
  controllers: [CryptoController],
  providers: [CryptoService, DBService]
})
export class CryptoModule {
}
