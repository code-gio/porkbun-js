import axios, { type AxiosInstance, AxiosError } from 'axios';

/**
 * Custom error class for Porkbun API errors
 * @class PorkbunError
 * @extends {Error}
 */
export class PorkbunError extends Error {
    /**
     * @param {string} message - Error message
     * @param {number} [status] - HTTP status code
     * @param {string} [code] - Error code
     */
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'PorkbunError';
    }
}

/**
 * Configuration options for the Porkbun API client
 * @interface PorkbunConfig
 */
export interface PorkbunConfig {
    /** Your Porkbun API key */
    apiKey: string;
    /** Your Porkbun secret API key */
    secretApiKey: string;
    /**
     * Optional custom base URL for the API
     * @default 'https://api.porkbun.com/api/json/v3'
     * @deprecated Use api.porkbun.com instead of porkbun.com after 2024-12-01
     */
    baseURL?: string;
}

/**
 * Standard API response interface
 * @interface APIResponse
 */
export interface APIResponse {
    /** Response status */
    status: 'SUCCESS' | 'ERROR';
    /** Optional response message */
    message?: string;
}

/**
 * Base client for making authenticated requests to the Porkbun API
 * @class PorkbunClient
 */
export class PorkbunClient {
    /** Axios instance for making HTTP requests */
    protected client: AxiosInstance;

    /**
     * Creates a new PorkbunClient instance
     * @param {PorkbunConfig} config - API configuration
     */
    constructor(protected config: PorkbunConfig) {
        this.client = axios.create({
            baseURL: config.baseURL || 'https://api.porkbun.com/api/json/v3',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setupInterceptors();
    }

    /**
     * Returns the authentication payload for API requests
     * @returns {Object} Authentication payload
     * @protected
     */
    protected getAuthPayload() {
        return {
            apikey: this.config.apiKey,
            secretapikey: this.config.secretApiKey
        };
    }

    /**
     * Sets up response interceptors for error handling
     * @private
     */
    private setupInterceptors() {
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<{ message?: string }>) => {
                if (error.response?.status === 403) {
                    throw new PorkbunError(
                        'Authentication failed. Check your API keys or 2FA requirements.',
                        403
                    );
                }

                const message = error.response?.data?.message || error.message;
                throw new PorkbunError(
                    `API Error: ${message}`,
                    error.response?.status
                );
            }
        );
    }

    /**
     * Validates TTL value
     * @param {number} [ttl] - Time to live in seconds
     * @throws {PorkbunError} If TTL is less than 600 seconds
     * @protected
     */
    protected validateTTL(ttl?: number): void {
        if (ttl && ttl < 600) {
            throw new PorkbunError('TTL must be at least 600 seconds');
        }
    }

    /**
     * Makes an authenticated POST request
     * @template T - Expected response type
     * @param {string} endpoint - API endpoint
     * @param {Record<string, any>} [data] - Request payload
     * @returns {Promise<T>} API response
     * @protected
     */
    protected async post<T>(endpoint: string, data: Record<string, any> = {}): Promise<T> {
        const response = await this.client.post<T>(endpoint, {
            ...this.getAuthPayload(),
            ...data
        });
        return response.data;
    }
}