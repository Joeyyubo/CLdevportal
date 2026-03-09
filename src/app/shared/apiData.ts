// Shared API data for both API owner and API consumer perspectives
export interface API {
  name: string;
  type: string;
  owner: string;
  lifecycle: string;
  description: string;
  tags: string[];
  starred?: boolean;
  owned?: boolean;
}

// Shared list of all available APIs (used in dropdowns, filters, etc.)
export const availableApis = [
  'Flights API',
  'Booking API',
  'Create Booking API',
  'Airport API',
  'Payment API',
  'Aircraft API',
  'Client API',
  'Aircraft Region API',
  'Booking Management API',
  'Loyalty Program API',
  'Payment Processing API',
  'Flight Status API',
  'Client Registration API',
];

// Shared initial API data
export const initialApiData: API[] = [
  { 
    name: 'Flights API', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Flight ticket information API for users to get flight details', 
    tags: ['Ticket'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Booking API', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'API for flight payment processing and transactions', 
    tags: ['Payment'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Create Booking API', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Aircraft application data and maintenance information', 
    tags: ['Aircraft'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Airport API', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Flight ticket information API for users to get flight details', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Payment API', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'API for flight payment processing and transactions', 
    tags: ['Payment'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Aircraft API', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft application data and maintenance information', 
    tags: ['Aircraft'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Client API', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'API of client data management and customer information', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Aircraft Region API', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft type in different regions with location data', 
    tags: ['Aircraft'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Booking Management API', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Comprehensive booking management and reservation system', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Loyalty Program API', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Customer loyalty points and rewards program management', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Payment Processing API', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'Secure payment processing and transaction handling', 
    tags: ['Payment'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Flight Status API', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Real-time flight status updates and schedule information', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Client Registration API', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Client account registration and profile management', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
];

// API product overview: shared between API details page (API product info tab) and API product details (EditAPIProduct Overview)
// When an API name matches a key here, both pages show the same product info.
export interface APIProductOverview {
  name: string;
  description: string;
  status: 'Draft' | 'Published';
  version: string;
  tags: string[];
  namespace: string;
  apiKeyApproval: string;
  resourceName: string;
  route: string;
  policies: string;
  openApiSpecUrl?: string;
  availableTiers?: { tier: string; rateLimits: string }[];
}

export const apiProductOverviewByApiName: Record<string, APIProductOverview> = {
  'Flights API': {
    name: 'Flights API',
    description: 'Flight ticket information API for users to get flight details',
    status: 'Draft',
    version: 'V1',
    tags: ['Ticket'],
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    resourceName: 'air-flight-api',
    route: 'Airflight-1',
    policies: 'Airflight-plans',
    openApiSpecUrl: 'https://github.com/backstage/flights-api/blob/main/openapi.yaml',
    availableTiers: [
      { tier: 'enterprise', rateLimits: '100000 per daily' },
      { tier: 'team', rateLimits: '10000 per daily' },
    ],
  },
  'Booking API': {
    name: 'Booking API',
    description: 'API for flight payment processing and transactions',
    status: 'Draft',
    version: 'V1',
    tags: ['Payment'],
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    resourceName: 'booking-api',
    route: 'Booking-1',
    policies: 'Booking-plans',
    openApiSpecUrl: 'https://github.com/backstage/booking-api/blob/main/openapi.yaml',
    availableTiers: [
      { tier: 'enterprise', rateLimits: '100000 per daily' },
      { tier: 'team', rateLimits: '10000 per daily' },
    ],
  },
  'Create Booking API': {
    name: 'Create Booking API',
    description: 'Aircraft application data and maintenance information',
    status: 'Draft',
    version: 'V1',
    tags: ['Aircraft'],
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    resourceName: 'create-booking-api',
    route: 'Create-Booking-1',
    policies: 'Create-Booking-plans',
    openApiSpecUrl: 'https://github.com/backstage/create-booking-api/blob/main/openapi.yaml',
    availableTiers: [
      { tier: 'enterprise', rateLimits: '100000 per daily' },
      { tier: 'team', rateLimits: '10000 per daily' },
    ],
  },
  'Payment API': {
    name: 'Payment API',
    description: 'API for flight payment processing and transactions',
    status: 'Published',
    version: 'V1',
    tags: ['Payment'],
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    resourceName: 'payment-api',
    route: 'petstore-5',
    policies: 'toystore-plans',
    openApiSpecUrl: 'https://github.com/backstage/payment-api/blob/main/openapi.yaml',
    availableTiers: [
      { tier: 'enterprise', rateLimits: '100000 per daily' },
      { tier: 'team', rateLimits: '10000 per daily' },
    ],
  },
  'Aircraft API': {
    name: 'Aircraft API',
    description: 'Aircraft application data and maintenance information',
    status: 'Published',
    version: 'V2',
    tags: ['Aircraft'],
    namespace: 'namespace-3',
    apiKeyApproval: 'Need manual approval',
    resourceName: 'aircraft-api',
    route: 'petstore-4',
    policies: 'N/A',
    openApiSpecUrl: 'https://github.com/backstage/aircraft-api/blob/main/openapi.yaml',
    availableTiers: [
      { tier: 'enterprise', rateLimits: '100000 per daily' },
      { tier: 'team', rateLimits: '10000 per daily' },
    ],
  },
};

const API_PRODUCT_STATUSES_KEY = 'apiProductStatuses';

/** Get API product publish status (shared: APIs page visibility, API products table, product details page). */
export function getApiProductStatus(name: string): 'Draft' | 'Published' {
  try {
    const raw = localStorage.getItem(API_PRODUCT_STATUSES_KEY);
    if (raw) {
      const map: Record<string, string> = JSON.parse(raw);
      if (map[name] === 'Published' || map[name] === 'Draft') return map[name] as 'Draft' | 'Published';
    }
  } catch (_) {}
  return (apiProductOverviewByApiName[name]?.status as 'Draft' | 'Published') ?? 'Draft';
}

/** Set API product publish status (persists so APIs page, table, and details stay in sync). */
export function setApiProductStatus(name: string, status: 'Draft' | 'Published'): void {
  try {
    const raw = localStorage.getItem(API_PRODUCT_STATUSES_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    map[name] = status;
    localStorage.setItem(API_PRODUCT_STATUSES_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to save API product status:', e);
  }
}

// APIs that require approval alert
export const apisRequiringApproval = [
  'Flights API',
  'Booking API',
  'Create Booking API',
  'Airport API',
  'Payment API',
  'Aircraft API',
  'Client API',
];

// Shared API Key interface
export interface SharedAPIKey {
  name: string;
  status: 'Active' | 'Pending' | 'Rejected';
  tiers: string;
  api: string;
  activeTime: string;
  useCase?: string;
  rejectionReason?: string;
}

// Shared initial API keys data (from API Access page)
export const initialSharedApiKeys: SharedAPIKey[] = [
  { 
    name: 'MyAPIkey_1', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Flights API', 
    activeTime: 'Jan 20, 2026',
    useCase: 'Work for my personal flight application production. This API key is used for accessing flight booking services.'
  },
  { 
    name: 'MyAPIkey_2', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Booking API', 
    activeTime: 'Jan 20, 2026',
    useCase: 'Integration with booking management system for inventory tracking.'
  },
  { 
    name: 'MyAPIkey_3', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Create Booking API', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Booking service integration for booking and management.'
  },
  { 
    name: 'MyAPIkey_4', 
    status: 'Pending', 
    tiers: 'Silver', 
    api: 'Airport API', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Pending approval for airport information management system.'
  },
  { 
    name: 'MyAPIkey_5', 
    status: 'Pending', 
    tiers: 'Bronze', 
    api: 'Payment API', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Payment processing service integration for file management.'
  },
  { 
    name: 'MyAPIkey_6', 
    status: 'Rejected', 
    tiers: 'Bronze', 
    api: 'Aircraft API', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Work for my personal flight application test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, ipsum dolor sit amet,',
    rejectionReason: 'Rejection reason: ion test. Lorem ipsum dolor sit amururururtur at.'
  },
  // API keys for approval (API owner perspective)
  { 
    name: 'IssuedAPIkey_1', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Toystore', 
    activeTime: 'Jan 20, 2026',
    useCase: 'Work for my personal flight application production.'
  },
  { 
    name: 'IssuedAPIkey_2', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Petstore', 
    activeTime: 'Jan 20, 2026',
    useCase: 'Integration with booking management system.'
  },
  { 
    name: 'IssuedAPIkey_3', 
    status: 'Active', 
    tiers: 'Gold', 
    api: 'Carstore', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Booking service integration.'
  },
  { 
    name: 'Pendingkeyreq_1', 
    status: 'Pending', 
    tiers: 'Silver', 
    api: 'Birdstore', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Pending approval for airport information management system.'
  },
  { 
    name: 'Pendingkeyreq_2', 
    status: 'Pending', 
    tiers: 'Bronze', 
    api: 'Cloudstore', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Payment processing service integration.'
  },
  { 
    name: 'RejectedAPIkey', 
    status: 'Rejected', 
    tiers: 'Bronze', 
    api: 'Bikestore', 
    activeTime: 'Sep 05, 2025',
    useCase: 'Work for my personal flight application test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, ipsum dolor sit amet,',
    rejectionReason: 'Rejection reason: ion test. Lorem ipsum dolor sit amururururtur at.'
  },
];

