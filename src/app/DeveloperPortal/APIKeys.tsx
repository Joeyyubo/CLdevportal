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
  status: 'Active' | 'Disabled';
  api: string;
  user: string;
}

const APIKeys: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All');
  const [tagFilter, setTagFilter] = React.useState('All');
  const [requestStateFilter, setRequestStateFilter] = React.useState('All');

  const apiKeys: APIKey[] = [
    { name: 'personal keys', status: 'Active', api: 'Get Flights tickets', user: 'John Doe' },
    { name: 'development keys', status: 'Active', api: 'List My Bookings', user: 'Jane Smith' },
    { name: 'Production keys', status: 'Disabled', api: 'Create Booking', user: 'Bob Johnson' },
    { name: 'Dev test keys', status: 'Active', api: 'Get Refund Status', user: 'Alice Williams' },
    { name: 'Research key', status: 'Active', api: 'Get Payment Status', user: 'Charlie Brown' },
    { name: 'Integration keys', status: 'Active', api: 'Get Flights tickets', user: 'David Lee' },
    { name: 'test-Key_1', status: 'Disabled', api: 'Get Booking Details', user: 'Emma Davis' },
    { name: 'learn-Key_2', status: 'Active', api: 'Create Booking', user: 'Frank Miller' },
    { name: 'try-Key_3', status: 'Active', api: 'List My Bookings', user: 'Grace Wilson' },
    { name: 'Trial-Key_4', status: 'Active', api: 'Get Flights tickets', user: 'Henry Moore' },
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
        <Nav aria-label="Developer portal navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
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
              Developer portal
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
                Developer portal
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
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>API</th>
                        <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>User</th>
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
                          <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                            <Badge style={{ backgroundColor: key.status === 'Active' ? '#67b350' : '#c9190b', color: 'white', display: 'inline-block' }}>
                              {key.status}
                            </Badge>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Button variant="link" isInline>
                              {key.api}
                            </Button>
                          </td>
                          <td style={{ padding: '12px', color: '#151515' }}>
                            {key.user}
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

