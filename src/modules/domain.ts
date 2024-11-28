import { PorkbunClient } from '../lib/client';
import type { APIResponse } from '../lib/types/client';
import type {
    DomainListOptions,
    DomainListResponse,
    NameServersResponse,
    URLForwardingOptions,
    URLForwardingResponse
} from '../lib/types/domain';

/**
 * Handles domain-related operations
 * @class DomainModule
 * @extends {PorkbunClient}
 * 
 * @example
 * ```typescript
 * const api = new PorkbunAPI({
 *   apiKey: 'YOUR_API_KEY',
 *   secretApiKey: 'YOUR_SECRET_API_KEY'
 * });
 * 
 * // Access domain operations through the domain module
 * const domains = await api.domain.listAll();
 * ```
 */
export class DomainModule extends PorkbunClient {
    /**
     * Lists all domains in your account
     * @param {DomainListOptions} [options={}] - Optional parameters
     * @param {number} [options.start] - Starting index for pagination
     * @param {boolean} [options.includeLabels] - Include domain labels in response
     * @returns {Promise<DomainListResponse>} List of domains
     * 
     * @example
     * ```typescript
     * // List all domains
     * const domains = await api.domain.listAll();
     * 
     * // List domains with pagination and labels
     * const domainsWithLabels = await api.domain.listAll({
     *   start: 10,
     *   includeLabels: true
     * });
     * ```
     */
    async listAll(options: DomainListOptions = {}): Promise<DomainListResponse> {
        return this.post('/domain/listAll', {
            start: options.start?.toString() || '0',
            includeLabels: options.includeLabels ? 'yes' : 'no'
        });
    }

    /**
     * Gets nameservers for a domain
     * @param {string} domain - The domain name
     * @returns {Promise<NameServersResponse>} Current nameservers
     * 
     * @example
     * ```typescript
     * const nameservers = await api.domain.getNameServers('example.com');
     * ```
     */
    async getNameServers(domain: string): Promise<NameServersResponse> {
        return this.post(`/domain/getNs/${domain}`);
    }

    /**
     * Updates nameservers for a domain
     * @param {string} domain - The domain name
     * @param {string[]} nameservers - Array of nameserver hostnames
     * @returns {Promise<APIResponse>} Update operation response
     * 
     * @example
     * ```typescript
     * await api.domain.updateNameServers('example.com', [
     *   'ns1.provider.com',
     *   'ns2.provider.com'
     * ]);
     * ```
     */
    async updateNameServers(domain: string, nameservers: string[]): Promise<APIResponse> {
        return this.post(`/domain/updateNs/${domain}`, { ns: nameservers });
    }

    /**
     * Adds URL forwarding for a domain
     * @param {string} domain - The domain name
     * @param {URLForwardingOptions} options - Forwarding configuration
     * @param {('redirect'|'permanent'|'masked')} options.type - Type of forwarding
     * @param {string} options.destination - Target URL
     * @returns {Promise<APIResponse>} Creation response
     * 
     * @example
     * ```typescript
     * await api.domain.addUrlForward('example.com', {
     *   type: 'redirect',
     *   destination: 'https://target.com'
     * });
     * ```
     */
    async addUrlForward(domain: string, options: URLForwardingOptions): Promise<APIResponse> {
        return this.post(`/domain/addUrlForward/${domain}`, options);
    }

    /**
     * Gets URL forwarding settings for a domain
     * @param {string} domain - The domain name
     * @returns {Promise<URLForwardingResponse>} Current forwarding rules
     * 
     * @example
     * ```typescript
     * const forwards = await api.domain.getUrlForwarding('example.com');
     * ```
     */
    async getUrlForwarding(domain: string): Promise<URLForwardingResponse> {
        return this.post(`/domain/getUrlForwarding/${domain}`);
    }

    /**
     * Deletes a URL forwarding rule
     * @param {string} domain - The domain name
     * @param {string} id - Forwarding rule ID
     * @returns {Promise<APIResponse>} Delete operation response
     * 
     * @example
     * ```typescript
     * await api.domain.deleteUrlForward('example.com', 'forward123');
     * ```
     */
    async deleteUrlForward(domain: string, id: string): Promise<APIResponse> {
        return this.post(`/domain/deleteUrlForward/${domain}/${id}`);
    }

    /**
     * Tests API connectivity
     * @returns {Promise<APIResponse>} Ping response with status
     * 
     * @example
     * ```typescript
     * await api.domain.ping();
     * ```
     */
    async ping() {
        return this.post('/ping');
    }
}