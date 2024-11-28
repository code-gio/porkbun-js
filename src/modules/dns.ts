import { PorkbunClient } from '../lib/client';
import type { APIResponse } from '../lib/types/client';
import type {
    DNSCreateOptions,
    DNSEditOptions,
    DNSCreateResponse,
    DNSRecordsResponse,
    DNSRecordType
} from '../lib/types/dns';

/**
 * Handles DNS record operations
 * @class DNSModule
 * @extends {PorkbunClient}
 * 
 * @example
 * ```typescript
 * const api = new PorkbunAPI({
 *   apiKey: 'YOUR_API_KEY',
 *   secretApiKey: 'YOUR_SECRET_API_KEY'
 * });
 * 
 * // Access DNS operations through the dns module
 * const records = await api.dns.retrieve('example.com');
 * ```
 */
export class DNSModule extends PorkbunClient {
    /**
     * Creates a new DNS record
     * @param {string} domain - The domain name
     * @param {DNSCreateOptions} options - DNS record configuration
     * @param {DNSRecordType} options.type - Record type (A, AAAA, MX, etc.)
     * @param {string} options.name - Subdomain or @ for root
     * @param {string} options.content - Record value
     * @param {number} [options.ttl] - Time to live in seconds
     * @returns {Promise<DNSCreateResponse>} Creation response with record ID
     * 
     * @example
     * ```typescript
     * await api.dns.create('example.com', {
     *   type: 'A',
     *   name: 'www',
     *   content: '192.0.2.1',
     *   ttl: 600
     * });
     * ```
     */
    async create(domain: string, options: DNSCreateOptions): Promise<DNSCreateResponse> {
        return this.post(`/dns/create/${domain}`, options);
    }

    /**
     * Edits an existing DNS record
     * @param {string} domain - The domain name
     * @param {string} id - Record ID to edit
     * @param {DNSEditOptions} options - Updated record configuration
     * @returns {Promise<APIResponse>} Edit operation response
     * 
     * @example
     * ```typescript
     * await api.dns.edit('example.com', 'record123', {
     *   content: '192.0.2.2'
     * });
     * ```
     */
    async edit(domain: string, id: string, options: DNSEditOptions): Promise<APIResponse> {
        return this.post(`/dns/edit/${domain}/${id}`, options);
    }

    /**
     * Edits DNS records matching name and type
     * @param {string} domain - The domain name
     * @param {DNSRecordType} type - Record type to edit
     * @param {string} subdomain - Subdomain or @ for root
     * @param {DNSEditOptions} options - Updated record configuration
     * @returns {Promise<APIResponse>} Edit operation response
     * 
     * @example
     * ```typescript
     * await api.dns.editByNameType('example.com', 'A', 'www', {
     *   content: '192.0.2.2'
     * });
     * ```
     */
    async editByNameType(domain: string, type: DNSRecordType, subdomain: string, options: DNSEditOptions): Promise<APIResponse> {
        return this.post(`/dns/editByNameType/${domain}/${type}/${subdomain}`, options);
    }

    /**
     * Deletes a DNS record
     * @param {string} domain - The domain name
     * @param {string} id - Record ID to delete
     * @returns {Promise<APIResponse>} Delete operation response
     * 
     * @example
     * ```typescript
     * await api.dns.delete('example.com', 'record123');
     * ```
     */
    async delete(domain: string, id: string): Promise<APIResponse> {
        return this.post(`/dns/delete/${domain}/${id}`);
    }

    /**
     * Deletes DNS records matching name and type
     * @param {string} domain - The domain name
     * @param {DNSRecordType} type - Record type to delete
     * @param {string} subdomain - Subdomain or @ for root
     * @returns {Promise<APIResponse>} Delete operation response
     * 
     * @example
     * ```typescript
     * await api.dns.deleteByNameType('example.com', 'A', 'www');
     * ```
     */
    async deleteByNameType(domain: string, type: DNSRecordType, subdomain: string): Promise<APIResponse> {
        return this.post(`/dns/deleteByNameType/${domain}/${type}/${subdomain}`);
    }

    /**
     * Retrieves DNS records
     * @param {string} domain - The domain name
     * @param {string} [id] - Optional record ID for specific record
     * @returns {Promise<DNSRecordsResponse>} DNS records
     * 
     * @example
     * ```typescript
     * // Get all records
     * const allRecords = await api.dns.retrieve('example.com');
     * 
     * // Get specific record
     * const record = await api.dns.retrieve('example.com', 'record123');
     * ```
     */
    async retrieve(domain: string, id?: string): Promise<DNSRecordsResponse> {
        const endpoint = id ? `/dns/retrieve/${domain}/${id}` : `/dns/retrieve/${domain}`;
        return this.post(endpoint);
    }

    /**
     * Retrieves DNS records matching name and type
     * @param {string} domain - The domain name
     * @param {DNSRecordType} type - Record type to retrieve
     * @param {string} subdomain - Subdomain or @ for root
     * @returns {Promise<DNSRecordsResponse>} Matching DNS records
     * 
     * @example
     * ```typescript
     * const records = await api.dns.retrieveByNameType('example.com', 'A', 'www');
     * ```
     */
    async retrieveByNameType(domain: string, type: DNSRecordType, subdomain: string): Promise<DNSRecordsResponse> {
        return this.post(`/dns/retrieveByNameType/${domain}/${type}/${subdomain}`);
    }
}