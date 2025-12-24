import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadContent,
  Page,
  PageSidebar,
  PageSidebarBody,
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
  Title,
  Tabs,
  Tab,
  TabTitleText,
  Card,
  CardBody,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  ActionGroup,
  Grid,
  GridItem,
  Alert,
  SearchInput,
  Label,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  TextInput,
  TextArea,
  Pagination,
} from '@patternfly/react-core';
import {
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  CodeIcon,
  UserIcon,
  StarIcon,
  PencilAltIcon,
  EditIcon,
  CodeBranchIcon,
  UsersIcon,
  ShareAltIcon,
  ExclamationTriangleIcon,
  CopyIcon,
  CheckCircleIcon,
  CaretDownIcon,
  CaretUpIcon,
  LockIcon,
  LockOpenIcon,
  InfoCircleIcon,
  ClockIcon,
  TimesCircleIcon,
  TimesIcon,
  TrashIcon,
  AngleRightIcon,
  AngleDownIcon,
  CheckIcon,
} from '@patternfly/react-icons';
import { apisRequiringApproval } from '../shared/apiData';
import './APIs.css';

// API details data for APIs module
const apiDetailsData: Record<string, any> = {
  'Flights API': {
    name: 'Flights API',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Flight ticket information API for users to get flight details',
    version: 'v1.1',
    endpoints: ['GET /flights', 'GET /flights/:id'],
    tags: ['Ticket'],
    provider: {
      name: 'Flights API',
      system: 'airline-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Booking API': {
    name: 'Booking API',
    type: 'openapi',
    owner: 'Payment Team',
    lifecycle: 'production',
    description: 'API for flight payment processing and transactions',
    version: 'v1.1',
    endpoints: ['GET /booking/:id', 'POST /booking'],
    tags: ['Payment'],
    provider: {
      name: 'Booking API',
      system: 'booking-system',
      owner: 'Payment Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Create Booking API': {
    name: 'Create Booking API',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Aircraft application data and maintenance information',
    version: 'v1.1',
    endpoints: ['POST /booking', 'PUT /booking/:id'],
    tags: ['Aircraft'],
    provider: {
      name: 'Create Booking API',
      system: 'booking-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Airport API': {
    name: 'Airport API',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Flight ticket information API for users to get flight details',
    version: 'v1.1',
    endpoints: ['GET /airports', 'GET /airports/:id'],
    tags: ['Ticket'],
    provider: {
      name: 'Airport API',
      system: 'airline-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Payment API': {
    name: 'Payment API',
    type: 'openapi',
    owner: 'Payment Team',
    lifecycle: 'production',
    description: 'API for flight payment processing and transactions',
    version: 'v1.1',
    endpoints: ['POST /payment', 'GET /payment/:id'],
    tags: ['Payment'],
    provider: {
      name: 'Payment API',
      system: 'payment-system',
      owner: 'Payment Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Aircraft API': {
    name: 'Aircraft API',
    type: 'openapi',
    owner: 'Aircraft Team',
    lifecycle: 'production',
    description: 'Aircraft application data and maintenance information',
    version: 'v1.1',
    endpoints: ['GET /aircraft', 'POST /aircraft'],
    tags: ['Aircraft'],
    provider: {
      name: 'Aircraft API',
      system: 'aircraft-system',
      owner: 'Aircraft Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
};

interface APIKey {
  name: string;
  status: 'Active' | 'Pending' | 'Rejected';
  tiers: string;
  api: string;
  activeTime: string;
  useCase?: string;
  rejectionReason?: string;
}

const APIDetailsPage: React.FunctionComponent = () => {
  const { apiName } = useParams<{ apiName: string }>();
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isStarred, setIsStarred] = React.useState(false);
  const [expandedEndpoints, setExpandedEndpoints] = React.useState<Record<string, boolean>>({});
  const [apiKeysSearchValue, setApiKeysSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [tiersFilter, setTiersFilter] = React.useState('All');
  const [expandedApiKeyRows, setExpandedApiKeyRows] = React.useState<Set<number>>(new Set());
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = React.useState(false);
  const infoPopoverRef = React.useRef<HTMLButtonElement>(null);
  const tooltipContentRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside to close tooltip
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isInfoPopoverOpen) return;
      
      const target = event.target as HTMLElement;
      // Don't close if clicking the trigger button
      if (infoPopoverRef.current?.contains(target)) {
        return;
      }
      // Don't close if clicking inside the tooltip
      if (tooltipContentRef.current?.contains(target)) {
        return;
      }
      // Close if clicking outside
      setIsInfoPopoverOpen(false);
    };

    if (isInfoPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInfoPopoverOpen]);
  
  // Request API key modal states
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState('');
  const [selectedTier, setSelectedTier] = React.useState('');
  const [isTierDropdownOpen, setIsTierDropdownOpen] = React.useState(false);
  const [useCase, setUseCase] = React.useState('');
  const [hasAttemptedTierSelection, setHasAttemptedTierSelection] = React.useState(false);

  // API keys approval tab states
  interface ApprovalAPIKey {
    name: string;
    status: 'Active' | 'Pending' | 'Rejected';
    tiers: string;
    api: string;
    activeTime: string;
    client?: string;
    useCase?: string;
    rejectionReason?: string;
  }

  // All approval API keys - based on API Access page relationships
  // IssuedAPIkey_1 -> Flights API
  // IssuedAPIkey_2 -> Booking API
  // IssuedAPIkey_3 -> Create Booking API
  // Pendingkeyreq_1 -> Airport API
  // Pendingkeyreq_2 -> Payment API
  // RejectedAPIkey -> Aircraft API
  const allApprovalApiKeys: ApprovalAPIKey[] = [
    { 
      name: 'IssuedAPIkey_1', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Flights API', 
      activeTime: 'Jan 20,2026',
      client: 'Joe',
      useCase: 'Work for my personal flight application production.'
    },
    { 
      name: 'IssuedAPIkey_2', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Booking API', 
      activeTime: 'Jan 20,2026',
      client: 'Jee',
      useCase: 'Integration with booking management system.'
    },
    { 
      name: 'IssuedAPIkey_3', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Create Booking API', 
      activeTime: 'Sep 05,2025',
      client: 'Jay',
      useCase: 'Booking service integration.'
    },
    { 
      name: 'Pendingkeyreq_1', 
      status: 'Pending', 
      tiers: 'Silver', 
      api: 'Airport API', 
      activeTime: 'Sep 05,2025',
      client: 'John',
      useCase: 'Pending approval for airport information management system.'
    },
    { 
      name: 'Pendingkeyreq_2', 
      status: 'Pending', 
      tiers: 'Bronze', 
      api: 'Payment API', 
      activeTime: 'Sep 05,2025',
      client: 'Linda',
      useCase: 'Payment processing service integration.'
    },
    { 
      name: 'RejectedAPIkey', 
      status: 'Rejected', 
      tiers: 'Bronze', 
      api: 'Aircraft API', 
      activeTime: 'Sep 05,2025',
      client: 'Ross',
      rejectionReason: 'Rejection reason: ion test.em ipsum dolor sit amururururtur at.'
    },
  ];
  
  // Filter to only show approval API keys for the current API
  const initialApprovalApiKeys = allApprovalApiKeys.filter(key => key.api === (apiName ? decodeURIComponent(apiName) : ''));

  // Update approvalApiKeys when apiName changes
  const [approvalApiKeys, setApprovalApiKeys] = React.useState<ApprovalAPIKey[]>(initialApprovalApiKeys);
  
  React.useEffect(() => {
    const decodedName = apiName ? decodeURIComponent(apiName) : '';
    const filtered = allApprovalApiKeys.filter(key => key.api === decodedName);
    setApprovalApiKeys(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiName]);
  const [approvalSearchValue, setApprovalSearchValue] = React.useState('');
  const [approvalStatusFilter, setApprovalStatusFilter] = React.useState('All');
  const [approvalTiersFilter, setApprovalTiersFilter] = React.useState('All');
  const [approvalClientFilter, setApprovalClientFilter] = React.useState('All');
  const [approvalExpandedRows, setApprovalExpandedRows] = React.useState<Set<number>>(new Set());
  const [approvalPage, setApprovalPage] = React.useState(1);
  const [approvalPerPage, setApprovalPerPage] = React.useState(10);
  const [isApprovalInfoPopoverOpen, setIsApprovalInfoPopoverOpen] = React.useState(false);
  const approvalInfoPopoverRef = React.useRef<HTMLButtonElement>(null);
  const approvalTooltipContentRef = React.useRef<HTMLDivElement>(null);

  const uniqueApprovalClients = React.useMemo(() => {
    return Array.from(new Set(approvalApiKeys.map(key => key.client).filter(Boolean))) as string[];
  }, [approvalApiKeys]);

  const toggleApprovalRowExpanded = (index: number) => {
    const newExpanded = new Set(approvalExpandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setApprovalExpandedRows(newExpanded);
  };

  const handleApprovalApprove = (key: ApprovalAPIKey) => {
    setApprovalApiKeys(prev => prev.map(k => 
      k.name === key.name ? { ...k, status: 'Active' as const } : k
    ));
  };

  const handleApprovalReject = (key: ApprovalAPIKey) => {
    setApprovalApiKeys(prev => prev.map(k => 
      k.name === key.name ? { ...k, status: 'Rejected' as const, rejectionReason: 'Rejected by API owner' } : k
    ));
  };
  
  // Available tiers
  const availableTiers = ['Gold', 'Silver', 'Bronze'];
  
  const getCurrentRole = (): string => {
    try {
      const role = localStorage.getItem('currentRole');
      return role || 'API consumer';
    } catch {
      return 'API consumer';
    }
  };
  
  const [currentRole, setCurrentRole] = React.useState(getCurrentRole());

  const decodedApiName = apiName ? decodeURIComponent(apiName) : '';
  const apiDetails = decodedApiName && apiDetailsData[decodedApiName] 
    ? apiDetailsData[decodedApiName] 
    : apiDetailsData['Flights API'];
  
  // Filter approval API keys (must be after apiDetails and decodedApiName are declared)
  const filteredApprovalApiKeys = React.useMemo(() => {
    return approvalApiKeys.filter(key => {
      // Only show API keys that match the current API
      if (key.api !== apiDetails.name && key.api !== decodedApiName) return false;
      if (approvalStatusFilter !== 'All' && key.status !== approvalStatusFilter) return false;
      if (approvalTiersFilter !== 'All' && key.tiers !== approvalTiersFilter) return false;
      if (approvalClientFilter !== 'All' && key.client !== approvalClientFilter) return false;
      if (approvalSearchValue && !key.name.toLowerCase().includes(approvalSearchValue.toLowerCase())) return false;
      return true;
    });
  }, [approvalApiKeys, apiDetails.name, decodedApiName, approvalStatusFilter, approvalTiersFilter, approvalClientFilter, approvalSearchValue]);

  const paginatedApprovalApiKeys = React.useMemo(() => {
    const start = (approvalPage - 1) * approvalPerPage;
    return filteredApprovalApiKeys.slice(start, start + approvalPerPage);
  }, [filteredApprovalApiKeys, approvalPage, approvalPerPage]);
  
  // Check if Tiers field should show error (when user tried to select tier but API is not selected)
  // In API details page, API is always selected, so this will always be false
  const isTierFieldError = hasAttemptedTierSelection && !apiDetails.name;

  // Sample API keys data - based on API Access page relationships
  // MyAPIkey_1 -> Flights API
  // MyAPIkey_2 -> Booking API
  // MyAPIkey_3 -> Create Booking API
  // MyAPIkey_4 -> Airport API
  // MyAPIkey_5 -> Payment API
  // MyAPIkey_6 -> Aircraft API
  const allApiKeys: APIKey[] = [
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
  ];
  
  // Filter to only show API keys for the current API
  const apiKeys = allApiKeys.filter(key => key.api === apiDetails.name);

  // Filter API keys based on search and filters
  const filteredApiKeys = React.useMemo(() => {
    let filtered = apiKeys.filter(key => key.api === apiDetails.name);
    
    if (apiKeysSearchValue.trim()) {
      const searchLower = apiKeysSearchValue.toLowerCase();
      filtered = filtered.filter(key =>
        key.name.toLowerCase().includes(searchLower) ||
        key.tiers.toLowerCase().includes(searchLower)
      );
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(key => key.status === statusFilter);
    }
    
    if (tiersFilter !== 'All') {
      filtered = filtered.filter(key => key.tiers === tiersFilter);
    }
    
    return filtered;
  }, [apiKeys, apiDetails.name, apiKeysSearchValue, statusFilter, tiersFilter]);

  // Calculate status counts (only for keys matching current API)
  const statusCounts = React.useMemo(() => {
    const apiKeysForCurrentApi = apiKeys.filter(k => k.api === apiDetails.name);
    return {
      All: apiKeysForCurrentApi.length,
      Active: apiKeysForCurrentApi.filter(k => k.status === 'Active').length,
      Pending: apiKeysForCurrentApi.filter(k => k.status === 'Pending').length,
      Rejected: apiKeysForCurrentApi.filter(k => k.status === 'Rejected').length,
    };
  }, [apiKeys, apiDetails.name]);

  const uniqueTiers = Array.from(new Set(apiKeys.filter(k => k.api === apiDetails.name).map(k => k.tiers)));

  const toggleApiKeyRowExpanded = (index: number) => {
    setExpandedApiKeyRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, tabKey: string | number) => {
    setActiveTab(Number(tabKey));
  };

  const toggleEndpoint = (endpointKey: string) => {
    setExpandedEndpoints(prev => ({
      ...prev,
      [endpointKey]: !prev[endpointKey]
    }));
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownSelect = (_event?: React.MouseEvent | undefined, role?: string | number | undefined) => {
    const newRole = String(role);
    setCurrentRole(newRole);
    try {
      localStorage.setItem('currentRole', newRole);
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save role to localStorage:', e);
    }
    setIsUserDropdownOpen(false);
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
      if (currentRole === 'API consumer') {
        navigate('/developer-portal/api-keys');
    } else {
      navigate('/developer-portal');
      }
    } else if (itemId === 'api-keys') {
      navigate('/developer-portal/api-keys');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/apis');
    }
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
            <NavItem itemId="apis" isActive icon={<CogIcon />} onClick={() => handleNavClick('apis')}>
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
                <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
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

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate('/apis')}>
              APIs
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>{apiDetails.name}</BreadcrumbItem>
        </Breadcrumb>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl">
            {apiDetails.name}
          </Title>
          <Button variant="plain" aria-label="Star" onClick={handleStarClick}>
            <StarIcon style={{ fill: isStarred ? '#0066CC' : 'inherit' }} />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px', fontSize: '14px', color: '#6a6e73' }}>
          <span>Owner: {apiDetails.owner}</span>
          <span>•</span>
          <span>Lifecycle: {apiDetails.lifecycle}</span>
        </div>

        <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
          <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>Definition</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>My API keys</TabTitleText>} />
          {currentRole === 'API owner' && (
            <Tab eventKey={3} title={<TabTitleText>API keys approval</TabTitleText>} />
          )}
        </Tabs>

        {activeTab === 0 && (
          <>
            <Grid hasGutter>
              {/* Left Column */}
              <GridItem span={6}>
                {/* About Section */}
                <Card style={{ marginBottom: '24px' }}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <Title headingLevel="h3" size="lg">About</Title>
                    </div>

                    <DescriptionList style={{ marginBottom: '24px' }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Description</DescriptionListTerm>
                        <DescriptionListDescription>{apiDetails.description}</DescriptionListDescription>
                      </DescriptionListGroup>
                      
                      <DescriptionListGroup>
                        <DescriptionListTerm>Owner</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button variant="link" isInline>
                            {apiDetails.owner}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>System</DescriptionListTerm>
                        <DescriptionListDescription>No System</DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Type</DescriptionListTerm>
                        <DescriptionListDescription>{apiDetails.type}</DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Lifecycle</DescriptionListTerm>
                        <DescriptionListDescription>{apiDetails.lifecycle}</DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Tags</DescriptionListTerm>
                        <DescriptionListDescription>
                          {apiDetails.tags && apiDetails.tags.map((tag: string, idx: number) => (
                            <Badge key={idx} isRead style={{ marginRight: '4px' }}>
                              {tag}
                            </Badge>
                          ))}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>

                    <ActionGroup>
                      <Button variant="link">
                        <CodeBranchIcon style={{ marginRight: '6px' }} />
                        View Source
                      </Button>
                      <Button variant="link">
                        <FileAltIcon style={{ marginRight: '6px' }} />
                        View TechDocs
                      </Button>
                    </ActionGroup>
                  </CardBody>
                </Card>

                {/* Relations Section */}
                <Card>
                  <CardBody>
                    <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>Relations</Title>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '12px',
                      padding: '24px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <UsersIcon style={{ fontSize: '24px', marginBottom: '8px' }} />
                        <div style={{ fontSize: '12px', color: '#6a6e73' }}>{apiDetails.owner}</div>
                      </div>
                      <div style={{ 
                        width: '40px', 
                        height: '2px', 
                        backgroundColor: '#d0d0d0',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          position: 'absolute',
                          left: '50%',
                          top: '-8px',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'white',
                          padding: '0 4px',
                          fontSize: '10px',
                          color: '#6a6e73'
                        }}>ownerOf</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <CogIcon style={{ fontSize: '24px', marginBottom: '8px' }} />
                        <div style={{ fontSize: '12px' }}>{apiDetails.name}</div>
                      </div>
                    </div>
                    <Button variant="link" isInline>View graph →</Button>
                  </CardBody>
                </Card>
              </GridItem>

              {/* Right Column */}
              <GridItem span={6}>
                {/* Providers Section */}
                <Card style={{ marginBottom: '24px' }}>
                  <CardBody>
                    <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>Providers</Title>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>System</th>
                          <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>Owner</th>
                          <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>Type</th>
                          <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>Lifecycle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <td style={{ padding: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <ShieldAltIcon style={{ fontSize: '14px', color: '#6a6e73' }} />
                              {apiDetails.provider?.name || apiDetails.name}
                            </div>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <UsersIcon style={{ fontSize: '14px', color: '#6a6e73' }} />
                              {apiDetails.provider?.system || 'No System'}
                            </div>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <UsersIcon style={{ fontSize: '14px', color: '#6a6e73' }} />
                              {apiDetails.provider?.owner || apiDetails.owner}
                            </div>
                          </td>
                          <td style={{ padding: '8px' }}>{apiDetails.provider?.type || 'service'}</td>
                          <td style={{ padding: '8px' }}>{apiDetails.provider?.lifecycle || apiDetails.lifecycle}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardBody>
                </Card>

                {/* Consumers Section */}
                <Card>
                  <CardBody>
                    <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>Consumers</Title>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '40px',
                      color: '#6a6e73',
                      fontSize: '14px'
                    }}>
                      No component consumes this API. Learn how to change this
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </>
        )}

        {activeTab === 1 && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d0d0d0' }}>
            {/* Swagger Header */}
            <div style={{ backgroundColor: '#3b4151', padding: '20px', color: 'white', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ margin: 0, marginBottom: '8px', fontSize: '28px', fontWeight: 'bold' }}>{apiDetails.name}</h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>{apiDetails.version}</Badge>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>OAS 3.1</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Swagger Info Section */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold' }}>{apiDetails.name}</h3>
              <p style={{ margin: 0, fontSize: '16px', color: '#6a6e73' }}>
                {apiDetails.description}
              </p>
            </div>

            {/* Servers Section - Swagger Style */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#f7f7f7' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Servers</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #d0d0d0' }}>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', fontSize: '14px' }}>
                  <option>https://api.example.com/v1-Production</option>
                </select>
              </div>
            </div>

            {/* Endpoints Section - Swagger Style */}
            <div>
              <div style={{ padding: '15px 20px', backgroundColor: '#41444e', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                Endpoints
              </div>
              
              {apiDetails.endpoints && apiDetails.endpoints.map((endpoint: string, idx: number) => {
                const endpointKey = `endpoint-${idx}`;
                const isGet = endpoint.startsWith('GET');
                const method = isGet ? 'GET' : 'POST';
                const path = endpoint.replace(/^(GET|POST)\s+/, '');

                return (
                  <div key={endpointKey} style={{ borderTop: '1px solid #d0d0d0' }}>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}
                      onClick={() => toggleEndpoint(endpointKey)}
                    >
                      <span style={{ 
                        backgroundColor: isGet ? '#61affe' : '#49cc90', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        padding: '4px 12px', 
                        borderRadius: '3px', 
                        fontSize: '12px',
                        minWidth: '60px',
                        textAlign: 'center',
                        marginRight: '16px'
                      }}>{method}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>{path}</span>
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {expandedEndpoints[endpointKey] ? <CaretUpIcon style={{ fontSize: '16px', color: '#6a6e73' }} /> : <CaretDownIcon style={{ fontSize: '16px', color: '#6a6e73' }} />}
                      </div>
                    </div>
                    {expandedEndpoints[endpointKey] && (
                      <div style={{ padding: '20px', backgroundColor: 'white' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <p style={{ margin: 0, fontSize: '14px', color: '#6a6e73' }}>{apiDetails.description}</p>
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
                                <td style={{ padding: '12px 8px', fontSize: '14px', color: '#67b350' }}>{isGet ? '200' : '201'}</td>
                                <td style={{ padding: '12px 8px', fontSize: '14px' }}>Success</td>
                                <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6a6e73' }}>No links</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <>
            <Grid hasGutter style={{ marginBottom: '24px' }}>
              <GridItem span={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Button variant="primary" icon={<PlusCircleIcon />} onClick={() => setIsRequestModalOpen(true)}>
                  Request API keys
                </Button>
              </GridItem>
            </Grid>

            <Grid hasGutter>
              <GridItem span={3}>
                <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Status</Title>
                  
                  {/* Status Cards */}
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      role="button"
                      onClick={() => setStatusFilter('All')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: statusFilter === 'All' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span>All</span>
                      <span style={{ fontWeight: 'bold' }}>{statusCounts.All}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setStatusFilter('Active')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: statusFilter === 'Active' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircleIcon style={{ color: '#3e8635', fontSize: '16px' }} />
                        <span>Active</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{statusCounts.Active}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setStatusFilter('Pending')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: statusFilter === 'Pending' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ClockIcon style={{ color: '#0066CC', fontSize: '16px' }} />
                        <span>Pending</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{statusCounts.Pending}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setStatusFilter('Rejected')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: statusFilter === 'Rejected' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TimesCircleIcon style={{ color: '#C9190B', fontSize: '16px' }} />
                        <span>Rejected</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{statusCounts.Rejected}</span>
                    </div>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tiers</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                    value={tiersFilter}
                    onChange={(e) => setTiersFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {uniqueTiers.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>
              </GridItem>

              <GridItem span={9}>
                <Card>
                  <CardBody>
                    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Title headingLevel="h2" size="lg">
                          My API keys
                        </Title>
                        <Tooltip
                          triggerRef={infoPopoverRef}
                          isVisible={isInfoPopoverOpen}
                          content={
                            <div className="info-tooltip-content" ref={tooltipContentRef}>
                              <Button
                                variant="plain"
                                aria-label="Close"
                                className="info-tooltip-close"
                                onClick={() => setIsInfoPopoverOpen(false)}
                              >
                                <TimesIcon />
                              </Button>
                              <div className="info-tooltip-text">
                                <div>Manage your personal</div>
                                <div>API keys for accessing</div>
                                <div>APIs.</div>
                              </div>
                            </div>
                          }
                          position="right"
                          trigger="click"
                          className="info-tooltip"
                          appendTo={() => document.body}
                        >
                          <Button
                            ref={infoPopoverRef}
                            variant="plain"
                            aria-label="Info"
                            className="info-icon-button"
                            onClick={() => setIsInfoPopoverOpen(!isInfoPopoverOpen)}
                          >
                            <InfoCircleIcon className="info-icon" />
                          </Button>
                        </Tooltip>
                      </div>
                      <SearchInput
                        placeholder="Search"
                        value={apiKeysSearchValue}
                        onChange={(_, value) => setApiKeysSearchValue(value)}
                        onClear={() => setApiKeysSearchValue('')}
                        style={{ width: '100%', maxWidth: '300px' }}
                      />
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '30px' }}></th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Status</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Tiers</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Active time</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApiKeys.map((key, index) => {
                          const hasExpandableContent = key.useCase || key.rejectionReason;
                          const isExpanded = expandedApiKeyRows.has(index);
                          
                          return (
                            <React.Fragment key={index}>
                              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                                <td style={{ padding: '12px', width: '30px' }}>
                                  {hasExpandableContent ? (
                                    <Button
                                      variant="plain"
                                      aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                      onClick={() => toggleApiKeyRowExpanded(index)}
                                      style={{ padding: '4px' }}
                                    >
                                      {isExpanded ? (
                                        <AngleDownIcon style={{ fontSize: '16px', color: '#151515' }} />
                                      ) : (
                                        <AngleRightIcon style={{ fontSize: '16px', color: '#151515' }} />
                                      )}
                                    </Button>
                                  ) : null}
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <Button 
                                    variant="link" 
                                    isInline
                                    onClick={() => navigate(`/developer-portal/api-key-details/${encodeURIComponent(key.name)}`)}
                                  >
                                    {key.name}
                                  </Button>
                                </td>
                                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                                  <Label
                                    variant="outline"
                                    icon={
                                      key.status === 'Active' ? <CheckCircleIcon /> : 
                                      key.status === 'Pending' ? <ClockIcon /> : 
                                      <TimesCircleIcon />
                                    }
                                    color={
                                      key.status === 'Active' ? 'green' : 
                                      key.status === 'Pending' ? 'blue' : 
                                      'red'
                                    }
                                    style={{ display: 'inline-flex', alignItems: 'center' }}
                                  >
                                    {key.status}
                                  </Label>
                                </td>
                                <td style={{ padding: '12px' }}>{key.tiers}</td>
                                <td style={{ padding: '12px', color: '#6a6e73' }}>{key.activeTime}</td>
                                <td style={{ padding: '12px' }}>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button variant="plain" aria-label="Edit" onClick={() => {}}>
                                      <PencilAltIcon />
                                    </Button>
                                    <Button variant="plain" aria-label="Delete" onClick={() => {}}>
                                      <TrashIcon />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                              {hasExpandableContent && isExpanded && (
                                <tr>
                                  <td colSpan={6} style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                                    {key.useCase && (
                                      <div style={{ marginBottom: '16px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Use case:</div>
                                        <div style={{ fontSize: '14px', color: '#151515' }}>{key.useCase}</div>
                                      </div>
                                    )}
                                    {key.rejectionReason && (
                                      <Alert
                                        variant="danger"
                                        title="Rejection reason:"
                                        style={{ marginTop: key.useCase ? '16px' : '0' }}
                                      >
                                        {key.rejectionReason}
                                      </Alert>
                                    )}
                                    {key.status === 'Rejected' && (
                                      <div style={{ marginTop: '16px' }}>
                                        <Button variant="link" isInline onClick={() => {}}>
                                          Request new API key
                                        </Button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </>
        )}

        {activeTab === 3 && currentRole === 'API owner' && (
          <>
            <Grid hasGutter>
              {/* Left Sidebar - Filters */}
              <GridItem span={3}>
                <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Status</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      role="button"
                      onClick={() => setApprovalStatusFilter('All')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: approvalStatusFilter === 'All' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span>All</span>
                      <span style={{ fontWeight: 'bold' }}>{approvalApiKeys.length}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setApprovalStatusFilter('Active')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: approvalStatusFilter === 'Active' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircleIcon style={{ color: '#3e8635', fontSize: '16px' }} />
                        <span>Active</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{approvalApiKeys.filter(k => k.status === 'Active').length}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setApprovalStatusFilter('Pending')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: approvalStatusFilter === 'Pending' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ClockIcon style={{ color: '#0066CC', fontSize: '16px' }} />
                        <span>Pending</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{approvalApiKeys.filter(k => k.status === 'Pending').length}</span>
                    </div>
                    <div
                      role="button"
                      onClick={() => setApprovalStatusFilter('Rejected')}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        color: '#151515',
                        border: approvalStatusFilter === 'Rejected' ? '2px solid #0066CC' : '2px solid transparent',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TimesCircleIcon style={{ color: '#C9190B', fontSize: '16px' }} />
                        <span>Rejected</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>{approvalApiKeys.filter(k => k.status === 'Rejected').length}</span>
                    </div>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tiers</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}
                    value={approvalTiersFilter}
                    onChange={(e) => setApprovalTiersFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {Array.from(new Set(approvalApiKeys.map(k => k.tiers))).map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Client</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                    value={approvalClientFilter}
                    onChange={(e) => setApprovalClientFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {uniqueApprovalClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>
              </GridItem>

              {/* Right Content - API keys approval table */}
              <GridItem span={9}>
                <Card>
                  <CardBody>
                    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Title headingLevel="h2" size="lg">
                          API keys approval
                        </Title>
                        <Tooltip
                          triggerRef={approvalInfoPopoverRef}
                          isVisible={isApprovalInfoPopoverOpen}
                          content={
                            <div className="info-tooltip-content" ref={approvalTooltipContentRef}>
                              <Button
                                variant="plain"
                                aria-label="Close"
                                className="info-tooltip-close"
                                onClick={() => setIsApprovalInfoPopoverOpen(false)}
                              >
                                <TimesIcon />
                              </Button>
                              <div className="info-tooltip-text">
                                Manage keys issued to clients for accessing APIs.
                              </div>
                            </div>
                          }
                          position="right"
                          trigger="click"
                          className="info-tooltip"
                          appendTo={() => document.body}
                        >
                          <Button
                            ref={approvalInfoPopoverRef}
                            variant="plain"
                            aria-label="Info"
                            className="info-icon-button"
                            onClick={() => setIsApprovalInfoPopoverOpen(!isApprovalInfoPopoverOpen)}
                          >
                            <InfoCircleIcon className="info-icon" />
                          </Button>
                        </Tooltip>
                      </div>
                      <SearchInput
                        placeholder="Search"
                        value={approvalSearchValue}
                        onChange={(_, value) => setApprovalSearchValue(value)}
                        onClear={() => setApprovalSearchValue('')}
                        style={{ width: '100%', maxWidth: '300px' }}
                      />
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <th style={{ textAlign: 'left', padding: '12px', paddingRight: '16px', fontSize: '14px', fontWeight: 'bold', width: '48px', minWidth: '48px' }}></th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Status</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Tiers</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Client</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Active time</th>
                          <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedApprovalApiKeys.map((key, index) => {
                          const hasExpandableContent = key.useCase || key.rejectionReason;
                          const originalIndex = filteredApprovalApiKeys.findIndex(k => k.name === key.name);
                          const isExpanded = approvalExpandedRows.has(originalIndex);
                          
                          return (
                            <React.Fragment key={`${key.name}-${key.api}-${originalIndex}`}>
                              <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                                <td style={{ padding: '12px', paddingRight: '16px', width: '48px', minWidth: '48px' }}>
                                  {hasExpandableContent ? (
                                    <Button
                                      variant="plain"
                                      aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                      onClick={() => toggleApprovalRowExpanded(originalIndex)}
                                      style={{ padding: '4px' }}
                                    >
                                      {isExpanded ? (
                                        <AngleDownIcon style={{ fontSize: '16px', color: '#151515' }} />
                                      ) : (
                                        <AngleRightIcon style={{ fontSize: '16px', color: '#151515' }} />
                                      )}
                                    </Button>
                                  ) : null}
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <Button 
                                    variant="link" 
                                    isInline
                                    onClick={() => navigate(`/developer-portal/api-key-details/${encodeURIComponent(key.name)}`)}
                                  >
                                    {key.name}
                                  </Button>
                                </td>
                                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                                  <Label
                                    variant="outline"
                                    icon={
                                      key.status === 'Active' ? <CheckCircleIcon /> : 
                                      key.status === 'Pending' ? <ClockIcon /> : 
                                      <TimesCircleIcon />
                                    }
                                    color={
                                      key.status === 'Active' ? 'green' : 
                                      key.status === 'Pending' ? 'blue' : 
                                      'red'
                                    }
                                    style={{ display: 'inline-flex', alignItems: 'center' }}
                                  >
                                    {key.status}
                                  </Label>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <Label color={key.tiers === 'Gold' ? 'yellow' : key.tiers === 'Silver' ? 'grey' : 'blue'}>
                                    {key.tiers}
                                  </Label>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <Button 
                                    variant="link" 
                                    isInline
                                    onClick={() => {}}
                                  >
                                    {key.client}
                                  </Button>
                                </td>
                                <td style={{ padding: '12px', color: '#6a6e73' }}>{key.activeTime}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: '32px 32px', gap: '8px', width: '72px', margin: '0 auto', justifyItems: 'center' }}>
                                    {key.status === 'Active' && (
                                      <>
                                        {/* Edit and Delete buttons temporarily hidden */}
                                      </>
                                    )}
                                    {key.status === 'Pending' && (
                                      <>
                                        <Tooltip content="Approve">
                                          <Button 
                                            variant="plain" 
                                            aria-label="Approve" 
                                            onClick={() => handleApprovalApprove(key)}
                                            className="action-button-outlined"
                                            style={{ padding: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '32px' }}
                                          >
                                            <CheckIcon className="action-icon-outlined" />
                                          </Button>
                                        </Tooltip>
                                        <Tooltip content="Reject">
                                          <Button 
                                            variant="plain" 
                                            aria-label="Reject" 
                                            onClick={() => handleApprovalReject(key)}
                                            className="action-button-outlined"
                                            style={{ padding: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '32px' }}
                                          >
                                            <TimesIcon className="action-icon-outlined" />
                                          </Button>
                                        </Tooltip>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              {hasExpandableContent && isExpanded && (
                                <tr>
                                  <td colSpan={7} style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                                    {key.useCase && (
                                      <div style={{ marginBottom: '16px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Use case:</div>
                                        <div style={{ fontSize: '14px', color: '#151515' }}>{key.useCase}</div>
                                      </div>
                                    )}
                                    {key.rejectionReason && (
                                      <Alert
                                        variant="danger"
                                        title="Rejection reason:"
                                        style={{ marginTop: key.useCase ? '16px' : '0' }}
                                      >
                                        {key.rejectionReason}
                                      </Alert>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <Pagination
                        itemCount={filteredApprovalApiKeys.length}
                        page={approvalPage}
                        perPage={approvalPerPage}
                        onSetPage={(_, page) => setApprovalPage(page)}
                        onPerPageSelect={(_, perPage) => {
                          setApprovalPerPage(perPage);
                          setApprovalPage(1);
                        }}
                        perPageOptions={[
                          { title: '10', value: 10 },
                          { title: '20', value: 20 },
                          { title: '50', value: 50 },
                        ]}
                      />
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </>
        )}
      </PageSection>
      
      {/* Request API key modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setApiKeyName('');
          setSelectedTier('');
          setUseCase('');
          setHasAttemptedTierSelection(false);
        }}
        variant="small"
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader>
          <Title headingLevel="h2">Request API key</Title>
        </ModalHeader>
        <ModalBody style={{ padding: '24px', paddingTop: '8px', paddingBottom: '0' }}>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
            Submit your request to generate an API key.
          </p>
          
          <FormGroup 
            label={
              <span>
                API <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={apiDetails.name}
              readOnly
              style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
            />
            {/* API is always selected in API details page, so no description needed */}
          </FormGroup>

          <FormGroup 
            label={
              <span>
                API key name <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={apiKeyName}
              onChange={(_, value) => setApiKeyName(value)}
            />
            {!apiKeyName && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Set an easy-to-recognize name for this key
              </p>
            )}
          </FormGroup>

          <FormGroup 
            label={
              <span style={{ color: isTierFieldError ? '#C9190B' : 'inherit' }}>
                Tiers <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <Dropdown
              isOpen={isTierDropdownOpen}
              onOpenChange={(isOpen) => setIsTierDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle 
                  ref={toggleRef} 
                  onClick={() => setIsTierDropdownOpen(!isTierDropdownOpen)} 
                  isExpanded={isTierDropdownOpen}
                  style={{ 
                    width: '100%',
                    borderColor: isTierFieldError ? '#C9190B' : undefined,
                    borderWidth: isTierFieldError ? '1px' : undefined,
                    borderStyle: isTierFieldError ? 'solid' : undefined
                  }}
                  icon={null}
                  className="custom-tier-toggle"
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <span style={{ flex: 1 }}>
                      {selectedTier || ''}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', paddingRight: '8px' }}>
                      <CaretDownIcon style={{ 
                        color: isTierFieldError ? '#C7C7C7' : '#151515',
                        fontSize: '14px',
                        flexShrink: 0
                      }} />
                      {isTierFieldError && (
                        <div style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%', 
                          backgroundColor: '#C9190B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <ExclamationCircleIcon style={{ color: 'white', fontSize: '10px' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </MenuToggle>
              )}
            >
              <DropdownList>
                {availableTiers.map((tier) => (
                  <DropdownItem
                    key={tier}
                    onClick={() => {
                      setSelectedTier(tier);
                      setIsTierDropdownOpen(false);
                    }}
                  >
                    {tier}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
            {!selectedTier && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Select one tier.
              </p>
            )}
          </FormGroup>

          <FormGroup label="Use case" style={{ marginBottom: apiDetails.name && apisRequiringApproval.includes(apiDetails.name) ? '16px' : '24px' }}>
            <TextArea
              value={useCase}
              onChange={(_, value) => setUseCase(value)}
              rows={4}
            />
            {!useCase && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Briefly describe your specific use case of using this API key
              </p>
            )}
          </FormGroup>

          {apiDetails.name && apisRequiringApproval.includes(apiDetails.name) && (
            <Alert
              variant="info"
              isInline
              title={`The API key request to '${apiDetails.name}' requires approval. You will be notified once it is processed.`}
              style={{ marginTop: '0', marginBottom: '24px' }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            key="request"
            variant="primary"
            onClick={() => {
              // Handle request submission
              console.log('Request API key:', { api: apiDetails.name, apiKeyName, selectedTier, useCase });
              setIsRequestModalOpen(false);
              setApiKeyName('');
              setSelectedTier('');
              setUseCase('');
            }}
            isDisabled={!apiKeyName || !selectedTier}
          >
            Request
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={() => {
              setIsRequestModalOpen(false);
              setApiKeyName('');
              setSelectedTier('');
              setUseCase('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Page>
  );
};

export default APIDetailsPage;

