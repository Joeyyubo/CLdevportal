import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  Grid,
  GridItem,
  SearchInput,
  Card,
  CardBody,
  Badge,
  Tooltip,
  Label,
  NotificationDrawer,
  NotificationDrawerHeader,
  NotificationDrawerBody,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerGroup,
  NotificationDrawerGroupList,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
  DrawerPanelBody,
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
  EllipsisVIcon,
  ClockIcon,
  CheckCircleIcon,
  TimesCircleIcon,
  BellIcon,
  InfoCircleIcon,
  AngleRightIcon,
  AngleDownIcon,
} from '@patternfly/react-icons';
import './Policies.css';

// Sample policy data
const initialPolicyData = [
  { 
    name: 'Standard plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Flights API',
    starred: true,
    owned: false,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Advanced plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Flights API',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Free plan', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Create Booking API',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Rate limit policy - Basic', 
    state: 'Active', 
    type: 'Rate limit policy', 
    apiProduct: 'Flights API',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Rate limit policy - Advanced', 
    state: 'Active', 
    type: 'Rate limit policy', 
    apiProduct: 'List My Bookings',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Quota policy - Standard', 
    state: 'Active', 
    type: 'Quota policy', 
    apiProduct: 'Booking API',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'Security policy - OAuth', 
    state: 'Active', 
    type: 'Security policy', 
    apiProduct: 'Create Booking API',
    starred: false,
    owned: true,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Booking API',
    starred: false,
    owned: false,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Aircraft Details',
    starred: false,
    owned: false,
    requester: undefined,
    requestStatus: undefined
  },
  { 
    name: 'A plan-policy', 
    state: 'Active', 
    type: 'Plan policy', 
    apiProduct: 'Get Payment Status',
    starred: false,
    owned: false,
    requester: undefined,
    requestStatus: undefined
  },
  // Request data
  { 
    name: 'Premium plan request', 
    state: 'Pending', 
    type: 'Plan policy', 
    apiProduct: 'Flights API',
    starred: true,
    owned: false,
    requester: 'John Doe',
    requestStatus: 'Pending'
  },
  { 
    name: 'Enterprise plan request', 
    state: 'Approved', 
    type: 'Plan policy', 
    apiProduct: 'Create Booking API',
    starred: true,
    owned: false,
    requester: 'Jane Smith',
    requestStatus: 'Approved'
  },
  { 
    name: 'Basic plan request', 
    state: 'Rejected', 
    type: 'Plan policy', 
    apiProduct: 'Booking API',
    starred: true,
    owned: false,
    requester: 'Bob Johnson',
    requestStatus: 'Rejected'
  },
  { 
    name: 'Custom plan request', 
    state: 'Pending', 
    type: 'Rate limit policy', 
    apiProduct: 'Get Aircraft Details',
    starred: true,
    owned: false,
    requester: 'Alice Williams',
    requestStatus: 'Pending'
  },
];

// Sample notification data
const notificationGroups = [
  {
    id: 'first-group',
    title: 'First notification group',
    isExpanded: false,
    notifications: [
      {
        id: 'notification-1',
        title: 'Unread info notification title',
        description: 'This is an info notification description.',
        timestamp: '5 minutes ago',
        variant: 'info',
        isRead: false
      },
      {
        id: 'notification-2',
        title: 'Unread success notification title',
        description: 'This is a success notification description.',
        timestamp: '10 minutes ago',
        variant: 'success',
        isRead: false
      }
    ]
  },
  {
    id: 'second-group',
    title: 'Second notification group',
    isExpanded: true,
    notifications: [
      {
        id: 'notification-3',
        title: 'Unread info notification title',
        description: 'This is an info notification description.',
        timestamp: '5 minutes ago',
        variant: 'info',
        isRead: false
      },
      {
        id: 'notification-4',
        title: 'Unread recommendation notification title. This is a long title to show how the title will wrap if it is long and wraps to multiple lines.',
        description: 'This is a recommendation notification description. This is a long description to show how the title will wrap if it is long and wraps to multiple lines.',
        timestamp: '10 minutes ago',
        variant: 'warning',
        isRead: false
      },
      {
        id: 'notification-5',
        title: 'Unread recommendation notification title. This is a long title to show how the title will wrap if it is long and wraps to multiple lines.',
        description: 'This is a recommendation notification description. This is a long description to show how the title will wrap if it is long and wraps to multiple lines.',
        timestamp: '15 minutes ago',
        variant: 'warning',
        isRead: false
      }
    ]
  }
];

const Policies: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [policyData, setPolicyData] = React.useState(initialPolicyData);
  // Check URL parameter for initial filter
  const initialFilter = searchParams.get('filter') === 'owned' ? 'owned' : 'organization-all';
  const [activeFilter, setActiveFilter] = React.useState(initialFilter);
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  const [kebabDropdownOpen, setKebabDropdownOpen] = React.useState<Record<number, boolean>>({});
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = React.useState(false);
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    'second-group': true
  });
  const [expandedNotifications, setExpandedNotifications] = React.useState<Record<string, boolean>>({});
  
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

  // Keep Connectivity Link expanded for API owner
  React.useEffect(() => {
    if (currentRole === 'API owner') {
      setConnectivityLinkExpanded(true);
    }
  }, [currentRole]);

  // Ensure Connectivity Link stays expanded for API owner even if state changes
  React.useEffect(() => {
    if (currentRole === 'API owner' && !connectivityLinkExpanded) {
      setConnectivityLinkExpanded(true);
    }
  }, [connectivityLinkExpanded, currentRole]);

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
    } else if (itemId === 'observability') {
      navigate('/observability');
    } else {
      navigate('/developer-portal');
    }
    // Ensure Connectivity Link stays expanded for API owner after navigation
    if (currentRole === 'API owner') {
      setConnectivityLinkExpanded(true);
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

  const handleKebabToggle = (index: number) => {
    setKebabDropdownOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleKebabSelect = (index: number, action: string) => {
    if (action === 'edit') {
      // Handle edit action
      console.log('Edit policy:', filteredPolicyData[index].name);
    } else if (action === 'star') {
      handleStarClick(filteredPolicyData[index].name);
    }
    setKebabDropdownOpen(prev => ({
      ...prev,
      [index]: false
    }));
  };

  const ownedCount = policyData.filter(policy => policy.owned).length;
  const starredCount = policyData.filter(policy => policy.starred).length;

  // Calculate unread notification count
  const unreadCount = notificationGroups.reduce((count, group) => {
    return count + group.notifications.filter(n => !n.isRead).length;
  }, 0);

  const handleNotificationDrawerToggle = () => {
    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);
  };

  const handleGroupToggle = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleNotificationToggle = (notificationId: string) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [notificationId]: !prev[notificationId]
    }));
  };

  // Filter policies based on activeFilter and searchValue
  const filteredPolicyData = React.useMemo(() => {
    let filtered = policyData;
    
    // Apply filter based on activeFilter
    if (activeFilter === 'owned') {
      filtered = filtered.filter(policy => policy.owned);
    } else if (activeFilter === 'starred') {
      filtered = filtered.filter(policy => policy.starred);
    }
    
    // Apply search filter
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(policy =>
        policy.name.toLowerCase().includes(searchLower) ||
        policy.type.toLowerCase().includes(searchLower) ||
        policy.apiProduct.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [policyData, activeFilter, currentRole, searchValue]);

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
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Button
              variant="plain"
              aria-label="Notifications"
              onClick={handleNotificationDrawerToggle}
              style={{ color: '#151515' }}
            >
              <BellIcon />
            </Button>
            {unreadCount > 0 && (
              <Badge
                isRead={false}
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  minWidth: '18px',
                  height: '18px',
                  fontSize: '11px',
                  padding: '0 4px'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </div>
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
        <Nav aria-label="Developer portal navigation" onSelect={(_, selectedItemId) => handleNavClick(selectedItemId ? String(selectedItemId) : '')}>
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
              isExpanded={currentRole === 'API owner' ? true : connectivityLinkExpanded}
              onToggle={() => {
                // Prevent toggling for API owner - always keep expanded
                if (currentRole !== 'API owner') {
                  setConnectivityLinkExpanded(!connectivityLinkExpanded);
                }
              }}
            >
              <NavItem itemId="dev-portal" icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                My APIs
              </NavItem>
              {currentRole === 'API owner' && (
                <NavItem itemId="policies" isActive icon={<ShieldAltIcon />} onClick={() => handleNavClick('policies')}>
                  Policies
                </NavItem>
              )}
              <NavItem itemId="observability" icon={<StarIcon />} onClick={() => handleNavClick('observability')}>
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

  const getNotificationIcon = (variant: string) => {
    switch (variant) {
      case 'info':
        return <InfoCircleIcon />;
      case 'success':
        return <CheckCircleIcon />;
      case 'warning':
        return <ExclamationTriangleIcon />;
      default:
        return <InfoCircleIcon />;
    }
  };

  const getNotificationVariant = (variant: string): 'info' | 'success' | 'danger' | 'warning' | undefined => {
    switch (variant) {
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return undefined;
    }
  };

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <Drawer isExpanded={isNotificationDrawerOpen} position="right">
        <DrawerContent
          panelContent={
            <DrawerPanelContent>
              <DrawerPanelBody>
                <NotificationDrawer>
                  <NotificationDrawerHeader
                    count={unreadCount}
                    onClose={handleNotificationDrawerToggle}
                    title="Notifications"
                  />
                  <NotificationDrawerBody>
                    <NotificationDrawerList>
                      {notificationGroups.map((group) => (
                        <NotificationDrawerGroup
                          key={group.id}
                          title={group.title}
                          isExpanded={expandedGroups[group.id] || false}
                          count={group.notifications.filter(n => !n.isRead).length}
                          onExpand={() => handleGroupToggle(group.id)}
                        >
                          <NotificationDrawerGroupList>
                            {group.notifications.map((notification) => {
                              const isExpanded = expandedNotifications[notification.id] || false;
                              return (
                                <div key={notification.id} style={{ borderBottom: '1px solid #d0d0d0' }}>
                                  <NotificationDrawerListItem
                                    variant={getNotificationVariant(notification.variant)}
                                    isRead={notification.isRead}
                                    title={notification.title}
                                    onClick={() => handleNotificationToggle(notification.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                                        <div style={{ marginTop: '4px' }}>
                                          {getNotificationIcon(notification.variant)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          {!isExpanded && (
                                            <>
                                              <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '4px' }}>{notification.timestamp}</div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div style={{ marginLeft: '8px' }}>
                                        {isExpanded ? (
                                          <AngleDownIcon style={{ color: '#151515', fontSize: '16px' }} />
                                        ) : (
                                          <AngleRightIcon style={{ color: '#151515', fontSize: '16px' }} />
                                        )}
                                      </div>
                                    </div>
                                  </NotificationDrawerListItem>
                                  {isExpanded && (
                                    <div style={{ padding: '12px 16px 16px 48px', backgroundColor: '#fafafa' }}>
                                      <div style={{ marginBottom: '8px' }}>{notification.description}</div>
                                      <div style={{ fontSize: '12px', color: '#6a6e73' }}>{notification.timestamp}</div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </NotificationDrawerGroupList>
                        </NotificationDrawerGroup>
                      ))}
                    </NotificationDrawerList>
                  </NotificationDrawerBody>
                </NotificationDrawer>
              </DrawerPanelBody>
            </DrawerPanelContent>
          }
        >
          <DrawerContentBody>
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: '16px' }}>
            Policies
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
            Available policies in organization for developers to browse discover, register and test
          </p>
          
          {/* Divider line to match Developer portal tabs styling */}
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
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Page>
  );
};

export default Policies;

