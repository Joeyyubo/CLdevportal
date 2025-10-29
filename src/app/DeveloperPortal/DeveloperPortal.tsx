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
  NavGroup,
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
  const [copiedApiKey, setCopiedApiKey] = React.useState<string | null>(null);
  const [showRevokeSuccess, setShowRevokeSuccess] = React.useState(false);
  const [revokedRequestName, setRevokedRequestName] = React.useState('');
  const [revokedType, setRevokedType] = React.useState<'key' | 'request'>('request');
  
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
    { name: 'A new keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Jan 20,2026' },
    { name: 'development keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Oct 25,2025' },
    { name: 'Production keys', status: 'Pending', api: 'Get Flights tickets', requestTime: 'Sep 05,2025' },
    { name: 'Dev test keys', status: 'Pending', api: 'List My Bookings', requestTime: 'Nov 01,2025' },
    { name: 'Research key', status: 'Pending', api: 'List My Bookings', requestTime: 'Dec 25,2026' },
    { name: 'Integration keys', status: 'Rejected', api: 'Create Booking', requestTime: 'May 10,2027' },
    { name: 'test-Key_1', status: 'Rejected', api: 'Create Booking', requestTime: 'May 11,2028' },
    { name: 'learn-Key_2', status: 'Rejected', api: 'List My Bookings', requestTime: 'April 20,2029' },
    { name: 'try-Key_3', status: 'Rejected', api: 'Create Booking', requestTime: 'Mar 06,2026' },
    { name: 'Trial-Key_4', status: 'Rejected', api: 'Get Booking Details', requestTime: 'May 20,2025' },
  ];

  // API Keys data
  const apiKeys = [
    { name: 'personal keys', status: 'Active', apiKey: 'cbjNd-nvMqT', api: 'Get Flights tickets', expirationDay: 'Jan 20,2026' },
    { name: 'development keys', status: 'Active', apiKey: 'rGeZL-RKIT5', api: 'List My Bookings', expirationDay: 'Oct 25,2025' },
    { name: 'Production keys', status: 'Expired', apiKey: '', api: 'Create Booking', expirationDay: 'Sep 05,2025' },
    { name: 'Dev test keys', status: 'Active', apiKey: 'vt9Dz-taKWW', api: 'Get Booking Details', expirationDay: 'Nov 01,2025' },
    { name: 'Research key', status: 'Active', apiKey: 'UfTQm-2eeLx', api: 'Get Payment Status', expirationDay: 'Dec 25,2026' },
    { name: 'Integration keys', status: 'Active', apiKey: 'KwJzA-9mNpR', api: 'Get Flights tickets', expirationDay: 'May 10,2027' },
    { name: 'test-Key_1', status: 'Expired', apiKey: '', api: 'Get Booking Details', expirationDay: 'May 11,2028' },
    { name: 'learn-Key_2', status: 'Active', apiKey: 'XyVwB-8qLsT', api: 'Create Booking', expirationDay: 'April 20,2029' },
    { name: 'try-Key_3', status: 'Active', apiKey: 'MnKpO-7fGhJ', api: 'List My Bookings', expirationDay: 'Mar 06,2026' },
    { name: 'Trial-Key_4', status: 'Active', apiKey: 'DeFsC-5hIjK', api: 'Get Flights tickets', expirationDay: 'May 20,2025' },
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
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/apis');
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else {
      // For now, navigate to developer portal for other items
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
  // For API consumer, owned count is always 0 as they don't own any APIs
  // For API owner, count the actual owned APIs
  const ownedCount = currentRole === 'API consumer' ? 0 : apiData.filter(api => api.owned).length;
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

  // Reset filter if current role is API consumer and Owned filter is selected
  React.useEffect(() => {
    if (currentRole === 'API consumer' && selectedFilter === 'Owned') {
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
        <Nav aria-label="API portal navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
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
            <NavItem itemId="dev-portal" isActive icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
              API portal
            </NavItem>
            {currentRole === 'API owner' && (
              <NavItem itemId="policies" icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
                Policies
              </NavItem>
            )}
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
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            API Portal
          </Title>
          <Tabs activeKey={activeTab} onSelect={handleTabClick} aria-label="API portal tabs" style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>API products</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>API keys</TabTitleText>} />
            <Tab eventKey={2} title={<TabTitleText>Observability</TabTitleText>} />
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" onClick={() => setIsGenerateModalOpen(true)}>Generate API key</Button>
                </div>
              </GridItem>
            </Grid>

            <Grid hasGutter>
              <GridItem span={3}>
                <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Type</Title>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                    <option>All</option>
                  </select>

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

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                    <option>All</option>
                  </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Request state</Title>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                    <option>All</option>
                  </select>
                </div>
              </GridItem>

              <GridItem span={9}>
                {apiKeysSectionFilter === 'keys-owned' ? (
                  <Card>
                    <CardBody>
                      <div style={{ marginBottom: '16px' }}>
                        <Title headingLevel="h2" size="lg">
                          API keys
                        </Title>
                      </div>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API key</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Expiration day</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '50px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiKeys.map((key, index) => (
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
                            <td style={{ padding: '12px' }}>
                              <Label
                                variant="outline"
                                icon={key.status === 'Active' ? <CheckCircleIcon /> : <TimesCircleIcon />}
                                color={key.status === 'Active' ? 'green' : 'red'}
                              >
                                {key.status}
                              </Label>
                            </td>
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
                              <td style={{ padding: '12px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                  onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(key.api)}`)}
                                >
                                  {key.api}
                                </Button>
                              </td>
                              <td style={{ padding: '12px', color: '#6a6e73' }}>
                                {key.expirationDay}
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
                ) : (
                  <Card>
                    <CardBody>
                      <div style={{ marginBottom: '16px' }}>
                        <Title headingLevel="h2" size="lg">
                          API key request
                        </Title>
                      </div>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Request time</th>
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

        {/* Tab 2: Observability content */}
        {activeTab === 2 && (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <Card>
                <CardBody>
                  <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Total calls</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066CC' }}>1000 calls</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Average latency</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066CC' }}>20.35 ms</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Total errors</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b6914' }}>20 errors</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>Error rate</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0ab00' }}>2%</div>
                </CardBody>
              </Card>
            </div>

            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <SearchInput
                  placeholder="Search by API name, keywords, capability"
                  value={searchValue}
                  onChange={(_, value) => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                />
              </div>
              <Button variant="secondary" icon={<SyncIcon />}>
                Refresh
              </Button>
            </div>

            {/* API Usage Trends Chart */}
            <Card>
              <CardBody>
                <Title headingLevel="h3" size="xl" style={{ marginBottom: '24px' }}>
                  API usage trends
                </Title>
                
                {/* Chart container with PatternFly styling */}
                <div style={{ 
                  position: 'relative', 
                  height: '400px', 
                  padding: '24px', 
                  backgroundColor: '#ffffff',
                  border: '1px solid #d0d0d0', 
                  borderRadius: '4px' 
                }}>
                  {/* Y-axis labels */}
                  <div style={{ position: 'absolute', left: '0', top: '24px', bottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '40px' }}>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((value) => (
                      <div key={`y-${value}`} style={{ fontSize: '12px', color: '#6a6e73', textAlign: 'right', paddingRight: '8px' }}>
                        {value}
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart area */}
                  <div style={{ marginLeft: '50px', position: 'relative', height: '336px' }}>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div 
                          key={`grid-h-${i}`} 
                          style={{ 
                            position: 'absolute', 
                            top: `${i * 10}%`, 
                            left: 0, 
                            right: 0, 
                            height: '1px', 
                            backgroundColor: '#e5e5e5',
                            zIndex: 0 
                          }} 
                        />
                      ))}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div 
                          key={`grid-v-${i}`} 
                          style={{ 
                            position: 'absolute', 
                            left: `${i * 10}%`, 
                            top: 0, 
                            bottom: 0, 
                            width: '1px', 
                            backgroundColor: '#e5e5e5',
                            zIndex: 0 
                          }} 
                        />
                      ))}
                    </div>
                    
                    {/* Stacked area chart */}
                    <svg width="100%" height="100%" style={{ position: 'relative', zIndex: 1 }}>
                      <defs>
                        <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#0066CC', stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: '#0066CC', stopOpacity: 0.3 }} />
                        </linearGradient>
                        <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#61affe', stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: '#61affe', stopOpacity: 0.3 }} />
                        </linearGradient>
                        <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#4c5fd5', stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: '#4c5fd5', stopOpacity: 0.3 }} />
                        </linearGradient>
                      </defs>
                      
                      {/* Calculate points for stacked area chart */}
                      {/* Flight schedule (bottom layer) */}
                      <path
                        d="M 0,270 L 50,268 L 100,267 L 150,252 L 200,252 L 250,267 L 300,267 L 350,263 L 400,267 L 450,250 L 500,231 L 500,270 L 450,270 L 400,270 L 350,270 L 300,270 L 250,270 L 200,270 L 150,270 L 100,270 L 50,270 L 0,270 Z"
                        fill="#4c5fd5"
                        fillOpacity="0.6"
                        stroke="#4c5fd5"
                        strokeWidth="1.5"
                      />
                      
                      {/* Get booking (middle layer) */}
                      <path
                        d="M 0,231 L 50,236 L 100,238 L 150,264 L 200,254 L 250,266 L 300,280 L 350,250 L 400,212 L 450,223 L 500,223 L 500,270 L 450,270 L 400,270 L 350,270 L 300,270 L 250,270 L 200,270 L 150,270 L 100,270 L 50,270 L 0,270 L 0,270 Z"
                        fill="#61affe"
                        fillOpacity="0.6"
                        stroke="#61affe"
                        strokeWidth="1.5"
                      />
                      
                      {/* Get flight tickets (top layer) */}
                      <path
                        d="M 0,0 L 50,236 L 100,238 L 150,264 L 200,254 L 250,229 L 300,191 L 350,158 L 400,146 L 450,97 L 500,45 L 500,223 L 450,223 L 400,212 L 350,250 L 300,280 L 250,266 L 200,254 L 150,264 L 100,238 L 50,236 L 0,231 L 0,0 Z"
                        fill="#0066CC"
                        fillOpacity="0.6"
                        stroke="#0066CC"
                        strokeWidth="1.5"
                      />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-20px', 
                      left: '0', 
                      right: '0', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      paddingTop: '8px' 
                    }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <div key={`x-${value}`} style={{ fontSize: '12px', color: '#6a6e73', flex: 1, textAlign: 'center' }}>
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div style={{ 
                    position: 'absolute', 
                    right: '24px', 
                    top: '24px', 
                    backgroundColor: '#ffffff', 
                    padding: '12px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#0066CC', marginRight: '8px', borderRadius: '2px' }} />
                      <span style={{ fontSize: '14px', color: '#151515' }}>Get flight tickets</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#61affe', marginRight: '8px', borderRadius: '2px' }} />
                      <span style={{ fontSize: '14px', color: '#151515' }}>Get booking</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#4c5fd5', marginRight: '8px', borderRadius: '2px' }} />
                      <span style={{ fontSize: '14px', color: '#151515' }}>Flight schedule</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
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