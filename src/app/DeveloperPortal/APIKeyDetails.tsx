import * as React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  Breadcrumb,
  BreadcrumbItem,
  Title,
  Tabs,
  Tab,
  TabTitleText,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Tooltip,
  Label,
  ActionGroup,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
  TextArea,
  FormGroup,
  Alert,
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
  ExclamationTriangleIcon,
  CodeIcon,
  StarIcon,
  UserIcon,
  HelpIcon,
  BellIcon,
  EllipsisVIcon,
  CopyIcon,
  ArrowUpIcon,
  UsersIcon,
  PencilAltIcon,
  CodeBranchIcon,
  CheckCircleIcon,
  TimesCircleIcon,
  TrashIcon,
  ClockIcon,
  CheckIcon,
  TimesIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';
import { initialSharedApiKeys, SharedAPIKey, availableApis } from '../shared/apiData';

// Get tier background color
const getTierBackgroundColor = (tier: string): string => {
  const tierLower = tier.toLowerCase();
  if (tierLower === 'gold') {
    return '#FDF7E7';
  } else if (tierLower === 'silver') {
    return '#F5F5F5';
  } else if (tierLower === 'bronze') {
    return '#F2F9F9';
  }
  return '#F2F9F9'; // default to bronze color
};

// Get plan display text from tier
const getPlanDisplayText = (tier: string): string => {
  const tierLower = tier.toLowerCase();
  if (tierLower === 'gold') {
    return 'Gold 1 req/daily';
  } else if (tierLower === 'silver') {
    return 'Silver 1 req/daily';
  } else if (tierLower === 'bronze') {
    return 'Bronze 1 req/daily';
  }
  return `${tier} 1 req/daily`;
};

// Sample API key details data (fallback for keys not in shared data)
const apiKeyDetailsData: Record<string, any> = {
  'personal keys': {
    name: 'Personal key',
    status: 'Active',
    description: 'It work for my personal flight application test.',
    apiKey: 'cbjNd-nvMqT',
    apiName: 'Flights API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'OCT 22,2025 AT 04:00PM',
    apiUrl: 'https://api.example.com/v1/get flight tickets/post',
  },
  'development keys': {
    name: 'Development keys',
    status: 'Active',
    description: 'For development and testing purposes.',
    apiKey: 'rGeZL-RKIT5',
    apiName: 'List My Bookings',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'OCT 28,2025 AT 02:30PM',
    apiUrl: 'https://api.example.com/v1/list my bookings',
  },
  'production keys': {
    name: 'Production keys',
    status: 'Active',
    description: 'Production environment API key.',
    apiKey: 'vt9Dz-taKWW',
    apiName: 'Create Booking API',
    plan: 'Platinum plan: 1000 reqs/day; 5000 reqs/week; 30000 reqs/month;',
    lastUsed: 'OCT 30,2025 AT 10:15AM',
    apiUrl: 'https://api.example.com/v1/create booking',
  },
  'dev test keys': {
    name: 'Dev test keys',
    status: 'Active',
    description: 'Testing key for development team.',
    apiKey: 'vt9Dz-taKWW',
    apiName: 'Booking API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'NOV 01,2025 AT 08:45AM',
    apiUrl: 'https://api.example.com/v1/get booking details',
  },
  'Dev test keys': {
    name: 'Dev test keys',
    status: 'Active',
    description: 'Testing key for development team.',
    apiKey: 'vt9Dz-taKWW',
    apiName: 'Booking API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'NOV 01,2025 AT 08:45AM',
    apiUrl: 'https://api.example.com/v1/get booking details',
  },
  'research key': {
    name: 'Research key',
    status: 'Active',
    description: 'For research and analysis.',
    apiKey: 'XyVwB-8qLsT',
    apiName: 'Get Payment Status',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'OCT 25,2025 AT 03:20PM',
    apiUrl: 'https://api.example.com/v1/get payment status',
  },
  'Production keys': {
    name: 'Production keys',
    status: 'Disabled',
    description: 'Production environment API key.',
    apiKey: '',
    apiName: 'Create Booking API',
    plan: 'Platinum plan: 1000 reqs/day; 5000 reqs/week; 30000 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 10:15AM',
    apiUrl: 'https://api.example.com/v1/create booking',
  },
  'Research key': {
    name: 'Research key',
    status: 'Active',
    description: 'For research and analysis.',
    apiKey: 'UfTQm-2eeLx',
    apiName: 'Get Payment Status',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'OCT 25,2025 AT 03:20PM',
    apiUrl: 'https://api.example.com/v1/get payment status',
  },
  'Integration keys': {
    name: 'Integration keys',
    status: 'Active',
    description: 'For integration purposes.',
    apiKey: 'KwJzA-9mNpR',
    apiName: 'Flights API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAY 10,2027 AT 09:30AM',
    apiUrl: 'https://api.example.com/v1/get flight tickets/post',
  },
  'test-Key_1': {
    name: 'test-Key_1',
    status: 'Active',
    description: 'Testing key.',
    apiKey: '',
    apiName: 'Booking API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAY 11,2028 AT 11:45AM',
    apiUrl: 'https://api.example.com/v1/get booking details',
  },
  'learn-Key_2': {
    name: 'learn-Key_2',
    status: 'Active',
    description: 'Learning key.',
    apiKey: 'XyVwB-8qLsT',
    apiName: 'Create Booking API',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'APRIL 20,2029 AT 02:15PM',
    apiUrl: 'https://api.example.com/v1/create booking',
  },
  'try-Key_3': {
    name: 'try-Key_3',
    status: 'Active',
    description: 'Trial key.',
    apiKey: 'MnKpO-7fGhJ',
    apiName: 'List My Bookings',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAR 06,2026 AT 08:00AM',
    apiUrl: 'https://api.example.com/v1/list my bookings',
  },
  'Trial-Key_4': {
    name: 'Trial-Key_4',
    status: 'Active',
    description: 'Trial key for testing.',
    apiKey: 'DeFsC-5hIjK',
    apiName: 'Flights API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAY 20,2025 AT 10:30AM',
    apiUrl: 'https://api.example.com/v1/get flight tickets/post',
  },
};

const APIKeyDetails: React.FunctionComponent = () => {
  const { keyName } = useParams<{ keyName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedApiKey, setCopiedApiKey] = React.useState(false);
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('Gold plan (1000 reqs/day, 5000 reqs/week; 30000 reqs/month)');
  const [showUpdateSuccess, setShowUpdateSuccess] = React.useState(false);
  const [updatedPlan, setUpdatedPlan] = React.useState<string>('');
  const [lastSelectedPlan, setLastSelectedPlan] = React.useState<string>('');
  const [isReapplyModalOpen, setIsReapplyModalOpen] = React.useState(false);
  const [reapplyDescriptionText, setReapplyDescriptionText] = React.useState('');
  const [selectedReapplyPlan, setSelectedReapplyPlan] = React.useState('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
  const [isReapplyPlanDropdownOpen, setIsReapplyPlanDropdownOpen] = React.useState(false);
  
  // State for reject modal (from approval)
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState('');
  
  // State for Client dropdown
  const [isClientDropdownOpen, setIsClientDropdownOpen] = React.useState(false);
  
  // Edit API key modal states
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editApiKeyName, setEditApiKeyName] = React.useState('');
  const [editSelectedApi, setEditSelectedApi] = React.useState('');
  const [editSelectedTier, setEditSelectedTier] = React.useState('');
  const [editUseCase, setEditUseCase] = React.useState('');
  const [isEditApiDropdownOpen, setIsEditApiDropdownOpen] = React.useState(false);
  const [isEditTierDropdownOpen, setIsEditTierDropdownOpen] = React.useState(false);
  
  // Available tiers
  const availableTiers = ['Gold', 'Silver', 'Bronze'];
  
  // State for user dropdown and notifications
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = React.useState(false);
  
  const location = useLocation();
  
  // Get fromApi parameter from URL to determine if coming from API details page
  const searchParams = new URLSearchParams(location.search);
  const fromApi = searchParams.get('fromApi');
  const fromApproval = searchParams.get('fromApproval') === 'true';

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
  
  // Listen for storage changes to update role when changed in another tab/window
  React.useEffect(() => {
    const handleStorageChange = () => {
      const role = getCurrentRole();
      setCurrentRole(role);
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom storage event (for same-tab updates)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Decode the key name from URL
  const decodedKeyName = keyName ? decodeURIComponent(keyName) : null;
  
  // Try to find the key in shared API keys data first
  const sharedKeyData = decodedKeyName 
    ? initialSharedApiKeys.find(key => key.name === decodedKeyName)
    : null;
  
  // Fallback to apiKeyDetailsData if not found in shared data
  const fallbackKeyData = decodedKeyName ? apiKeyDetailsData[decodedKeyName] : null;
  
  // Use shared data if available, otherwise use fallback
  const keyDetails = sharedKeyData ? {
    name: sharedKeyData.name,
    status: sharedKeyData.status,
    apiName: sharedKeyData.api,
    plan: getPlanDisplayText(sharedKeyData.tiers),
    tiers: sharedKeyData.tiers,
    lastUsed: sharedKeyData.activeTime,
    description: sharedKeyData.useCase || '',
    apiKey: 'cbjNd-nvMqT', // Mock API key
    apiUrl: `https://api.example.com/v1/${sharedKeyData.api.toLowerCase().replace(/\s+/g, '-')}`,
    useCase: sharedKeyData.useCase,
    rejectionReason: sharedKeyData.rejectionReason,
  } : (fallbackKeyData ? {
    ...fallbackKeyData,
    plan: updatedPlan || fallbackKeyData.plan
  } : null);

  if (!keyDetails) {
    return <div>API key not found</div>;
  }

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    setActiveTab(tabKey);
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
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
    }
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
  };

  const handleNotificationDrawerToggle = () => {
    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);
  };
  
  // Mock unread count (you can implement actual notification logic)
  const unreadCount = 0;

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyApiKey = () => {
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  // Handle approve for API keys from approval tab
  const handleApprove = () => {
    // Update the key status in shared data
    const updatedKeys = initialSharedApiKeys.map(key => 
      key.name === keyDetails.name ? { ...key, status: 'Active' as const } : key
    );
    // In a real app, this would be an API call
    // For now, we'll navigate back to the API keys page
    setIsClientDropdownOpen(false);
    navigate('/developer-portal/api-keys?tab=approval');
  };

  // Handle reject for API keys from approval tab
  const handleReject = () => {
    setIsClientDropdownOpen(false);
    setRejectionReason('');
    setIsRejectModalOpen(true);
  };

  // Handle confirm reject
  const handleConfirmReject = () => {
    if (rejectionReason.trim()) {
      // In a real app, this would be an API call
      // For now, we'll navigate back to the API keys page
      setIsRejectModalOpen(false);
      setRejectionReason('');
      navigate('/developer-portal/api-keys?tab=approval');
    }
  };

  const copyText = `curl -X POST ${keyDetails.apiUrl} \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer ${keyDetails.apiKey}" \\
-d'{
"API": "${keyDetails.apiName}",
],
"max_rate limits": 150
}'`;

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
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Button
              variant="plain"
              aria-label="Notifications"
              onClick={handleNotificationDrawerToggle}
              style={{ color: '#151515' }}
            >
              <BellIcon />
            </Button>
            {unreadCount > 0 && (
              <Badge
                isRead={false}
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  minWidth: '18px',
                  height: '18px',
                  fontSize: '11px',
                  padding: '0 4px'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </div>
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
            <NavItem itemId="apis" isActive={fromApi !== null} icon={<CogIcon />} onClick={() => handleNavClick('apis')}>
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
                <NavItem itemId="dev-portal" isActive={location.pathname === '/developer-portal' && !location.pathname.includes('/api-keys') && !fromApi} icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" isActive={(location.pathname.includes('/api-keys') || location.pathname.includes('/api-key-details')) && !fromApi} icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
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
    <>
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            {fromApi ? (
              <>
                <BreadcrumbItem>
                  <Button variant="link" isInline onClick={() => navigate('/apis')}>
                    APIs
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Button variant="link" isInline onClick={() => navigate(`/apis/api-details/${encodeURIComponent(fromApi)}`)}>
                    {fromApi}
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbItem>{keyDetails.name}</BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <Button variant="link" isInline onClick={() => navigate('/developer-portal/api-keys')}>
                    API Access
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbItem>{keyDetails.name}</BreadcrumbItem>
              </>
            )}
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Title headingLevel="h1" size="2xl">
                {keyDetails.name}
              </Title>
              <Label
                variant="outline"
                icon={keyDetails.status === 'Active' ? <CheckCircleIcon /> : keyDetails.status === 'Pending' ? <ClockIcon /> : <TimesCircleIcon />}
                color={keyDetails.status === 'Active' ? 'green' : keyDetails.status === 'Pending' ? 'blue' : 'red'}
                style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}
              >
                {keyDetails.status}
              </Label>
            </div>
            {/* Show kebab menu based on source and status */}
            {(() => {
              // From API keys approval: only show for Pending status
              if (fromApproval) {
                if (keyDetails.status === 'Pending') {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '4px' }}>Client</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', color: '#151515' }}>{currentRole}</span>
                          <Dropdown
                            isOpen={isClientDropdownOpen}
                            onOpenChange={(isOpen) => setIsClientDropdownOpen(isOpen)}
                            toggle={(toggleRef) => (
                              <MenuToggle
                                ref={toggleRef}
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                isExpanded={isClientDropdownOpen}
                                variant="plain"
                                aria-label="Client actions"
                              >
                                <EllipsisVIcon />
                              </MenuToggle>
                            )}
                            popperProps={{ 
                              appendTo: () => document.body,
                              position: 'bottom',
                              flipBehavior: ['bottom', 'top']
                            }}
                          >
                            <DropdownList>
                              <DropdownItem
                                icon={<CheckIcon />}
                                onClick={handleApprove}
                              >
                                Approve
                              </DropdownItem>
                              <DropdownItem
                                icon={<TimesIcon />}
                                onClick={handleReject}
                              >
                                Reject
                              </DropdownItem>
                            </DropdownList>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  );
                }
                // Active and Rejected: don't show kebab menu
                return null;
              }
              // From My API keys: show for Active and Pending (existing behavior)
              if (keyDetails.status !== 'Rejected') {
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '4px' }}>Client</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#151515' }}>{currentRole}</span>
                        <Dropdown
                          isOpen={isClientDropdownOpen}
                          onOpenChange={(isOpen) => setIsClientDropdownOpen(isOpen)}
                          toggle={(toggleRef) => (
                            <MenuToggle
                              ref={toggleRef}
                              onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                              isExpanded={isClientDropdownOpen}
                              variant="plain"
                              aria-label="Client actions"
                            >
                              <EllipsisVIcon />
                            </MenuToggle>
                          )}
                          popperProps={{ 
                            appendTo: () => document.body,
                            position: 'bottom',
                            flipBehavior: ['bottom', 'top']
                          }}
                        >
                          <DropdownList>
                            <DropdownItem
                              icon={<PencilAltIcon />}
                              onClick={() => {
                                setIsClientDropdownOpen(false);
                                // Initialize edit modal with current key details
                                setEditApiKeyName(keyDetails.name);
                                setEditSelectedApi(keyDetails.apiName);
                                setEditSelectedTier(keyDetails.tiers || 'Bronze');
                                setEditUseCase(keyDetails.useCase || '');
                                setIsEditModalOpen(true);
                              }}
                            >
                              {keyDetails.status === 'Active' ? 'Edit active API key' : 'Edit pending API key'}
                            </DropdownItem>
                            <DropdownItem
                              icon={<TrashIcon />}
                              onClick={() => {
                                setIsClientDropdownOpen(false);
                                setDeleteConfirmText('');
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              {keyDetails.status === 'Active' ? 'Delete active API key' : 'Delete pending API key'}
                            </DropdownItem>
                          </DropdownList>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>Metrics</TabTitleText>} />
          </Tabs>

          {activeTab === 0 && (
            <Grid hasGutter>
              <GridItem span={5}>
                <Card style={{ height: '100%' }}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <Title headingLevel="h3" size="lg">About</Title>
                      <Button variant="plain" aria-label="Edit">
                        <PencilAltIcon />
                      </Button>
                    </div>

                    <ActionGroup style={{ marginBottom: '24px' }}>
                      <Button variant="link" onClick={() => navigate(`/apis/api-details/${encodeURIComponent(keyDetails.apiName)}`)}>
                        <FileAltIcon style={{ marginRight: '6px' }} />
                        VIEW API
                      </Button>
                      <Button variant="link">
                        <UsersIcon style={{ marginRight: '6px' }} />
                        CONTACT OWNER
                      </Button>
                    </ActionGroup>

                    <DescriptionList columnModifier={{ default: '1Col', md: '1Col' }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>API</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/apis/api-details/${encodeURIComponent(keyDetails.apiName)}`)}
                            style={{ textDecoration: 'none' }}
                          >
                            {keyDetails.apiName}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      
                      <DescriptionListGroup>
                        <DescriptionListTerm>API KEY NAME</DescriptionListTerm>
                        <DescriptionListDescription>
                          {keyDetails.name}
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>PLAN</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Label
                              style={{
                                backgroundColor: getTierBackgroundColor(keyDetails.tiers || 'Bronze'),
                                color: '#151515',
                                border: 'none',
                                padding: '4px 12px'
                              }}
                            >
                              {keyDetails.tiers || 'Bronze'}
                            </Label>
                            <span>{keyDetails.plan}</span>
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      {keyDetails.useCase && (
                        <DescriptionListGroup>
                          <DescriptionListTerm>USE CASE</DescriptionListTerm>
                          <DescriptionListDescription>
                            {keyDetails.useCase}
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      )}

                      <DescriptionListGroup>
                        <DescriptionListTerm>LAST ACTIVE TIME</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#67b350' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#67b350' }}></div>
                            <span>{keyDetails.lastUsed ? keyDetails.lastUsed.toUpperCase() : (keyDetails.activeTime || 'N/A')}</span>
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GridItem>

              {keyDetails.status === 'Active' && (
                <GridItem span={7}>
                  <Card style={{ height: '100%' }}>
                    <CardBody>
                      <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>
                        Usage example
                      </Title>
                      <p style={{ marginBottom: '16px', color: '#151515' }}>
                        Use this API key to authenticate requests to the "{keyDetails.apiName}" endpoint:
                      </p>
                      <div style={{ position: 'relative', backgroundColor: '#f8f8f8', borderRadius: '4px', padding: '16px' }}>
                        <Tooltip content={copiedCode ? "Copied!" : "Copy to clipboard"}>
                          <Button
                            variant="plain"
                            onClick={() => {
                              navigator.clipboard.writeText(copyText);
                              handleCopyCode();
                            }}
                            style={{ position: 'absolute', top: '8px', right: '8px' }}
                          >
                            <CopyIcon />
                          </Button>
                        </Tooltip>
                        <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#151515', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                          {copyText}
                        </pre>
                      </div>
                    </CardBody>
                  </Card>
                </GridItem>
              )}
            </Grid>
          )}

          {activeTab === 1 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Dropdown
                  isOpen={false}
                  toggle={(toggleRef) => <MenuToggle ref={toggleRef}>7 days</MenuToggle>}
                >
                  <DropdownList>
                    <DropdownItem>1 day</DropdownItem>
                    <DropdownItem>7 days</DropdownItem>
                    <DropdownItem>30 days</DropdownItem>
                    <DropdownItem>90 days</DropdownItem>
                  </DropdownList>
                </Dropdown>
                <div style={{ fontSize: '14px', color: '#6a6e73' }}>From</div>
                <div style={{ flex: 1, maxWidth: '150px' }}>
                  <input 
                    type="text" 
                    placeholder="Start time"
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #d0d0d0', 
                      borderRadius: '4px' 
                    }}
                  />
                </div>
                <div style={{ fontSize: '14px', color: '#6a6e73' }}>To</div>
                <div style={{ flex: 1, maxWidth: '150px' }}>
                  <input 
                    type="text" 
                    placeholder="End time"
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                      border: '1px solid #d0d0d0', 
                      borderRadius: '4px' 
                    }}
                  />
                </div>
              </div>

              <Grid hasGutter style={{ marginBottom: '24px' }}>
                <GridItem span={6}>
                  <Card>
                    <CardBody>
                      <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Total requests</div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#151515' }}>5,423</div>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={6}>
                  <Card>
                    <CardBody>
                      <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Success rate</div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#151515' }}>99.1%</div>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>

              <Card>
                <CardBody>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>
                    Total requests
                  </Title>
                  <div style={{ marginTop: '24px' }}>
                    <svg width="100%" height="300" style={{ backgroundColor: '#fafafa', borderRadius: '4px' }}>
                      <defs>
                        <linearGradient id="requestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#0066CC', stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: '#0066CC', stopOpacity: 0.1 }} />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line 
                          key={`grid-h-${i}`} 
                          x1="60" 
                          y1={40 + i * 60} 
                          x2="calc(100% - 60)" 
                          y2={40 + i * 60} 
                          stroke="#e5e5e5" 
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Y-axis labels */}
                      {[0, 1, 2, 3, 4].map((i, idx) => (
                        <text key={`y-${idx}`} x="50" y={45 + i * 60} fontSize="12" fill="#6a6e73" textAnchor="end">
                          {idx === 0 ? '800' : idx === 1 ? '600' : idx === 2 ? '400' : idx === 3 ? '200' : '0'}
                        </text>
                      ))}
                      
                      {/* Chart area */}
                      <path
                        d="M 60,70 L 100,100 L 140,85 L 180,65 L 220,75 L 260,60 L 300,80 L 340,100 L 380,90 L 420,110 L 460,105 L 500,130"
                        fill="url(#requestGradient)"
                        stroke="#0066CC"
                        strokeWidth="2"
                        opacity="0.7"
                      />
                      <path
                        d="M 60,70 L 100,100 L 140,85 L 180,65 L 220,75 L 260,60 L 300,80 L 340,100 L 380,90 L 420,110 L 460,105 L 500,130 L 500,260 L 60,260 Z"
                        fill="url(#requestGradient)"
                        opacity="0.7"
                      />
                      <path
                        d="M 60,70 L 100,100 L 140,85 L 180,65 L 220,75 L 260,60 L 300,80 L 340,100 L 380,90 L 420,110 L 460,105 L 500,130"
                        fill="none"
                        stroke="#0066CC"
                        strokeWidth="2"
                      />
                      
                      {/* X-axis labels */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                        const x = 60 + (i * 44);
                        return (
                          <line 
                            key={`x-line-${i}`} 
                            x1={x} 
                            y1="250" 
                            x2={x} 
                            y2="265" 
                            stroke="#d0d0d0" 
                            strokeWidth="1"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </CardBody>
              </Card>
            </>
          )}

          {/* Update Modal */}
          <Modal
            isOpen={isUpdateModalOpen}
            variant="small"
            title={keyDetails.status === 'Active' ? 'Update this API key?' : 'Reapply for this API key?'}
            onClose={() => {
              setIsUpdateModalOpen(false);
              setIsPlanDropdownOpen(false);
            }}
            style={{ '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)' } as React.CSSProperties}
          >
            <ModalHeader>
              <Title headingLevel="h2">{keyDetails.status === 'Active' ? 'Update this API key?' : 'Reapply for this API key?'}</Title>
              <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px' }}>
                Upgrade the API credential to use the API.
              </div>
            </ModalHeader>
            <ModalBody>
              <Alert 
                variant="warning" 
                title="API Key upgrade needs approval"
                style={{ marginBottom: '24px' }}
                className="no-shadow-alert"
              >
                You will get notification when the API key upgrade is approval by API owner. It will take 10mins to complete.
              </Alert>

              <FormGroup label="API *" isRequired>
                <TextInput 
                  value={keyDetails.apiName}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </FormGroup>

              <FormGroup label="Current plan *" isRequired style={{ marginTop: '16px' }}>
                <TextInput 
                  value={keyDetails.plan}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </FormGroup>

              <FormGroup label={keyDetails.status === 'Active' ? 'Change to *' : 'Reapply to *'} isRequired style={{ marginTop: '16px' }}>
                <Dropdown
                  isOpen={isPlanDropdownOpen}
                  onSelect={(_, value) => {
                    setSelectedPlan(String(value));
                    setIsPlanDropdownOpen(false);
                  }}
                  onOpenChange={(isOpen) => setIsPlanDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                      isExpanded={isPlanDropdownOpen}
                      style={{ width: '100%' }}
                    >
                      {selectedPlan}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem value="Gold plan (1000 reqs/day, 5000 reqs/week; 30000 reqs/month)">
                      Gold plan (1000 reqs/day, 5000 reqs/week; 30000 reqs/month)
                    </DropdownItem>
                    <DropdownItem value="Platinum plan (2000 reqs/day, 10000 reqs/week; 60000 reqs/month)">
                      Platinum plan (2000 reqs/day, 10000 reqs/week; 60000 reqs/month)
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="link" 
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  setIsPlanDropdownOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  // Update the plan
                  setUpdatedPlan(selectedPlan);
                  setLastSelectedPlan(selectedPlan);
                  setIsUpdateModalOpen(false);
                  setIsPlanDropdownOpen(false);
                  setShowUpdateSuccess(true);
                  setTimeout(() => setShowUpdateSuccess(false), 5000);
                }}
              >
                {keyDetails.status === 'Active' ? 'Update' : 'Reapply'}
              </Button>
            </ModalFooter>
          </Modal>

          {/* Edit API key modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditApiKeyName('');
              setEditSelectedApi('');
              setEditSelectedTier('');
              setEditUseCase('');
            }}
            variant="small"
            style={{ maxWidth: '500px' }}
          >
            <ModalHeader>
              <Title headingLevel="h2">
                {keyDetails.status === 'Active' ? 'Edit active API key' : 'Edit pending API key'}
              </Title>
            </ModalHeader>
            <ModalBody style={{ padding: '24px' }}>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
                {keyDetails.status === 'Active' 
                  ? 'You can edit active API keys to change tiers or add more details.'
                  : 'You can edit the pending API keys to correct mistakes or add more details.'}
              </p>

              <Alert
                variant="warning"
                isInline
                title={
                  keyDetails.status === 'Active'
                    ? 'This API key will become pending approval after the update.'
                    : 'This API key will remain pending approval after updates.'
                }
                style={{ marginBottom: '16px' }}
              />

              <FormGroup 
                label={
                  <span>
                    API <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                {keyDetails.status === 'Active' ? (
                  <TextInput
                    value={editSelectedApi}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                  />
                ) : (
                  <Dropdown
                    isOpen={isEditApiDropdownOpen}
                    onOpenChange={(isOpen) => setIsEditApiDropdownOpen(isOpen)}
                    toggle={(toggleRef) => (
                      <MenuToggle 
                        ref={toggleRef} 
                        onClick={() => setIsEditApiDropdownOpen(!isEditApiDropdownOpen)} 
                        isExpanded={isEditApiDropdownOpen}
                        style={{ width: '100%' }}
                      >
                        {editSelectedApi || ''}
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      {availableApis.map((api) => (
                        <DropdownItem
                          key={api}
                          onClick={() => {
                            setEditSelectedApi(api);
                            setIsEditApiDropdownOpen(false);
                          }}
                        >
                          {api}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  </Dropdown>
                )}
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
                  value={editApiKeyName}
                  onChange={(_, value) => setEditApiKeyName(value)}
                />
              </FormGroup>

              <FormGroup 
                label={
                  <span>
                    Tiers <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <Dropdown
                  isOpen={isEditTierDropdownOpen}
                  onOpenChange={(isOpen) => setIsEditTierDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle 
                      ref={toggleRef} 
                      onClick={() => setIsEditTierDropdownOpen(!isEditTierDropdownOpen)} 
                      isExpanded={isEditTierDropdownOpen}
                      style={{ width: '100%' }}
                    >
                      {editSelectedTier ? `${editSelectedTier} (Limits: 1 daily)` : ''}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {availableTiers.map((tier) => (
                      <DropdownItem
                        key={tier}
                        onClick={() => {
                          setEditSelectedTier(tier);
                          setIsEditTierDropdownOpen(false);
                        }}
                      >
                        {tier} (Limits: 1 daily)
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </FormGroup>

              <FormGroup label="Use case" style={{ marginBottom: '24px' }}>
                <TextArea
                  value={editUseCase}
                  onChange={(_, value) => setEditUseCase(value)}
                  rows={1}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                key="save"
                variant="primary"
                onClick={() => {
                  // Update key details (in a real app, this would update the backend)
                  setIsEditModalOpen(false);
                  setEditApiKeyName('');
                  setEditSelectedApi('');
                  setEditSelectedTier('');
                  setEditUseCase('');
                  // Navigate back to API keys page or refresh
                  navigate('/developer-portal/api-keys');
                }}
                isDisabled={!editSelectedApi || !editApiKeyName || !editSelectedTier}
              >
                Save
              </Button>
              <Button
                key="cancel"
                variant="link"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditApiKeyName('');
                  setEditSelectedApi('');
                  setEditSelectedTier('');
                  setEditUseCase('');
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Delete API key modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeleteConfirmText('');
            }}
            variant="small"
            style={{ maxWidth: '500px' }}
          >
            <ModalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ExclamationTriangleIcon style={{ color: '#F0AB00', fontSize: '24px' }} />
                <Title headingLevel="h2">
                  {keyDetails.status === 'Active' ? 'Delete active API key' : 'Delete pending API key'}
                </Title>
              </div>
            </ModalHeader>
            <ModalBody style={{ padding: '24px' }}>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
                {keyDetails.status === 'Active'
                  ? 'The API key will be deleted and removed. The deletion will immediately disable access for all applications currently using it.'
                  : 'The API key will be deleted and removed before approval. The deletion can not be undone.'}
              </p>

              <FormGroup 
                label={
                  <span>
                    Type <span style={{ color: '#0066CC' }}>{keyDetails.name}</span> to confirm <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={deleteConfirmText}
                  onChange={(_, value) => setDeleteConfirmText(value)}
                  placeholder=""
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                key="delete"
                variant="danger"
                onClick={() => {
                  if (deleteConfirmText === keyDetails.name) {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmText('');
                    navigate(`/developer-portal?revoked=${encodeURIComponent(keyDetails.name)}&type=key#api-keys`);
                  }
                }}
                isDisabled={deleteConfirmText !== keyDetails.name}
              >
                Delete
              </Button>
              <Button
                key="cancel"
                variant="link"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Reapply API key modal */}
          <Modal
            isOpen={isReapplyModalOpen}
            onClose={() => {
              setIsReapplyModalOpen(false);
              setReapplyDescriptionText('');
              setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
              setIsReapplyPlanDropdownOpen(false);
            }}
            variant="small"
            style={{
              '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)'
            } as React.CSSProperties}
          >
            <ModalHeader>
              <Title headingLevel="h2">Reapply for API key</Title>
              <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px' }}>
                Reapply for the API credential to use the API.
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup label="API *" isRequired style={{ marginBottom: '24px' }}>
                <TextInput
                  id="reapply-api-input"
                  readOnly
                  value={keyDetails.apiName}
                  style={{
                    backgroundColor: '#f5f5f5',
                    userSelect: 'none',
                    outline: 'none',
                    cursor: 'default'
                  }}
                />
              </FormGroup>

              <FormGroup label="API plan *" isRequired style={{ marginBottom: '24px' }}>
                <Dropdown
                  isOpen={isReapplyPlanDropdownOpen}
                  onOpenChange={(isOpen) => setIsReapplyPlanDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle ref={toggleRef} onClick={() => setIsReapplyPlanDropdownOpen(!isReapplyPlanDropdownOpen)} isExpanded={isReapplyPlanDropdownOpen}>
                      {selectedReapplyPlan}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem
                      key="silver"
                      onClick={() => {
                        setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
                        setIsReapplyPlanDropdownOpen(false);
                      }}
                    >
                      Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;
                    </DropdownItem>
                    <DropdownItem
                      key="gold"
                      onClick={() => {
                        setSelectedReapplyPlan('Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;');
                        setIsReapplyPlanDropdownOpen(false);
                      }}
                    >
                      Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;
                    </DropdownItem>
                    <DropdownItem
                      key="platinum"
                      onClick={() => {
                        setSelectedReapplyPlan('Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;');
                        setIsReapplyPlanDropdownOpen(false);
                      }}
                    >
                      Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </FormGroup>

              <FormGroup label="Use case & description">
                <p style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '8px' }}>
                  Share your use case with API owner to get quick approval.
                </p>
                <TextArea
                  id="reapply-description-input"
                  value={reapplyDescriptionText}
                  onChange={(_, value) => setReapplyDescriptionText(value)}
                  aria-label="Description input"
                  rows={6}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                key="reapply"
                variant="primary"
                onClick={() => {
                  setIsReapplyModalOpen(false);
                  setReapplyDescriptionText('');
                  setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
                  setIsReapplyPlanDropdownOpen(false);
                  // Navigate back to API keys page or show success message
                  navigate('/developer-portal#api-keys');
                }}
              >
                Reapply
              </Button>
              <Button
                key="cancel"
                variant="secondary"
                onClick={() => {
                  setIsReapplyModalOpen(false);
                  setReapplyDescriptionText('');
                  setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
                  setIsReapplyPlanDropdownOpen(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </PageSection>
      </Page>
    </>
  );
};

export { APIKeyDetails };

