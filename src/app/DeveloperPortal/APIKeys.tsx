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
  ActionList,
  ActionListItem,
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
  SearchIcon,
  EllipsisVIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

interface APIKey {
  name: string;
  status: 'Active' | 'Expired';
  apiKey: string;
  api: string;
  expirationDay: string;
}

const APIKeys: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All');
  const [tagFilter, setTagFilter] = React.useState('All');
  const [requestStateFilter, setRequestStateFilter] = React.useState('All');

  const apiKeys: APIKey[] = [
    { name: 'personal keys', status: 'Active', apiKey: 'cbjNd-nvMqT', api: 'Get Flights tickets', expirationDay: 'Jan 20,2026' },
    { name: 'development keys', status: 'Active', apiKey: 'rGeZL-RKIT5', api: 'List My Bookings', expirationDay: 'Oct 25,2025' },
    { name: 'Production keys', status: 'Expired', apiKey: '', api: 'Create Booking', expirationDay: 'Sep 05,2025' },
    { name: 'Dev test keys', status: 'Active', apiKey: 'vt9Dz-taKWW', api: 'Get Refund Status', expirationDay: 'Nov 01,2025' },
    { name: 'Research key', status: 'Active', apiKey: 'UfTQm-2eeLx', api: 'Get Payment Status', expirationDay: 'Dec 25,2026' },
    { name: 'Integration keys', status: 'Active', apiKey: 'KwJzA-9mNpR', api: 'Get Flights tickets', expirationDay: 'May 10,2027' },
    { name: 'test-Key_1', status: 'Expired', apiKey: '', api: 'Get Booking Details', expirationDay: 'May 11,2028' },
    { name: 'learn-Key_2', status: 'Active', apiKey: 'XyVwB-8qLsT', api: 'Create Booking', expirationDay: 'April 20,2029' },
    { name: 'try-Key_3', status: 'Active', apiKey: 'MnKpO-7fGhJ', api: 'List My Bookings', expirationDay: 'Mar 06,2026' },
    { name: 'Trial-Key_4', status: 'Active', apiKey: 'DeFsC-5hIjK', api: 'Get Flights tickets', expirationDay: 'May 20,2025' },
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/developer-portal');
    }
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="10" rx="10" ry="6" fill="#CC0000"/>
              <ellipse cx="16" cy="14" rx="12" ry="8" fill="#CC0000"/>
              <ellipse cx="16" cy="22" rx="8" ry="1" fill="#CC0000"/>
            </svg>
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
                API keys
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
            {/* Left Sidebar - Filters */}
            <div style={{ width: '250px', flexShrink: 0 }}>
              <Card>
                <CardBody>
                  <ActionList>
                    <ActionListItem>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Type</div>
                        <select 
                          style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                        >
                          <option>All</option>
                        </select>
                      </div>
                    </ActionListItem>

                    <ActionListItem>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>API keys</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <CogIcon />
                              <span>Owned</span>
                            </div>
                            <Badge>20</Badge>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <StarIcon />
                              <span>Stared</span>
                            </div>
                            <Badge>10</Badge>
                          </div>
                        </div>
                      </div>
                    </ActionListItem>

                    <ActionListItem>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>API key requests</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <CogIcon />
                              <span>Owned</span>
                            </div>
                            <Badge>20</Badge>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <StarIcon />
                              <span>Stared</span>
                            </div>
                            <Badge>10</Badge>
                          </div>
                        </div>
                      </div>
                    </ActionListItem>

                    <ActionListItem>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Tags</div>
                        <select 
                          style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                          value={tagFilter}
                          onChange={(e) => setTagFilter(e.target.value)}
                        >
                          <option>All</option>
                        </select>
                      </div>
                    </ActionListItem>

                    <ActionListItem>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Request state</div>
                        <select 
                          style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                          value={requestStateFilter}
                          onChange={(e) => setRequestStateFilter(e.target.value)}
                        >
                          <option>All</option>
                        </select>
                      </div>
                    </ActionListItem>
                  </ActionList>
                </CardBody>
              </Card>
            </div>

            {/* Main Content - API Keys Table */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Title headingLevel="h1" size="2xl">
                  API keys
                </Title>
                <Button variant="primary" onClick={() => {}}>
                  Generate API key
                </Button>
              </div>

              <SearchInput
                value={searchValue}
                onChange={(_, value) => setSearchValue(value)}
                onClear={() => setSearchValue('')}
                placeholder="Search"
                style={{ marginBottom: '16px' }}
              />

              <Card>
                <CardBody>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API key</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>Expiration day</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiKeys.map((key, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <td style={{ padding: '12px' }}>
                            <Button variant="link" isInline>
                              {key.name}
                            </Button>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Badge style={{ backgroundColor: key.status === 'Active' ? '#67b350' : '#c9190b', color: 'white' }}>
                              {key.status}
                            </Badge>
                          </td>
                          <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px', color: '#6a6e73' }}>
                            {key.apiKey || '-'}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Button variant="link" isInline>
                              {key.api}
                            </Button>
                          </td>
                          <td style={{ padding: '12px', color: '#6a6e73' }}>
                            {key.expirationDay}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Button variant="plain" aria-label="Actions">
                              <EllipsisVIcon />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </PageSection>
      </Page>
    </>
  );
};

export { APIKeys };

