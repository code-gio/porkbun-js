import { DomainModule } from './modules/domain';
import { DNSModule } from './modules/dns';
import { SSLModule } from './modules/ssl';
import type { PorkbunConfig } from './lib/client';

export * from './lib/types/client';
export * from './lib/types/domain';
export * from './lib/types/dns';
export * from './lib/types/ssl';

export class PorkbunAPI {
    readonly domain: DomainModule;
    readonly dns: DNSModule;
    readonly ssl: SSLModule;

    constructor(config: PorkbunConfig) {
        this.domain = new DomainModule(config);
        this.dns = new DNSModule(config);
        this.ssl = new SSLModule(config);
    }
}