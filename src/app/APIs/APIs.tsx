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
  Select,
  SelectOption,
  Card,
  CardBody,
  Badge,
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
  ExternalLinkAltIcon,
  PencilAltIcon,
} from '@patternfly/react-icons';
import './APIs.css';

// Sample API data
const initialApiData = [
  { 
    name: 'Airport information', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Flight ticket information API for users to get flight details', 
    tags: ['Ticket'], 
    starred: false 
  },
  { 
    name: 'Flight-payment-api', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'API for flight payment processing and transactions', 
    tags: ['Payment'], 
    starred: false 
  },
  { 
    name: 'Aircraft-app-api', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft application data and maintenance information', 
    tags: ['Aircraft'], 
    starred: false 
  },
  { 
    name: 'Client-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'API of client data management and customer information', 
    tags: ['Client'], 
    starred: false 
  },
  { 
    name: 'Aircraft-region-api', 
    type: 'openapi', 
    owner: 'Aircraft Team', 
    lifecycle: 'production', 
    description: 'Aircraft type in different regions with location data', 
    tags: ['Aircraft'], 
    starred: false 
  },
  { 
    name: 'Booking-management-api', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Comprehensive booking management and reservation system', 
    tags: ['Ticket'], 
    starred: false 
  },
  { 
    name: 'Loyalty-program-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Customer loyalty points and rewards program management', 
    tags: ['Client'], 
    starred: false 
  },
  { 
    name: 'Payment-processing-api', 
    type: 'openapi', 
    owner: 'Payment Team', 
    lifecycle: 'production', 
    description: 'Secure payment processing and transaction handling', 
    tags: ['Payment'], 
    starred: false 
  },
  { 
    name: 'Flight-status-api', 
    type: 'openapi', 
    owner: 'Ticket Team', 
    lifecycle: 'production', 
    description: 'Real-time flight status updates and schedule information', 
    tags: ['Ticket'], 
    starred: false 
  },
  { 
    name: 'Client-registration-api', 
    type: 'openapi', 
    owner: 'Client Team', 
    lifecycle: 'production', 
    description: 'Client account registration and profile management', 
    tags: ['Client'], 
    starred: false 
  },
];

const APIs: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [apiData, setApiData] = React.useState(initialApiData);
  const [selectedType, setSelectedType] = React.useState('All');
  const [selectedPersonalFilter, setSelectedPersonalFilter] = React.useState('');
  const [selectedOwner, setSelectedOwner] = React.useState('All');
  const [selectedLifecycle, setSelectedLifecycle] = React.useState('All');
  const [selectedTag, setSelectedTag] = React.useState('All');
  
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
      // Stay on current page
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

  const ownedCount = apiData.filter(api => api.name.includes('Aircraft') || api.name.includes('payment')).length;
  const starredCount = apiData.filter(api => api.starred).length;

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#151515' }}>RHCL Dev Portal</span>
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
              UXD PROTOTYPE
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
            <NavItem itemId="home" icon={<HomeIcon />}>
              Home
            </NavItem>
            <NavItem itemId="catalog" icon={<ArchiveIcon />}>
              Catalog
            </NavItem>
            <NavItem itemId="apis" isActive icon={<CogIcon />}>
              APIs
            </NavItem>
            <NavItem itemId="docs" icon={<FileAltIcon />}>
              Docs
            </NavItem>
            <NavItem itemId="learning" icon={<GraduationCapIcon />}>
              Learning Paths
            </NavItem>
            <NavItem itemId="self-service" icon={<PlusCircleIcon />}>
              Self-service
            </NavItem>
            <Divider />
            <NavItem itemId="dev-portal" icon={<CodeIcon />}>
              Developer portal
            </NavItem>
            {currentRole === 'API owner' && (
              <NavItem itemId="policies" icon={<ShieldAltIcon />}>
                Policies
              </NavItem>
            )}
            <Divider />
            <NavItem itemId="administration" icon={<ExclamationCircleIcon />}>
              Administration
            </NavItem>
            <NavItem itemId="settings" icon={<CogIcon />}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
              APIs
            </Title>
            <p style={{ fontSize: '14px', color: '#6a6e73', margin: 0 }}>
              Available APIs in organization for developers to browse discover, register and test
            </p>
          </div>
          <Button variant="primary">Register Existing API</Button>
        </div>

        <Grid hasGutter>
          {/* Left Sidebar - Filters */}
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '16px' }}>Type</Title>
              <Select
                value={selectedType}
                onSelect={(_, selection) => setSelectedType(String(selection))}
                style={{ width: '100%', marginBottom: '24px' }}
              >
                <SelectOption value="All">All</SelectOption>
                <SelectOption value="openapi">OpenAPI</SelectOption>
                <SelectOption value="graphql">GraphQL</SelectOption>
                <SelectOption value="rest">REST</SelectOption>
              </Select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Personal</Title>
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: selectedPersonalFilter === 'owned' ? '#fff' : 'transparent',
                    border: selectedPersonalFilter === 'owned' ? '2px solid #0066CC' : '1px solid transparent',
                    cursor: 'pointer',
                    marginBottom: '4px'
                  }}
                  onClick={() => setSelectedPersonalFilter(selectedPersonalFilter === 'owned' ? '' : 'owned')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CogIcon style={{ fontSize: '16px' }} />
                    <span>Owned</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 'auto' }}>{ownedCount}</span>
                  </div>
                </div>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: selectedPersonalFilter === 'starred' ? '#fff' : 'transparent',
                    border: selectedPersonalFilter === 'starred' ? '2px solid #0066CC' : '1px solid transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPersonalFilter(selectedPersonalFilter === 'starred' ? '' : 'starred')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarIcon style={{ fontSize: '16px' }} />
                    <span>Starred</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 'auto' }}>{starredCount}</span>
                  </div>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '16px', marginTop: '16px' }}>My Org</Title>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>All</span>
                  <span style={{ fontWeight: 'bold', marginLeft: 'auto' }}>600</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '16px' }}>Owner</Title>
              <Select
                value={selectedOwner}
                onSelect={(_, selection) => setSelectedOwner(String(selection))}
                style={{ width: '100%', marginBottom: '24px' }}
              >
                <SelectOption value="All">All</SelectOption>
                <SelectOption value="Ticket Team">Ticket Team</SelectOption>
                <SelectOption value="Payment Team">Payment Team</SelectOption>
                <SelectOption value="Aircraft Team">Aircraft Team</SelectOption>
                <SelectOption value="Client Team">Client Team</SelectOption>
              </Select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '16px' }}>Lifecycle</Title>
              <Select
                value={selectedLifecycle}
                onSelect={(_, selection) => setSelectedLifecycle(String(selection))}
                style={{ width: '100%', marginBottom: '24px' }}
              >
                <SelectOption value="All">All</SelectOption>
                <SelectOption value="production">Production</SelectOption>
                <SelectOption value="development">Development</SelectOption>
                <SelectOption value="deprecated">Deprecated</SelectOption>
              </Select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '16px' }}>Tags</Title>
              <Select
                value={selectedTag}
                onSelect={(_, selection) => setSelectedTag(String(selection))}
                style={{ width: '100%' }}
              >
                <SelectOption value="All">All</SelectOption>
                <SelectOption value="Ticket">Ticket</SelectOption>
                <SelectOption value="Payment">Payment</SelectOption>
                <SelectOption value="Aircraft">Aircraft</SelectOption>
                <SelectOption value="Client">Client</SelectOption>
              </Select>
            </div>
          </GridItem>

          {/* Right Content - API Table */}
          <GridItem span={9}>
            <Card>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Title headingLevel="h2" size="lg" style={{ marginBottom: 0 }}>
                    APIs
                  </Title>
                  <SearchInput
                    placeholder="Search"
                    value={searchValue}
                    onChange={(_, value) => setSearchValue(value)}
                    onClear={() => setSearchValue('')}
                    style={{ width: '250px' }}
                  />
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Owner</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Lifecycle</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Description</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Tags</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.map((api, idx) => (
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
                        <td style={{ padding: '12px' }}>{api.type}</td>
                        <td style={{ padding: '12px' }}>{api.owner}</td>
                        <td style={{ padding: '12px' }}>{api.lifecycle}</td>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#6a6e73', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {api.description}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {api.tags && api.tags.map((tag, tagIdx) => (
                            <Badge key={tagIdx} isRead style={{ marginRight: '4px' }}>
                              {tag}
                            </Badge>
                          ))}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Button variant="plain" aria-label="View">
                              <ExternalLinkAltIcon style={{ fontSize: '16px' }} />
                            </Button>
                            <Button variant="plain" aria-label="Edit">
                              <PencilAltIcon style={{ fontSize: '16px' }} />
                            </Button>
                            <Button variant="plain" aria-label="Star" onClick={() => handleStarClick(api.name)}>
                              <StarIcon style={{ fontSize: '16px', fill: api.starred ? '#0066CC' : 'inherit' }} />
                            </Button>
                          </div>
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
