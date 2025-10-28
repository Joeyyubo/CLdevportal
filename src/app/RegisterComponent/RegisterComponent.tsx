import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  TextInput,
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
  Card,
  CardBody,
  Badge,
  Tooltip,
} from '@patternfly/react-core';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  UserIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  CodeIcon,
} from '@patternfly/react-icons';

const RegisterComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [repositoryUrl, setRepositoryUrl] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(1);
  
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3Z" fill="#EE0000"/><path d="M8 11C8 12.1 8.9 13 10 13H14C15.1 13 16 12.1 16 11V10H8V11Z" fill="#EE0000"/><ellipse cx="12" cy="17" rx="6" ry="1" fill="#EE0000"/></svg><span style={{ fontSize: '18px', fontWeight: 'bold', color: '#151515' }}>API portal</span>
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

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/apis');
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else {
      navigate('/developer-portal');
    }
  };

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

  const steps = [
    { name: 'Select URL', id: 'step1' },
    { name: 'Definition', id: 'step2' },
    { name: 'Review', id: 'step3' },
    { name: 'Finish', id: 'step4' },
  ];

  const onNext = () => {
    setActiveStep(activeStep + 1);
  };

  const onBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onReset = () => {
    setActiveStep(1);
    setRepositoryUrl('');
  };

  const onSubmit = () => {
    // Handle form submission
    console.log('Submitting registration...');
    navigate('/developer-portal');
  };

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
            Register an existing component
          </Title>
        </div>

        {/* Wizard-style layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px', minHeight: '500px' }}>
          {/* Left Panel - Steps */}
          <div style={{ borderRight: '1px solid #d0d0d0', paddingRight: '32px' }}>
            <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>
              Start tracking your component in Developer Hub
            </Title>
            
            {steps.map((step, idx) => (
              <div key={step.id} style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: activeStep === idx + 1 ? '#e7f1fa' : 'transparent',
                  border: activeStep === idx + 1 ? '1px solid #0066CC' : '1px solid transparent',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: activeStep > idx + 1 ? '#0066CC' : activeStep === idx + 1 ? '#0066CC' : '#d0d0d0',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {activeStep > idx + 1 ? '✓' : idx + 1}
                  </div>
                  <span style={{ 
                    fontWeight: activeStep === idx + 1 ? 'bold' : 'normal',
                    color: activeStep === idx + 1 ? '#0066CC' : '#151515'
                  }}>
                    {step.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel - Content */}
          <div>
            {activeStep === 1 && (
              <div>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
                  Select URL
                </Title>
                
                <Card style={{ marginBottom: '24px' }}>
                  <CardBody>
                    <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px' }}>
                      Register an existing component
                    </Title>
                    <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '24px' }}>
                      Enter the URL to your source code repository to add it to AI Rolling Demo Developer Hub.
                    </p>

                    <div style={{ marginBottom: '24px' }}>
                      <Title headingLevel="h4" size="md" style={{ marginBottom: '12px' }}>
                        Link to an existing entity file
                      </Title>
                      <div style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                        <code style={{ fontSize: '13px', color: '#151515' }}>
                          https://github.com/backstage/backstage/blob/master/catalog-info.yaml
                        </code>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6a6e73' }}>
                        The wizard analyzes the file, previews the entities, and adds them to the AI Rolling Demo Developer Hub catalog.
                      </p>
                    </div>

                    <Divider style={{ marginBottom: '24px' }} />

                    <div>
                      <Title headingLevel="h4" size="md" style={{ marginBottom: '12px' }}>
                        Link to a repository
                        <Badge style={{ marginLeft: '8px' }}>GitHub only</Badge>
                      </Title>
                      <div style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                        <code style={{ fontSize: '13px', color: '#151515' }}>
                          https://github.com/backstage/backstage
                        </code>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6a6e73', marginBottom: '8px' }}>
                        The wizard discovers all catalog-info.yaml files in the repository, previews the entities, and adds them to the AI Rolling Demo Developer Hub catalog.
                      </p>
                      <p style={{ fontSize: '13px', color: '#6a6e73' }}>
                        If no entities are found, the wizard will prepare a Pull Request that adds an example catalog-info.yaml and prepares the AI Rolling Demo Developer Hub catalog to load all entities as soon as the Pull Request is merged.
                      </p>
                    </div>

                    <Divider style={{ marginBottom: '24px' }} />

                    <div>
                      <Button variant="link" isInline>Learn more about the Software Catalog →</Button>
                    </div>
                  </CardBody>
                </Card>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="repository-url" style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                    Repository URL *
                  </label>
                  <TextInput
                    id="repository-url"
                    value={repositoryUrl}
                    onChange={(_, value) => setRepositoryUrl(value)}
                    placeholder="https://github.com/Get_Flight-tickets/info.yaml"
                    style={{ width: '100%', marginBottom: '8px' }}
                  />
                  <p style={{ fontSize: '13px', color: '#6a6e73', marginBottom: '16px' }}>
                    Enter the full path to your entity file to start tracking your gateway.
                  </p>
                  <Button variant="primary" onClick={onNext} disabled={!repositoryUrl.trim()}>
                    Analyze
                  </Button>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
                  Definition (Optional)
                </Title>
                <Card>
                  <CardBody>
                    <p>Definition step content goes here...</p>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
                  Review
                </Title>
                <Card>
                  <CardBody>
                    <p>Review your registration details...</p>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeStep === 4 && (
              <div>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>
                  Finish
                </Title>
                <Card>
                  <CardBody>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <CheckCircleIcon style={{ fontSize: '48px', color: '#3e8635', marginBottom: '16px' }} />
                      <Title headingLevel="h3" size="xl">
                        Registration successful!
                      </Title>
                      <p style={{ fontSize: '16px', color: '#6a6e73', marginBottom: '24px' }}>
                        Your component has been registered successfully.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #d0d0d0' }}>
          <div>
            {activeStep > 1 && (
              <Button variant="secondary" onClick={onBack} style={{ marginRight: '8px' }}>
                Back
              </Button>
            )}
            <Button variant="secondary" onClick={onReset}>
              Reset
            </Button>
          </div>
          <div>
            {activeStep < 4 ? (
              <Button variant="primary" onClick={onNext}>
                Create
              </Button>
            ) : (
              <Button variant="primary" onClick={onSubmit}>
                Finish
              </Button>
            )}
          </div>
        </div>
      </PageSection>
    </Page>
  );
};

export default RegisterComponent;

