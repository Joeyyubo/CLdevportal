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
  CodeIcon,
  UserIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ArrowRightIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
} from '@patternfly/react-core';

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
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
    try {
      localStorage.setItem('currentRole', newRole);
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
      navigate('/apis');
    } else if (itemId === 'docs') {
      navigate('/docs');
    } else if (itemId === 'learning') {
      navigate('/learning');
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'dev-portal') {
      if (currentRole === 'API consumer') {
        navigate('/developer-portal/api-keys');
      } else {
      navigate('/developer-portal');
      }
    } else if (itemId === 'api-keys') {
      navigate('/developer-portal/api-keys');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/');
    }
  };

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
            </DropdownList>
          </Dropdown>
        </div>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
          <NavList>
            <NavItem itemId="home" isActive icon={<HomeIcon />} onClick={() => handleNavClick('home')}>
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
              {currentRole !== 'API consumer' && (
                <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
                API Access
              </NavItem>
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

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection style={{ padding: '32px' }}>
        {/* Greeting Section */}
        <Title headingLevel="h1" size="2xl" style={{ marginBottom: '32px' }}>
          {getGreeting()} Alex!
        </Title>

        {/* Three Cards: Get started, Explore, Learn */}
        <Grid hasGutter style={{ marginBottom: '48px' }}>
          <GridItem span={4}>
            <Card style={{ height: '100%', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* Illustration placeholder */}
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    flexShrink: 0,
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Simple illustration representation */}
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute' }}>
                      {/* Person silhouette */}
                      <circle cx="30" cy="50" r="8" fill="#151515" />
                      <rect x="22" y="58" width="16" height="20" rx="2" fill="#CC0000" />
                      <rect x="20" y="78" width="20" height="25" rx="2" fill="#151515" />
                      {/* Brain/Network structure */}
                      <circle cx="70" cy="40" r="12" fill="none" stroke="#0066CC" strokeWidth="2" />
                      <circle cx="85" cy="55" r="8" fill="none" stroke="#0066CC" strokeWidth="2" />
                      <circle cx="75" cy="70" r="6" fill="none" stroke="#0066CC" strokeWidth="2" />
                      <line x1="70" y1="40" x2="85" y2="55" stroke="#0066CC" strokeWidth="1.5" />
                      <line x1="85" y1="55" x2="75" y2="70" stroke="#0066CC" strokeWidth="1.5" />
                      {/* Chart representation */}
                      <rect x="50" y="85" width="40" height="20" fill="#f0f0f0" stroke="#d0d0d0" />
                      <rect x="52" y="95" width="6" height="8" fill="#0066CC" />
                      <rect x="60" y="90" width="6" height="13" fill="#0066CC" />
                      <rect x="68" y="97" width="6" height="6" fill="#0066CC" />
                      <rect x="76" y="92" width="6" height="11" fill="#0066CC" />
                      {/* Stacked rectangles */}
                      <rect x="90" y="75" width="15" height="4" fill="#CC0000" />
                      <rect x="90" y="80" width="15" height="4" fill="#F0AB00" />
                      <rect x="90" y="85" width="15" height="4" fill="#0066CC" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title headingLevel="h3" size="lg" style={{ marginBottom: '8px' }}>
                      Get started
                    </Title>
                    <p style={{ marginBottom: '16px', color: '#6a6e73', fontSize: '14px' }}>
                      Learn about Red Hat Developer Hub.
                    </p>
                    <Button 
                      variant="link" 
                      isInline
                      onClick={() => navigate('/docs')}
                      style={{ padding: 0 }}
                    >
                      Go to Tech Docs
                      <ArrowRightIcon style={{ marginLeft: '8px' }} />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4}>
            <Card style={{ height: '100%', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '8px' }}>
                    Explore
                  </Title>
                  <p style={{ marginBottom: '16px', color: '#6a6e73', fontSize: '14px', flex: 1 }}>
                    Explore AI models, servers and templates.
                  </p>
                  <Button 
                    variant="link" 
                    isInline
                    onClick={() => navigate('/catalog')}
                    style={{ padding: 0, alignSelf: 'flex-start' }}
                  >
                    Go to Catalog
                    <ArrowRightIcon style={{ marginLeft: '8px' }} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4}>
            <Card style={{ height: '100%', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '8px' }}>
                    Learn
                  </Title>
                  <p style={{ marginBottom: '16px', color: '#6a6e73', fontSize: '14px', flex: 1 }}>
                    Explore and develop new skills in AI.
                  </p>
                  <Button 
                    variant="link" 
                    isInline
                    onClick={() => navigate('/learning')}
                    style={{ padding: 0, alignSelf: 'flex-start' }}
                  >
                    Go to Learning Paths
                    <ArrowRightIcon style={{ marginLeft: '8px' }} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* Get started with Connectivity Link Section */}
        <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
          Get started with Connectivity Link
        </Title>

        <Grid hasGutter>
          <GridItem span={6}>
            <Card style={{ height: '100%', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* Illustration placeholder */}
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    flexShrink: 0,
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Simple illustration representation */}
                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute' }}>
                      {/* Person silhouette */}
                      <circle cx="25" cy="45" r="7" fill="#151515" />
                      <rect x="18" y="52" width="14" height="18" rx="2" fill="#CC0000" />
                      <rect x="16" y="70" width="18" height="22" rx="2" fill="#151515" />
                      {/* Tablet */}
                      <rect x="20" y="55" width="10" height="12" rx="1" fill="#f0f0f0" stroke="#d0d0d0" />
                      {/* 3D bar shapes */}
                      <rect x="50" y="30" width="20" height="30" fill="#0066CC" opacity="0.8" transform="skewX(-10)" />
                      <rect x="70" y="40" width="20" height="25" fill="#0066CC" opacity="0.6" transform="skewX(-10)" />
                      <rect x="90" y="50" width="20" height="20" fill="#0066CC" opacity="0.4" transform="skewX(-10)" />
                      {/* Circuit patterns */}
                      <circle cx="60" cy="50" r="2" fill="#0066CC" />
                      <circle cx="80" cy="60" r="2" fill="#0066CC" />
                      <line x1="60" y1="50" x2="80" y2="60" stroke="#0066CC" strokeWidth="1" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: '16px', color: '#151515', fontSize: '14px', lineHeight: '1.5' }}>
                      Browse the Connectivity Link services, observability, developer portal in the Connectivity Link portion.
                    </p>
                    <Button 
                      variant="link" 
                      isInline
                      onClick={() => {}}
                      style={{ padding: 0 }}
                    >
                      Learn more
                      <ExternalLinkAltIcon style={{ marginLeft: '8px', fontSize: '14px' }} />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={6}>
            <Card style={{ height: '100%', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '12px' }}>
                    No available API key yet
                  </Title>
                  <p style={{ marginBottom: '24px', color: '#6a6e73', fontSize: '14px', lineHeight: '1.5', flex: 1 }}>
                    Submit your request to generate an API key.
                  </p>
                  <Button 
                    variant="link" 
                    isInline
                    onClick={() => navigate('/developer-portal/api-keys')}
                    style={{ padding: 0, alignSelf: 'flex-start' }}
                  >
                    Request new API keys
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </Page>
  );
};

export { Home };
