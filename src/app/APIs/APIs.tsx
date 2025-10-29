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
  NavExpandable,
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
    if (itemId === 'home') {
      navigate('/home');
    } else if (itemId === 'catalog') {
      navigate('/catalog');
    } else if (itemId === 'apis') {
      // Already on APIs page
      // Optionally you could reload or keep on current page
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

  // If role is API consumer and owned filter is active, reset to organization-all
  React.useEffect(() => {
    if (currentRole === 'API consumer' && activeFilter === 'owned') {
      setActiveFilter('organization-all');
    }
  }, [currentRole, activeFilter]);

  const handleStarClick = (apiName: string) => {
    setApiData(prevData => 
      prevData.map(api => 
        api.name === apiName ? { ...api, starred: !api.starred } : api
      )
    );
  };

  // For API consumer, ownedCount is always 0 as they don't own any APIs
  // For API owner, count the actual owned APIs
  const ownedCount = currentRole === 'API consumer' ? 0 : apiData.filter(api => api.owned).length;
  const starredCount = apiData.filter(api => api.starred).length;

  // Filter APIs based on activeFilter
  const filteredApiData = React.useMemo(() => {
    if (activeFilter === 'owned') {
      // Only allow 'owned' filter for API owner role
      if (currentRole === 'API owner') {
        return apiData.filter(api => api.owned);
      }
      return apiData; // Return all for API consumer
    } else if (activeFilter === 'starred') {
      return apiData.filter(api => api.starred);
    }
    // 'organization-all' or default - show all
    return apiData;
  }, [apiData, activeFilter, currentRole]);

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
              title="Connectivity Link"
              id="connectivity-link-group"
              isExpanded={connectivityLinkExpanded}
              onToggle={() => setConnectivityLinkExpanded(!connectivityLinkExpanded)}
              icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" rx="3" fill="black"/>
                  <path d="M 5 6 L 8 4 L 11 6 L 11 10 L 8 12 L 5 10 Z" stroke="white" stroke-width="1" fill="none" stroke-linejoin="round"/>
                  <path d="M 5 6 L 8 4 L 11 6 L 11 10 L 8 12 L 5 10 Z" stroke="#CC0000" stroke-width="1.5" fill="none" stroke-linejoin="round" opacity="0.8" transform="translate(1, 1)"/>
                </svg>
              }
            >
              <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                API portal
              </NavItem>
              {currentRole === 'API owner' && (
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
