# Porkbun JS

A TypeScript client for the Porkbun API v3.

## Installation

```bash
npm install porkbun-js
```

## Usage

```typescript
import { PorkbunAPI } from 'porkbun-js';

const client = new PorkbunAPI({
  apiKey: 'YOUR_API_KEY',
  secretApiKey: 'YOUR_SECRET_API_KEY'
});

// Domain operations
const domains = await client.domain.listAll();
const nameservers = await client.domain.getNameServers('example.com');

// DNS operations
const dnsRecords = await client.dns.retrieve('example.com');
await client.dns.create('example.com', {
  type: 'A',
  name: 'www',
  content: '1.1.1.1'
});

// SSL operations
const sslBundle = await client.ssl.retrieve('example.com');
```

## API Documentation

### Domain Module
- `listAll(options?: DomainListOptions)`: List all domains
- `getNameServers(domain: string)`: Get domain nameservers
- `updateNameServers(domain: string, nameservers: string[])`: Update nameservers
- `addUrlForward(domain: string, options: URLForwardingOptions)`: Add URL forwarding
- `getUrlForwarding(domain: string)`: Get URL forwarding settings
- `deleteUrlForward(domain: string, id: string)`: Delete URL forwarding
- `ping()`: Test API connectivity

### DNS Module
- `create(domain: string, options: DNSCreateOptions)`: Create DNS record
- `edit(domain: string, id: string, options: DNSEditOptions)`: Edit DNS record
- `delete(domain: string, id: string)`: Delete DNS record
- `retrieve(domain: string, id?: string)`: Get DNS records
- `retrieveByNameType(domain: string, type: DNSRecordType, subdomain: string)`: Get records by type
- `editByNameType(domain: string, type: DNSRecordType, subdomain: string, options: DNSEditOptions)`: Edit by type
- `deleteByNameType(domain: string, type: DNSRecordType, subdomain: string)`: Delete by type

### SSL Module
- `retrieve(domain: string)`: Get SSL certificate bundle

## License

MIT

## Contributing

PRs welcome! Please read our contributing guidelines first.