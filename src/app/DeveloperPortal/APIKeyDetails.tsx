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
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Sample API key details data
const apiKeyDetailsData: Record<string, any> = {
  'personal keys': {
    name: 'Personal key',
    status: 'Active',
    description: 'It work for my personal flight application test.',
    apiKey: 'cbjNd-nvMqT',
    apiName: 'Get Flights tickets',
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
    apiName: 'Create Booking',
    plan: 'Platinum plan: 1000 reqs/day; 5000 reqs/week; 30000 reqs/month;',
    lastUsed: 'OCT 30,2025 AT 10:15AM',
    apiUrl: 'https://api.example.com/v1/create booking',
  },
  'dev test keys': {
    name: 'Dev test keys',
    status: 'Active',
    description: 'Testing key for development team.',
    apiKey: 'vt9Dz-taKWW',
    apiName: 'Get Booking Details',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'NOV 01,2025 AT 08:45AM',
    apiUrl: 'https://api.example.com/v1/get booking details',
  },
  'Dev test keys': {
    name: 'Dev test keys',
    status: 'Active',
    description: 'Testing key for development team.',
    apiKey: 'vt9Dz-taKWW',
    apiName: 'Get Booking Details',
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
    status: 'Expired',
    description: 'Production environment API key.',
    apiKey: '',
    apiName: 'Create Booking',
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
    apiName: 'Get Flights tickets',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAY 10,2027 AT 09:30AM',
    apiUrl: 'https://api.example.com/v1/get flight tickets/post',
  },
  'test-Key_1': {
    name: 'test-Key_1',
    status: 'Active',
    description: 'Testing key.',
    apiKey: '',
    apiName: 'Get Booking Details',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    lastUsed: 'MAY 11,2028 AT 11:45AM',
    apiUrl: 'https://api.example.com/v1/get booking details',
  },
  'learn-Key_2': {
    name: 'learn-Key_2',
    status: 'Active',
    description: 'Learning key.',
    apiKey: 'XyVwB-8qLsT',
    apiName: 'Create Booking',
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
    apiName: 'Get Flights tickets',
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('Gold plan (1000 reqs/day, 5000 reqs/week; 30000 reqs/month)');
  const [showUpdateSuccess, setShowUpdateSuccess] = React.useState(false);
  const [updatedPlan, setUpdatedPlan] = React.useState<string>('');
  const [lastSelectedPlan, setLastSelectedPlan] = React.useState<string>('');

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

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    setActiveTab(tabKey);
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

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyApiKey = () => {
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="10" rx="10" ry="6" fill="#CC0000"/>
              <ellipse cx="16" cy="14" rx="12" ry="8" fill="#CC0000"/>
              <ellipse cx="16" cy="22" rx="8" ry="1" fill="#CC0000"/>
            </svg>
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
          <Button variant="plain" aria-label="Help" style={{ color: '#151515' }}>
            <HelpIcon />
          </Button>
          <Button variant="plain" aria-label="Notifications" style={{ color: '#151515' }}>
            <BellIcon />
          </Button>
          <Button variant="plain" aria-label="User" style={{ color: '#151515' }}>
            <UserIcon />
          </Button>
        </div>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="API portal navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
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
              API portal
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
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
                API portal
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal#api-keys')}>
                API keys
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Title headingLevel="h1" size="2xl">
              {keyDetails.name}
            </Title>
            <Label
              variant="outline"
              icon={keyDetails.status === 'Active' ? <CheckCircleIcon /> : <TimesCircleIcon />}
              color={keyDetails.status === 'Active' ? 'green' : 'red'}
            >
              {keyDetails.status}
            </Label>
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>Metrics</TabTitleText>} />
            <Tab eventKey={2} title={<TabTitleText>Setting</TabTitleText>} />
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
                        <DescriptionListTerm>Name</DescriptionListTerm>
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
                        <DescriptionListTerm>API key</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#6a6e73' }}>
                              {keyDetails.apiKey}*****************
                            </span>
                            <Tooltip content={copiedApiKey ? "Copied!" : "Copy to clipboard"}>
                              <Button
                                variant="plain"
                                onClick={() => {
                                  navigator.clipboard.writeText(keyDetails.apiKey);
                                  handleCopyApiKey();
                                }}
                                style={{ padding: '4px' }}
                              >
                                <CopyIcon style={{ fontSize: '16px' }} />
                              </Button>
                            </Tooltip>
                          </div>
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

          {activeTab === 2 && (
            <div style={{ position: 'relative' }}>
              {/* Success Alert */}
              {showUpdateSuccess && (
                <div style={{ 
                  position: 'fixed',
                  top: '100px',
                  right: '24px',
                  zIndex: 200,
                  maxWidth: '500px',
                  animation: 'fadeIn 0.3s ease-in'
                }}>
                  <Alert 
                    variant="success"
                    title="API key update successfully"
                    className="no-shadow-alert"
                    isLiveRegion
                  >
                    <div style={{ marginBottom: '8px' }}>
                      <strong>{keyDetails.name}</strong> request to {lastSelectedPlan.split(' ')[0].toLowerCase()} plan has been approved by API owner.
                    </div>
                    <Button 
                      variant="link" 
                      isInline
                      onClick={() => {
                        setShowUpdateSuccess(false);
                        setActiveTab(0);
                        // Scroll to top if needed
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      View API key
                    </Button>
                  </Alert>
                </div>
              )}

              {/* API key update/reapply section */}
              <Card style={{ border: '1px solid #67b350', marginBottom: '24px' }}>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: '#67b350',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ArrowUpIcon style={{ color: 'white', fontSize: '16px' }} />
                    </div>
                    <Title headingLevel="h3" size="lg">
                      {keyDetails.status === 'Active' ? 'API key update' : 'API key reapply'}
                    </Title>
                  </div>
                  <p style={{ marginBottom: '16px', color: '#151515' }}>
                    {keyDetails.status === 'Active' 
                      ? 'Update this API key to have more quota of API usage limit.'
                      : 'Reapply for this API key to have more quota of API usage limit.'}
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setSelectedPlan('Gold plan (1000 reqs/day, 5000 reqs/week; 30000 reqs/month)');
                      setIsPlanDropdownOpen(false);
                    }}
                  >
                    {keyDetails.status === 'Active' ? 'Update' : 'Reapply'}
                  </Button>
                </CardBody>
              </Card>

              {/* Danger zone section */}
              <Card style={{ border: '1px solid #c9190b' }}>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: '#f0ab00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ExclamationTriangleIcon style={{ color: 'white', fontSize: '16px' }} />
                    </div>
                    <Title headingLevel="h3" size="lg">Danger zone</Title>
                  </div>
                  <p style={{ marginBottom: '16px', color: '#151515' }}>
                    Permanently delete this API key. This action cannot be undone and will immediately revoke access for any applications using this key.
                  </p>
                  <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete API key</Button>
                </CardBody>
              </Card>
            </div>
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
                  // Add delete logic here
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                  navigate('/developer-portal#api-keys');
                }}
                isDisabled={deleteConfirmText !== keyDetails.name}
              >
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        </PageSection>
      </Page>
    </>
  );
};

export { APIKeyDetails };

