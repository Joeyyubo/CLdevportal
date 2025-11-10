import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Badge,
  Title,
  Grid,
  GridItem,
  SearchInput,
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
  Card,
  CardBody,
  Tooltip,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TextInput,
  TextArea,
  FormGroup,
  Select,
  SelectOption,
  Alert,
} from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import {
  PlusIcon,
  StarIcon,
  EllipsisVIcon,
  HelpIcon,
  BellIcon,
  UserIcon,
  CaretDownIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  TimesCircleIcon,
  ClockIcon,
  CodeIcon,
  ExclamationTriangleIcon,
  SyncIcon,
  CopyIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Initial API products data (API products are different from standalone APIs)
const initialApiData = [
  { name: 'Get Flights tickets', version: 'v1.1', contact: 'Jane doe', tag: 'Ticket', starred: true, owned: true },
  { name: 'Get Booking Details', version: 'v1.1', contact: 'Ticket Team', tag: 'Payment', starred: true, owned: true },
  { name: 'Create Booking', version: 'v1.1', contact: 'Ticket Team', tag: 'Ticket', starred: false, owned: true },
  { name: 'Get Aircraft Details', version: 'v1.1', contact: 'Aircraft Team', tag: 'Aircraft', starred: false, owned: false },
  { name: 'Get Aircraft Model Info', version: 'v1.1', contact: 'Aircraft Team', tag: 'Aircraft', starred: false, owned: false },
  { name: 'Get Flight Status', version: 'v1.1', contact: 'Client Team', tag: 'Client', starred: false, owned: false },
  { name: 'Register Client', version: 'v1.1', contact: 'Client Team', tag: 'Client', starred: false, owned: false },
  { name: 'List My Bookings', version: 'v1.1', contact: 'Ticket Team', tag: 'Ticket', starred: false, owned: false },
  { name: 'Get Loyalty Info', version: 'v1.1', contact: 'Client Team', tag: 'Client', starred: false, owned: false },
  { name: 'Get Payment Status', version: 'v1.1', contact: 'Payment Team', tag: 'Payment', starred: false, owned: false },
];

const DeveloperPortal: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(() => {
    // Check URL hash on initial load
    const hash = window.location.hash;
    if (hash === '#api-keys') return 1;
    if (hash === '#observability') return 2;
    return 0;
  });
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('Starred'); // 'Owned', 'Starred', 'All'
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const [apiData, setApiData] = React.useState(initialApiData);
  
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
  const [apiKeysSectionFilter, setApiKeysSectionFilter] = React.useState('keys-owned'); // 'keys-owned', 'requests-owned'
  const [apiKeysStatusFilter, setApiKeysStatusFilter] = React.useState('All'); // 'All', 'Active', 'Disabled'
  const [requestStateFilter, setRequestStateFilter] = React.useState('All'); // For non-Platform engineer role
  const [copiedApiKey, setCopiedApiKey] = React.useState<string | null>(null);
  const [showRevokeSuccess, setShowRevokeSuccess] = React.useState(false);
  const [revokedRequestName, setRevokedRequestName] = React.useState('');
  const [revokedType, setRevokedType] = React.useState<'key' | 'request'>('request');
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  
  // Generate API key modal states
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);
  const [selectedApi, setSelectedApi] = React.useState('');
  const [isApiDropdownOpen, setIsApiDropdownOpen] = React.useState(false);
  const [selectedApiPlan, setSelectedApiPlan] = React.useState('');
  const [isApiPlanDropdownOpen, setIsApiPlanDropdownOpen] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState('');
  const [apiKeyDescription, setApiKeyDescription] = React.useState('');
  const [showGeneratedKey, setShowGeneratedKey] = React.useState(false);
  const [generatedApiKey, setGeneratedApiKey] = React.useState('');
  const [copiedGeneratedKey, setCopiedGeneratedKey] = React.useState(false);
  
  // API Key Requests data
  const apiKeyRequests = [
    { name: 'A new keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Jan 20,2026', user: 'John Doe' },
    { name: 'development keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Oct 25,2025', user: 'Jane Smith' },
    { name: 'Production keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Sep 05,2025', user: 'Bob Johnson' },
    { name: 'Dev test keys', status: 'Pending', api: 'List My Bookings', requestTime: 'Nov 01,2025', user: 'Alice Williams' },
    { name: 'Research key', status: 'Pending', api: 'List My Bookings', requestTime: 'Dec 25,2026', user: 'Charlie Brown' },
    { name: 'Integration keys', status: 'Rejected', api: 'Create Booking', requestTime: 'May 10,2027', user: 'David Lee' },
    { name: 'test-Key_1', status: 'Rejected', api: 'Create Booking', requestTime: 'May 11,2028', user: 'Emma Davis' },
    { name: 'learn-Key_2', status: 'Rejected', api: 'List My Bookings', requestTime: 'April 20,2029', user: 'Frank Miller' },
    { name: 'try-Key_3', status: 'Rejected', api: 'Create Booking', requestTime: 'Mar 06,2026', user: 'Grace Wilson' },
    { name: 'Trial-Key_4', status: 'Rejected', api: 'Get Booking Details', requestTime: 'May 20,2025', user: 'Henry Moore' },
  ];

  // API Keys data
  const apiKeys = [
    { name: 'personal keys', status: 'Active', apiKey: 'cbjNd-nvMqT', api: 'Get Flights tickets', expirationDay: 'Jan 20,2026', user: 'John Doe' },
    { name: 'development keys', status: 'Active', apiKey: 'rGeZL-RKIT5', api: 'List My Bookings', expirationDay: 'Oct 25,2025', user: 'Jane Smith' },
    { name: 'Production keys', status: 'Disabled', apiKey: '', api: 'Create Booking', expirationDay: 'Sep 05,2025', user: 'Bob Johnson' },
    { name: 'Dev test keys', status: 'Active', apiKey: 'vt9Dz-taKWW', api: 'Get Booking Details', expirationDay: 'Nov 01,2025', user: 'Alice Williams' },
    { name: 'Research key', status: 'Active', apiKey: 'UfTQm-2eeLx', api: 'Get Payment Status', expirationDay: 'Dec 25,2026', user: 'Charlie Brown' },
    { name: 'Integration keys', status: 'Active', apiKey: 'KwJzA-9mNpR', api: 'Get Flights tickets', expirationDay: 'May 10,2027', user: 'David Lee' },
    { name: 'test-Key_1', status: 'Disabled', apiKey: '', api: 'Get Booking Details', expirationDay: 'May 11,2028', user: 'Emma Davis' },
    { name: 'learn-Key_2', status: 'Active', apiKey: 'XyVwB-8qLsT', api: 'Create Booking', expirationDay: 'April 20,2029', user: 'Frank Miller' },
    { name: 'try-Key_3', status: 'Active', apiKey: 'MnKpO-7fGhJ', api: 'List My Bookings', expirationDay: 'Mar 06,2026', user: 'Grace Wilson' },
    { name: 'Trial-Key_4', status: 'Active', apiKey: 'DeFsC-5hIjK', api: 'Get Flights tickets', expirationDay: 'May 20,2025', user: 'Henry Moore' },
  ];

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    setActiveTab(tabKey);
    
    // Update URL hash
    if (tabKey === 1) {
      window.location.hash = 'api-keys';
    } else if (tabKey === 2) {
      window.location.hash = 'observability';
    } else {
      window.location.hash = '';
    }
  };

  // Listen to hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#api-keys') {
        setActiveTab(1);
      } else if (hash === '#observability') {
        setActiveTab(2);
      } else {
        setActiveTab(0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
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
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
    }
  };

  const handleStarClick = (apiName: string) => {
    // Get current starred APIs from localStorage
    const getStarredAPIs = (): string[] => {
      try {
        const starred = localStorage.getItem('starredAPIs');
        return starred ? JSON.parse(starred) : [];
      } catch {
        return [];
      }
    };
    
    const starredAPIs = getStarredAPIs();
    const isStarred = starredAPIs.includes(apiName);
    
    const updatedStarred = isStarred 
      ? starredAPIs.filter((name: string) => name !== apiName)
      : [...starredAPIs, apiName];
    
    localStorage.setItem('starredAPIs', JSON.stringify(updatedStarred));
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    // Update local data
    setApiData(prevData => {
      return prevData.map(api => 
        api.name === apiName ? { ...api, starred: !api.starred } : api
      );
    });
  };

  // Load starred count from localStorage
  const [starredAPIs, setStarredAPIs] = React.useState<string[]>(() => {
    try {
      const starred = localStorage.getItem('starredAPIs');
      return starred ? JSON.parse(starred) : [];
    } catch {
      return [];
    }
  });

  // Listen to storage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const starred = localStorage.getItem('starredAPIs');
        setStarredAPIs(starred ? JSON.parse(starred) : []);
        
        // Also update role from localStorage
        const role = localStorage.getItem('currentRole');
        if (role) {
          setCurrentRole(role);
        }
      } catch {
        setStarredAPIs([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate counts
  const starredCount = apiData.filter(api => api.starred).length;
  // For API consumer and Platform engineer, owned count is always 0 as they don't own any APIs
  // For API owner, count the actual owned APIs
  const ownedCount = (currentRole === 'API consumer' || currentRole === 'Platform engineer') ? 0 : apiData.filter(api => api.owned).length;
  const totalCount = apiData.length;
  
  // Update API data based on localStorage
  React.useEffect(() => {
    setApiData(prevData => {
      return prevData.map(api => ({
        ...api,
        starred: starredAPIs.includes(api.name)
      }));
    });
  }, [starredAPIs]);

  // Check for revoked API key/key request parameter in URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const revokedName = urlParams.get('revoked');
    const type = urlParams.get('type') as 'key' | 'request' | null;
    if (revokedName) {
      setRevokedRequestName(revokedName);
      setRevokedType(type === 'key' ? 'key' : 'request');
      setShowRevokeSuccess(true);
      // Clean up URL parameter
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
      // Auto hide after 5 seconds
      setTimeout(() => setShowRevokeSuccess(false), 5000);
    }
  }, []);

  // Reset filter if current role is API consumer or Platform engineer and Owned filter is selected
  React.useEffect(() => {
    if ((currentRole === 'API consumer' || currentRole === 'Platform engineer') && selectedFilter === 'Owned') {
      setSelectedFilter('Starred');
    }
  }, [currentRole, selectedFilter]);

  // Filter API data based on selectedFilter
  const filteredApiData = apiData.filter(api => {
    if (selectedFilter === 'Starred') {
      return api.starred;
    } else if (selectedFilter === 'Owned') {
      return api.owned;
    } else {
      // 'All' filter
      return true;
    }
  });

  const columns = ['Name', 'API version', 'Contact', 'Tags', 'Actions'];

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
                <DropdownItem value="Platform engineer">Platform engineer</DropdownItem>
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
              <NavItem itemId="dev-portal" isActive icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
              My APIs
            </NavItem>
              {(currentRole === 'API owner' || currentRole === 'Platform engineer') && (
                <NavItem itemId="policies" icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
                Policies
              </NavItem>
            )}
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
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title headingLevel="h1" size="2xl">
              Developer portal
          </Title>
            {currentRole === 'Platform engineer' && (
              <Button
                variant="plain"
                aria-label="Portal configuration"
                onClick={() => navigate('/settings/portal')}
                icon={<CogIcon />}
              />
            )}
          </div>
          <Tabs activeKey={activeTab} onSelect={handleTabClick} aria-label="Developer portal tabs" style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>API products</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>API keys</TabTitleText>} />
          </Tabs>
        </div>

        {/* Tab 0: API products content */}
        {activeTab === 0 && (
          <>
            <Grid hasGutter style={{ marginBottom: '24px' }}>
              <GridItem span={3}>
                <SearchInput
                  placeholder="Search API products..."
                  value={searchValue}
                  onChange={(_, value) => setSearchValue(value)}
                  style={{ width: '100%' }}
                />
              </GridItem>
              <GridItem span={9}>
                {currentRole === 'API owner' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary" onClick={() => navigate('/developer-portal/create-api-product')}>Create API product</Button>
                  </div>
                )}
              </GridItem>
            </Grid>

            <Grid hasGutter>
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Type</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Personal</Title>
              <div style={{ marginBottom: '8px' }}>
                <div
                  role="button"
                  onClick={() => ownedCount > 0 && handleFilterClick('Owned')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: ownedCount === 0 ? '#fafafa' : '#ffffff',
                    color: ownedCount === 0 ? '#8b8d90' : '#151515',
                    border: selectedFilter === 'Owned' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: ownedCount === 0 ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    opacity: ownedCount === 0 ? 0.6 : 1,
                    boxSizing: 'border-box'
                  }}
                >
                  <span>Owned</span>
                  <span style={{ fontWeight: 'bold' }}>{ownedCount}</span>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => handleFilterClick('Starred')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: selectedFilter === 'Starred' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>Starred</span>
                  <span style={{ fontWeight: 'bold' }}>{starredCount}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Organization</Title>
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => handleFilterClick('All')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: selectedFilter === 'All' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>{totalCount}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Owner</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Lifecycle</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                <option value="all">All</option>
              </select>
            </div>
          </GridItem>

          <GridItem span={9}>
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: '16px' }}>
                  API products
                </Title>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '30%' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>API version</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '25%' }}>Contact</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Tags</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '10%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApiData.map((api, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                        <td style={{ padding: '12px' }}>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(api.name)}`)}
                          >
                            {api.name}
                          </Button>
                        </td>
                        <td style={{ padding: '12px' }}>{api.version}</td>
                        <td style={{ padding: '12px' }}>{api.contact}</td>
                        <td style={{ padding: '12px' }}>
                          <Badge isRead>{api.tag}</Badge>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <Button variant="plain" aria-label="Star" onClick={() => handleStarClick(api.name)}>
                            <StarIcon style={{ fill: api.starred ? '#0066CC' : 'inherit' }} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
          </>
        )}

        {/* Tab 1: API Keys content */}
        {activeTab === 1 && (
          <>
            <Grid hasGutter style={{ marginBottom: '24px' }}>
              <GridItem span={3}>
                <SearchInput
                  placeholder="Search"
                  value={searchValue}
                  onChange={(_, value) => setSearchValue(value)}
                  style={{ width: '100%' }}
                />
              </GridItem>
              <GridItem span={9}>
                {currentRole !== 'API owner' && currentRole !== 'Platform engineer' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" onClick={() => setIsGenerateModalOpen(true)}>Generate API key</Button>
                </div>
                )}
              </GridItem>
            </Grid>

            <Grid hasGutter>
              <GridItem span={3}>
                <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Type</Title>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                    <option>All</option>
                  </select>

                  {currentRole !== 'Platform engineer' && (
                    <>
                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>API keys</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      role="button"
                      onClick={() => setApiKeysSectionFilter('keys-owned')}
                      style={{ 
                        width: '100%', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        border: apiKeysSectionFilter === 'keys-owned' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CogIcon />
                        <span>Owned</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>20</span>
                    </div>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>API key requests</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      role="button"
                      onClick={() => setApiKeysSectionFilter('requests-owned')}
                      style={{ 
                        width: '100%', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        border: apiKeysSectionFilter === 'requests-owned' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CogIcon />
                        <span>Owned</span>
                      </div>
                      <span style={{ fontWeight: 'bold' }}>20</span>
                    </div>
                  </div>
                    </>
                  )}

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                    <option>All</option>
                  </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>
                    {currentRole === 'Platform engineer' ? 'Status' : 'Request state'}
                  </Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                    value={currentRole === 'Platform engineer' ? (apiKeysStatusFilter || 'All') : (requestStateFilter || 'All')}
                    onChange={(e) => {
                      if (currentRole === 'Platform engineer') {
                        setApiKeysStatusFilter(e.target.value);
                      } else {
                        setRequestStateFilter(e.target.value);
                      }
                    }}
                  >
                    {currentRole === 'Platform engineer' ? (
                      <>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                      </>
                    ) : (
                    <option>All</option>
                    )}
                  </select>
                </div>
              </GridItem>

              <GridItem span={9}>
                {currentRole === 'Platform engineer' || apiKeysSectionFilter === 'keys-owned' ? (
                  <Card>
                    <CardBody>
                      <div style={{ marginBottom: '16px' }}>
                        <Title headingLevel="h2" size="lg">
                          API keys
                        </Title>
                      </div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: (currentRole === 'Platform engineer' || currentRole === 'API owner') ? '20%' : '15%' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Status</th>
                            {currentRole === 'API consumer' && (
                              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>API key</th>
                            )}
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: (currentRole === 'Platform engineer' || currentRole === 'API owner') ? '25%' : '20%' }}>API</th>
                            {(currentRole === 'Platform engineer' || currentRole === 'API owner') ? (
                              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '23%' }}>User</th>
                            ) : (
                              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '18%' }}>Expiration day</th>
                            )}
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '50px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiKeys.filter((key) => {
                            if (currentRole === 'Platform engineer' && apiKeysStatusFilter !== 'All') {
                              return key.status === apiKeysStatusFilter;
                            }
                            return true;
                          }).map((key, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #d0d0d0' }}>
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
                                icon={key.status === 'Active' ? <CheckCircleIcon /> : <TimesCircleIcon />}
                                color={key.status === 'Active' ? 'green' : 'red'}
                                style={{ display: 'inline-flex', alignItems: 'center' }}
                              >
                                {key.status}
                              </Label>
                            </td>
                              {currentRole === 'API consumer' && (
                              <td style={{ padding: '12px' }}>
                                {key.apiKey ? (
                                  <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <Tooltip content={copiedApiKey === key.apiKey ? "Copied!" : "Copy to clipboard"}>
                                      <Button
                                        variant="link"
                                        isInline
                                        style={{ fontFamily: 'monospace', fontSize: '13px', color: '#6a6e73', padding: 0 }}
                                        onClick={() => {
                                          navigator.clipboard.writeText(key.apiKey);
                                          setCopiedApiKey(key.apiKey);
                                          setTimeout(() => setCopiedApiKey(null), 2000);
                                        }}
                                      >
                                        {key.apiKey}
                                      </Button>
                                    </Tooltip>
                                  </div>
                                ) : (
                                  <span style={{ color: '#6a6e73' }}>-</span>
                                )}
                              </td>
                              )}
                              <td style={{ padding: '12px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                  onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(key.api)}`)}
                                >
                                  {key.api}
                                </Button>
                              </td>
                              {(currentRole === 'Platform engineer' || currentRole === 'API owner') ? (
                                <td style={{ padding: '12px', color: '#151515' }}>
                                  {key.user}
                                </td>
                              ) : (
                              <td style={{ padding: '12px', color: '#6a6e73' }}>
                                {key.expirationDay}
                              </td>
                              )}
                              <td style={{ padding: '12px' }}>
                                <Button variant="plain" aria-label="Actions">
                                  <EllipsisVIcon />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                ) : (
                  <Card>
                    <CardBody>
                      <div style={{ marginBottom: '16px' }}>
                        <Title headingLevel="h2" size="lg">
                          API key request
                        </Title>
                      </div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: currentRole === 'API owner' ? '20%' : '25%' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: currentRole === 'API owner' ? '20%' : '25%' }}>API</th>
                            {currentRole === 'API owner' && (
                              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>User</th>
                            )}
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: currentRole === 'API owner' ? '18%' : '20%' }}>Request time</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '50px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiKeyRequests.map((request, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #d0d0d0' }}>
                              <td style={{ padding: '12px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                  onClick={() => navigate(`/developer-portal/api-key-request-details/${encodeURIComponent(request.name)}`)}
                                >
                                  {request.name}
                                </Button>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <Label
                                  variant="outline"
                                  icon={request.status === 'Pending' ? <ClockIcon /> : <TimesCircleIcon />}
                                  color={request.status === 'Pending' ? 'blue' : 'red'}
                                >
                                  {request.status}
                                </Label>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                  onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(request.api)}`)}
                                >
                                  {request.api}
                                </Button>
                              </td>
                              {currentRole === 'API owner' && (
                                <td style={{ padding: '12px', color: '#151515' }}>
                                  {request.user}
                                </td>
                              )}
                              <td style={{ padding: '12px', color: '#6a6e73' }}>
                                {request.requestTime}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <Button variant="plain" aria-label="Actions">
                                  <EllipsisVIcon />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                )}
              </GridItem>
            </Grid>
          </>
        )}
      </PageSection>
      </Page>

      {/* Generate API key modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => {
          setIsGenerateModalOpen(false);
          setShowGeneratedKey(false);
          setSelectedApi('');
          setSelectedApiPlan('');
          setApiKeyName('');
          setApiKeyDescription('');
          setGeneratedApiKey('');
          setIsApiDropdownOpen(false);
          setIsApiPlanDropdownOpen(false);
          setCopiedGeneratedKey(false);
        }}
        variant="small"
        style={{
          '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)'
        } as React.CSSProperties}
      >
        <ModalHeader>
          <Title headingLevel="h2">Generate API key</Title>
          <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px' }}>
            Generate the API credential to use the API products.
          </div>
        </ModalHeader>
        <ModalBody>
          {!showGeneratedKey ? (
            <>
              <FormGroup label="API *" isRequired style={{ marginBottom: '24px' }}>
                <Dropdown
                  isOpen={isApiDropdownOpen}
                  onOpenChange={(isOpen) => setIsApiDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle ref={toggleRef} onClick={() => setIsApiDropdownOpen(!isApiDropdownOpen)} isExpanded={isApiDropdownOpen} style={{ width: '100%' }}>
                      {selectedApi || 'Select API'}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {apiData.map((api) => (
                      <DropdownItem
                        key={api.name}
                        onClick={() => {
                          setSelectedApi(api.name);
                          setIsApiDropdownOpen(false);
                        }}
                      >
                        {api.name}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </FormGroup>

              <FormGroup label="API plan *" isRequired style={{ marginBottom: '24px' }}>
                <Dropdown
                  isOpen={isApiPlanDropdownOpen}
                  onOpenChange={(isOpen) => setIsApiPlanDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle 
                      ref={toggleRef} 
                      onClick={() => setIsApiPlanDropdownOpen(!isApiPlanDropdownOpen)} 
                      isExpanded={isApiPlanDropdownOpen}
                      isDisabled={!selectedApi}
                      style={{ width: '100%' }}
                    >
                      {selectedApiPlan || 'Select API plan'}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem
                      onClick={() => {
                        setSelectedApiPlan('Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;');
                        setIsApiPlanDropdownOpen(false);
                      }}
                    >
                      Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSelectedApiPlan('Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;');
                        setIsApiPlanDropdownOpen(false);
                      }}
                    >
                      Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSelectedApiPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
                        setIsApiPlanDropdownOpen(false);
                      }}
                    >
                      Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </FormGroup>

              <FormGroup label="Name *" isRequired style={{ marginBottom: '24px' }}>
                <TextInput
                  value={apiKeyName}
                  onChange={(_, value) => setApiKeyName(value)}
                  placeholder="A new key for production"
                />
              </FormGroup>

              <FormGroup label="Description">
                <TextArea
                  value={apiKeyDescription}
                  onChange={(_, value) => setApiKeyDescription(value)}
                  placeholder="It work for the advanced flight application production."
                  rows={4}
                  style={{ width: '100%', maxWidth: '100%' }}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup label="API *" isRequired style={{ marginBottom: '24px' }}>
                <TextInput
                  value={selectedApi}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="API plan *" isRequired style={{ marginBottom: '24px' }}>
                <TextInput
                  value={selectedApiPlan}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="Name *" isRequired style={{ marginBottom: '24px' }}>
                <TextInput
                  value={apiKeyName || 'A new key for production'}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup label="API key *" isRequired style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TextInput
                    value={generatedApiKey}
                    readOnly
                    style={{ flex: 1, backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                  />
                  <Tooltip content={copiedGeneratedKey ? "Copied!" : "Copy to clipboard"}>
                    <Button
                      variant="plain"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedApiKey);
                        setCopiedGeneratedKey(true);
                        setTimeout(() => setCopiedGeneratedKey(false), 2000);
                      }}
                      style={{ padding: '4px' }}
                    >
                      <CopyIcon style={{ fontSize: '16px' }} />
                    </Button>
                  </Tooltip>
                </div>
              </FormGroup>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              if (!showGeneratedKey) {
                // Generate API key and move to step 2
                const randomKey = `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 11)}`;
                setGeneratedApiKey(randomKey);
                setShowGeneratedKey(true);
              } else {
                // Step 2: Save and close
                setIsGenerateModalOpen(false);
                setShowGeneratedKey(false);
                setSelectedApi('');
                setSelectedApiPlan('');
                setApiKeyName('');
                setApiKeyDescription('');
                setGeneratedApiKey('');
                setIsApiDropdownOpen(false);
                setIsApiPlanDropdownOpen(false);
                setCopiedGeneratedKey(false);
              }
            }}
          >
            {showGeneratedKey ? 'Save' : 'Generate'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsGenerateModalOpen(false);
              setShowGeneratedKey(false);
              setSelectedApi('');
              setSelectedApiPlan('');
              setApiKeyName('');
              setApiKeyDescription('');
              setGeneratedApiKey('');
              setIsApiDropdownOpen(false);
              setIsApiPlanDropdownOpen(false);
              setCopiedGeneratedKey(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Floating Toast Alert for revoked API key/key request */}
      {showRevokeSuccess && (
        <Alert
          variant="success"
          title={revokedType === 'key' ? 'API key revoked successfully' : 'API key request revoked successfully'}
          isLiveRegion
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1000,
            maxWidth: '400px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div>
            <strong>"{revokedRequestName}"</strong> has been revoked.
          </div>
        </Alert>
      )}
    </>
  );
};

export { DeveloperPortal };