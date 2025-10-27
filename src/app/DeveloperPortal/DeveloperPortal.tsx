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
  CodeIcon,
  ExclamationTriangleIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Initial API data
const initialApiData = [
  { name: 'Get Flights tickets', version: 'v1.1', contact: 'Jane doe', tag: 'Ticket', starred: true, owned: false },
  { name: 'Get Booking Details', version: 'v1.1', contact: 'Ticket Team', tag: 'Payment', starred: true, owned: false },
  { name: 'Create Booking', version: 'v1.1', contact: 'Ticket Team', tag: 'Ticket', starred: false, owned: false },
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
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('Starred'); // 'Owned', 'Starred', 'All'
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const [apiData, setApiData] = React.useState(initialApiData);
  const [currentRole, setCurrentRole] = React.useState('API consumer');

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    setActiveTab(typeof eventKey === 'number' ? eventKey : 0);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownSelect = (role: string) => {
    setCurrentRole(role);
    setIsUserDropdownOpen(false);
    // Focus will be returned to the toggle button
    userToggleRef.current?.focus();
  };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else {
      // For now, navigate to developer portal for other items
      navigate('/developer-portal');
    }
  };

  const handleStarClick = (apiName: string) => {
    setApiData(prevData => {
      return prevData.map(api => 
        api.name === apiName ? { ...api, starred: !api.starred } : api
      );
    });
  };

  // Calculate counts
  const starredCount = apiData.filter(api => api.starred).length;
  const ownedCount = apiData.filter(api => api.owned).length;
  const totalCount = apiData.length;

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#151515' }}>RHCL Dev Portal</span>
          </div>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
            <Dropdown
              isOpen={isUserDropdownOpen}
              onSelect={(_, value) => handleUserDropdownSelect(String(value))}
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
            <NavItem itemId="apis" icon={<CogIcon />}>
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
            <NavItem itemId="dev-portal" isActive icon={<CodeIcon />}>
              Developer portal
            </NavItem>
            <NavItem itemId="policies" icon={<ShieldAltIcon />}>
              Policies
            </NavItem>
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
    <>
      <div style={{ 
        backgroundColor: '#8b47ac', 
        color: 'white', 
        padding: '6px 0', 
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontSize: '14px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>UXD PROTOTYPE</span>
          <Tooltip content="This prototype demonstrates the RHCL dev portal and policy management features for 1.3. Not all features and interactions are fully represented and this does not represent a commitment on the part of Red Hat.">
            <Button variant="plain" style={{ color: 'white', padding: 0, minWidth: 'auto' }}>
              <ExclamationTriangleIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            Developer Portal
          </Title>
          <Tabs activeKey={activeTab} onSelect={handleTabClick} aria-label="Developer portal tabs" style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>APIs</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>API keys</TabTitleText>} />
            <Tab eventKey={2} title={<TabTitleText>Observability</TabTitleText>} />
          </Tabs>
        </div>

        <Grid hasGutter style={{ marginBottom: '24px' }}>
          <GridItem span={3}>
            <SearchInput
              placeholder="Search APIs..."
              value={searchValue}
              onChange={(_, value) => setSearchValue(value)}
              style={{ width: '100%' }}
            />
          </GridItem>
          <GridItem span={9}>
            {currentRole === 'API owner' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary">Create API product</Button>
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
                    border: selectedFilter === 'Owned' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: ownedCount === 0 ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    opacity: ownedCount === 0 ? 0.6 : 1
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
                    border: selectedFilter === 'Starred' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left'
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
                    border: selectedFilter === 'All' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left'
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
                  APIs ({filteredApiData.length})
                </Title>
                <Table variant="compact">
                <Thead>
                  <Tr>
                    {columns.map((column, idx) => (
                      <Th key={idx}>{column}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredApiData.map((api, idx) => (
                    <Tr key={idx}>
                      <Td>
                        <Button variant="link" isInline onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(api.name)}`)}>
                          {api.name}
                        </Button>
                      </Td>
                      <Td>{api.version}</Td>
                      <Td>{api.contact}</Td>
                      <Td>
                        <Badge isRead>{api.tag}</Badge>
                      </Td>
                      <Td>
                        <Button variant="plain" aria-label="Star" onClick={() => handleStarClick(api.name)}>
                          <StarIcon style={{ fill: api.starred ? '#0066CC' : 'inherit' }} />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
      </Page>
    </>
  );
};

export { DeveloperPortal };