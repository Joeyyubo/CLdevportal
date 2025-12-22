import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  SearchInput,
  Title,
  Card,
  CardBody,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Divider,
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
  StarIcon,
  CodeIcon,
  UserIcon,
  SyncIcon,
  ClockIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

const Observability: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = React.useState('');
  const [timeFilter, setTimeFilter] = React.useState('Last 7 days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = React.useState(false);
  const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = React.useState(false);
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

  const kpiData = [
    { label: 'Total calls', value: '1000 calls', color: '#0066CC' },
    { label: 'Average latency', value: '20.35 ms', color: '#0066CC' },
    { label: 'Total errors', value: '20 errors', color: '#8b6914' },
    { label: 'Error rate', value: '2%', color: '#f0ab00' },
  ];

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
    } else if (itemId === 'api-keys') {
      navigate('/developer-portal/api-keys');
    } else if (itemId === 'policies') {
      navigate('/policies');
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
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
              {currentRole !== 'API consumer' && (
                <NavItem itemId="dev-portal" isActive={location.pathname === '/developer-portal' && !location.pathname.includes('/api-keys')} icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" isActive={location.pathname.includes('/api-keys')} icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
                API Access
              </NavItem>
              <NavItem itemId="observability" isActive={location.pathname === '/observability'} icon={<StarIcon />} onClick={() => handleNavClick('observability')}>
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

  const apiTrendsData = [
    { name: 'Get flight tickets', color: '#89bf04', data: [10, 8, 6, 5, 7, 6, 5, 4, 3, 0] },
    { name: 'Get booking', color: '#61affe', data: [2.5, 3, 3.5, 3, 3.5, 3, 4, 3.5, 4, 4] },
    { name: 'Flight schedule', color: '#4c5fd5', data: [2.5, 2.7, 3, 2.8, 3, 2.5, 2, 2.5, 3, 4] },
  ];

  return (
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            Observability
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
            Monitor API usage, performance, and errors across your API portfolio
          </p>
          
          {/* Divider line to match Policies page styling */}
          <div style={{ 
            borderBottom: '1px solid #d0d0d0', 
            marginBottom: '24px',
            marginTop: '8px'
          }} />
        </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardBody>
                  <div style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '8px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: kpi.color }}>{kpi.value}</div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SearchInput
                value={searchValue}
                onChange={(_, value) => setSearchValue(value)}
                onClear={() => setSearchValue('')}
                placeholder="Search"
              />
            </div>
            <Dropdown
              isOpen={isTimeDropdownOpen}
              onOpenChange={(isOpen) => setIsTimeDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  aria-label="Time filter"
                  icon={<ClockIcon />}
                >
                  {timeFilter}
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem onClick={() => { setTimeFilter('Last hour'); setIsTimeDropdownOpen(false); }}>Last hour</DropdownItem>
                <DropdownItem onClick={() => { setTimeFilter('Last 24 hours'); setIsTimeDropdownOpen(false); }}>Last 24 hours</DropdownItem>
                <DropdownItem onClick={() => { setTimeFilter('Last 7 days'); setIsTimeDropdownOpen(false); }}>Last 7 days</DropdownItem>
                <DropdownItem onClick={() => { setTimeFilter('Last 30 days'); setIsTimeDropdownOpen(false); }}>Last 30 days</DropdownItem>
              </DropdownList>
            </Dropdown>
            <Button 
              variant="secondary"
              icon={<SyncIcon />}
              onClick={() => {}}
            >
              Refresh
            </Button>
          </div>

          {/* API Usage Trends */}
          <Card>
            <CardBody>
              <Title headingLevel="h3" size="xl" style={{ marginBottom: '24px' }}>
                API usage trends
              </Title>
              
              {/* Chart Area - Simplified version */}
              <div style={{ position: 'relative', height: '300px', border: '1px solid #d0d0d0', borderRadius: '4px', padding: '20px', backgroundColor: '#fafafa' }}>
                {/* Chart placeholder - Would use actual charting library in production */}
                <svg width="100%" height="100%">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e0e0e0" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Stacked area chart simulation */}
                  {apiTrendsData.map((api, apiIndex) => (
                    <g key={apiIndex}>
                      <path
                        d={`M ${apiIndex * 80 + 50},${250 - api.data[0] * 15} ${api.data.slice(1).map((value, index) => `L ${(index + 1) * 80 + 50},${250 - value * 15}`).join(' ')} L ${api.data.length * 80 - 30},250 L 20,250 Z`}
                        fill={api.color}
                        fillOpacity="0.6"
                      />
                    </g>
                  ))}
                </svg>
                
                {/* Legend */}
                <div style={{ position: 'absolute', right: '20px', top: '20px' }}>
                  {apiTrendsData.map((api, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: api.color, marginRight: '8px' }} />
                      <span style={{ fontSize: '14px' }}>{api.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </PageSection>
      </Page>
  );
};

export { Observability };

