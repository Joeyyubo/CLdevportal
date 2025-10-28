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
  TextInput,
  TextArea,
  FormGroup,
  Card,
  CardBody,
  Tooltip,
  Alert,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
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
} from '@patternfly/react-icons';

const CreateAPIProduct: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [productName, setProductName] = React.useState('Get Flight tickets');
  const [description, setDescription] = React.useState('Long description here');
  const [contact, setContact] = React.useState('retail-platform@example.com');
  const [selectedApi, setSelectedApi] = React.useState('Get Flight tickets');
  const [selectedPolicy, setSelectedPolicy] = React.useState('Standard plan policy');
  const [isKeyRequestEnabled, setIsKeyRequestEnabled] = React.useState(true);
  const [isApiDropdownOpen, setIsApiDropdownOpen] = React.useState(false);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = React.useState(false);
  
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
    } else if (itemId === 'self-service') {
      navigate('/self-service');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else {
      navigate('/developer-portal');
    }
  };

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

  const handleCreate = () => {
    console.log('Creating API product:', { productName, description, contact, selectedApi, selectedPolicy, isKeyRequestEnabled });
    navigate('/developer-portal');
  };

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
            <NavItem itemId="dev-portal" isActive icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
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
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
              API portal
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>APIs</BreadcrumbItem>
          <BreadcrumbItem isActive>Create API products</BreadcrumbItem>
        </Breadcrumb>

        <Title headingLevel="h1" size="2xl" style={{ marginBottom: '32px' }}>
          Create API products
        </Title>

        <Card style={{ marginBottom: '24px' }}>
          <CardBody>
            <FormGroup label="API product name" fieldId="product-name" isRequired>
              <TextInput
                id="product-name"
                value={productName}
                onChange={(_, value) => setProductName(value)}
              />
            </FormGroup>

            <FormGroup label="Description" fieldId="description">
              <TextArea
                id="description"
                value={description}
                onChange={(_, value) => setDescription(value)}
                rows={4}
              />
            </FormGroup>

            <FormGroup label="Contact" fieldId="contact" isRequired>
              <TextInput
                id="contact"
                type="email"
                value={contact}
                onChange={(_, value) => setContact(value)}
              />
            </FormGroup>

            <FormGroup label="APIs" fieldId="apis" isRequired>
              <select 
                id="apis"
                value={selectedApi}
                onChange={(e) => setSelectedApi(e.target.value)}
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
                <option>Get Flight tickets</option>
                <option>Get Booking Details</option>
                <option>Create Booking</option>
              </select>
            </FormGroup>

            <FormGroup label="Policy reference" fieldId="policy-reference" isRequired>
              <select 
                id="policy-reference"
                value={selectedPolicy}
                onChange={(e) => setSelectedPolicy(e.target.value)}
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
                <option>Standard plan policy</option>
                <option>Advanced plan</option>
                <option>Free plan</option>
              </select>
            </FormGroup>
          </CardBody>
        </Card>

        {/* API Key Request Section */}
        <Card style={{ marginBottom: '24px' }}>
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Switch
                  id="api-key-request"
                  label="API key request"
                  isChecked={isKeyRequestEnabled}
                  onChange={(checked) => setIsKeyRequestEnabled(checked)}
                  aria-label="Enable API key request"
                />
              </div>
              <div style={{ color: '#6a6e73', fontSize: '14px' }}>
                Approve and reject the API key request manually
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Warning Message */}
        <Alert
          variant="warning"
          title="API Product creation in the API portal needs approval"
          style={{ marginBottom: '24px' }}
        >
          You will get notification when the API product creation in the API portal is needed to be approval by API owner. It will take several time to complete.
        </Alert>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <Button variant="link" onClick={() => setProductName('Get Flight tickets')}>
            Reset
          </Button>
          <Button variant="secondary" onClick={() => navigate('/developer-portal')}>
            Back
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </PageSection>
    </Page>
  );
};

export default CreateAPIProduct;

