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
  AngleLeftIcon,
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
} from '@patternfly/react-icons';
import './APIs.css';

// API details data for APIs module
const apiDetailsData: Record<string, any> = {
  'Get Flights tickets': {
    name: 'Get Flights tickets',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Flight ticket information API for users to get flight details',
    version: 'v1.1',
    endpoints: ['GET /flights', 'GET /flights/:id'],
    tags: ['Ticket'],
    provider: {
      name: 'Get Flights tickets',
      system: 'airline-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Get Booking Details': {
    name: 'Get Booking Details',
    type: 'openapi',
    owner: 'Payment Team',
    lifecycle: 'production',
    description: 'API for flight payment processing and transactions',
    version: 'v1.1',
    endpoints: ['GET /booking/:id', 'POST /booking'],
    tags: ['Payment'],
    provider: {
      name: 'Get Booking Details',
      system: 'booking-system',
      owner: 'Payment Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Create Booking': {
    name: 'Create Booking',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Aircraft application data and maintenance information',
    version: 'v1.1',
    endpoints: ['POST /booking', 'PUT /booking/:id'],
    tags: ['Aircraft'],
    provider: {
      name: 'Create Booking',
      system: 'booking-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Airport information': {
    name: 'Airport information',
    type: 'openapi',
    owner: 'Ticket Team',
    lifecycle: 'production',
    description: 'Flight ticket information API for users to get flight details',
    version: 'v1.1',
    endpoints: ['GET /airports', 'GET /airports/:id'],
    tags: ['Ticket'],
    provider: {
      name: 'Airport information',
      system: 'airline-system',
      owner: 'Ticket Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Flight-payment-api': {
    name: 'Flight-payment-api',
    type: 'openapi',
    owner: 'Payment Team',
    lifecycle: 'production',
    description: 'API for flight payment processing and transactions',
    version: 'v1.1',
    endpoints: ['POST /payment', 'GET /payment/:id'],
    tags: ['Payment'],
    provider: {
      name: 'Flight-payment-api',
      system: 'payment-system',
      owner: 'Payment Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
  'Aircraft-app-api': {
    name: 'Aircraft-app-api',
    type: 'openapi',
    owner: 'Aircraft Team',
    lifecycle: 'production',
    description: 'Aircraft application data and maintenance information',
    version: 'v1.1',
    endpoints: ['GET /aircraft', 'POST /aircraft'],
    tags: ['Aircraft'],
    provider: {
      name: 'Aircraft-app-api',
      system: 'aircraft-system',
      owner: 'Aircraft Team',
      type: 'service',
      lifecycle: 'production',
    },
    consumers: [],
  },
};

const APIDetailsPage: React.FunctionComponent = () => {
  const { apiName } = useParams<{ apiName: string }>();
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isStarred, setIsStarred] = React.useState(false);
  const [expandedEndpoints, setExpandedEndpoints] = React.useState<Record<string, boolean>>({});
  
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
    : apiDetailsData['Get Flights tickets'];

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
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/apis');
    } else {
      navigate('/developer-portal');
    }
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button variant="plain" onClick={() => navigate('/apis')} style={{ padding: '4px', marginRight: '8px' }}>
              <AngleLeftIcon />
            </Button>
            <img src="@app/bgimages/RedLogo.svg" alt="Logo" width="40" height="40" style={{ display: 'block' }} />
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
      </PageSection>
    </Page>
  );
};

export default APIDetailsPage;

