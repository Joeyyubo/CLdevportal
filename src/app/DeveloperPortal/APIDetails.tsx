import * as React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadContent,
  Page,
  PageSidebar,
  PageSidebarBody,
  Tabs,
  Tab,
  TabTitleText,
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  PageSection,
  Divider,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  SearchInput,
  Title,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  ActionGroup,
  Alert,
  AlertActionLink,
  AlertActionCloseButton,
  Tooltip,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TextInput,
  TextArea,
  FormGroup,
} from '@patternfly/react-core';
import {
  UserIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  StarIcon,
  PencilAltIcon,
  EditIcon,
  CodeBranchIcon,
  UsersIcon,
  CodeIcon,
  ShareAltIcon,
  ExternalLinkAltIcon,
  ExclamationTriangleIcon,
  CopyIcon,
  CheckCircleIcon,
  LockOpenIcon,
  LockIcon,
  CaretDownIcon,
  CaretUpIcon,
  TrashIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// API details data
const apiDetailsData: Record<string, any> = {
  'Flights API': {
    name: 'Flights API',
    tag: 'Ticket',
    contact: 'Jane doe',
    owner: 'Ticket team',
    description: 'Description of the API. Validated aggregated stream activity fact table, used for metrics.',
    lifecycle: 'staging',
    updated: '2 MIN AGO',
    apiKeyRequest: 'No approval needed',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Air-flight-api',
    route: 'Airflight-1',
    policies: 'Airflight-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Booking API': {
    name: 'Booking API',
    tag: 'Payment',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Retrieve detailed information about flight bookings including passenger details and payment status.',
    lifecycle: 'production',
    updated: '15 MIN AGO',
    apiKeyRequest: 'Need approval',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Booking-api',
    route: 'Booking-1',
    policies: 'Booking-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Create Booking API': {
    name: 'Create Booking API',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Create a new flight booking with passenger and payment information.',
    lifecycle: 'production',
    updated: '1 HOUR AGO',
    apiKeyRequest: 'Need approval',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Create-Booking-api',
    route: 'Create-Booking-1',
    policies: 'Create-Booking-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Get Aircraft Details': {
    name: 'Get Aircraft Details',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Retrieve detailed information about aircraft including model, capacity, and technical specifications.',
    lifecycle: 'production',
    updated: '3 HOURS AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Get Aircraft Model Info': {
    name: 'Get Aircraft Model Info',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Access comprehensive aircraft model information and specifications.',
    lifecycle: 'production',
    updated: '5 HOURS AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Get Flight Status': {
    name: 'Get Flight Status',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Check real-time flight status including delays, cancellations, and gate changes.',
    lifecycle: 'production',
    updated: '1 DAY AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Register Client': {
    name: 'Register Client',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Register a new client account with personal and contact information.',
    lifecycle: 'production',
    updated: '2 DAYS AGO',
    apiKeyRequest: 'Need approval',
  },
  'List My Bookings': {
    name: 'List My Bookings',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Retrieve a list of all bookings for the authenticated user.',
    lifecycle: 'production',
    updated: '3 DAYS AGO',
    apiKeyRequest: 'Need approval',
  },
  'Get Loyalty Info': {
    name: 'Get Loyalty Info',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Access loyalty program information including points, tier status, and rewards.',
    lifecycle: 'production',
    updated: '4 DAYS AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Get Payment Status': {
    name: 'Get Payment Status',
    tag: 'Payment',
    contact: 'Payment Team',
    owner: 'Payment team',
    description: 'Check the payment status of transactions and bookings.',
    lifecycle: 'production',
    updated: '5 DAYS AGO',
    apiKeyRequest: 'Need approval',
  },
  'Airport API': {
    name: 'Airport API',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Flight ticket information API for users to get flight details',
    lifecycle: 'production',
    updated: '2 MIN AGO',
    apiKeyRequest: 'No approval needed',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Airport-api',
    route: 'Airport-1',
    policies: 'Airport-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Payment API': {
    name: 'Payment API',
    tag: 'Payment',
    contact: 'Payment Team',
    owner: 'Payment team',
    description: 'API for flight payment processing and transactions',
    lifecycle: 'production',
    updated: '15 MIN AGO',
    apiKeyRequest: 'Need approval',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Payment-api',
    route: 'Payment-1',
    policies: 'Payment-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Aircraft API': {
    name: 'Aircraft API',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Aircraft application data and maintenance information',
    lifecycle: 'production',
    updated: '3 HOURS AGO',
    apiKeyRequest: 'No approval needed',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Aircraft-api',
    route: 'Aircraft-1',
    policies: 'Aircraft-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Client API': {
    name: 'Client API',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'API of client data management and customer information',
    lifecycle: 'production',
    updated: '2 MIN AGO',
    apiKeyRequest: 'No approval needed',
    // API Product fields
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    namespace: 'namespace-1',
    apiKeyApproval: 'Need manual approval',
    api: 'Client-api',
    route: 'Client-1',
    policies: 'Client-plans',
    policiesTiers: [
      { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
      { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
      { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
    ],
  },
  'Aircraft Region API': {
    name: 'Aircraft Region API',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Aircraft type in different regions with location data',
    lifecycle: 'production',
    updated: '3 HOURS AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Booking Management API': {
    name: 'Booking Management API',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Comprehensive booking management and reservation system',
    lifecycle: 'production',
    updated: '1 HOUR AGO',
    apiKeyRequest: 'Need approval',
  },
  'Loyalty Program API': {
    name: 'Loyalty Program API',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Customer loyalty points and rewards program management',
    lifecycle: 'production',
    updated: '4 DAYS AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Payment Processing API': {
    name: 'Payment Processing API',
    tag: 'Payment',
    contact: 'Payment Team',
    owner: 'Payment team',
    description: 'Secure payment processing and transaction handling',
    lifecycle: 'production',
    updated: '5 DAYS AGO',
    apiKeyRequest: 'Need approval',
  },
  'Flight Status API': {
    name: 'Flight Status API',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Real-time flight status updates and schedule information',
    lifecycle: 'production',
    updated: '1 DAY AGO',
    apiKeyRequest: 'No approval needed',
  },
  'Client Registration API': {
    name: 'Client Registration API',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Client account registration and profile management',
    lifecycle: 'production',
    updated: '2 DAYS AGO',
    apiKeyRequest: 'Need approval',
  },
};

const APIDetails: React.FunctionComponent = () => {
  const { apiName } = useParams<{ apiName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  
  // Get current role from localStorage or use default
  const getCurrentRole = (): string => {
    try {
      const role = localStorage.getItem('currentRole');
      return role || 'API consumer';
    } catch {
      return 'API consumer';
    }
  };
  
  const [currentRole, setCurrentRole] = React.useState(getCurrentRole());
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);
  const [isAuthorizeModalOpen, setIsAuthorizeModalOpen] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [expandedEndpoints, setExpandedEndpoints] = React.useState<{ [key: string]: boolean }>({});
  const [apiKeyName, setApiKeyName] = React.useState('Personal key');
  const [apiKeyPlan, setApiKeyPlan] = React.useState('Silver plan (100 reqs/day; 500reqs/week; 3000reqs/month)');
  const [useCase, setUseCase] = React.useState('It work for my personal flight application test.');
  const [showGeneratedKey, setShowGeneratedKey] = React.useState(false);
  const [generatedApiKey, setGeneratedApiKey] = React.useState('vt9Dz-taKWW-KAsDZ-UhpBx');
  const [authorizeApiKey, setAuthorizeApiKey] = React.useState('vt9Dz-taKWW-KAsDZ-UhpBx');
  const [copied, setCopied] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  
  // Publish notification state
  const [showPublishNotification, setShowPublishNotification] = React.useState(false);
  const [apiProductStatus, setApiProductStatus] = React.useState<string>('Draft');
  
  // Create success notification state - check URL parameter
  const searchParams = new URLSearchParams(location.search);
  const isCreated = searchParams.get('created') === 'true';
  const [showCreateNotification, setShowCreateNotification] = React.useState(isCreated);
  
  // Auto-hide create notification after 10 seconds
  React.useEffect(() => {
    if (isCreated && showCreateNotification) {
      const timer = setTimeout(() => {
        setShowCreateNotification(false);
        // Remove the query parameter from URL
        navigate(location.pathname, { replace: true });
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isCreated, showCreateNotification, navigate, location.pathname]);

  // Decode API name from URL and get details
  const decodedApiName = apiName ? decodeURIComponent(apiName) : '';
  const apiDetails = decodedApiName && apiDetailsData[decodedApiName] 
    ? apiDetailsData[decodedApiName] 
    : (decodedApiName ? {
        name: decodedApiName,
        tag: 'Unknown',
        contact: 'Unknown',
        owner: 'Unknown',
        description: 'API details not available',
        lifecycle: 'staging',
        updated: 'Unknown',
        apiKeyRequest: 'Need approval',
        // Default API Product fields
        productDescription: 'Description of the API product.',
        status: 'Draft',
        version: 'V1',
        namespace: 'namespace-1',
        apiKeyApproval: 'Need manual approval',
        api: decodedApiName.toLowerCase().replace(/\s+/g, '-'),
        route: 'route-1',
        policies: 'Default-plans',
        policiesTiers: [
          { name: 'Gold', value: '100/day', color: '#795600', bgColor: '#fef5e7' },
          { name: 'Silver', value: '50/day', color: '#6a6e73', bgColor: '#f5f5f5' },
          { name: 'Bronze', value: '10/day', color: '#004d99', bgColor: '#e6f1fa' },
        ],
      } : apiDetailsData['Flights API']);

  // Initialize status from apiDetails
  React.useEffect(() => {
    if (apiDetails.status) {
      setApiProductStatus(apiDetails.status);
    }
  }, [apiDetails.status]);

  // Load starred status from localStorage
  const getStarredAPIs = (): string[] => {
    try {
      const starred = localStorage.getItem('starredAPIs');
      return starred ? JSON.parse(starred) : [];
    } catch {
      return [];
    }
  };

  const [starredAPIs, setStarredAPIs] = React.useState<string[]>(getStarredAPIs());
  const [isStarred, setIsStarred] = React.useState(starredAPIs.includes(decodedApiName));

  const handleStarClick = () => {
    const newIsStarred = !isStarred;
    setIsStarred(newIsStarred);
    
    const updatedStarred = newIsStarred 
      ? [...starredAPIs, decodedApiName]
      : starredAPIs.filter((name: string) => name !== decodedApiName);
    
    setStarredAPIs(updatedStarred);
    
    // Save to localStorage
    localStorage.setItem('starredAPIs', JSON.stringify(updatedStarred));
    
    // Trigger storage event to notify other tabs/pages
    window.dispatchEvent(new Event('storage'));
  };

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    setActiveTab(typeof eventKey === 'number' ? eventKey : 0);
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownSelect = (_event?: React.MouseEvent | undefined, role?: string | number | undefined) => {
    const newRole = String(role);
    setCurrentRole(newRole);
    // Save to localStorage
    try {
      localStorage.setItem('currentRole', newRole);
      // Trigger storage event
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save role to localStorage:', e);
    }
    setIsUserDropdownOpen(false);
    userToggleRef.current?.focus();
  };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'home') {
      navigate('/home');
    } else if (itemId === 'catalog') {
      navigate('/catalog');
    } else if (itemId === 'apis') {
      navigate('/apis');
    } else if (itemId === 'docs') {
      navigate('/docs');
    } else if (itemId === 'learning') {
      navigate('/learning');
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'api-keys') {
      navigate('/developer-portal/api-keys');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'administration') {
      navigate('/administration');
    } else if (itemId === 'settings') {
      navigate('/settings');
    } else {
      navigate('/developer-portal');
    }
  };

  // Listen to storage changes for role updates
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const role = localStorage.getItem('currentRole');
        if (role) {
          setCurrentRole(role);
        }
      } catch (e) {
        console.error('Failed to read role from localStorage:', e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleEndpoint = (endpointKey: string) => {
    setExpandedEndpoints(prev => ({
      ...prev,
      [endpointKey]: !prev[endpointKey]
    }));
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#CC0000"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>RedHat</span>
                <span style={{ fontSize: '16px' }}>Developer Hub</span>
              </div>
            </div>
            <div style={{ 
              backgroundColor: '#8b47ac', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>UXD PROTOTYPE</span>
              <Tooltip content="This prototype demonstrates the RHCL dev portal and policy management features for 1.3. Not all features and interactions are fully represented and this does not represent a commitment on the part of Red Hat.">
                <Button variant="plain" style={{ color: 'white', padding: 0, minWidth: 'auto' }}>
                  <ExclamationTriangleIcon style={{ fontSize: '16px' }} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
            <Dropdown
              isOpen={isUserDropdownOpen}
              onSelect={handleUserDropdownSelect}
              onOpenChange={(isOpen) => setIsUserDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={handleUserDropdownToggle}
                  aria-expanded={isUserDropdownOpen}
                  aria-label="User account menu"
                  variant="plainText"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserIcon />
                    <span>{currentRole}</span>
                  </div>
                </MenuToggle>
              )}
              popperProps={{ appendTo: () => document.body }}
            >
              <DropdownList>
                <DropdownItem value="API consumer">API consumer</DropdownItem>
                <DropdownItem value="API owner">API owner</DropdownItem>
              </DropdownList>
            </Dropdown>
        </div>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Developer portal navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
          <NavList>
            <NavItem itemId="home" icon={<HomeIcon />} onClick={() => handleNavClick('home')}>
              Home
            </NavItem>
            <NavItem itemId="catalog" icon={<ArchiveIcon />} onClick={() => handleNavClick('catalog')}>
              Catalog
            </NavItem>
            <NavItem itemId="apis" icon={<CogIcon />} onClick={() => handleNavClick('apis')}>
              APIs
            </NavItem>
            <NavItem itemId="docs" icon={<FileAltIcon />} onClick={() => handleNavClick('docs')}>
              Docs
            </NavItem>
            <NavItem itemId="learning" icon={<GraduationCapIcon />} onClick={() => handleNavClick('learning')}>
              Learning Paths
            </NavItem>
            <NavItem itemId="self-service" icon={<PlusCircleIcon />} onClick={() => handleNavClick('self-service')}>
              Self-service
            </NavItem>
            <Divider />
            <NavExpandable
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <rect width="16" height="16" rx="3" fill="black"/>
                    <path d="M 5 6 L 8 4 L 11 6 L 11 10 L 8 12 L 5 10 Z" stroke="white" strokeWidth="1" fill="none" strokeLinejoin="round"/>
                    <path d="M 6 7 L 9 5 L 12 7 L 12 11 L 9 13 L 6 11 Z" stroke="#CC0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8"/>
                  </svg>
                  Connectivity Link
                </span>
              }
              id="connectivity-link-group"
              isExpanded={connectivityLinkExpanded}
              onToggle={() => setConnectivityLinkExpanded(!connectivityLinkExpanded)}
            >
              {currentRole !== 'API consumer' && (
                <NavItem itemId="dev-portal" isActive={location.pathname.includes('/api-details')} icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" isActive={location.pathname.includes('/api-keys')} icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
                API Access
              </NavItem>
              <NavItem itemId="observability" icon={<StarIcon />} onClick={() => handleNavClick('observability')}>
                Observability
              </NavItem>
            </NavExpandable>
            <Divider />
            <NavItem itemId="administration" icon={<ExclamationCircleIcon />} onClick={() => handleNavClick('administration')}>
              Administration
            </NavItem>
            <NavItem itemId="settings" icon={<CogIcon />} onClick={() => handleNavClick('settings')}>
              Settings
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  // Handle publish API product
  const handlePublish = () => {
    setApiProductStatus('Published');
    setShowPublishNotification(true);
    setTimeout(() => {
      setShowPublishNotification(false);
    }, 10000);
  };

  return (
    <>
      {/* Create Success Notification */}
      {showCreateNotification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 1000,
          maxWidth: '500px',
          width: '100%'
        }}>
          <Alert
            variant="success"
            isLiveRegion
            title="API product has been successfully created"
            actionClose={
              <AlertActionCloseButton onClose={() => {
                setShowCreateNotification(false);
                // Remove the query parameter from URL
                navigate(location.pathname, { replace: true });
              }} />
            }
          >
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              API product: {apiDetails.name}
            </div>
          </Alert>
        </div>
      )}
      
      {/* Publish Notification */}
      {showPublishNotification && (
        <div style={{
          position: 'fixed',
          top: showCreateNotification ? '180px' : '80px',
          right: '24px',
          zIndex: 1000,
          maxWidth: '500px',
          width: '100%'
        }}>
          <Alert
            variant="success"
            isLiveRegion
            title="API product has been successfully published"
            actionClose={
              <AlertActionCloseButton onClose={() => setShowPublishNotification(false)} />
            }
          >
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              API product: {apiDetails.name}
            </div>
          </Alert>
        </div>
      )}
      
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
                API products
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {apiDetails.name}
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Title headingLevel="h1" size="2xl">
              {apiDetails.name}
            </Title>
            <Button variant="plain" aria-label="Star" onClick={handleStarClick}>
              <StarIcon style={{ fill: isStarred ? '#0066CC' : 'inherit' }} />
            </Button>
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>Definition</TabTitleText>} />
          </Tabs>

          {activeTab === 0 && (
            <>
              {/* API Product Card */}
              <Card style={{ marginBottom: '24px' }}>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <Title headingLevel="h3" size="lg">API Product</Title>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {apiProductStatus === 'Draft' ? (
                        <Button variant="primary" onClick={handlePublish}>
                          Publish API product
                        </Button>
                      ) : (
                        <Button variant="secondary" onClick={() => setApiProductStatus('Draft')}>
                          Unpublish API product
                        </Button>
                      )}
                      <Button variant="plain" aria-label="Edit">
                        <PencilAltIcon />
                      </Button>
                      <Button variant="plain" aria-label="Delete">
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Product Name</div>
                    <div style={{ fontSize: '14px', color: '#151515' }}>{apiDetails.name}</div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Description</div>
                    <div style={{ fontSize: '14px', color: '#151515' }}>{apiDetails.productDescription || 'Description of the API product.'}</div>
                  </div>

                  <DescriptionList columnModifier={{ default: '1Col', md: '2Col' }}>
                    <DescriptionListGroup>
                      <DescriptionListTerm>STATUS</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Badge isRead style={{ backgroundColor: '#f5f5f5', color: '#151515' }}>
                          {apiProductStatus}
                        </Badge>
                      </DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>VERSION</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.version || 'V1'}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>TAGS</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Badge isRead>{apiDetails.tag}</Badge>
                      </DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>NAMESPACE</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.namespace || 'namespace-1'}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>API KEY APPROVAL</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.apiKeyApproval || 'Need manual approval'}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>API</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.api || apiDetails.name.toLowerCase().replace(/\s+/g, '-')}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>ROUTE</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.route || 'route-1'}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>POLICIES</DescriptionListTerm>
                      <DescriptionListDescription>{apiDetails.policies || 'N/A'}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>POLICIES TIERS</DescriptionListTerm>
                      <DescriptionListDescription>
                        {apiDetails.policiesTiers && apiDetails.policiesTiers.length > 0 ? (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {apiDetails.policiesTiers.map((tier: any, index: number) => (
                              <Badge
                                key={index}
                                isRead
                                style={{
                                  backgroundColor: tier.bgColor || '#f5f5f5',
                                  color: tier.color || '#151515',
                                  border: `1px solid ${tier.color || '#151515'}`,
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px'
                                }}
                              >
                                {tier.name}: {tier.value}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: '#6a6e73' }}>N/A</span>
                        )}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </CardBody>
              </Card>

              {/* API Card */}
              <Card>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <Title headingLevel="h3" size="lg">API</Title>
                  </div>

                  <ActionGroup style={{ marginBottom: '24px' }}>
                    <Button variant="link">
                      <FileAltIcon style={{ marginRight: '6px' }} />
                      VIEW TECHDOCS
                    </Button>
                    <Button variant="link">
                      <CodeBranchIcon style={{ marginRight: '6px' }} />
                      VIEW SOURCE
                    </Button>
                    <Button variant="link">
                      <UsersIcon style={{ marginRight: '6px' }} />
                      CONTACT OWNER
                    </Button>
                  </ActionGroup>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Description</div>
                    <div style={{ fontSize: '14px', color: '#151515' }}>{apiDetails.description}</div>
                  </div>

                  <DescriptionList columnModifier={{ default: '1Col', md: '2Col' }}>
                    <DescriptionListGroup>
                      <DescriptionListTerm>TYPE</DescriptionListTerm>
                      <DescriptionListDescription>openapi</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                      <DescriptionListTerm>LIFECYCLE</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Badge isRead>{apiDetails.lifecycle}</Badge>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </CardBody>
              </Card>
            </>
          )}

        {activeTab === 1 && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d0d0d0' }}>
            {/* Swagger Header */}
            <div style={{ backgroundColor: '#3b4151', padding: '20px', color: 'white', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ margin: 0, marginBottom: '8px', fontSize: '28px', fontWeight: 'bold' }}>Get flight tickets</h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>1.0.0</Badge>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>OAS 3.1</Badge>
                  </div>
                </div>
                <Button variant="primary" style={{ backgroundColor: '#007bff', border: 'none' }} onClick={() => setIsGenerateModalOpen(true)}>Generate API key</Button>
              </div>
            </div>

            {/* Swagger Info Section */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold' }}>Get Flight tickets</h3>
              <p style={{ margin: 0, fontSize: '16px', color: '#6a6e73' }}>
                Flight ticket information API for authorized team to access Flight ticket information of Smart Airline.
              </p>
            </div>

            {/* Servers Section - Swagger Style */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#f7f7f7' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Servers</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #d0d0d0' }}>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', fontSize: '14px' }}>
                  <option>https://Smartairline.com/flightapi/v1-Production</option>
                </select>
                <Button 
                  style={{ 
                    backgroundColor: isAuthorized ? '#2d8659' : 'white', 
                    color: isAuthorized ? 'white' : '#2d8659', 
                    borderColor: '#2d8659',
                    border: '1px solid #2d8659'
                  }}
                  onClick={() => setIsAuthorizeModalOpen(true)}
                >
                  {isAuthorized ? <LockIcon style={{ marginRight: '4px' }} /> : <LockOpenIcon style={{ marginRight: '4px' }} />}
                  Authorize
                </Button>
              </div>
            </div>

              {/* Endpoints Section - Swagger Style */}
              <div>
                <div style={{ padding: '15px 20px', backgroundColor: '#41444e', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                  Endpoints
                </div>
                
              {/* POST /flight/status */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}
                  onClick={() => toggleEndpoint('post-flight-status')}
                >
                  <span style={{ 
                    backgroundColor: '#49cc90', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>POST</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/status</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Create flights status</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {expandedEndpoints['post-flight-status'] ? <CaretUpIcon style={{ fontSize: '16px', color: '#6a6e73' }} /> : <CaretDownIcon style={{ fontSize: '16px', color: '#6a6e73' }} />}
                  </div>
                </div>
                {expandedEndpoints['post-flight-status'] && (
                  <div style={{ padding: '20px', backgroundColor: 'white' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6a6e73' }}>Initiate a consent request to access customer account data.</p>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Parameters</h3>
                        <Button variant="secondary" size="sm">Try it out</Button>
                      </div>
                      <div style={{ color: '#6a6e73', fontSize: '14px' }}>No parameters</div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'inline' }}>Request body</h3>
                          <Badge style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}>required</Badge>
                        </div>
                        <select style={{ padding: '4px 8px', fontSize: '14px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                          <option>application/json</option>
                        </select>
                      </div>
                      <div style={{ borderBottom: '1px solid #d0d0d0', marginBottom: '12px' }}>
                        <span style={{ display: 'inline-block', padding: '8px 16px', fontSize: '14px', borderBottom: '2px solid #0066CC', color: '#0066CC', cursor: 'pointer' }}>Example Value</span>
                        <span style={{ display: 'inline-block', padding: '8px 16px', fontSize: '14px', color: '#6a6e73', cursor: 'pointer' }}>Schema</span>
                      </div>
                      <pre style={{ backgroundColor: '#2d2d2d', color: '#d4d4d4', padding: '16px', borderRadius: '4px', margin: 0, fontSize: '13px', overflow: 'auto' }}>
{`{
  "userId": "string",
  "permissions": ["string"]
}`}
                      </pre>
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Responses</h3>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Code</th>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Description</th>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Links</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#67b350' }}>201</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px' }}>Consent successfully created</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6a6e73' }}>No links</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#e57373' }}>400</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px' }}>Bad request</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6a6e73' }}>No links</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#e57373' }}>401</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px' }}>Unauthorized</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6a6e73' }}>No links</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* GET /flight time */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}
                  onClick={() => toggleEndpoint('get-flight-time')}
                >
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight time</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get flights time</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {expandedEndpoints['get-flight-time'] ? <CaretUpIcon style={{ fontSize: '16px', color: '#6a6e73' }} /> : <CaretDownIcon style={{ fontSize: '16px', color: '#6a6e73' }} />}
                  </div>
                </div>
                {expandedEndpoints['get-flight-time'] && (
                  <div style={{ padding: '20px', backgroundColor: 'white' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6a6e73' }}>Retrieve flight time information.</p>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Parameters</h3>
                        <Button variant="secondary" size="sm">Try it out</Button>
                      </div>
                      <div style={{ color: '#6a6e73', fontSize: '14px' }}>No parameters</div>
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Responses</h3>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Code</th>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Description</th>
                            <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: 'bold' }}>Links</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#67b350' }}>200</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px' }}>Success</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6a6e73' }}>No links</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* GET /flight/{flightid} */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}
                  onClick={() => toggleEndpoint('get-flight-id')}
                >
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/{'{flightid}'}</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get flights id</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {expandedEndpoints['get-flight-id'] ? <CaretUpIcon style={{ fontSize: '16px', color: '#6a6e73' }} /> : <CaretDownIcon style={{ fontSize: '16px', color: '#6a6e73' }} />}
                  </div>
                </div>
                {expandedEndpoints['get-flight-id'] && (
                  <div style={{ padding: '20px', backgroundColor: 'white' }}>
                    <p style={{ margin: 0, marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>Retrieve flight details by ID.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Parameters</h3>
                      <Button variant="secondary" size="sm">Try it out</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* GET /flight/{region} */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}
                  onClick={() => toggleEndpoint('get-flight-region')}
                >
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/{'{region}'}</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get region</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {expandedEndpoints['get-flight-region'] ? <CaretUpIcon style={{ fontSize: '16px', color: '#6a6e73' }} /> : <CaretDownIcon style={{ fontSize: '16px', color: '#6a6e73' }} />}
                  </div>
                </div>
                {expandedEndpoints['get-flight-region'] && (
                  <div style={{ padding: '20px', backgroundColor: 'white' }}>
                    <p style={{ margin: 0, marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>Retrieve flight information by region.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Parameters</h3>
                      <Button variant="secondary" size="sm">Try it out</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Schemas Section - Swagger Style */}
            <div style={{ borderTop: '1px solid #d0d0d0' }}>
              <div style={{ padding: '15px 20px', backgroundColor: '#41444e', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                Schemas
              </div>
              
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>FlightRequest</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>FlightResponse</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #d0d0d0', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>Region</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <Card>
            <CardBody>
              <Title headingLevel="h3" size="lg" style={{ marginBottom: '24px' }}>Policy</Title>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>plans</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Standard plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        <div>Dev-silver: 100 reqs/day; 5k reqs/week; 10k reqs/month;</div>
                        <div>Dev-gold: 200 reqs/day; 10k reqs/week; 20k reqs/month;</div>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Advanced plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        Sale team: 1k reqs/day; 50k reqs/week; 300k reqs/month;
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Free plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        All team: 200 reqs/day; 5k reqs/week; 20k reqs/month;
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        )}
        </PageSection>
      </Page>

      {/* Generate API Key Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => {
          setIsGenerateModalOpen(false);
          setShowGeneratedKey(false);
          setCopied(false);
        }}
        variant="small"
        style={{ '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)' } as React.CSSProperties}
      >
        <ModalHeader title="Generate API key" />
        <ModalBody>
          <p style={{ marginBottom: '24px', fontSize: '14px', color: '#6a6e73' }}>Create API credential to use the API.</p>
          
          {apiDetails.apiKeyRequest === 'Need approval' && (
            <Alert 
              variant="warning" 
              title="This API key request need to be approved" 
              style={{ marginBottom: '24px' }}
              className="no-shadow-alert"
            />
          )}

          {!showGeneratedKey ? (
            <>
              <FormGroup label="API" isRequired fieldId="api-name" style={{ marginBottom: '16px' }}>
                <TextInput
                  id="api-name"
                  value={apiDetails.name}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="API plan" isRequired fieldId="api-plan" style={{ marginBottom: '16px' }}>
                <select 
                  id="api-plan"
                  value={apiKeyPlan}
                  onChange={(e) => setApiKeyPlan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    border: '1px solid #8b8d90',
                    borderRadius: '4px',
                    minHeight: '36px'
                  }}
                >
                  <option>Silver plan (100 reqs/day; 500reqs/week; 3000reqs/month)</option>
                  <option>Gold plan (200 reqs/day; 1000reqs/week; 6000reqs/month)</option>
                  <option>Platinum plan (500 reqs/day; 2000reqs/week; 10000reqs/month)</option>
                </select>
              </FormGroup>

              <FormGroup label="Name" isRequired fieldId="key-name" style={{ marginBottom: '16px' }}>
                <TextInput
                  id="key-name"
                  value={apiKeyName}
                  onChange={(_, value) => setApiKeyName(value)}
                />
              </FormGroup>

              <FormGroup 
                label={apiDetails.apiKeyRequest === 'Need approval' ? 'Description' : 'Use case & Description'} 
                fieldId="use-case"
              >
                {apiDetails.apiKeyRequest === 'Need approval' && (
                  <div style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '8px' }}>
                    Share your use case with API owner to get quick approval.
                  </div>
                )}
                <TextArea
                  id="use-case"
                  value={useCase}
                  onChange={(_, value) => setUseCase(value)}
                  rows={4}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup label="API" isRequired fieldId="api-name" style={{ marginBottom: '16px' }}>
                <TextInput
                  id="api-name"
                  value={apiDetails.name}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="API plan" isRequired fieldId="api-plan" style={{ marginBottom: '16px' }}>
                <TextInput
                  id="api-plan"
                  value={apiKeyPlan}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="Name" isRequired fieldId="key-name" style={{ marginBottom: '16px' }}>
                <TextInput
                  id="key-name"
                  value={apiKeyName}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              {apiDetails.apiKeyRequest !== 'Need approval' && (
                <FormGroup label="API key" isRequired fieldId="generated-key">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TextInput
                    id="generated-key"
                    value={generatedApiKey}
                    readOnly
                    style={{ flex: 1, backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                  />
                  <div style={{ position: 'relative' }}>
                    <Tooltip content="Copy to clipboard">
                      <Button 
                        variant="plain" 
                        onClick={() => {
                          navigator.clipboard.writeText(generatedApiKey);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        aria-label="Copy API key"
                      >
                        <CopyIcon />
                      </Button>
                    </Tooltip>
                    {copied && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          right: 0,
                          marginBottom: '8px',
                          padding: '4px 8px',
                          backgroundColor: '#151515',
                          color: 'white',
                          fontSize: '12px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          zIndex: 1000
                        }}
                      >
                        Copied!
                      </div>
                    )}
                  </div>
                </div>
              </FormGroup>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={() => {
              setIsGenerateModalOpen(false);
              setShowGeneratedKey(false);
              setCopied(false);
            }} 
            variant="secondary"
          >
            {showGeneratedKey ? 'Cancel' : 'Cancel'}
          </Button>
          <Button 
            onClick={() => {
              if (!showGeneratedKey) {
                setShowGeneratedKey(true);
              } else {
                setIsGenerateModalOpen(false);
                setShowGeneratedKey(false);
                setCopied(false);
              }
            }} 
            variant="primary"
          >
            {showGeneratedKey ? (apiDetails.apiKeyRequest === 'Need approval' ? 'Done' : 'Save') : (apiDetails.apiKeyRequest === 'Need approval' ? 'Request' : 'Generate')}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Authorize API Key Modal */}
      <Modal
        isOpen={isAuthorizeModalOpen}
        onClose={() => setIsAuthorizeModalOpen(false)}
        variant="small"
        style={{ '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)' } as React.CSSProperties}
      >
        <ModalHeader title="Authorize API" />
        <ModalBody>
          <p style={{ marginBottom: '24px', fontSize: '14px', color: '#6a6e73' }}>Enter the API key to use the API.</p>
          
          <FormGroup label="API" isRequired fieldId="authorize-api-name" style={{ marginBottom: '16px' }}>
            <TextInput
              id="authorize-api-name"
              value={apiDetails.name}
              readOnly
              style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
            />
          </FormGroup>

          <FormGroup label="API keys" isRequired fieldId="authorize-api-key" style={{ marginBottom: '16px' }}>
            <TextInput
              id="authorize-api-key"
              value={authorizeApiKey}
              onChange={(_, value) => setAuthorizeApiKey(value)}
              placeholder="Enter API key"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={() => setIsAuthorizeModalOpen(false)} 
            variant="secondary"
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              // Handle authorize
              setIsAuthorized(true);
              setIsAuthorizeModalOpen(false);
            }} 
            variant="primary"
          >
            Authorize
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export { APIDetails };

