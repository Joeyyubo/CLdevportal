import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabTitleText,
  Form,
  FormGroup,
  TextArea,
  Select,
  SelectOption,
  ActionGroup,
  Page,
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Divider,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
} from '@patternfly/react-core';
import {
  CogIcon,
  HomeIcon,
  ArchiveIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  CodeIcon,
  UserIcon,
  StarIcon,
} from '@patternfly/react-icons';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const GeneralSettings: React.FunctionComponent = () => {
  useDocumentTitle("Settings");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [portalVisibility, setPortalVisibility] = React.useState('private');
  const [isVisibilityOpen, setIsVisibilityOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);

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

  const getCurrentRole = (): string => {
    try {
      const role = localStorage.getItem('currentRole');
      return role || 'API consumer';
    } catch {
      return 'API consumer';
    }
  };
  
  const [currentRole, setCurrentRole] = React.useState(getCurrentRole());

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#CC0000"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>RedHat</span>
                <span style={{ fontSize: '16px' }}>Developer Hub</span>
              </div>
            </div>
          </div>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
          <Dropdown
            isOpen={isUserDropdownOpen}
            onOpenChange={(isOpen) => setIsUserDropdownOpen(isOpen)}
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
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'API consumer'); setCurrentRole('API consumer'); window.location.reload(); }}>API consumer</DropdownItem>
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'API owner'); setCurrentRole('API owner'); window.location.reload(); }}>API owner</DropdownItem>
              <DropdownItem onClick={() => { localStorage.setItem('currentRole', 'Platform engineer'); setCurrentRole('Platform engineer'); window.location.reload(); }}>Platform engineer</DropdownItem>
            </DropdownList>
          </Dropdown>
        </div>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Settings navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
          <NavList>
            <NavItem itemId="home" icon={<HomeIcon />} onClick={() => handleNavClick('home')}>
              Home
            </NavItem>
            <NavItem itemId="catalog" icon={<ArchiveIcon />} onClick={() => handleNavClick('catalog')}>
              Catalog
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 8 2 L 2 6 L 8 10 L 14 6 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M 2 10 L 8 14 L 14 10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Connectivity Link
                </span>
              }
              groupId="connectivity-link"
              isExpanded={connectivityLinkExpanded}
              onToggle={() => setConnectivityLinkExpanded(!connectivityLinkExpanded)}
            >
              <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                API portal
              </NavItem>
              <NavItem itemId="policies" icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
                Policies
              </NavItem>
              {(currentRole === 'API owner' || currentRole === 'Platform engineer') && (
                <NavItem itemId="observability" icon={<StarIcon />} onClick={() => handleNavClick('observability')}>
                  Observability
                </NavItem>
              )}
            </NavExpandable>
            <Divider />
            <NavItem itemId="settings" icon={<CogIcon />} onClick={() => {}} isActive>
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
        <Breadcrumb style={{ marginBottom: 'var(--pf-t-global--spacer--md)' }}>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
              API portal
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumb>

        <Title headingLevel="h1" size="2xl" style={{ marginBottom: 'var(--pf-t-global--spacer--md)' }}>
          Settings
        </Title>

        <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: 'var(--pf-t-global--spacer--xl)' }}>
          <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>Security</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>Users</TabTitleText>} />
          <Tab eventKey={3} title={<TabTitleText>Audit logs</TabTitleText>} />
        </Tabs>

        {activeTab === 0 && (
          <Form>
            <FormGroup label="Description">
              <TextArea
                value={description}
                onChange={(_, value) => setDescription(value)}
                placeholder="Long description here"
                rows={4}
              />
            </FormGroup>

            <FormGroup label="Portal visibility">
              <Select
                isOpen={isVisibilityOpen}
                onToggle={() => setIsVisibilityOpen(!isVisibilityOpen)}
                selections={portalVisibility}
                onSelect={(_, selection) => {
                  setPortalVisibility(String(selection));
                  setIsVisibilityOpen(false);
                }}
              >
                <SelectOption value="private">Private (Only authenticated users can view pages and APIs)</SelectOption>
                <SelectOption value="public">Public (Anyone can view pages and APIs)</SelectOption>
              </Select>
            </FormGroup>

            <ActionGroup>
              <Button variant="primary">Save</Button>
              <Button variant="secondary">Reset</Button>
            </ActionGroup>
          </Form>
        )}
      </PageSection>
    </Page>
  );
}

export { GeneralSettings };
