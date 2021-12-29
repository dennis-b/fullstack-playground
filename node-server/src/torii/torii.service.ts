import { Injectable } from '@nestjs/common';
import Airtable from "airtable";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ToriiService {
    private base: Airtable.Base

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('API_KEY');
        const baseId = this.configService.get<string>('BASE_ID');
        console.log({ apiKey, baseId })
        this.base = new Airtable({ apiKey }).base(baseId);
    }

    projects(): any {
        return { value: true };
    }
}
