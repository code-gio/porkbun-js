import { PorkbunClient } from '../lib/client';
import type { SSLBundleResponse } from '../lib/types/ssl';

/**
 * Handles SSL certificate operations
 * @class SSLModule
 * @extends {PorkbunClient}
 * 
 * @example
 * ```typescript
 * const api = new PorkbunAPI({
 *   apiKey: 'YOUR_API_KEY',
 *   secretApiKey: 'YOUR_SECRET_API_KEY'
 * });
 * 
 * const ssl = await api.ssl.retrieve('example.com');
 * ```
 */
export class SSLModule extends PorkbunClient {
    /**
     * Retrieves SSL certificate bundle for a domain
     * @param {string} domain - The domain name
     * @returns {Promise<SSLBundleResponse>} SSL certificate bundle
     * 
     * @example
     * ```typescript
     * const bundle = await api.ssl.retrieve('example.com');
     * ```
     */
    async retrieve(domain: string): Promise<SSLBundleResponse> {
        return this.post(`/ssl/retrieve/${domain}`);
    }
}