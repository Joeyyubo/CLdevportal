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
  Title,
  Tabs,
  Tab,
  TabTitleText,
  TextArea,
  FormGroup,
  ActionGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
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
  StarIcon,
  ExclamationTriangleIcon,
} from '@patternfly/react-icons';

const PortalSettings: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [description, setDescription] = React.useState('Long description here.');
  const [portalVisibility, setPortalVisibility] = React.useState('Private (Only authenticated users can view pages and APIs)');
  const [isPortalVisibilityOpen, setIsPortalVisibilityOpen] = React.useState(false);
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

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    setActiveTab(tabKey);
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
      navigate('/developer-portal');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
    }
  };

  const handleSave = () => {
    console.log('Saving settings...', { description, portalVisibility });
    // TODO: Implement save logic
  };

  const handleReset = () => {
    setDescription('Long description here.');
    setPortalVisibility('Private (Only authenticated users can view pages and APIs)');
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
            isOpen={false}
            onOpenChange={() => {}}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                aria-label="User account menu"
                variant="plainText"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserIcon />
                  <span>{currentRole}</span>
                </div>
              </MenuToggle>
            )}
          >
            <DropdownList>
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'API consumer'); setCurrentRole('API consumer'); window.dispatchEvent(new Event('storage')); }}>API consumer</DropdownItem>
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'API owner'); setCurrentRole('API owner'); window.dispatchEvent(new Event('storage')); }}>API owner</DropdownItem>
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'Platform engineer'); setCurrentRole('Platform engineer'); window.dispatchEvent(new Event('storage')); }}>Platform engineer</DropdownItem>
            </DropdownList>
          </Dropdown>
        </div>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Portal settings navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
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
              <NavItem itemId="dev-portal" isActive icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                My APIs
              </NavItem>
              {(currentRole === 'API owner' || currentRole === 'Platform engineer') && (
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
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
              Developer portal
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumb>

        <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
          Settings
        </Title>

        <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
          <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>Security</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>Users</TabTitleText>} />
          <Tab eventKey={3} title={<TabTitleText>Audit logs</TabTitleText>} />
        </Tabs>

        {activeTab === 0 && (
          <div style={{ maxWidth: '800px' }}>
            <FormGroup label="Description" fieldId="description">
              <TextArea
                id="description"
                value={description}
                onChange={(_, value) => setDescription(value)}
                rows={4}
              />
            </FormGroup>

            <FormGroup label="Portal visibility" fieldId="portal-visibility" style={{ marginTop: '24px' }}>
              <Dropdown
                isOpen={isPortalVisibilityOpen}
                onOpenChange={(isOpen) => setIsPortalVisibilityOpen(isOpen)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsPortalVisibilityOpen(!isPortalVisibilityOpen)}
                    isExpanded={isPortalVisibilityOpen}
                    style={{ width: '100%' }}
                  >
                    {portalVisibility}
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  <DropdownItem
                    onClick={() => {
                      setPortalVisibility('Private (Only authenticated users can view pages and APIs)');
                      setIsPortalVisibilityOpen(false);
                    }}
                  >
                    Private (Only authenticated users can view pages and APIs)
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setPortalVisibility('Public (Anyone can view pages and APIs)');
                      setIsPortalVisibilityOpen(false);
                    }}
                  >
                    Public (Anyone can view pages and APIs)
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            </FormGroup>

            <ActionGroup style={{ marginTop: '32px' }}>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="link" onClick={handleReset}>
                Reset
              </Button>
            </ActionGroup>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <Title headingLevel="h2" size="lg">Security Settings</Title>
            <p>Security settings content will be implemented here.</p>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <Title headingLevel="h2" size="lg">Users Settings</Title>
            <p>Users settings content will be implemented here.</p>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <Title headingLevel="h2" size="lg">Audit Logs</Title>
            <p>Audit logs content will be implemented here.</p>
          </div>
        )}
      </PageSection>
    </Page>
  );
};

export { PortalSettings };

