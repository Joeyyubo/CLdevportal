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
  Nav,
  NavList,
  NavItem,
  PageSection,
  Divider,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Title,
  Grid,
  GridItem,
  SearchInput,
  Card,
  CardBody,
  Badge,
  Tooltip,
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
  UserIcon,
  StarIcon,
  ExternalLinkAltIcon,
  PencilAltIcon,
} from '@patternfly/react-icons';
import './APIs.css';

// Sample standalone APIs data (These are different from API products in Developer Portal)
const initialApiData = [
  { 
    name: 'Get Flights tickets', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Flight ticket information API for users to get flight details', 
    tags: ['Ticket'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Get Booking Details', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'API for flight payment processing and transactions', 
    tags: ['Payment'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Create Booking', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Aircraft application data and maintenance information', 
    tags: ['Aircraft'], 
    starred: false,
    owned: true 
  },
  { 
    name: 'Airport information', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Flight ticket information API for users to get flight details', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Flight-payment-api', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'API for flight payment processing and transactions', 
    tags: ['Payment'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Aircraft-app-api', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft application data and maintenance information', 
    tags: ['Aircraft'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Client-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'API of client data management and customer information', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Aircraft-region-api', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft type in different regions with location data', 
    tags: ['Aircraft'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Booking-management-api', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Comprehensive booking management and reservation system', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Loyalty-program-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Customer loyalty points and rewards program management', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Payment-processing-api', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'Secure payment processing and transaction handling', 
    tags: ['Payment'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Flight-status-api', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Real-time flight status updates and schedule information', 
    tags: ['Ticket'], 
    starred: false,
    owned: false 
  },
  { 
    name: 'Client-registration-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Client account registration and profile management', 
    tags: ['Client'], 
    starred: false,
    owned: false 
  },
];

const APIs: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [apiData, setApiData] = React.useState(initialApiData);
  const [activeFilter, setActiveFilter] = React.useState('organization-all'); // 'owned', 'starred', 'organization-all'
  
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

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      // Already on APIs page
      // Optionally you could reload or keep on current page
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else {
      // For other items, navigate to developer portal
      // You can add specific routes later if needed
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

  const handleStarClick = (apiName: string) => {
    setApiData(prevData => 
      prevData.map(api => 
        api.name === apiName ? { ...api, starred: !api.starred } : api
      )
    );
  };

  const ownedCount = apiData.filter(api => api.owned).length;
  const starredCount = apiData.filter(api => api.starred).length;

  // Filter APIs based on activeFilter
  const filteredApiData = React.useMemo(() => {
    if (activeFilter === 'owned') {
      return apiData.filter(api => api.owned);
    } else if (activeFilter === 'starred') {
      return apiData.filter(api => api.starred);
    }
    // 'organization-all' or default - show all
    return apiData;
  }, [apiData, activeFilter]);

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 5.5C15.1 5.5 17.1 6.7 17.8 9.2L20.4 20.6L23 9.2C23.7 6.7 25.7 5.5 28.3 5.5C29.8 5.5 31 6.1 31.9 7.3C32.8 8.5 33.3 10.1 33.3 12.2V27.8C33.3 29.9 32.8 31.5 31.9 32.7C31 33.9 29.8 34.5 28.3 34.5C26.8 34.5 25.7 33.9 24.8 32.7C23.9 31.5 23.4 29.9 23.4 27.8V21.8L21.8 28.6C21.4 30.5 20.4 31.9 18.8 32.8C17.2 33.7 15.3 34.2 13.1 34.2C10.9 34.2 9 33.7 7.4 32.8C5.8 31.9 4.8 30.5 4.4 28.6L6 21.8V27.8C6 29.9 5.5 31.5 4.6 32.7C3.7 33.9 2.5 34.5 1 34.5C0.4 34.5 0 34.1 0 33.5V6.5C0 5.9 0.4 5.5 1 5.5C2.5 5.5 3.7 6.1 4.6 7.3C5.5 8.5 6 10.1 6 12.2V27.8C6 26.9 6.1 26.1 6.3 25.3C6.5 24.5 6.9 23.8 7.5 23.1C8.1 22.4 8.9 22.1 9.9 22.1C10.5 22.1 11.1 22.3 11.7 22.7C12.3 23.1 12.7 23.6 12.9 24.3L9.3 7.6C8.6 5.1 6.6 3.9 4 3.9C3.8 3.9 3.6 3.9 3.4 3.9C3.2 3.9 3 4 2.9 4.1C2.8 4.2 2.7 4.3 2.7 4.5V34.5C2.7 35.1 2.3 35.5 1.7 35.5C1.1 35.5 0.7 35.1 0.7 34.5V5.5C0.7 4.9 1.1 4.5 1.7 4.5H11.8C13.3 4.5 14.5 5.1 15.4 6.3C16.3 7.5 16.8 9.1 16.8 11.2V27.8C16.8 29.9 16.3 31.5 15.4 32.7C14.5 33.9 13.3 34.5 11.8 34.5C10.3 34.5 9.1 33.9 8.2 32.7C7.3 31.5 6.8 29.9 6.8 27.8V12.2C6.8 11.6 6.4 11.2 5.8 11.2C5.2 11.2 4.8 11.6 4.8 12.2V27.8C4.8 29.3 5.4 30.5 6.6 31.4C7.8 32.3 9.2 32.8 10.8 32.8C12.4 32.8 13.8 32.3 15 31.4C16.2 30.5 16.8 29.3 16.8 27.8V11.2C16.8 9.7 16.2 8.5 15 7.6C13.8 6.7 12.4 6.2 10.8 6.2C9.2 6.2 7.8 6.7 6.6 7.6C5.4 8.5 4.8 9.7 4.8 11.2V27.8C4.8 29.9 4.3 31.5 3.4 32.7C2.5 33.9 1.3 34.5 0 34.5C0.7 34.5 1.2 34.9 1.2 35.5C1.2 36.1 0.7 36.5 0 36.5C-1.5 36.5 -3.3 35.9 -4.6 34.7C-5.9 33.5 -6.6 31.9 -6.6 29.8V12.2C-6.6 10.1 -6.1 8.5 -5.2 7.3C-4.3 6.1 -3.1 5.5 -1.6 5.5C-0.1 5.5 1.1 6.1 2 7.3C2.9 8.5 3.4 10.1 3.4 12.2V27.8C3.4 29.9 3.9 31.5 4.8 32.7C5.7 33.9 6.9 34.5 8.4 34.5C9.9 34.5 11.1 33.9 12 32.7C12.9 31.5 13.4 29.9 13.4 27.8V11.2C13.4 10.6 13 10.2 12.4 10.2C11.8 10.2 11.4 10.6 11.4 11.2V27.8C11.4 29.3 10.8 30.5 9.6 31.4C8.4 32.3 7 32.8 5.4 32.8C3.8 32.8 2.4 32.3 1.2 31.4C0 30.5 -0.6 29.3 -0.6 27.8V11.2C-0.6 9.7 -0.1 8.5 0.9 7.6C1.9 6.7 3.3 6.2 4.9 6.2C6.5 6.2 7.9 6.7 9.1 7.6C10.3 8.5 10.9 9.7 10.9 11.2V27.8C10.9 29.9 10.4 31.5 9.5 32.7C8.6 33.9 7.4 34.5 5.9 34.5H-0.1C-0.7 34.5 -1.1 34.1 -1.1 33.5V6.5C-1.1 5.9 -0.7 5.5 -0.1 5.5H5.9C7.4 5.5 8.6 6.1 9.5 7.3C10.4 8.5 10.9 10.1 10.9 12.2V27.8C10.9 29.9 10.4 31.5 9.5 32.7C8.6 33.9 7.4 34.5 5.9 34.5C4.4 34.5 3.2 33.9 2.3 32.7C1.4 31.5 0.9 29.9 0.9 27.8V11.2C0.9 10.6 0.5 10.2 -0.1 10.2C-0.7 10.2 -1.1 10.6 -1.1 11.2V27.8C-1.1 29.3 -0.5 30.5 0.7 31.4C1.9 32.3 3.3 32.8 4.9 32.8C6.5 32.8 7.9 32.3 9.1 31.4C10.3 30.5 10.9 29.3 10.9 27.8V11.2C10.9 9.7 10.3 8.5 9.1 7.6C7.9 6.7 6.5 6.2 4.9 6.2C3.3 6.2 1.9 6.7 0.7 7.6C-0.5 8.5 -1.1 9.7 -1.1 11.2V27.8C-1.1 29.9 -0.6 31.5 0.3 32.7C1.2 33.9 2.4 34.5 3.9 34.5H10.9C11.5 34.5 11.9 34.1 11.9 33.5V6.5C11.9 5.9 11.5 5.5 10.9 5.5H3.9C2.4 5.5 1.2 6.1 0.3 7.3C-0.6 8.5 -1.1 10.1 -1.1 12.2V27.8C-1.1 29.9 -0.6 31.5 0.3 32.7C1.2 33.9 2.4 34.5 3.9 34.5C5.4 34.5 6.6 33.9 7.5 32.7C8.4 31.5 8.9 29.9 8.9 27.8V11.2C8.9 10.6 8.5 10.2 7.9 10.2C7.3 10.2 6.9 10.6 6.9 11.2V27.8C6.9 29.3 6.3 30.5 5.1 31.4C3.9 32.3 2.5 32.8 0.9 32.8C-0.7 32.8 -2.1 32.3 -3.3 31.4C-4.5 30.5 -5.1 29.3 -5.1 27.8V11.2C-5.1 9.7 -4.5 8.5 -3.3 7.6C-2.1 6.7 -0.7 6.2 0.9 6.2C2.5 6.2 3.9 6.7 5.1 7.6C6.3 8.5 6.9 9.7 6.9 11.2V27.8C6.9 29.9 6.4 31.5 5.5 32.7C4.6 33.9 3.4 34.5 1.9 34.5C0.4 34.5 -0.8 33.9 -1.7 32.7C-2.6 31.5 -3.1 29.9 -3.1 27.8V11.2C-3.1 10.6 -3.5 10.2 -4.1 10.2C-4.7 10.2 -5.1 10.6 -5.1 11.2V27.8C-5.1 29.9 -4.6 31.5 -3.7 32.7C-2.8 33.9 -1.6 34.5 0 34.5H12.5Z" fill="#CC0000"/>
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
            <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
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
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            APIs
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: 0 }}>
            Available APIs in organization for developers to browse discover, register and test
          </p>
          
          {/* Divider line to match API Portal tabs styling */}
          <div style={{ 
            borderBottom: '1px solid #d0d0d0', 
            marginBottom: '24px',
            marginTop: '8px'
          }} />
        </div>

        {/* Search and Actions Row */}
        <Grid hasGutter style={{ marginBottom: '24px' }}>
          <GridItem span={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchInput
              placeholder="Search APIs..."
              value={searchValue}
              onChange={(_, value) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              style={{ width: '100%' }}
            />
          </GridItem>
          <GridItem span={9} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={() => navigate('/register-component')}>Register Existing API</Button>
          </GridItem>
        </Grid>

        <Grid hasGutter>
          {/* Left Sidebar - Filters */}
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Type</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="openapi">OpenAPI</option>
                <option value="graphql">GraphQL</option>
                <option value="rest">REST</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Personal</Title>
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => ownedCount > 0 && setActiveFilter(activeFilter === 'owned' ? 'organization-all' : 'owned')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: ownedCount === 0 ? '#fafafa' : '#ffffff',
                    color: ownedCount === 0 ? '#8b8d90' : '#151515',
                    border: activeFilter === 'owned' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: ownedCount === 0 ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    opacity: ownedCount === 0 ? 0.6 : 1,
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CogIcon style={{ fontSize: '16px' }} />
                    <span>Owned</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{ownedCount}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setActiveFilter(activeFilter === 'starred' ? 'organization-all' : 'starred')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: activeFilter === 'starred' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarIcon style={{ fontSize: '16px' }} />
                    <span>Starred</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{starredCount}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Organization</Title>
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => setActiveFilter('organization-all')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: activeFilter === 'organization-all' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>600</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Owner</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="ticket-team">Ticket Team</option>
                <option value="payment-team">Payment Team</option>
                <option value="aircraft-team">Aircraft Team</option>
                <option value="client-team">Client Team</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Lifecycle</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="production">Production</option>
                <option value="development">Development</option>
                <option value="deprecated">Deprecated</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                <option value="all">All</option>
                <option value="ticket">Ticket</option>
                <option value="payment">Payment</option>
                <option value="aircraft">Aircraft</option>
                <option value="client">Client</option>
              </select>
            </div>
          </GridItem>

          {/* Right Content - API Table */}
          <GridItem span={9}>
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: '16px' }}>
                  APIs
                </Title>

                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '10%' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Owner</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Lifecycle</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '28%' }}>Description</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '10%' }}>Tags</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApiData.map((api, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                        <td style={{ padding: '12px' }}>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/apis/api-details/${encodeURIComponent(api.name)}`)}
                          >
                            {api.name}
                          </Button>
                        </td>
                        <td style={{ padding: '12px' }}>{api.type}</td>
                        <td style={{ padding: '12px' }}>{api.owner}</td>
                        <td style={{ padding: '12px' }}>{api.lifecycle}</td>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#6a6e73', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {api.description}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {api.tags && api.tags.map((tag, tagIdx) => (
                            <Badge key={tagIdx} isRead style={{ marginRight: '4px' }}>
                              {tag}
                            </Badge>
                          ))}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <Button variant="plain" aria-label="Star" onClick={() => handleStarClick(api.name)}>
                            <StarIcon style={{ fontSize: '16px', fill: api.starred ? '#0066CC' : 'inherit' }} />
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
      </PageSection>
    </Page>
  );
};

export default APIs;
