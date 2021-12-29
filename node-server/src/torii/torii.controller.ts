import { Controller, Get } from '@nestjs/common';
import { ToriiService } from './torii.service';

@Controller('torii')
export class ToriiController {
    constructor(private readonly toriiService: ToriiService) {
    }

    @Get()
    projects(): any {
        return this.toriiService.projects();
    }

    @Get('test')
    test(): any {
        return { test: true };
    }
}
