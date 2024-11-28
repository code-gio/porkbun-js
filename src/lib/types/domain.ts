import { type APIResponse } from './client';

/**
 * Domain information
 * @interface DomainInfo
 */
export interface DomainInfo {
    /** Domain name */
    domain: string;
    /** Domain registration status */
    status: string;
    /** Top-level domain */
    tld: string;
    /** Domain creation date */
    createDate: string;
    /** Domain expiration date */
    expireDate: string;
    /** Domain lock status */
    securityLock: string;
    /** WHOIS privacy status */
    whoisPrivacy: string;
    /** Auto-renewal setting (0 or 1) */
    autoRenew: number;
    /** Local registration indicator (0 or 1) */
    notLocal: number;
    /** Optional domain labels */
    labels?: Array<{
        /** Label identifier */
        id: string;
        /** Label name */
        title: string;
        /** Label color code */
        color: string;
    }>;
}

/**
 * Options for listing domains
 * @interface DomainListOptions
 */
export interface DomainListOptions {
    /** Starting index for pagination */
    start?: number;
    /** Include domain labels in response */
    includeLabels?: boolean;
}

/**
 * Response for domain listing
 * @interface DomainListResponse
 */
export interface DomainListResponse extends APIResponse {
    /** Array of domain information */
    domains: DomainInfo[];
}

/**
 * Response for nameserver retrieval 
 * @interface NameServersResponse
 */
export interface NameServersResponse extends APIResponse {
    /** Array of nameserver hostnames */
    ns: string[];
}

/**
 * URL forwarding configuration
 * @interface URLForwardingOptions
 */
export interface URLForwardingOptions {
    /** Subdomain to forward. Leave empty for root domain */
    subdomain?: string;
    /** Target URL to forward to */
    location: string;
    /** Forward type */
    type: 'temporary' | 'permanent';
    /** Include path in forwarding */
    includePath: 'yes' | 'no';
    /** Also forward all subdomains */
    wildcard: 'yes' | 'no';
}


/**
 * URL forwarding rule
 * @interface URLForward
 */
export interface URLForward {
    /** Forwarding rule ID */
    id: string;
    /** Forwarded subdomain */
    subdomain: string;
    /** Destination URL */
    location: string;
    /** Forwarding type */
    type: 'temporary' | 'permanent';
    /** Path inclusion setting */
    includePath: 'yes' | 'no';
    /** Wildcard setting */
    wildcard: 'yes' | 'no';
}

/**
 * Response for URL forwarding retrieval
 * @interface URLForwardingResponse
 */
export interface URLForwardingResponse extends APIResponse {
    /** Array of forwarding rules */
    forwards: URLForward[];
}