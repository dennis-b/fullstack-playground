import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) {
    }

    @Get()
    getCurrency(@Query('currency') currency, @Query('frame') timeFrame): any {
        return this.cryptoService.getCryptoExchange(currency, timeFrame)
    }

    @Delete(':id')
    deleteCurrency(@Param('id') id: string) {
        return this.cryptoService.deleteCryptoExchange(id)
    }
}
