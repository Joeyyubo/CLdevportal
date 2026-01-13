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
  AlertActionLink,
  AlertActionCloseButton,
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
  EllipsisVIcon,
  CopyIcon,
  ArrowUpIcon,
  UsersIcon,
  PencilAltIcon,
  CodeBranchIcon,
  CheckCircleIcon,
  TimesCircleIcon,
  ClockIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Sample API key details data
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
  // API Keys from APIKeys.tsx
  'MyAPIkey_1': {
    name: 'MyAPIkey_1',
    status: 'Active',
    description: 'Work for my personal flight application production. This API key is used for accessing flight booking services.',
    apiKey: 'cbjNd-nvMqT-1aBcD',
    apiName: 'Flights API',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'JAN 20,2026 AT 10:00AM',
    apiUrl: 'https://api.example.com/v1/flights',
  },
  'MyAPIkey_2': {
    name: 'MyAPIkey_2',
    status: 'Active',
    description: 'Integration with booking management system for inventory tracking.',
    apiKey: 'rGeZL-RKIT5-2eFgH',
    apiName: 'Booking API',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'JAN 20,2026 AT 11:30AM',
    apiUrl: 'https://api.example.com/v1/bookings',
  },
  'MyAPIkey_3': {
    name: 'MyAPIkey_3',
    status: 'Active',
    description: 'Booking service integration for booking and management.',
    apiKey: 'vt9Dz-taKWW-3iJkL',
    apiName: 'Create Booking API',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 02:15PM',
    apiUrl: 'https://api.example.com/v1/create-booking',
  },
  'MyAPIkey_4': {
    name: 'MyAPIkey_4',
    status: 'Pending',
    description: 'Pending approval for airport information management system.',
    apiKey: '',
    apiName: 'Airport API',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 09:00AM',
    apiUrl: 'https://api.example.com/v1/airports',
  },
  'MyAPIkey_5': {
    name: 'MyAPIkey_5',
    status: 'Pending',
    description: 'Payment processing service integration for file management.',
    apiKey: '',
    apiName: 'Payment API',
    plan: 'Bronze plan: 50 reqs/day; 250 reqs/week; 1500 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 08:30AM',
    apiUrl: 'https://api.example.com/v1/payments',
  },
  'MyAPIkey_6': {
    name: 'MyAPIkey_6',
    status: 'Rejected',
    description: 'Work for my personal flight application test.',
    apiKey: '',
    apiName: 'Aircraft API',
    plan: 'Bronze plan: 50 reqs/day; 250 reqs/week; 1500 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 07:00AM',
    apiUrl: 'https://api.example.com/v1/aircraft',
  },
  // API Keys approval tab
  'IssuedAPIkey_1': {
    name: 'IssuedAPIkey_1',
    status: 'Active',
    description: 'Work for my personal flight application production.',
    apiKey: 'KwJzA-9mNpR-1xYzA',
    apiName: 'Toystore',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'JAN 20,2026 AT 10:00AM',
    apiUrl: 'https://api.example.com/v1/toystore',
  },
  'IssuedAPIkey_2': {
    name: 'IssuedAPIkey_2',
    status: 'Active',
    description: 'Integration with booking management system.',
    apiKey: 'XyVwB-8qLsT-2bCdE',
    apiName: 'Petstore',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'JAN 20,2026 AT 11:00AM',
    apiUrl: 'https://api.example.com/v1/petstore',
  },
  'IssuedAPIkey_3': {
    name: 'IssuedAPIkey_3',
    status: 'Active',
    description: 'Booking service integration.',
    apiKey: 'UfTQm-2eeLx-3fGhI',
    apiName: 'Carstore',
    plan: 'Gold plan: 500 reqs/day; 2500 reqs/week; 15000 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 01:00PM',
    apiUrl: 'https://api.example.com/v1/carstore',
  },
  'Pendingkeyreq_1': {
    name: 'Pendingkeyreq_1',
    status: 'Pending',
    description: 'Pending approval for airport information management system.',
    apiKey: '',
    apiName: 'Birdstore',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 09:00AM',
    apiUrl: 'https://api.example.com/v1/birdstore',
  },
  'Pendingkeyreq_2': {
    name: 'Pendingkeyreq_2',
    status: 'Pending',
    description: 'Payment processing service integration.',
    apiKey: '',
    apiName: 'Cloudstore',
    plan: 'Bronze plan: 50 reqs/day; 250 reqs/week; 1500 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 08:00AM',
    apiUrl: 'https://api.example.com/v1/cloudstore',
  },
  'RejectedAPIkey': {
    name: 'RejectedAPIkey',
    status: 'Rejected',
    description: 'Work for my personal flight application test.',
    apiKey: '',
    apiName: 'Bikestore',
    plan: 'Bronze plan: 50 reqs/day; 250 reqs/week; 1500 reqs/month;',
    lastUsed: 'SEP 05,2025 AT 06:00AM',
    apiUrl: 'https://api.example.com/v1/bikestore',
  },
};

const APIKeyDetails: React.FunctionComponent = () => {
  const { keyName } = useParams<{ keyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get API name and source from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const apiNameFromQuery = searchParams.get('apiName');
  const source = searchParams.get('source');
  const [activeTab, setActiveTab] = React.useState(0);
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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = React.useState(false);
  const [isOwnerKebabMenuOpen, setIsOwnerKebabMenuOpen] = React.useState(false);
  const kebabMenuRef = React.useRef<HTMLButtonElement>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState('');
  
  // Approve notification state
  const [showApproveNotification, setShowApproveNotification] = React.useState(false);

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

  // Listen to storage changes for role updates
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const role = localStorage.getItem('currentRole');
        if (role) {
          setCurrentRole(role);
        }
      } catch {
        // Ignore errors
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Decode the key name from URL
  const decodedKeyName = keyName ? decodeURIComponent(keyName) : null;
  const keyDetailsData = decodedKeyName ? apiKeyDetailsData[decodedKeyName] : null;
  
  // Use updated plan if exists, otherwise use original
  const keyDetails = keyDetailsData ? {
    ...keyDetailsData,
    plan: updatedPlan || keyDetailsData.plan
  } : null;

  if (!keyDetails) {
    return <div>API key not found</div>;
  }

  // Determine if this API key is from approval tab
  // Approval API keys have names like: IssuedAPIkey_*, Pendingkeyreq_*, RejectedAPIkey
  const isFromApprovalTab = decodedKeyName && (
    decodedKeyName.startsWith('IssuedAPIkey_') ||
    decodedKeyName.startsWith('Pendingkeyreq_') ||
    decodedKeyName === 'RejectedAPIkey'
  );

  // Show metrics tab only if:
  // 1. Not from approval tab (My API keys)
  // 2. Status is Active
  const shouldShowMetricsTab = !isFromApprovalTab && keyDetails.status === 'Active';

  // If metrics tab is hidden and user is currently on metrics tab, switch to overview
  React.useEffect(() => {
    if (!shouldShowMetricsTab && activeTab === 1) {
      setActiveTab(0);
    }
  }, [shouldShowMetricsTab, activeTab]);

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    // If metrics tab is hidden and user tries to access it, reset to overview
    if (tabKey === 1 && !shouldShowMetricsTab) {
      setActiveTab(0);
    } else {
      setActiveTab(tabKey);
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
    // Focus will be returned to the toggle button
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
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
    }
  };

  const handleCopyApiKey = () => {
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
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
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end', gap: '16px' }}>
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
            <NavItem itemId="apis" isActive={source === 'apis'} icon={<CogIcon />} onClick={() => handleNavClick('apis')}>
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
                <NavItem itemId="dev-portal" isActive={location.pathname === '/developer-portal' && !location.pathname.includes('/api-keys')} icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" isActive={(location.pathname.includes('/api-keys') || location.pathname.includes('/api-key-details')) && source !== 'apis'} icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
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
      {/* Approve Notification */}
      {showApproveNotification && (
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
            title="API key request has been approved"
            actionClose={
              <AlertActionCloseButton onClose={() => setShowApproveNotification(false)} />
            }
          >
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              <div>API: {keyDetails.apiName}</div>
              <div>API key: {keyDetails.name} - {(() => {
                const tierMatch = keyDetails.plan.match(/(Gold|Silver|Bronze)/i);
                return tierMatch ? tierMatch[1].toLowerCase() : 'unknown';
              })()} tier</div>
            </div>
          </Alert>
        </div>
      )}
      
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            {source === 'apis' && apiNameFromQuery && (
              <BreadcrumbItem>
                <Button variant="link" isInline onClick={() => navigate('/apis')}>
                  APIs
                </Button>
              </BreadcrumbItem>
            )}
            {source === 'apis' && apiNameFromQuery && (
              <BreadcrumbItem>
                <Button variant="link" isInline onClick={() => navigate(`/apis/api-details/${encodeURIComponent(apiNameFromQuery)}`)}>
                  {apiNameFromQuery}
                </Button>
              </BreadcrumbItem>
            )}
            {source !== 'apis' && (
              <BreadcrumbItem>
                <Button variant="link" isInline onClick={() => navigate('/developer-portal/api-keys')}>
                  API Access
                </Button>
              </BreadcrumbItem>
            )}
            <BreadcrumbItem>
              {keyDetails.name}
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Title headingLevel="h1" size="2xl">
              {keyDetails.name}
            </Title>
            <Label
              variant="outline"
              icon={
                keyDetails.status === 'Active' ? <CheckCircleIcon /> : 
                keyDetails.status === 'Pending' ? <ClockIcon /> : 
                <TimesCircleIcon />
              }
              color={
                keyDetails.status === 'Active' ? 'green' : 
                keyDetails.status === 'Pending' ? 'blue' : 
                'red'
              }
                style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}
            >
              {keyDetails.status}
            </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {keyDetails.status === 'Disabled' && (
                <Button variant="primary" onClick={() => setIsReapplyModalOpen(true)}>
                  Reapply
                </Button>
              )}
              {/* Kebab menu for API consumer and API owner (my API keys) - only show for Active or Pending status, but not for API owner with Pending status */}
              {((currentRole === 'API consumer') || (currentRole === 'API owner' && keyDetails.status !== 'Pending')) && keyDetails.status !== 'Rejected' && keyDetails.status !== 'Disabled' && (
                <Dropdown
                  isOpen={isKebabMenuOpen}
                  onSelect={() => setIsKebabMenuOpen(false)}
                  onOpenChange={(isOpen) => setIsKebabMenuOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setIsKebabMenuOpen(!isKebabMenuOpen)}
                      isExpanded={isKebabMenuOpen}
                      aria-label="API key actions"
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                  popperProps={{ 
                    appendTo: () => document.body,
                    position: 'right',
                    enableFlip: true,
                    preventOverflow: true
                  }}
                >
                  <DropdownList>
                    <DropdownItem
                      key="edit"
                      onClick={() => {
                        // TODO: Implement edit functionality
                        setIsKebabMenuOpen(false);
                      }}
                    >
                      {keyDetails.status === 'Pending' ? 'Edit pending API key' : 'Edit active API key'}
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setIsKebabMenuOpen(false);
                      }}
                    >
                      {keyDetails.status === 'Pending' ? 'Delete pending API key' : 'Delete active API key'}
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              )}
              {/* Kebab menu for API owner - only show for Pending status in API key details page */}
              {currentRole === 'API owner' && keyDetails.status === 'Pending' && (
                <Dropdown
                  isOpen={isOwnerKebabMenuOpen}
                  onSelect={() => setIsOwnerKebabMenuOpen(false)}
                  onOpenChange={(isOpen) => setIsOwnerKebabMenuOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      onClick={() => setIsOwnerKebabMenuOpen(!isOwnerKebabMenuOpen)}
                      isExpanded={isOwnerKebabMenuOpen}
                      aria-label="API key approval actions"
                    >
                      <EllipsisVIcon />
                    </MenuToggle>
                  )}
                  popperProps={{ 
                    appendTo: () => document.body,
                    position: 'right',
                    enableFlip: true,
                    preventOverflow: true
                  }}
                >
                  <DropdownList>
                    <DropdownItem
                      key="approve"
                      onClick={() => {
                        // Approve the API key - update status
                        // In a real app, this would make an API call
                        setIsOwnerKebabMenuOpen(false);
                        
                        // Extract tier from plan string (e.g., "Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;" -> "silver")
                        const tierMatch = keyDetails.plan.match(/(Gold|Silver|Bronze)/i);
                        const tier = tierMatch ? tierMatch[1].toLowerCase() : 'unknown';
                        
                        // Show approve notification
                        setShowApproveNotification(true);
                        setTimeout(() => {
                          setShowApproveNotification(false);
                        }, 10000);
                      }}
                    >
                      Approve
                    </DropdownItem>
                    <DropdownItem
                      key="reject"
                      onClick={() => {
                        setIsRejectModalOpen(true);
                        setRejectionReason('');
                        setIsOwnerKebabMenuOpen(false);
                      }}
                    >
                      Reject
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              )}
            </div>
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            {shouldShowMetricsTab && (
              <Tab eventKey={1} title={<TabTitleText>Metrics</TabTitleText>} />
            )}
          </Tabs>

          {activeTab === 0 && (
            <Grid hasGutter>
              <GridItem span={12}>
                <Card style={{ height: '100%' }}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <Title headingLevel="h3" size="lg">About</Title>
                      <Button variant="plain" aria-label="Edit">
                        <PencilAltIcon />
                      </Button>
                    </div>

                    <ActionGroup style={{ marginBottom: '24px' }}>
                      <Button variant="link">
                        <FileAltIcon style={{ marginRight: '6px' }} />
                        VIEW API
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

                    <DescriptionList columnModifier={{ default: '1Col', md: '1Col' }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Description</DescriptionListTerm>
                        <DescriptionListDescription>{keyDetails.description}</DescriptionListDescription>
                      </DescriptionListGroup>
                      
                      <DescriptionListGroup>
                        <DescriptionListTerm>API key name</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/developer-portal/api-key-details/${encodeURIComponent(keyDetails.name)}`)}
                          >
                            {keyDetails.name}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>API</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(keyDetails.apiName)}`)}
                          >
                            {keyDetails.apiName}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>API key plan</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{keyDetails.plan}</span>
                            <ArrowUpIcon style={{ color: '#67b350', fontSize: '16px' }} />
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Last used</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#67b350' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#67b350' }}></div>
                            {keyDetails.lastUsed}
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GridItem>
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

          {/* Delete Modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            variant="small"
            title="Delete this API key?"
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeleteConfirmText('');
            }}
            style={{ '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)' } as React.CSSProperties}
          >
            <ModalHeader>
              <Title headingLevel="h2">Delete this API key?</Title>
            </ModalHeader>
            <ModalBody>
              <Alert 
                variant="danger" 
                title="This action cannot be undone."
                style={{ marginBottom: '24px' }}
                className="no-shadow-alert"
              >
                Deleting this API key will immediately revoke access for any applications currently using it. Proceed with caution.
              </Alert>

              <p style={{ marginBottom: '16px', color: '#151515', fontWeight: 'bold' }}>
                To confirm deletion, type the API key name below:
              </p>

              <TextInput 
                value={keyDetails.name}
                readOnly
                style={{ marginBottom: '16px', backgroundColor: '#f5f5f5' }}
              />

              <FormGroup label="Type the name of the API key to confirm *" isRequired>
                <TextInput
                  value={deleteConfirmText}
                  onChange={(_, value) => setDeleteConfirmText(value)}
                  type="text"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="link" 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                  navigate(`/developer-portal?revoked=${encodeURIComponent(keyDetails.name)}&type=key#api-keys`);
                }}
                isDisabled={deleteConfirmText !== keyDetails.name}
              >
                Delete
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

          {/* Reject API key modal - for API owner */}
          {currentRole === 'API owner' && (
            <Modal
              isOpen={isRejectModalOpen}
              onClose={() => {
                setIsRejectModalOpen(false);
                setRejectionReason('');
              }}
              variant="small"
              style={{ maxWidth: '500px' }}
            >
              <ModalHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ExclamationTriangleIcon style={{ color: '#F0AB00', fontSize: '24px' }} />
                  <Title headingLevel="h2">Reject API key</Title>
                </div>
              </ModalHeader>
              <ModalBody style={{ padding: '24px' }}>
                <p style={{ marginBottom: '24px', fontSize: '14px', color: '#151515' }}>
                  This will deny this API key request. The applicant will be notified of the reason and can submit a new request.
                </p>

                <FormGroup label="API key name" style={{ marginBottom: '16px' }}>
                  <TextInput
                    value={keyDetails.name}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5' }}
                  />
                </FormGroup>

                <FormGroup label="Use case" style={{ marginBottom: '16px' }}>
                  <TextInput
                    value={keyDetails.description}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5' }}
                  />
                </FormGroup>

                <FormGroup 
                  label={
                    <span>
                      Provide a reason for the rejection <span style={{ color: '#C9190B' }}>*</span>
                    </span>
                  }
                  isRequired
                  style={{ marginBottom: '16px' }}
                >
                  <TextArea
                    value={rejectionReason}
                    onChange={(_, value) => setRejectionReason(value)}
                    placeholder="Give the requester some reasons why you reject this API key request"
                    rows={4}
                    aria-label="Rejection reason input"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  key="reject"
                  variant="danger"
                  onClick={() => {
                    if (rejectionReason.trim()) {
                      // In a real app, this would make an API call to reject the key
                      setIsRejectModalOpen(false);
                      setRejectionReason('');
                      // Navigate back to API keys approval page
                      navigate('/developer-portal/api-keys?tab=approval');
                    }
                  }}
                  isDisabled={!rejectionReason.trim()}
                >
                  Reject
                </Button>
                <Button
                  key="cancel"
                  variant="link"
                  onClick={() => {
                    setIsRejectModalOpen(false);
                    setRejectionReason('');
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </PageSection>
      </Page>
    </>
  );
};

export { APIKeyDetails };

