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
  QuestionCircleIcon,
  GithubIcon,
} from '@patternfly/react-icons';
import './SelfService.css';

// Sample template data
const initialTemplateData = [
  { 
    name: 'Ansible Job template', 
    type: 'Service', 
    owner: 'janus-authors', 
    description: 'Define an Ansible Job Template within Ansible Automation Platform', 
    tags: ['recommended', 'app'],
    starred: false,
    github: 'https://github.com/janus-idp/software-templates/ansible-job'
  },
  { 
    name: 'Add ArgoCD to an existing project', 
    type: 'Service', 
    owner: 'janus-authors', 
    description: 'Add ArgoCD to an existing project', 
    tags: ['recommended', 'argocd'],
    starred: false,
    github: 'https://github.com/janus-idp/software-templates/argocd'
  },
  { 
    name: 'Create a .NET Frontend application with a CI pipeline', 
    type: 'Service', 
    owner: 'janus-authors', 
    description: 'Create a starter .NET frontend application with a CI pipeline', 
    tags: ['recommended', 'dotnet'],
    starred: false,
    github: 'https://github.com/janus-idp/software-templates/dotnet'
  },
];

const SelfService: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [templateData, setTemplateData] = React.useState(initialTemplateData);
  const [activeFilter, setActiveFilter] = React.useState('organization-all');
  
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
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/apis');
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

  const handleStarClick = (templateName: string) => {
    setTemplateData(prevData => 
      prevData.map(template => 
        template.name === templateName ? { ...template, starred: !template.starred } : template
      )
    );
  };

  const starredCount = templateData.filter(template => template.starred).length;

  // Filter templates based on activeFilter
  const filteredTemplateData = React.useMemo(() => {
    if (activeFilter === 'starred') {
      return templateData.filter(template => template.starred);
    }
    return templateData;
  }, [templateData, activeFilter]);

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
            <NavItem itemId="self-service" isActive icon={<PlusCircleIcon />} onClick={() => handleNavClick('self-service')}>
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
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            Self-service
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
            Create new software components using standard templates
          </p>
          
          {/* Divider line to match API Portal tabs styling */}
          <div style={{ 
            borderBottom: '1px solid #d0d0d0', 
            marginBottom: '24px',
            marginTop: '8px'
          }} />
        </div>

        {/* Actions Row */}
        <Grid hasGutter style={{ marginBottom: '24px' }}>
          <GridItem span={3}>
            <SearchInput
              placeholder="Search"
              value={searchValue}
              onChange={(_, value) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              style={{ width: '100%' }}
            />
          </GridItem>
          <GridItem span={9} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '16px' }}>
            <Button variant="link" isInline style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <QuestionCircleIcon /> <span>Support</span>
            </Button>
            <Button variant="primary" onClick={() => navigate('/register-component')}>Register existing component</Button>
          </GridItem>
        </Grid>

        <Grid hasGutter>
          {/* Left Sidebar - Filters */}
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Personal</Title>
              <div style={{ marginBottom: '16px' }}>
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
                    border: activeFilter === 'starred' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarIcon style={{ fontSize: '16px' }} />
                    <span>Starred</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{starredCount}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Janus IDP</Title>
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
                    border: activeFilter === 'organization-all' ? '2px solid #0066CC' : '1px solid #d0d0d0',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>14</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Categories</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="service">Service</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                <option value="all">All</option>
                <option value="recommended">Recommended</option>
                <option value="app">App</option>
                <option value="argocd">ArgoCD</option>
                <option value="dotnet">.NET</option>
              </select>
            </div>
          </GridItem>

          {/* Right Content - Template Cards */}
          <GridItem span={9}>
            <Title headingLevel="h2" size="lg" style={{ marginBottom: '16px' }}>
              Templates
            </Title>

            <Grid hasGutter>
              {filteredTemplateData.map((template, idx) => (
                <GridItem key={idx} span={4}>
                  <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardBody>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <Badge isRead>{template.type}</Badge>
                        <Button 
                          variant="plain" 
                          aria-label="Star" 
                          onClick={() => handleStarClick(template.name)}
                          style={{ padding: '4px' }}
                        >
                          <StarIcon style={{ fontSize: '16px', fill: template.starred ? '#0066CC' : 'inherit' }} />
                        </Button>
                      </div>
                      <Title headingLevel="h3" size="lg" style={{ marginBottom: '8px' }}>
                        {template.name}
                      </Title>
                      <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px', minHeight: '40px' }}>
                        {template.description}
                      </p>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6a6e73' }}>OWNER: </span>
                        <Button variant="link" isInline style={{ fontSize: '12px' }}>
                          {template.owner}
                        </Button>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6a6e73' }}>TAGS: </span>
                        {template.tags.map((tag, tagIdx) => (
                          <Badge key={tagIdx} isRead style={{ marginRight: '4px' }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GithubIcon />
                        <Button variant="link" isInline onClick={() => window.open(template.github, '_blank')}>
                          Choose
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </PageSection>
    </Page>
  );
};

export default SelfService;

