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
  StarIcon,
  CodeIcon,
  UserIcon,
  SyncIcon,
  ClockIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

const Observability: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [timeFilter, setTimeFilter] = React.useState('Last 7 days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = React.useState(false);
  const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState('API consumer');

  const kpiData = [
    { label: 'Total calls', value: '1000 calls', color: '#0066CC' },
    { label: 'Average latency', value: '20.35 ms', color: '#0066CC' },
    { label: 'Total errors', value: '20 errors', color: '#8b6914' },
    { label: 'Error rate', value: '2%', color: '#f0ab00' },
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    }
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3Z" fill="#EE0000"/><path d="M8 11C8 12.1 8.9 13 10 13H14C15.1 13 16 12.1 16 11V10H8V11Z" fill="#EE0000"/><ellipse cx="12" cy="17" rx="6" ry="1" fill="#EE0000"/></svg><span style={{ fontSize: '18px', fontWeight: 'bold', color: '#151515' }}>API portal</span>
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
                  <span>API consumer</span>
                </div>
              </MenuToggle>
            )}
          >
            <DropdownList>
              <DropdownItem>API consumer</DropdownItem>
              <DropdownItem>API owner</DropdownItem>
              <DropdownItem>Platform engineer</DropdownItem>
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
            <NavItem itemId="home" icon={<HomeIcon />}>
              Home
            </NavItem>
            <NavItem itemId="catalog" icon={<ArchiveIcon />}>
              Catalog
            </NavItem>
            <NavItem itemId="apis" icon={<CogIcon />}>
              APIs
            </NavItem>
            <NavItem itemId="docs" icon={<FileAltIcon />}>
              Docs
            </NavItem>
            <NavItem itemId="learning" icon={<GraduationCapIcon />}>
              Learning Paths
            </NavItem>
            <NavItem itemId="self-service" icon={<PlusCircleIcon />}>
              Self-service
            </NavItem>
            <Divider />
            <NavItem itemId="dev-portal" isActive icon={<CodeIcon />}>
              API portal
            </NavItem>
            <Divider />
            <NavItem itemId="administration" icon={<ExclamationCircleIcon />}>
              Administration
            </NavItem>
            <NavItem itemId="settings" icon={<CogIcon />}>
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
    <>
      <div style={{ 
        backgroundColor: '#8b47ac', 
        color: 'white', 
        padding: '6px 0', 
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontSize: '14px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>UXD PROTOTYPE</span>
          <Tooltip content="This prototype demonstrates the RHCL dev portal and policy management features for 1.3.">
            <Button variant="plain" style={{ color: 'white', padding: 0, minWidth: 'auto' }}>
              <ExclamationCircleIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
                API portal
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button variant="link" isInline>
                Observability
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>

          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '24px' }}>
            Observability
          </Title>

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
                placeholder="Search by API name, keywords, capability"
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
    </>
  );
};

export { Observability };

