import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RedLogo from '@app/bgimages/RedLogo.svg';
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
  Label,
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
  AngleLeftIcon,
  StarIcon,
  PencilAltIcon,
  EditIcon,
  CodeBranchIcon,
  UsersIcon,
  CopyIcon,
  CheckCircleIcon,
} from '@patternfly/react-icons';
import './Policies.css';

// Policy details data
const policyDetailsData: Record<string, any> = {
  'Standard plan': {
    name: 'Standard plan',
    state: 'Active',
    type: 'Plan policy',
    apiProduct: 'Get flight tickets API',
    owner: 'John doe',
    lifecycle: 'production',
    description: 'This line is the description for the policy. Validated aggregated stream activity fact table, used for metrics.',
    configurations: [
      {
        tier: 'Gold plan',
        auth: 'API key',
        rateLimit: '200 reqs/day; 1k reqs/week; 5k reqs/month;',
      },
    ],
  },
  'Advanced plan': {
    name: 'Advanced plan',
    state: 'Active',
    type: 'Plan policy',
    apiProduct: 'Get Flights tickets',
    owner: 'Policy Team',
    lifecycle: 'production',
    description: 'Advanced plan policy with higher rate limits and additional features.',
    configurations: [
      {
        tier: 'Platinum plan',
        auth: 'API key',
        rateLimit: '500 reqs/day; 2k reqs/week; 10k reqs/month;',
      },
    ],
  },
  'Free plan': {
    name: 'Free plan',
    state: 'Active',
    type: 'Plan policy',
    apiProduct: 'Create Booking',
    owner: 'Policy Team',
    lifecycle: 'production',
    description: 'Free tier policy with basic access and rate limits.',
    configurations: [
      {
        tier: 'Silver plan',
        auth: 'API key',
        rateLimit: '100 reqs/day; 500 reqs/week; 3k reqs/month;',
      },
    ],
  },
};

const PolicyDetails: React.FunctionComponent = () => {
  const { policyName } = useParams<{ policyName: string }>();
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isStarred, setIsStarred] = React.useState(false);
  
  const getCurrentRole = (): string => {
    try {
      const role = localStorage.getItem('currentRole');
      return role || 'API consumer';
    } catch {
      return 'API consumer';
    }
  };
  
  const [currentRole, setCurrentRole] = React.useState(getCurrentRole());

  const decodedPolicyName = policyName ? decodeURIComponent(policyName) : '';
  const policyDetails = decodedPolicyName && policyDetailsData[decodedPolicyName] 
    ? policyDetailsData[decodedPolicyName] 
    : policyDetailsData['Standard plan'];

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, tabKey: string | number) => {
    setActiveTab(Number(tabKey));
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
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'policies') {
      navigate('/policies');
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

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span dangerouslySetInnerHTML={{ __html: RedLogo }} />
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
            <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
              API portal
            </NavItem>
            {currentRole === 'API owner' && (
              <NavItem itemId="policies" isActive icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
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
            <Button variant="link" isInline onClick={() => navigate('/policies')}>
              Policies
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>{policyDetails.name}</BreadcrumbItem>
        </Breadcrumb>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <Title headingLevel="h1" size="2xl">
            {policyDetails.name}
          </Title>
          <Button variant="plain" aria-label="Star" onClick={handleStarClick}>
            <StarIcon style={{ fill: isStarred ? '#0066CC' : 'inherit' }} />
          </Button>
          <Label color="green">{policyDetails.state}</Label>
        </div>

        <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
          <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>YAML</TabTitleText>} />
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

                    <DescriptionList style={{ marginBottom: '24px' }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>DESCRIPTION</DescriptionListTerm>
                        <DescriptionListDescription style={{ fontSize: '14px', color: '#151515', marginTop: '8px' }}>
                          {policyDetails.description}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      
                      <DescriptionListGroup>
                        <DescriptionListTerm>OWNER</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button variant="link" isInline>{policyDetails.owner}</Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>TYPE</DescriptionListTerm>
                        <DescriptionListDescription>{policyDetails.type}</DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>LIFECYCLE</DescriptionListTerm>
                        <DescriptionListDescription>{policyDetails.lifecycle}</DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>ASSOCIATION</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button variant="link" isInline>{policyDetails.apiProduct}</Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>UPDATED</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#67b350' }}></div>
                            <span>2 MIN AGO</span>
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
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
                        <UsersIcon style={{ fontSize: '24px', color: '#0066CC', marginBottom: '8px' }} />
                        <div style={{ fontSize: '12px' }}>{policyDetails.owner}</div>
                      </div>
                      <div style={{ 
                        width: '60px', 
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
                        }}>Own of</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FileAltIcon style={{ fontSize: '24px', color: '#0066CC', marginBottom: '8px' }} />
                        <div style={{ fontSize: '12px' }}>{policyDetails.name}</div>
                      </div>
                      <div style={{ 
                        width: '60px', 
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
                        }}>Associates to</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FileAltIcon style={{ fontSize: '24px', color: '#0066CC', marginBottom: '8px' }} />
                        <div style={{ fontSize: '12px' }}>{policyDetails.apiProduct}</div>
                      </div>
                    </div>
                    <Button variant="link" isInline>View Graph →</Button>
                  </CardBody>
                </Card>
              </GridItem>

              {/* Right Column - Empty for now */}
              <GridItem span={6}>
              </GridItem>
            </Grid>

            {/* Configurations Section */}
            <Card style={{ marginTop: '24px' }}>
              <CardBody>
                <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>Configurations</Title>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Tier</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Auth</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Rate limit</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policyDetails.configurations && policyDetails.configurations.map((config: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                        <td style={{ padding: '12px' }}>
                          <Button variant="link" isInline>{config.tier}</Button>
                        </td>
                        <td style={{ padding: '12px' }}>{config.auth}</td>
                        <td style={{ padding: '12px' }}>{config.rateLimit}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Button variant="plain" aria-label="Star">
                              <StarIcon style={{ fontSize: '16px' }} />
                            </Button>
                            <Button variant="plain" aria-label="Edit">
                              <PencilAltIcon style={{ fontSize: '16px' }} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </>
        )}

        {activeTab === 1 && (
          <Card>
            <CardBody>
              <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>
                YAML View
              </Title>
              <pre style={{ backgroundColor: '#2d2d2d', color: '#d4d4d4', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
                {`apiVersion: policy.example.com/v1
kind: Policy
metadata:
  name: ${policyDetails.name}
  type: ${policyDetails.type}
spec:
  lifecycle: ${policyDetails.lifecycle}
  owner: ${policyDetails.owner}
  configurations:
    - tier: ${policyDetails.configurations[0]?.tier}
      auth: ${policyDetails.configurations[0]?.auth}
      rateLimit: "${policyDetails.configurations[0]?.rateLimit}"
`}
              </pre>
            </CardBody>
          </Card>
        )}
      </PageSection>
    </Page>
  );
};

export default PolicyDetails;

