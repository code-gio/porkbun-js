
/**
 * Standard API response interface
 * @interface APIResponse
 * @property {('SUCCESS'|'ERROR')} status - Response status
 * @property {string} [message] - Optional response message
 */
export interface APIResponse {
    status: 'SUCCESS' | 'ERROR';
    message?: string;
}

/**
 * Response type for ping endpoint
 * @interface PingResponse
 * @extends {APIResponse}
 * @property {string} yourIp - Client IP address
 * 
 * @example
 * ```typescript
 * const response: PingResponse = await client.post('/ping');
 * console.log(response.yourIp); // "192.168.1.1"
 * ```
 */
export interface PingResponse extends APIResponse {
    yourIp: string;
}