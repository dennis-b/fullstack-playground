import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { ToriiModule } from './torii/torii.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ToriiModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
