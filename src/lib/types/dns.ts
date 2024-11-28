import { type APIResponse } from './client';

/**
 * Supported DNS record types
 */
export type DNSRecordType = 'A' | 'MX' | 'CNAME' | 'ALIAS' | 'TXT' | 'NS' | 'AAAA' | 'SRV' | 'TLSA' | 'CAA' | 'HTTPS' | 'SVCB';

/**
 * DNS record details
 */
export interface DNSRecord {
    /** Record identifier */
    id: string;
    /** Record name (subdomain) */
    name: string;
    /** Record type */
    type: DNSRecordType;
    /** Record value */
    content: string;
    /** Time to live */
    ttl: string;
    /** Priority (for MX/SRV) */
    prio: string;
    /** Optional record notes */
    notes: string;
}

/**
 * Options for creating DNS records
 */
export interface DNSCreateOptions {
    /** 
     * Subdomain for the record, not including domain itself. 
     * Leave blank for root domain. Use * for wildcard record
     */
    name?: string;
    /** Record type */
    type: DNSRecordType;
    /** 
     * Record value. See DNS management console for proper formatting 
     * of each record type
     */
    content: string;
    /** 
     * Time to live in seconds. 
     * @minimum 600
     * @default 600 
     */
    ttl?: number;
    /** Priority for records that support it (MX, SRV) */
    prio?: number;
}

/**
 * Options for editing DNS records
 * All fields are optional
 */
export interface DNSEditOptions extends Partial<DNSCreateOptions> { }

/**
 * Response when retrieving DNS records
 */
export interface DNSRecordsResponse extends APIResponse {
    /** Array of DNS records */
    records: DNSRecord[];
}

/**
 * Response when creating a DNS record
 */
export interface DNSCreateResponse extends APIResponse {
    /** ID of created record */
    id: string;
}