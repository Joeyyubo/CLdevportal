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
  Card,
  CardBody,
  TextInput,
  Tooltip,
  Alert,
  FormGroup,
  ToggleGroup,
  ToggleGroupItem,
  CodeBlock,
  CodeBlockCode,
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
  AngleLeftIcon,
  TrashIcon,
} from '@patternfly/react-icons';
import './Policies.css';

interface ConfigPair {
  key: string;
  value: string;
}

const RequestPolicy: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [viewState, setViewState] = React.useState<'form' | 'yaml'>('form');
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  const [policyName, setPolicyName] = React.useState('basic limit plan');
  const [policyType, setPolicyType] = React.useState('Plan policy');
  const [configPairs, setConfigPairs] = React.useState<ConfigPair[]>([
    { key: 'VIP', value: 'Rate limit=100req/day; 200req/week' },
    { key: 'Super VIP', value: 'Rate limit=200req/day; 500req/week' },
  ]);
  
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
      navigate('/developer-portal');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else {
      navigate('/developer-portal');
    }
  };

  const handleAddConfig = () => {
    setConfigPairs([...configPairs, { key: '', value: '' }]);
  };

  const handleRemoveConfig = (index: number) => {
    const newPairs = configPairs.filter((_, i) => i !== index);
    setConfigPairs(newPairs);
  };

  const handleConfigChange = (index: number, field: 'key' | 'value', value: string) => {
    const newPairs = [...configPairs];
    newPairs[index][field] = value;
    setConfigPairs(newPairs);
  };

  const handleRequest = () => {
    console.log('Requesting policy:', { policyName, policyType, configPairs });
    navigate('/policies');
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
            <NavExpandable
              title="Connectivity Link"
              id="connectivity-link-group"
              isExpanded={connectivityLinkExpanded}
              onToggle={() => setConnectivityLinkExpanded(!connectivityLinkExpanded)}
            >
              <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                API portal
              </NavItem>
              {currentRole === 'API owner' && (
                <NavItem itemId="policies" icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
                  Policies
                </NavItem>
              )}
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
        {/* Breadcrumb */}
        <div style={{ marginBottom: '16px' }}>
          <Button variant="link" isInline onClick={() => navigate('/policies')} style={{ padding: 0 }}>
            <AngleLeftIcon style={{ marginRight: '8px', fontSize: '14px' }} />
            Policies
          </Button>
        </div>

        {/* Page Title and View Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <Title headingLevel="h1" size="2xl">
            Request policy
          </Title>
          <ToggleGroup aria-label="View toggle">
            <ToggleGroupItem
              text="Form view"
              buttonId="form-view"
              isSelected={viewState === 'form'}
              onChange={() => setViewState('form')}
            />
            <ToggleGroupItem
              text="YAML view"
              buttonId="yaml-view"
              isSelected={viewState === 'yaml'}
              onChange={() => setViewState('yaml')}
            />
          </ToggleGroup>
        </div>

        {viewState === 'form' ? (
          <>
            {/* Details Section */}
            <Card style={{ marginBottom: '24px' }}>
              <CardBody>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '24px' }}>Details</Title>
                
                <FormGroup label="policy name" fieldId="policy-name">
                  <TextInput
                    id="policy-name"
                    value={policyName}
                    onChange={(_, value) => setPolicyName(value)}
                  />
                </FormGroup>

                <FormGroup label="policy type" fieldId="policy-type">
                  <TextInput
                    id="policy-type"
                    value={policyType}
                    onChange={(_, value) => setPolicyType(value)}
                  />
                </FormGroup>
              </CardBody>
            </Card>

            {/* Configurations Section */}
            <Card style={{ marginBottom: '24px' }}>
              <CardBody>
                <Title headingLevel="h2" size="xl" style={{ marginBottom: '16px' }}>Configurations</Title>
                <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '24px' }}>
                  This information is mandatory for all types of groups.
                </p>

                {configPairs.map((pair, index) => (
                  <div key={index} style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <FormGroup label="Key" fieldId={`config-key-${index}`}>
                        <TextInput
                          id={`config-key-${index}`}
                          value={pair.key}
                          onChange={(_, value) => handleConfigChange(index, 'key', value)}
                        />
                      </FormGroup>
                    </div>
                    <div style={{ flex: 2 }}>
                      <FormGroup label="Value" fieldId={`config-value-${index}`}>
                        <TextInput
                          id={`config-value-${index}`}
                          value={pair.value}
                          onChange={(_, value) => handleConfigChange(index, 'value', value)}
                        />
                      </FormGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '16px' }}>
                      <Button 
                        variant="plain" 
                        aria-label="Remove"
                        onClick={() => handleRemoveConfig(index)}
                        disabled={configPairs.length === 1}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="link" onClick={handleAddConfig} icon={<PlusCircleIcon />}>
                  + Add more
                </Button>
              </CardBody>
            </Card>

            {/* Warning Message */}
            <Alert
              variant="warning"
              title="Request policy needs approval"
              style={{ marginBottom: '24px' }}
            >
              You will get notification when the policy in the API portal is needed to be approval by API owner. It will take several time to complete.
            </Alert>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <Button variant="link" onClick={() => setPolicyName('basic limit plan')}>
                Reset
              </Button>
              <Button variant="secondary" onClick={() => navigate('/policies')}>
                Back
              </Button>
              <Button variant="primary" onClick={handleRequest}>
                Request
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* YAML View */}
            <Card>
              <CardBody>
                <CodeBlock>
                  <CodeBlockCode>{`apiVersion: policy.example.com/v1
kind: Policy
metadata:
  name: ${policyName}
  type: ${policyType}
spec:
  configurations:
${configPairs.map(pair => `    ${pair.key}: "${pair.value}"`).join('\n')}
`}</CodeBlockCode>
                </CodeBlock>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <Button variant="link" onClick={() => setPolicyName('basic limit plan')}>
                Reset
              </Button>
              <Button variant="secondary" onClick={() => navigate('/policies')}>
                Back
              </Button>
              <Button variant="primary" onClick={handleRequest}>
                Request
              </Button>
            </div>
          </>
        )}
      </PageSection>
    </Page>
  );
};

export default RequestPolicy;

