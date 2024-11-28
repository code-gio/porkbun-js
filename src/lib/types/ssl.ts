import type { APIResponse } from './client';

/**
 * SSL certificate bundle contents
 * @interface SSLBundle
 * @property {string} certificatechain - Full certificate chain in PEM format
 * @property {string} privatekey - Private key in PEM format
 * @property {string} publickey - Public key in PEM format
 */
export interface SSLBundle {
    certificatechain: string;
    privatekey: string;
    publickey: string;
}

/**
 * Response type for SSL bundle retrieval
 * @type {APIResponse & SSLBundle}
 */
export type SSLBundleResponse = APIResponse & SSLBundle;