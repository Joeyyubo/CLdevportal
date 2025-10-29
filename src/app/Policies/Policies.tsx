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
  Label,
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
  ExternalLinkAltIcon,
  PencilAltIcon,
} from '@patternfly/react-icons';
import './Policies.css';

// Sample policy data
const initialPolicyData = [
  { 
    name: 'Standard plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Flights tickets',
    starred: true,
    owned: false
  },
  { 
    name: 'Advanced plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Flights tickets',
    starred: false,
    owned: false
  },
  { 
    name: 'Free plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Create Booking',
    starred: false,
    owned: false
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Booking Details',
    starred: false,
    owned: false
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Aircraft Details',
    starred: false,
    owned: false
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Payment Status',
    starred: false,
    owned: false
  },
];

const Policies: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [policyData, setPolicyData] = React.useState(initialPolicyData);
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

  const handleStarClick = (policyName: string) => {
    setPolicyData(prevData => 
      prevData.map(policy => 
        policy.name === policyName ? { ...policy, starred: !policy.starred } : policy
      )
    );
  };

  const ownedCount = policyData.filter(policy => policy.owned).length;
  const starredCount = policyData.filter(policy => policy.starred).length;

  // Filter policies based on activeFilter
  const filteredPolicyData = React.useMemo(() => {
    if (activeFilter === 'owned') {
      return policyData.filter(policy => policy.owned);
    } else if (activeFilter === 'starred') {
      return policyData.filter(policy => policy.starred);
    }
    return policyData;
  }, [policyData, activeFilter]);

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
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            Policies
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
            Available policies in organization for developers to browse discover, register and test
          </p>
          
          {/* Divider line to match API Portal tabs styling */}
          <div style={{ 
            borderBottom: '1px solid #d0d0d0', 
            marginBottom: '24px',
            marginTop: '8px'
          }} />
        </div>

        {/* Search and Actions Row */}
        <Grid hasGutter style={{ marginBottom: '24px' }}>
          <GridItem span={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchInput
              placeholder="Search"
              value={searchValue}
              onChange={(_, value) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              style={{ width: '100%' }}
            />
          </GridItem>
          <GridItem span={9} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={() => navigate('/policies/request')}>Request policy</Button>
          </GridItem>
        </Grid>

        <Grid hasGutter>
          {/* Left Sidebar - Filters */}
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Type</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="plan">Plan policy</option>
                <option value="rate-limit">Rate limit policy</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Personal</Title>
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => ownedCount > 0 && setActiveFilter(activeFilter === 'owned' ? 'organization-all' : 'owned')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: ownedCount === 0 ? '#fafafa' : '#ffffff',
                    color: ownedCount === 0 ? '#8b8d90' : '#151515',
                    border: activeFilter === 'owned' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: ownedCount === 0 ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    opacity: ownedCount === 0 ? 0.6 : 1,
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CogIcon style={{ fontSize: '16px' }} />
                    <span>Owned</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{ownedCount}</span>
                </div>
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
                    border: activeFilter === 'starred' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarIcon style={{ fontSize: '16px' }} />
                    <span>Starred</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{starredCount}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Organization</Title>
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
                    border: activeFilter === 'organization-all' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>600</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Owner</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}>
                <option value="all">All</option>
                <option value="policy-team">Policy Team</option>
                <option value="platform-team">Platform Team</option>
              </select>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>State</Title>
              <select style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </GridItem>

          {/* Right Content - Policy Table */}
          <GridItem span={9}>
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: '16px' }}>
                  Policies
                </Title>

                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '25%' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>State</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '18%' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '35%' }}>API product</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '10%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPolicyData.map((policy, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                        <td style={{ padding: '12px' }}>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/policies/policy-details/${encodeURIComponent(policy.name)}`)}
                          >
                            {policy.name}
                          </Button>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Label color="green">{policy.state}</Label>
                        </td>
                        <td style={{ padding: '12px' }}>{policy.type}</td>
                        <td style={{ padding: '12px' }}>
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(policy.apiProduct)}`)}
                          >
                            {policy.apiProduct}
                          </Button>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                            <Button variant="plain" aria-label="Edit">
                              <PencilAltIcon style={{ fontSize: '16px' }} />
                            </Button>
                            <Button variant="plain" aria-label="Star" onClick={() => handleStarClick(policy.name)}>
                              <StarIcon style={{ fontSize: '16px', fill: policy.starred ? '#0066CC' : 'inherit' }} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </Page>
  );
};

export default Policies;

