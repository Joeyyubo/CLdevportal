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

