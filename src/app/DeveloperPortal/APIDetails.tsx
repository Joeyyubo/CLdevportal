import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Nav,
  NavList,
  NavItem,
  PageSection,
  Divider,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  SearchInput,
  Title,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  ActionGroup,
  Alert,
  AlertActionLink,
  Tooltip,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TextInput,
  TextArea,
  FormGroup,
} from '@patternfly/react-core';
import {
  UserIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  StarIcon,
  PencilAltIcon,
  EditIcon,
  CodeBranchIcon,
  UsersIcon,
  CodeIcon,
  ShareAltIcon,
  ExternalLinkAltIcon,
  ExclamationTriangleIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// API details data
const apiDetailsData: Record<string, any> = {
  'Get Flights tickets': {
    name: 'Get Flights tickets',
    tag: 'Ticket',
    contact: 'Jane doe',
    owner: 'Ticket team',
    description: 'Description of the API. Validated aggregated stream activity fact table, used for metrics.',
    lifecycle: 'production',
    updated: '2 MIN AGO',
  },
  'Get Booking Details': {
    name: 'Get Booking Details',
    tag: 'Payment',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Retrieve detailed information about flight bookings including passenger details and payment status.',
    lifecycle: 'production',
    updated: '15 MIN AGO',
  },
  'Create Booking': {
    name: 'Create Booking',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Create a new flight booking with passenger and payment information.',
    lifecycle: 'production',
    updated: '1 HOUR AGO',
  },
  'Get Aircraft Details': {
    name: 'Get Aircraft Details',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Retrieve detailed information about aircraft including model, capacity, and technical specifications.',
    lifecycle: 'production',
    updated: '3 HOURS AGO',
  },
  'Get Aircraft Model Info': {
    name: 'Get Aircraft Model Info',
    tag: 'Aircraft',
    contact: 'Aircraft Team',
    owner: 'Aircraft team',
    description: 'Access comprehensive aircraft model information and specifications.',
    lifecycle: 'production',
    updated: '5 HOURS AGO',
  },
  'Get Flight Status': {
    name: 'Get Flight Status',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Check real-time flight status including delays, cancellations, and gate changes.',
    lifecycle: 'production',
    updated: '1 DAY AGO',
  },
  'Register Client': {
    name: 'Register Client',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Register a new client account with personal and contact information.',
    lifecycle: 'production',
    updated: '2 DAYS AGO',
  },
  'List My Bookings': {
    name: 'List My Bookings',
    tag: 'Ticket',
    contact: 'Ticket Team',
    owner: 'Ticket team',
    description: 'Retrieve a list of all bookings for the authenticated user.',
    lifecycle: 'production',
    updated: '3 DAYS AGO',
  },
  'Get Loyalty Info': {
    name: 'Get Loyalty Info',
    tag: 'Client',
    contact: 'Client Team',
    owner: 'Client team',
    description: 'Access loyalty program information including points, tier status, and rewards.',
    lifecycle: 'production',
    updated: '4 DAYS AGO',
  },
  'Get Payment Status': {
    name: 'Get Payment Status',
    tag: 'Payment',
    contact: 'Payment Team',
    owner: 'Payment team',
    description: 'Check the payment status of transactions and bookings.',
    lifecycle: 'production',
    updated: '5 DAYS AGO',
  },
};

const APIDetails: React.FunctionComponent = () => {
  const { apiName } = useParams<{ apiName: string }>();
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState('API consumer');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState('Personal key');
  const [apiKeyPlan, setApiKeyPlan] = React.useState('Silver plan (100 reqs/day; 500reqs/week; 3000reqs/month)');
  const [useCase, setUseCase] = React.useState('It work for my personal flight application test.');
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Decode API name from URL and get details
  const decodedApiName = apiName ? decodeURIComponent(apiName) : '';
  const apiDetails = decodedApiName && apiDetailsData[decodedApiName] 
    ? apiDetailsData[decodedApiName] 
    : apiDetailsData['Get Flights tickets'];

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    setActiveTab(typeof eventKey === 'number' ? eventKey : 0);
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownSelect = (role: string) => {
    setCurrentRole(role);
    setIsUserDropdownOpen(false);
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
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
                Developer portal
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button variant="link" isInline>
                APIs
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Title headingLevel="h1" size="2xl">
              {apiDetails.name}
            </Title>
            <Button variant="plain" aria-label="Star">
              <StarIcon style={{ fill: '#0066CC' }} />
            </Button>
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>Definition</TabTitleText>} />
            <Tab eventKey={2} title={<TabTitleText>Policy</TabTitleText>} />
          </Tabs>

          {activeTab === 0 && (
            <>
              <Grid hasGutter>
          <GridItem span={6}>
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
                    VIEW TECHDOCS
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

                <DescriptionList columnModifier={{ default: '1Col', md: '2Col' }}>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Description</DescriptionListTerm>
                    <DescriptionListDescription>{apiDetails.description}</DescriptionListDescription>
                  </DescriptionListGroup>
                  
                  <DescriptionListGroup>
                    <DescriptionListTerm>Owner</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Button variant="link" isInline icon={<UsersIcon />}>
                        {apiDetails.owner}
                      </Button>
                    </DescriptionListDescription>
                  </DescriptionListGroup>

                  <DescriptionListGroup>
                    <DescriptionListTerm>Type</DescriptionListTerm>
                    <DescriptionListDescription>openapi</DescriptionListDescription>
                  </DescriptionListGroup>

                  <DescriptionListGroup>
                    <DescriptionListTerm>Lifecycle</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Badge isRead>{apiDetails.lifecycle}</Badge>
                    </DescriptionListDescription>
                  </DescriptionListGroup>

                  <DescriptionListGroup>
                    <DescriptionListTerm>Tags</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Badge isRead>{apiDetails.tag}</Badge>
                    </DescriptionListDescription>
                  </DescriptionListGroup>

                  <DescriptionListGroup>
                    <DescriptionListTerm>Updated</DescriptionListTerm>
                    <DescriptionListDescription>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#67b350' }}></div>
                        {apiDetails.updated}
                      </div>
                    </DescriptionListDescription>
                  </DescriptionListGroup>

                  <DescriptionListGroup>
                    <DescriptionListTerm>API key request</DescriptionListTerm>
                    <DescriptionListDescription>No approval needed</DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={6}>
            <Card style={{ height: '100%' }}>
              <CardBody>
                <Title headingLevel="h3" size="lg" style={{ marginBottom: '24px' }}>Relations</Title>
                
                <svg width="100%" height="200" style={{ padding: '20px' }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#0066CC" />
                    </marker>
                  </defs>
                  
                  {/* Connection lines */}
                  <line x1="120" y1="90" x2="220" y2="90" stroke="#0066CC" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="320" y1="90" x2="400" y2="90" stroke="#0066CC" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  
                  {/* Ticket team node */}
                  <g>
                    <rect x="40" y="60" width="80" height="60" rx="8" fill="#e7f1fa" stroke="#0066CC" strokeWidth="2" />
                    <foreignObject x="42" y="72" width="76" height="38">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#0066CC', fontWeight: 600 }}>Ticket team</div>
                        <div style={{ fontSize: '9px', color: '#8b8d90' }}>Team</div>
                      </div>
                    </foreignObject>
                  </g>
                  
                  {/* Flight-ticket-api node (center) */}
                  <g>
                    <rect x="220" y="60" width="100" height="60" rx="8" fill="#ffffff" stroke="#0066CC" strokeWidth="2" />
                    <foreignObject x="222" y="72" width="96" height="38">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#0066CC', fontWeight: 600 }}>Flight-ticket-api</div>
                        <div style={{ fontSize: '9px', color: '#8b8d90' }}>API</div>
                      </div>
                    </foreignObject>
                  </g>
                  
                  {/* Dev team node */}
                  <g>
                    <rect x="400" y="60" width="70" height="60" rx="8" fill="#e7f1fa" stroke="#0066CC" strokeWidth="2" />
                    <foreignObject x="402" y="72" width="66" height="38">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#0066CC', fontWeight: 600 }}>Dev team</div>
                        <div style={{ fontSize: '9px', color: '#8b8d90' }}>Team</div>
                      </div>
                    </foreignObject>
                  </g>
                </svg>
                
                {/* View graph button in bottom left */}
                <div style={{ marginTop: '16px' }}>
                  <Button variant="link" isInline style={{ fontSize: '14px' }}>
                    View graph
                    <ExternalLinkAltIcon style={{ marginLeft: '6px' }} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <div style={{ marginTop: '24px' }}>
          <Card>
            <CardBody>
              <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>Providers</Title>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API owner</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>System</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Owner</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Lifecycle</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        API owner name
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <UsersIcon style={{ marginRight: '4px' }} />
                      open-banking-api-hub
                    </td>
                    <td style={{ padding: '12px' }}>
                      <UsersIcon style={{ marginRight: '4px' }} />
                      Security Team
                    </td>
                    <td style={{ padding: '12px' }}>service</td>
                    <td style={{ padding: '12px' }}>production</td>
                    <td style={{ padding: '12px', color: '#6a6e73' }}>API that provides authorized third...</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        </>
        )}

        {activeTab === 1 && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d0d0d0' }}>
            {/* Swagger Header */}
            <div style={{ backgroundColor: '#3b4151', padding: '20px', color: 'white', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ margin: 0, marginBottom: '8px', fontSize: '28px', fontWeight: 'bold' }}>Get flight tickets</h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>1.0.0</Badge>
                    <Badge style={{ backgroundColor: '#89bf04', color: 'white' }}>OAS 3.1</Badge>
                  </div>
                </div>
                <Button variant="primary" style={{ backgroundColor: '#007bff', border: 'none' }} onClick={() => setIsGenerateModalOpen(true)}>Generate API key</Button>
              </div>
            </div>

            {/* Swagger Info Section */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold' }}>Get Flight tickets</h3>
              <p style={{ margin: 0, fontSize: '16px', color: '#6a6e73' }}>
                Flight ticket information API for authorized team to access Flight ticket information of Smart Airline.
              </p>
            </div>

            {/* Servers Section - Swagger Style */}
            <div style={{ padding: '20px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#f7f7f7' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Servers</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #d0d0d0' }}>
                <select style={{ flex: 1, padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', fontSize: '14px' }}>
                  <option>https://Smartairline.com/flightapi/v1-Production</option>
                </select>
                <Button variant="secondary" style={{ backgroundColor: '#89bf04', color: 'white', border: 'none' }}>
                  <ShieldAltIcon style={{ marginRight: '4px' }} />
                  Authorize
                </Button>
              </div>
            </div>

              {/* Endpoints Section - Swagger Style */}
              <div>
                <div style={{ padding: '15px 20px', backgroundColor: '#41444e', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                  Endpoints
                </div>
                
              {/* POST /flight/status */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
                  <span style={{ 
                    backgroundColor: '#49cc90', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>POST</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/status</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Create flights status</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#6a6e73' }}>▼</span>
                  </div>
                </div>
              </div>

              {/* GET /flight time */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight time</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get flights time</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#6a6e73' }}>▼</span>
                  </div>
                </div>
              </div>

              {/* GET /flight/{flightid} */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/{'{flightid}'}</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get flights id</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#6a6e73' }}>▼</span>
                  </div>
                </div>
              </div>

              {/* GET /flight/{region} */}
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
                  <span style={{ 
                    backgroundColor: '#61affe', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '4px 12px', 
                    borderRadius: '3px', 
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                    marginRight: '16px'
                  }}>GET</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0066CC' }}>/flight/{'{region}'}</span>
                  <span style={{ marginLeft: '16px', color: '#6a6e73', fontSize: '14px' }}>Get region</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#6a6e73' }}>▼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schemas Section - Swagger Style */}
            <div style={{ borderTop: '1px solid #d0d0d0' }}>
              <div style={{ padding: '15px 20px', backgroundColor: '#41444e', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                Schemas
              </div>
              
              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>FlightRequest</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #d0d0d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>FlightResponse</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #d0d0d0', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', cursor: 'pointer', borderLeft: '3px solid #89bf04' }}>
                  <span style={{ fontSize: '16px', marginRight: '12px', color: '#89bf04' }}>›</span>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#3b4151' }}>Region</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#6a6e73', fontSize: '14px' }}>Expand all</span>
                    <Button variant="link" isInline style={{ fontSize: '14px' }}>
                      object
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <Card>
            <CardBody>
              <Title headingLevel="h3" size="lg" style={{ marginBottom: '24px' }}>Policy</Title>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>plans</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Standard plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        <div>Dev-silver: 100 reqs/day; 5k reqs/week; 10k reqs/month;</div>
                        <div>Dev-gold: 200 reqs/day; 10k reqs/week; 20k reqs/month;</div>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Advanced plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        Sale team: 1k reqs/day; 50k reqs/week; 300k reqs/month;
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                    <td style={{ padding: '12px' }}>
                      <Button variant="link" isInline>
                        Free plan
                      </Button>
                    </td>
                    <td style={{ padding: '12px' }}>Plan Policy</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '14px' }}>
                        All team: 200 reqs/day; 5k reqs/week; 20k reqs/month;
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        )}
        </PageSection>
      </Page>

      {/* Generate API Key Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        variant="medium"
        style={{ '--pf-v6-c-backdrop--BackgroundColor': 'rgba(8, 9, 10, 0.85)' }}
      >
        <ModalHeader title="Generate API key" />
        <ModalBody>
          <p style={{ marginBottom: '24px', fontSize: '14px', color: '#6a6e73' }}>Create API credential to use the API.</p>
          
          <FormGroup label="API" isRequired fieldId="api-name" style={{ marginBottom: '16px' }}>
            <TextInput
              id="api-name"
              value={apiDetails.name}
              isReadOnly
            />
          </FormGroup>

          <FormGroup label="API plan" isRequired fieldId="api-plan" style={{ marginBottom: '16px' }}>
            <select 
              id="api-plan"
              value={apiKeyPlan}
              onChange={(e) => setApiKeyPlan(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                lineHeight: '1.5',
                border: '1px solid #8b8d90',
                borderRadius: '4px',
                minHeight: '36px'
              }}
            >
              <option>Silver plan (100 reqs/day; 500reqs/week; 3000reqs/month)</option>
              <option>Gold plan (200 reqs/day; 1000reqs/week; 6000reqs/month)</option>
              <option>Platinum plan (500 reqs/day; 2000reqs/week; 10000reqs/month)</option>
            </select>
          </FormGroup>

          <FormGroup label="Name" isRequired fieldId="key-name" style={{ marginBottom: '16px' }}>
            <TextInput
              id="key-name"
              value={apiKeyName}
              onChange={(_, value) => setApiKeyName(value)}
            />
          </FormGroup>

          <FormGroup label="Use case & Description" fieldId="use-case">
            <TextArea
              id="use-case"
              value={useCase}
              onChange={(_, value) => setUseCase(value)}
              rows={4}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsGenerateModalOpen(false)} variant="secondary">Cancel</Button>
          <Button onClick={() => {
            // Handle generate API key
            setIsGenerateModalOpen(false);
          }} variant="primary">Generate</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export { APIDetails };

