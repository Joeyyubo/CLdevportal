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
  Grid,
  GridItem,
  Tooltip,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Divider,
  Label,
  Tabs,
  Tab,
  TabTitleText,
  Alert,
  AlertActionLink,
  AlertActionCloseButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  TextInput,
  TextArea,
  Badge,
  ClipboardCopy,
  Checkbox,
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
  Pagination,
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
  CheckCircleIcon,
  TimesCircleIcon,
  TimesIcon,
  PencilAltIcon,
  TrashIcon,
  InfoCircleIcon,
  ClockIcon,
  AngleRightIcon,
  AngleDownIcon,
  CaretDownIcon,
  BellIcon,
  CheckIcon,
  EllipsisVIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

interface APIKey {
  name: string;
  status: 'Active' | 'Pending' | 'Rejected';
  tiers: string;
  api: string;
  activeTime: string;
  useCase?: string;
  rejectionReason?: string;
  user?: string;
  client?: string; // For API keys approval tab
}

import { availableApis, apisRequiringApproval } from '../shared/apiData';

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

const APIKeys: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = React.useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = React.useState(false);
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    'second-group': true
  });
  const [expandedNotifications, setExpandedNotifications] = React.useState<Record<string, boolean>>({});
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = React.useState(false);
  const infoPopoverRef = React.useRef<HTMLButtonElement>(null);
  const tooltipContentRef = React.useRef<HTMLDivElement>(null);
  
  // API keys approval info icon refs
  const [isApprovalInfoPopoverOpen, setIsApprovalInfoPopoverOpen] = React.useState(false);
  const approvalInfoPopoverRef = React.useRef<HTMLButtonElement>(null);
  const approvalTooltipContentRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside to close tooltip
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isInfoPopoverOpen) return;
      
      const target = event.target as HTMLElement;
      // Don't close if clicking the trigger button
      if (infoPopoverRef.current?.contains(target)) {
        return;
      }
      // Don't close if clicking inside the tooltip
      if (tooltipContentRef.current?.contains(target)) {
        return;
      }
      // Close if clicking outside
      setIsInfoPopoverOpen(false);
    };

    if (isInfoPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInfoPopoverOpen]);

  // Handle click outside to close approval info tooltip
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isApprovalInfoPopoverOpen) return;
      
      const target = event.target as HTMLElement;
      // Don't close if clicking the trigger button
      if (approvalInfoPopoverRef.current?.contains(target)) {
        return;
      }
      // Don't close if clicking inside the tooltip
      if (approvalTooltipContentRef.current?.contains(target)) {
        return;
      }
      // Close if clicking outside
      setIsApprovalInfoPopoverOpen(false);
    };

    if (isApprovalInfoPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isApprovalInfoPopoverOpen]);

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [alertApiKeyInfo, setAlertApiKeyInfo] = React.useState<{ api: string; apiKeyName: string } | null>(null);
  const [showRejectedAlert, setShowRejectedAlert] = React.useState(false);
  const [rejectedApiKeyInfo, setRejectedApiKeyInfo] = React.useState<{ api: string; apiKeyName: string; reason: string } | null>(null);
  
  // Approve notification state
  const [showApproveNotification, setShowApproveNotification] = React.useState(false);
  const [approvedApiKeyInfo, setApprovedApiKeyInfo] = React.useState<{ api: string; apiKeyName: string; tier: string } | null>(null);

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
  const [activeTab, setActiveTab] = React.useState(0);
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [tiersFilter, setTiersFilter] = React.useState<string[]>([]);
  const [isTiersDropdownOpen, setIsTiersDropdownOpen] = React.useState(false);
  const [apiFilter, setApiFilter] = React.useState<string[]>([]);
  const [isApiDropdownOpen, setIsApiDropdownOpen] = React.useState(false);
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set());

  // Request API key modal states
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [modalStep, setModalStep] = React.useState<'form' | 'success'>('form');
  const [selectedApi, setSelectedApi] = React.useState('');
  const [isModalApiDropdownOpen, setIsModalApiDropdownOpen] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState('');
  const [selectedTier, setSelectedTier] = React.useState('');
  const [isTierDropdownOpen, setIsTierDropdownOpen] = React.useState(false);
  const [useCase, setUseCase] = React.useState('');
  const [hasAttemptedTierSelection, setHasAttemptedTierSelection] = React.useState(false);
  const [generatedApiKey, setGeneratedApiKey] = React.useState('');
  
  // Edit pending API key modal states
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingApiKey, setEditingApiKey] = React.useState<APIKey | null>(null);
  const [editApiKeyName, setEditApiKeyName] = React.useState('');
  const [editSelectedApi, setEditSelectedApi] = React.useState('');
  const [editSelectedTier, setEditSelectedTier] = React.useState('');
  const [editUseCase, setEditUseCase] = React.useState('');
  const [isEditApiDropdownOpen, setIsEditApiDropdownOpen] = React.useState(false);
  const [isEditTierDropdownOpen, setIsEditTierDropdownOpen] = React.useState(false);
  
  // Delete API key modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deletingApiKey, setDeletingApiKey] = React.useState<APIKey | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = React.useState('');
  
  // Reject API key modal states
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [rejectingApiKey, setRejectingApiKey] = React.useState<APIKey | null>(null);
  const [rejectionReason, setRejectionReason] = React.useState('');
  
  // Available tiers
  const availableTiers = ['Gold', 'Silver', 'Bronze'];
  
  // Get tier background color
  const getTierBackgroundColor = (tier: string): string => {
    const tierLower = tier.toLowerCase();
    if (tierLower === 'gold') {
      return '#FDF7E7';
    } else if (tierLower === 'silver') {
      return '#F5F5F5';
    } else if (tierLower === 'bronze') {
      return '#F2F9F9';
    }
    return '#F2F9F9'; // default to bronze color
  };
  
  // Check if Tiers field should show error (when user tried to select tier but API is not selected)
  const isTierFieldError = hasAttemptedTierSelection && !selectedApi;

  // Initial API keys data
  const initialApiKeys: APIKey[] = [
    { 
      name: 'MyAPIkey_1', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Flights API', 
      activeTime: 'Jan 20, 2026',
      useCase: 'Work for my personal flight application production. This API key is used for accessing flight booking services.'
    },
    { 
      name: 'MyAPIkey_2', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Booking API', 
      activeTime: 'Jan 20, 2026',
      useCase: 'Integration with booking management system for inventory tracking.'
    },
    { 
      name: 'MyAPIkey_3', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Create Booking API', 
      activeTime: 'Sep 05, 2025',
      useCase: 'Booking service integration for booking and management.'
    },
    { 
      name: 'MyAPIkey_4', 
      status: 'Pending', 
      tiers: 'Silver', 
      api: 'Airport API', 
      activeTime: 'Sep 05, 2025',
      useCase: 'Pending approval for airport information management system.'
    },
    { 
      name: 'MyAPIkey_5', 
      status: 'Pending', 
      tiers: 'Bronze', 
      api: 'Payment API', 
      activeTime: 'Sep 05, 2025',
      useCase: 'Payment processing service integration for file management.'
    },
    { 
      name: 'MyAPIkey_6', 
      status: 'Rejected', 
      tiers: 'Bronze', 
      api: 'Aircraft API', 
      activeTime: 'Sep 05, 2025',
      useCase: 'Work for my personal flight application test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, ipsum dolor sit amet,',
      rejectionReason: 'Rejection reason: ion test. Lorem ipsum dolor sit amururururtur at.'
    },
  ];

  const [apiKeys, setApiKeys] = React.useState<APIKey[]>(initialApiKeys);
  const [processedRejectedKeys, setProcessedRejectedKeys] = React.useState<Set<string>>(() => {
    // Initialize with all existing Rejected keys to prevent showing alerts on initial load
    const rejectedKeys = new Set<string>();
    initialApiKeys.forEach(key => {
      if (key.status === 'Rejected') {
        rejectedKeys.add(key.name);
      }
    });
    return rejectedKeys;
  });
  const [previousApiKeys, setPreviousApiKeys] = React.useState<APIKey[]>(initialApiKeys);

  // API keys approval tab states
  const initialApprovalApiKeys: APIKey[] = [
    { 
      name: 'IssuedAPIkey_1', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Flights API', 
      activeTime: 'Jan 20,2026',
      client: 'Joe',
      useCase: 'Work for my personal flight application production.'
    },
    { 
      name: 'IssuedAPIkey_2', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Booking API', 
      activeTime: 'Jan 20,2026',
      client: 'Jee',
      useCase: 'Integration with booking management system.'
    },
    { 
      name: 'IssuedAPIkey_3', 
      status: 'Active', 
      tiers: 'Gold', 
      api: 'Create Booking API', 
      activeTime: 'Sep 05,2025',
      client: 'Jay',
      useCase: 'Booking service integration.'
    },
    { 
      name: 'Pendingkeyreq_1', 
      status: 'Pending', 
      tiers: 'Silver', 
      api: 'Airport API', 
      activeTime: 'Sep 05,2025',
      client: 'John',
      useCase: 'Pending approval for airport information management system.'
    },
    { 
      name: 'Pendingkeyreq_2', 
      status: 'Pending', 
      tiers: 'Bronze', 
      api: 'Payment API', 
      activeTime: 'Sep 05,2025',
      client: 'Linda',
      useCase: 'Payment processing service integration.'
    },
    { 
      name: 'RejectedAPIkey', 
      status: 'Rejected', 
      tiers: 'Bronze', 
      api: 'Aircraft API', 
      activeTime: 'Sep 05,2025',
      client: 'Ross',
      useCase: 'Work for my personal flight application test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, ipsum dolor sit amet,',
      rejectionReason: 'Rejection reason: ion test. Lorem ipsum dolor sit amururururtur at.'
    },
  ];
  const [approvalApiKeys, setApprovalApiKeys] = React.useState<APIKey[]>(initialApprovalApiKeys);
  const [approvalStatusFilter, setApprovalStatusFilter] = React.useState('All');
  const [approvalTiersFilter, setApprovalTiersFilter] = React.useState<string[]>([]);
  const [isApprovalTiersDropdownOpen, setIsApprovalTiersDropdownOpen] = React.useState(false);
  const [approvalApiFilter, setApprovalApiFilter] = React.useState<string[]>([]);
  const [isApprovalApiDropdownOpen, setIsApprovalApiDropdownOpen] = React.useState(false);
  const [approvalClientFilter, setApprovalClientFilter] = React.useState<string[]>([]);
  const [isApprovalClientDropdownOpen, setIsApprovalClientDropdownOpen] = React.useState(false);
  const [approvalSearchValue, setApprovalSearchValue] = React.useState('');
  const [approvalExpandedRows, setApprovalExpandedRows] = React.useState<Set<number>>(new Set());
  const [approvalPage, setApprovalPage] = React.useState(1);
  const [approvalPerPage, setApprovalPerPage] = React.useState(10);

  // Check for newly rejected API keys and show alert
  React.useEffect(() => {
    // Only check for keys that changed from non-Rejected to Rejected
    apiKeys.forEach(key => {
      const previousKey = previousApiKeys.find(pk => pk.name === key.name);
      // If key status changed to Rejected and has rejection reason, and not already processed
      if (
        key.status === 'Rejected' && 
        key.rejectionReason && 
        previousKey && 
        previousKey.status !== 'Rejected' &&
        !processedRejectedKeys.has(key.name)
      ) {
        setRejectedApiKeyInfo({
          api: key.api,
          apiKeyName: key.name,
          reason: key.rejectionReason
        });
        setShowRejectedAlert(true);
        setProcessedRejectedKeys(prev => new Set(prev).add(key.name));
      }
    });
    setPreviousApiKeys(apiKeys);
  }, [apiKeys, processedRejectedKeys, previousApiKeys]);

  // Calculate status counts
  const statusCounts = {
    All: apiKeys.length,
    Active: apiKeys.filter(k => k.status === 'Active').length,
    Pending: apiKeys.filter(k => k.status === 'Pending').length,
    Rejected: apiKeys.filter(k => k.status === 'Rejected').length,
  };

  // Calculate approval status counts
  const approvalStatusCounts = {
    All: approvalApiKeys.length,
    Active: approvalApiKeys.filter(k => k.status === 'Active').length,
    Pending: approvalApiKeys.filter(k => k.status === 'Pending').length,
    Rejected: approvalApiKeys.filter(k => k.status === 'Rejected').length,
  };

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

  const toggleRowExpanded = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const toggleApprovalRowExpanded = (index: number) => {
    const newExpanded = new Set(approvalExpandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setApprovalExpandedRows(newExpanded);
  };

  const handleApprove = (key: APIKey) => {
    setApprovalApiKeys(prev => prev.map(k => 
      k.name === key.name ? { ...k, status: 'Active' as const } : k
    ));
    
    // Extract tier from tiers string (e.g., "Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;" -> "silver")
    const tierMatch = key.tiers.match(/(Gold|Silver|Bronze)/i);
    const tier = tierMatch ? tierMatch[1].toLowerCase() : 'unknown';
    
    // Show approve notification
    setApprovedApiKeyInfo({
      api: key.api,
      apiKeyName: key.name,
      tier: tier
    });
    setShowApproveNotification(true);
    setTimeout(() => {
      setShowApproveNotification(false);
    }, 10000);
  };

  const handleReject = (key: APIKey) => {
    setRejectingApiKey(key);
    setRejectionReason('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (rejectingApiKey && rejectionReason.trim()) {
      setApprovalApiKeys(prev => prev.map(k => 
        k.name === rejectingApiKey.name ? { ...k, status: 'Rejected' as const, rejectionReason: rejectionReason.trim() } : k
      ));
      setIsRejectModalOpen(false);
      setRejectingApiKey(null);
      setRejectionReason('');
    }
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleUserDropdownSelect = (_event?: React.MouseEvent | undefined, role?: string | number | undefined) => {
    const newRole = String(role);
    setCurrentRole(newRole);
    // Save to localStorage
    try {
      localStorage.setItem('currentRole', newRole);
      // Trigger storage event
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save role to localStorage:', e);
    }
    setIsUserDropdownOpen(false);
    // Focus will be returned to the toggle button
    userToggleRef.current?.focus();
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

  // Listen to storage changes for role updates
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const role = localStorage.getItem('currentRole');
        if (role) {
          setCurrentRole(role);
        }
      } catch {
        // Ignore errors
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

  // Filter API keys based on status
  const filteredApiKeys = apiKeys.filter(key => {
    if (statusFilter !== 'All' && key.status !== statusFilter) {
      return false;
    }
    if (tiersFilter.length > 0 && !tiersFilter.includes(key.tiers)) {
      return false;
    }
    if (apiFilter.length > 0 && !apiFilter.includes(key.api)) {
      return false;
    }
    if (searchValue && !key.name.toLowerCase().includes(searchValue.toLowerCase()) && 
        !key.api.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Get unique APIs and Tiers for filters
  // Use availableApis for filter dropdown (all available APIs), but only show APIs that are actually used in apiKeys
  const uniqueApis = availableApis; // Show all available APIs in the filter
  const uniqueTiers = Array.from(new Set(apiKeys.map(k => k.tiers)));
  
  // Handle tier selection toggle
  const handleTierToggle = (tier: string) => {
    setTiersFilter(prev => {
      if (prev.includes(tier)) {
        return prev.filter(t => t !== tier);
      } else {
        return [...prev, tier];
      }
    });
  };
  
  // Handle approval tier selection toggle
  const handleApprovalTierToggle = (tier: string) => {
    setApprovalTiersFilter(prev => {
      if (prev.includes(tier)) {
        return prev.filter(t => t !== tier);
      } else {
        return [...prev, tier];
      }
    });
  };
  
  // Handle API selection toggle
  const handleApiToggle = (api: string) => {
    setApiFilter(prev => {
      if (prev.includes(api)) {
        return prev.filter(a => a !== api);
      } else {
        return [...prev, api];
      }
    });
  };
  
  // Handle approval API selection toggle
  const handleApprovalApiToggle = (api: string) => {
    setApprovalApiFilter(prev => {
      if (prev.includes(api)) {
        return prev.filter(a => a !== api);
      } else {
        return [...prev, api];
      }
    });
  };
  
  // Handle approval client selection toggle
  const handleApprovalClientToggle = (client: string) => {
    setApprovalClientFilter(prev => {
      if (prev.includes(client)) {
        return prev.filter(c => c !== client);
      } else {
        return [...prev, client];
      }
    });
  };

  // Filter approval API keys
  const filteredApprovalApiKeys = approvalApiKeys.filter(key => {
    if (approvalStatusFilter !== 'All' && key.status !== approvalStatusFilter) {
      return false;
    }
    if (approvalTiersFilter.length > 0 && !approvalTiersFilter.includes(key.tiers)) {
      return false;
    }
    if (approvalApiFilter.length > 0 && !approvalApiFilter.includes(key.api)) {
      return false;
    }
    if (approvalClientFilter.length > 0 && (!key.client || !approvalClientFilter.includes(key.client))) {
      return false;
    }
    if (approvalSearchValue && !key.name.toLowerCase().includes(approvalSearchValue.toLowerCase()) && 
        !key.api.toLowerCase().includes(approvalSearchValue.toLowerCase()) &&
        !(key.client && key.client.toLowerCase().includes(approvalSearchValue.toLowerCase()))) {
      return false;
    }
    return true;
  });

  // Get unique values for approval filters
  const uniqueApprovalApis = Array.from(new Set(approvalApiKeys.map(k => k.api)));
  const uniqueApprovalTiers = Array.from(new Set(approvalApiKeys.map(k => k.tiers)));
  const uniqueApprovalClients = Array.from(new Set(approvalApiKeys.map(k => k.client).filter(Boolean)));

  // Pagination for approval tab
  const approvalStartIdx = (approvalPage - 1) * approvalPerPage;
  const approvalEndIdx = approvalStartIdx + approvalPerPage;
  const paginatedApprovalApiKeys = filteredApprovalApiKeys.slice(approvalStartIdx, approvalEndIdx);

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
            API Access
          </Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
            API Access management for Kubernetes.
          </p>
          
          {/* Divider line to match RHDH theme styling */}
          <div style={{ 
            borderBottom: '1px solid #d0d0d0', 
            marginBottom: '24px',
            marginTop: '8px'
          }} />
          
          <Tabs activeKey={activeTab} onSelect={(_, eventKey) => {
            setActiveTab(eventKey as number);
            // Reset pagination when switching tabs
            if (eventKey === 1) {
              setApprovalPage(1);
            }
          }}>
            <Tab eventKey={0} title={<TabTitleText>My API keys</TabTitleText>} />
            {currentRole === 'API owner' && (
              <Tab eventKey={1} title={<TabTitleText>API keys approval</TabTitleText>} />
            )}
          </Tabs>
        </div>

        {/* Actions Row - Only for My API keys tab */}
        {activeTab === 0 && (
          <>
            {currentRole !== 'API consumer' && (
              <Grid hasGutter style={{ marginBottom: '24px' }}>
                <GridItem span={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Button variant="primary" icon={<PlusCircleIcon />} onClick={() => setIsRequestModalOpen(true)}>
                    Request API keys
                  </Button>
                </GridItem>
              </Grid>
            )}
            {currentRole === 'API consumer' && (
              <Grid hasGutter style={{ marginBottom: '24px' }}>
                <GridItem span={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Button variant="primary" icon={<PlusCircleIcon />} onClick={() => setIsRequestModalOpen(true)}>
                    Request API keys
                  </Button>
                </GridItem>
              </Grid>
            )}
          </>
        )}

        {/* Success Alert */}
        {showSuccessAlert && alertApiKeyInfo && (
          <div style={{ 
            position: 'fixed', 
            top: '80px', 
            right: '24px', 
            zIndex: 1000,
            maxWidth: '400px',
            width: '100%'
          }}>
            <Alert
              variant="info"
              isLiveRegion
              title="API key generated successfully."
              actionLinks={
                <AlertActionLink onClick={() => {
                  // Scroll to the API key row in the table
                  setTimeout(() => {
                    const apiKeyRow = document.querySelector(`[data-api-key-name="${alertApiKeyInfo.apiKeyName}"]`);
                    if (apiKeyRow) {
                      apiKeyRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      // Highlight the row briefly
                      (apiKeyRow as HTMLElement).style.backgroundColor = '#f0f0f0';
                      setTimeout(() => {
                        (apiKeyRow as HTMLElement).style.backgroundColor = '';
                      }, 2000);
                    }
                  }, 100);
                  setShowSuccessAlert(false);
                }}>
                  View details
                </AlertActionLink>
              }
              actionClose={
                <AlertActionCloseButton onClose={() => setShowSuccessAlert(false)} />
              }
            >
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <div>API: {alertApiKeyInfo.api}</div>
                <div>API key name: {alertApiKeyInfo.apiKeyName}</div>
              </div>
            </Alert>
          </div>
        )}

        {/* Approve Notification */}
        {showApproveNotification && approvedApiKeyInfo && (
          <div style={{ 
            position: 'fixed', 
            top: showSuccessAlert ? '180px' : (showRejectedAlert ? '180px' : '80px'),
            right: '24px', 
            zIndex: 1000,
            maxWidth: '500px',
            width: '100%'
          }}>
            <Alert
              variant="success"
              isLiveRegion
              title="API key request has been approved"
              actionClose={
                <AlertActionCloseButton onClose={() => setShowApproveNotification(false)} />
              }
            >
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <div>API: {approvedApiKeyInfo.api}</div>
                <div>API key: {approvedApiKeyInfo.apiKeyName} - {approvedApiKeyInfo.tier} tier</div>
              </div>
            </Alert>
          </div>
        )}

        {/* Rejected Alert */}
        {showRejectedAlert && rejectedApiKeyInfo && (
          <div style={{ 
            position: 'fixed', 
            top: showSuccessAlert && alertApiKeyInfo ? '200px' : '80px', 
            right: '24px', 
            zIndex: 1000,
            maxWidth: '400px',
            width: '100%'
          }}>
            <Alert
              variant="danger"
              isLiveRegion
              title="API key request has been rejected."
              actionClose={
                <AlertActionCloseButton onClose={() => setShowRejectedAlert(false)} />
              }
            >
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <div>API: {rejectedApiKeyInfo.api}</div>
                <div>API key name: {rejectedApiKeyInfo.apiKeyName}</div>
                <div style={{ marginTop: '4px' }}>Reason: {rejectedApiKeyInfo.reason}</div>
              </div>
            </Alert>
          </div>
        )}

        {activeTab === 0 && (
        <Grid hasGutter>
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Status</Title>
              
              {/* Status Cards */}
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => setStatusFilter('All')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: statusFilter === 'All' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>{statusCounts.All}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setStatusFilter('Active')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: statusFilter === 'Active' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircleIcon style={{ color: '#3e8635', fontSize: '16px' }} />
                    <span>Active</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{statusCounts.Active}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setStatusFilter('Pending')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: statusFilter === 'Pending' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClockIcon style={{ color: '#0066CC', fontSize: '16px' }} />
                    <span>Pending</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{statusCounts.Pending}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setStatusFilter('Rejected')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: statusFilter === 'Rejected' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TimesCircleIcon style={{ color: '#C9190B', fontSize: '16px' }} />
                    <span>Rejected</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{statusCounts.Rejected}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tiers</Title>
              <div style={{ marginBottom: '16px' }}>
                <Dropdown
                  isOpen={isTiersDropdownOpen}
                  onOpenChange={(isOpen) => setIsTiersDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsTiersDropdownOpen(!isTiersDropdownOpen)}
                      isExpanded={isTiersDropdownOpen}
                      style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                        {tiersFilter.length === 0 ? (
                          <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                        ) : (
                          <>
                            {tiersFilter.map(tier => (
                              <Label
                                key={tier}
                                onClose={() => handleTierToggle(tier)}
                                style={{ margin: 0 }}
                              >
                                {tier}
                              </Label>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Button
                                variant="plain"
                                aria-label="Clear all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTiersFilter([]);
                                }}
                                style={{ padding: '2px', minWidth: 'auto' }}
                              >
                                <TimesIcon style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {availableTiers.map(tier => (
                      <DropdownItem
                        key={tier}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTierToggle(tier);
                        }}
                      >
                        <Checkbox
                          isChecked={tiersFilter.includes(tier)}
                          id={`tier-${tier}`}
                          label={tier}
                          onChange={() => handleTierToggle(tier)}
                        />
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>API</Title>
              <div style={{ marginBottom: '16px' }}>
                <Dropdown
                  isOpen={isApiDropdownOpen}
                  onOpenChange={(isOpen) => setIsApiDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsApiDropdownOpen(!isApiDropdownOpen)}
                      isExpanded={isApiDropdownOpen}
                      style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                        {apiFilter.length === 0 ? (
                          <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                        ) : (
                          <>
                            {apiFilter.map(api => (
                              <Label
                                key={api}
                                onClose={() => handleApiToggle(api)}
                                style={{ margin: 0 }}
                              >
                                {api}
                              </Label>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Button
                                variant="plain"
                                aria-label="Clear all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setApiFilter([]);
                                }}
                                style={{ padding: '2px', minWidth: 'auto' }}
                              >
                                <TimesIcon style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                {uniqueApis.map(api => (
                      <DropdownItem
                        key={api}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApiToggle(api);
                        }}
                      >
                        <Checkbox
                          isChecked={apiFilter.includes(api)}
                          id={`api-${api}`}
                          label={api}
                          onChange={() => handleApiToggle(api)}
                        />
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>
            </div>
          </GridItem>

          <GridItem span={9}>
            <Card>
              <CardBody>
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Title headingLevel="h2" size="lg">
                      My API keys
                    </Title>
                    <Tooltip
                      triggerRef={infoPopoverRef}
                      isVisible={isInfoPopoverOpen}
                      content={
                        <div className="info-tooltip-content" ref={tooltipContentRef}>
                          <Button
                            variant="plain"
                            aria-label="Close"
                            className="info-tooltip-close"
                            onClick={() => setIsInfoPopoverOpen(false)}
                          >
                            <TimesIcon />
                          </Button>
                          <div className="info-tooltip-text">
                            <div>Manage your personal</div>
                            <div>API keys for accessing</div>
                            <div>APIs.</div>
                          </div>
                        </div>
                      }
                      position="right"
                      trigger="click"
                      className="info-tooltip"
                      appendTo={() => document.body}
                    >
                      <Button
                        ref={infoPopoverRef}
                        variant="plain"
                        aria-label="Info"
                        className="info-icon-button"
                        onClick={() => setIsInfoPopoverOpen(!isInfoPopoverOpen)}
                      >
                        <InfoCircleIcon className="info-icon" />
                      </Button>
                    </Tooltip>
                  </div>
                  <SearchInput
                    placeholder="Search"
                    value={searchValue}
                    onChange={(_, value) => setSearchValue(value)}
                    onClear={() => setSearchValue('')}
                    style={{ width: '100%', maxWidth: '300px' }}
                  />
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', paddingRight: '16px', fontSize: '14px', fontWeight: 'bold', width: '48px', minWidth: '48px' }}></th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Tiers</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>API</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '18%' }}>Active time</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApiKeys.map((key, index) => {
                      const hasExpandableContent = key.useCase || key.rejectionReason;
                      const isExpanded = expandedRows.has(index);
                      
                      return (
                        <React.Fragment key={`${key.name}-${key.api}-${index}`}>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }} data-api-key-name={key.name}>
                            <td style={{ padding: '12px', paddingRight: '16px', width: '48px', minWidth: '48px' }}>
                              {hasExpandableContent ? (
                                <Button
                                  variant="plain"
                                  aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                  onClick={() => toggleRowExpanded(index)}
                                  style={{ padding: '4px' }}
                                >
                                  {isExpanded ? (
                                    <AngleDownIcon style={{ fontSize: '16px', color: '#151515' }} />
                                  ) : (
                                    <AngleRightIcon style={{ fontSize: '16px', color: '#151515' }} />
                                  )}
                                </Button>
                              ) : null}
                            </td>
                            <td style={{ padding: '12px' }}>
                              <Button 
                                variant="link" 
                                isInline
                                onClick={() => navigate(`/developer-portal/api-key-details/${encodeURIComponent(key.name)}`)}
                              >
                                {key.name}
                              </Button>
                            </td>
                          <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                            <Label
                              variant="outline"
                              icon={
                                key.status === 'Active' ? <CheckCircleIcon /> : 
                                key.status === 'Pending' ? <ClockIcon /> : 
                                <TimesCircleIcon />
                              }
                              color={
                                key.status === 'Active' ? 'green' : 
                                key.status === 'Pending' ? 'blue' : 
                                'red'
                              }
                              style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                              {key.status}
                            </Label>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Label
                              style={{
                                backgroundColor: getTierBackgroundColor(key.tiers),
                                color: '#151515',
                                border: 'none',
                                padding: '4px 8px',
                                fontSize: '14px'
                              }}
                            >
                              {key.tiers}
                            </Label>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Button 
                              variant="link" 
                              isInline
                              onClick={() => navigate(`/apis/api-details/${encodeURIComponent(key.api)}`)}
                            >
                              {key.api}
                            </Button>
                          </td>
                          <td style={{ padding: '12px', color: '#6a6e73' }}>{key.activeTime}</td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {(key.status === 'Pending' || key.status === 'Active') && (
                                <Button 
                                  variant="plain" 
                                  aria-label="Edit" 
                                  onClick={() => {
                                    setEditingApiKey(key);
                                    setEditApiKeyName(key.name);
                                    setEditSelectedApi(key.api);
                                    setEditSelectedTier(key.tiers);
                                    setEditUseCase(key.useCase || '');
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  <PencilAltIcon />
                                </Button>
                              )}
                              {(key.status === 'Pending' || key.status === 'Active') && (
                                <Button 
                                  variant="plain" 
                                  aria-label="Delete" 
                                  onClick={() => {
                                    setDeletingApiKey(key);
                                    setDeleteConfirmationText('');
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  <TrashIcon />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {hasExpandableContent && isExpanded && (
                          <tr>
                            <td colSpan={7} style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                              {key.useCase && (
                                <div style={{ marginBottom: '16px' }}>
                                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Use case:</div>
                                  <div style={{ fontSize: '14px', color: '#151515' }}>{key.useCase}</div>
                                </div>
                              )}
                              {key.rejectionReason && (
                                <Alert
                                  variant="danger"
                                  title="Rejection reason:"
                                  style={{ marginTop: key.useCase ? '16px' : '0' }}
                                  actionLinks={
                                    key.status === 'Rejected' ? (
                                      <AlertActionLink onClick={() => setIsRequestModalOpen(true)}>
                                        Request new API key
                                      </AlertActionLink>
                                    ) : undefined
                                  }
                                >
                                  {key.rejectionReason}
                                </Alert>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
        )}

        {activeTab === 1 && currentRole === 'API owner' && (
        <Grid hasGutter>
          <GridItem span={3}>
            <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '4px' }}>
              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px' }}>Status</Title>
              
              {/* Status Cards */}
              <div style={{ marginBottom: '16px' }}>
                <div
                  role="button"
                  onClick={() => setApprovalStatusFilter('All')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: approvalStatusFilter === 'All' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>All</span>
                  <span style={{ fontWeight: 'bold' }}>{approvalStatusCounts.All}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setApprovalStatusFilter('Active')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: approvalStatusFilter === 'Active' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircleIcon style={{ color: '#3e8635', fontSize: '16px' }} />
                    <span>Active</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{approvalStatusCounts.Active}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setApprovalStatusFilter('Pending')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: approvalStatusFilter === 'Pending' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClockIcon style={{ color: '#0066CC', fontSize: '16px' }} />
                    <span>Pending</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{approvalStatusCounts.Pending}</span>
                </div>
                <div
                  role="button"
                  onClick={() => setApprovalStatusFilter('Rejected')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#151515',
                    border: approvalStatusFilter === 'Rejected' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TimesCircleIcon style={{ color: '#C9190B', fontSize: '16px' }} />
                    <span>Rejected</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{approvalStatusCounts.Rejected}</span>
                </div>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tiers</Title>
              <div style={{ marginBottom: '16px' }}>
                <Dropdown
                  isOpen={isApprovalTiersDropdownOpen}
                  onOpenChange={(isOpen) => setIsApprovalTiersDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsApprovalTiersDropdownOpen(!isApprovalTiersDropdownOpen)}
                      isExpanded={isApprovalTiersDropdownOpen}
                      style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                        {approvalTiersFilter.length === 0 ? (
                          <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                        ) : (
                          <>
                            {approvalTiersFilter.map(tier => (
                              <Label
                                key={tier}
                                onClose={() => handleApprovalTierToggle(tier)}
                                style={{ margin: 0 }}
                              >
                                {tier}
                              </Label>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Button
                                variant="plain"
                                aria-label="Clear all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setApprovalTiersFilter([]);
                                }}
                                style={{ padding: '2px', minWidth: 'auto' }}
                              >
                                <TimesIcon style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {availableTiers.map(tier => (
                      <DropdownItem
                        key={tier}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprovalTierToggle(tier);
                        }}
                      >
                        <Checkbox
                          isChecked={approvalTiersFilter.includes(tier)}
                          id={`approval-tier-${tier}`}
                          label={tier}
                          onChange={() => handleApprovalTierToggle(tier)}
                        />
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>API</Title>
              <div style={{ marginBottom: '16px' }}>
                <Dropdown
                  isOpen={isApprovalApiDropdownOpen}
                  onOpenChange={(isOpen) => setIsApprovalApiDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsApprovalApiDropdownOpen(!isApprovalApiDropdownOpen)}
                      isExpanded={isApprovalApiDropdownOpen}
                      style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                        {approvalApiFilter.length === 0 ? (
                          <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                        ) : (
                          <>
                            {approvalApiFilter.map(api => (
                              <Label
                                key={api}
                                onClose={() => handleApprovalApiToggle(api)}
                                style={{ margin: 0 }}
                              >
                                {api}
                              </Label>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Button
                                variant="plain"
                                aria-label="Clear all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setApprovalApiFilter([]);
                                }}
                                style={{ padding: '2px', minWidth: 'auto' }}
                              >
                                <TimesIcon style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                {uniqueApprovalApis.map(api => (
                      <DropdownItem
                        key={api}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprovalApiToggle(api);
                        }}
                      >
                        <Checkbox
                          isChecked={approvalApiFilter.includes(api)}
                          id={`approval-api-${api}`}
                          label={api}
                          onChange={() => handleApprovalApiToggle(api)}
                        />
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>

              <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Client</Title>
              <div style={{ marginBottom: '16px' }}>
                <Dropdown
                  isOpen={isApprovalClientDropdownOpen}
                  onOpenChange={(isOpen) => setIsApprovalClientDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsApprovalClientDropdownOpen(!isApprovalClientDropdownOpen)}
                      isExpanded={isApprovalClientDropdownOpen}
                      style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                        {approvalClientFilter.length === 0 ? (
                          <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                        ) : (
                          <>
                            {approvalClientFilter.map(client => (
                              <Label
                                key={client}
                                onClose={() => handleApprovalClientToggle(client)}
                                style={{ margin: 0 }}
                              >
                                {client}
                              </Label>
                            ))}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Button
                                variant="plain"
                                aria-label="Clear all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setApprovalClientFilter([]);
                                }}
                                style={{ padding: '2px', minWidth: 'auto' }}
                              >
                                <TimesIcon style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                {uniqueApprovalClients.map(client => (
                      <DropdownItem
                        key={client}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprovalClientToggle(client || '');
                        }}
                      >
                        <Checkbox
                          isChecked={client ? approvalClientFilter.includes(client) : false}
                          id={`approval-client-${client}`}
                          label={client || ''}
                          onChange={() => handleApprovalClientToggle(client || '')}
                        />
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </div>
            </div>
          </GridItem>

          <GridItem span={9}>
            <Card>
              <CardBody>
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Title headingLevel="h2" size="lg">
                      API keys approval
                    </Title>
                    <Tooltip
                      triggerRef={approvalInfoPopoverRef}
                      isVisible={isApprovalInfoPopoverOpen}
                      content={
                        <div className="info-tooltip-content" ref={approvalTooltipContentRef}>
                          <Button
                            variant="plain"
                            aria-label="Close"
                            className="info-tooltip-close"
                            onClick={() => setIsApprovalInfoPopoverOpen(false)}
                          >
                            <TimesIcon />
                          </Button>
                          <div className="info-tooltip-text">
                            Manage keys issued to clients for accessing APIs.
                          </div>
                        </div>
                      }
                      position="right"
                      trigger="click"
                      className="info-tooltip"
                      appendTo={() => document.body}
                    >
                      <Button
                        ref={approvalInfoPopoverRef}
                        variant="plain"
                        aria-label="Info"
                        className="info-icon-button"
                        onClick={() => setIsApprovalInfoPopoverOpen(!isApprovalInfoPopoverOpen)}
                      >
                        <InfoCircleIcon className="info-icon" />
                      </Button>
                    </Tooltip>
                  </div>
                  <SearchInput
                    placeholder="Search"
                    value={approvalSearchValue}
                    onChange={(_, value) => setApprovalSearchValue(value)}
                    onClear={() => setApprovalSearchValue('')}
                    style={{ width: '100%', maxWidth: '300px' }}
                  />
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                      <th style={{ textAlign: 'left', padding: '12px', paddingRight: '16px', fontSize: '14px', fontWeight: 'bold', width: '48px', minWidth: '48px' }}></th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Tiers</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>API</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Client</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Active time</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApprovalApiKeys.map((key, index) => {
                      const hasExpandableContent = key.useCase || key.rejectionReason;
                      const originalIndex = filteredApprovalApiKeys.findIndex(k => k.name === key.name);
                      const isExpanded = approvalExpandedRows.has(originalIndex);
                      
                      return (
                        <React.Fragment key={`${key.name}-${key.api}-${originalIndex}`}>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                            <td style={{ padding: '12px', paddingRight: '16px', width: '48px', minWidth: '48px' }}>
                              {hasExpandableContent ? (
                                <Button
                                  variant="plain"
                                  aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                  onClick={() => toggleApprovalRowExpanded(originalIndex)}
                                  style={{ padding: '4px' }}
                                >
                                  {isExpanded ? (
                                    <AngleDownIcon style={{ fontSize: '16px', color: '#151515' }} />
                                  ) : (
                                    <AngleRightIcon style={{ fontSize: '16px', color: '#151515' }} />
                                  )}
                                </Button>
                              ) : null}
                            </td>
                            <td style={{ padding: '12px' }}>
                              <Button 
                                variant="link" 
                                isInline
                                onClick={() => navigate(`/developer-portal/api-key-details/${encodeURIComponent(key.name)}`)}
                              >
                                {key.name}
                              </Button>
                            </td>
                            <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                              <Label
                                variant="outline"
                                icon={
                                  key.status === 'Active' ? <CheckCircleIcon /> : 
                                  key.status === 'Pending' ? <ClockIcon /> : 
                                  <TimesCircleIcon />
                                }
                                color={
                                  key.status === 'Active' ? 'green' : 
                                  key.status === 'Pending' ? 'blue' : 
                                  'red'
                                }
                                style={{ display: 'inline-flex', alignItems: 'center' }}
                              >
                                {key.status}
                              </Label>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <Label
                                style={{
                                  backgroundColor: getTierBackgroundColor(key.tiers),
                                  color: '#151515',
                                  border: 'none',
                                  padding: '4px 8px',
                                  fontSize: '14px'
                                }}
                              >
                                {key.tiers}
                              </Label>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <Button 
                                variant="link" 
                                isInline
                                onClick={() => navigate(`/apis/api-details/${encodeURIComponent(key.api)}`)}
                              >
                                {key.api}
                              </Button>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <Button 
                                variant="link" 
                                isInline
                                onClick={() => {}}
                              >
                                {key.client}
                              </Button>
                            </td>
                            <td style={{ padding: '12px', color: '#6a6e73' }}>{key.activeTime}</td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '32px 32px', gap: '8px', width: '72px', margin: '0 auto', justifyItems: 'center' }}>
                                {key.status === 'Active' && (
                                  <>
                                    {/* Edit and Delete buttons temporarily hidden */}
                                  </>
                                )}
                                {key.status === 'Pending' && (
                                  <>
                                    <Tooltip content="Approve">
                                      <Button 
                                        variant="plain" 
                                        aria-label="Approve" 
                                        onClick={() => handleApprove(key)}
                                        className="action-button-outlined"
                                        style={{ padding: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '32px' }}
                                      >
                                        <CheckIcon className="action-icon-outlined" />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip content="Reject">
                                      <Button 
                                        variant="plain" 
                                        aria-label="Reject" 
                                        onClick={() => handleReject(key)}
                                        className="action-button-outlined"
                                        style={{ padding: '4px', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '32px' }}
                                      >
                                        <TimesIcon className="action-icon-outlined" />
                                      </Button>
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                          {hasExpandableContent && isExpanded && (
                            <tr>
                              <td colSpan={8} style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                                {key.useCase && (
                                  <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Use case:</div>
                                    <div style={{ fontSize: '14px', color: '#151515' }}>{key.useCase}</div>
                                  </div>
                                )}
                                {key.rejectionReason && (
                                  <Alert
                                    variant="danger"
                                    title="Rejection reason:"
                                    style={{ marginTop: key.useCase ? '16px' : '0' }}
                                  >
                                    {key.rejectionReason}
                                  </Alert>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    itemCount={filteredApprovalApiKeys.length}
                    page={approvalPage}
                    perPage={approvalPerPage}
                    onSetPage={(_, page) => setApprovalPage(page)}
                    onPerPageSelect={(_, perPage) => {
                      setApprovalPerPage(perPage);
                      setApprovalPage(1);
                    }}
                    perPageOptions={[
                      { title: '10', value: 10 },
                      { title: '20', value: 20 },
                      { title: '50', value: 50 },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
        )}
      
      {/* Request API key modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setModalStep('form');
          setSelectedApi('');
          setApiKeyName('');
          setSelectedTier('');
          setUseCase('');
          setHasAttemptedTierSelection(false);
          setGeneratedApiKey('');
        }}
        variant="small"
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader>
          <Title headingLevel="h2">Request API key</Title>
        </ModalHeader>
        <ModalBody style={{ padding: '24px', paddingTop: '8px', paddingBottom: '0' }}>
          {modalStep === 'form' ? (
            <>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
                Submit your request to generate an API key.
              </p>
          
          <FormGroup 
            label={
              <span>
                API <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <Dropdown
              isOpen={isModalApiDropdownOpen}
              onOpenChange={(isOpen) => setIsModalApiDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle 
                  ref={toggleRef} 
                  onClick={() => setIsModalApiDropdownOpen(!isModalApiDropdownOpen)} 
                  isExpanded={isModalApiDropdownOpen}
                  style={{ width: '100%' }}
                >
                  {selectedApi || ''}
                </MenuToggle>
              )}
            >
              <DropdownList>
                {availableApis.map((api) => (
                  <DropdownItem
                    key={api}
                    onClick={() => {
                      setSelectedApi(api);
                      setIsModalApiDropdownOpen(false);
                      // Clear tier error state when API is selected
                      setHasAttemptedTierSelection(false);
                    }}
                  >
                    {api}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
            {!selectedApi && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Select one API. Please submit separate requests for multiple APIs.
              </p>
            )}
          </FormGroup>

          <FormGroup 
            label={
              <span>
                API key name <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={apiKeyName}
              onChange={(_, value) => setApiKeyName(value)}
            />
            {!apiKeyName && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Set an easy-to-recognize name for this key
              </p>
            )}
          </FormGroup>

          <FormGroup 
            label={
              <span style={{ color: isTierFieldError ? '#C9190B' : 'inherit' }}>
                Tiers <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <Dropdown
              isOpen={isTierDropdownOpen}
              onOpenChange={(isOpen) => {
                if (isOpen && !selectedApi) {
                  // User tried to open tier dropdown but API is not selected
                  setHasAttemptedTierSelection(true);
                  setIsTierDropdownOpen(false);
                } else {
                  setIsTierDropdownOpen(isOpen);
                }
              }}
              toggle={(toggleRef) => (
                <MenuToggle 
                  ref={toggleRef} 
                  onClick={() => {
                    if (!selectedApi) {
                      // User tried to select tier but API is not selected
                      setHasAttemptedTierSelection(true);
                      setIsTierDropdownOpen(false);
                    } else {
                      setIsTierDropdownOpen(!isTierDropdownOpen);
                    }
                  }} 
                  isExpanded={isTierDropdownOpen}
                  isDisabled={!selectedApi}
                  style={{ 
                    width: '100%',
                    borderColor: isTierFieldError ? '#C9190B' : undefined,
                    borderWidth: isTierFieldError ? '1px' : undefined,
                    borderStyle: isTierFieldError ? 'solid' : undefined
                  }}
                >
                  {selectedTier || ''}
                </MenuToggle>
              )}
            >
              <DropdownList>
                {availableTiers.map((tier) => (
                  <DropdownItem
                    key={tier}
                    onClick={() => {
                      setSelectedTier(tier);
                      setIsTierDropdownOpen(false);
                    }}
                  >
                    {tier}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
            {!selectedApi ? (
              <p style={{ fontSize: '12px', color: isTierFieldError ? '#C9190B' : '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Select an API to view available tiers.
              </p>
            ) : !selectedTier && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Select one tier.
              </p>
            )}
          </FormGroup>

          <FormGroup label="Use case" style={{ marginBottom: selectedApi && apisRequiringApproval.includes(selectedApi) ? '16px' : '24px' }}>
            <TextArea
              value={useCase}
              onChange={(_, value) => setUseCase(value)}
              rows={4}
            />
            {!useCase && (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Briefly describe your specific use case of using this API key
              </p>
            )}
          </FormGroup>

          {selectedApi && apisRequiringApproval.includes(selectedApi) && (
            <Alert
              variant="info"
              isInline
              title={`The API key request to '${selectedApi}' requires approval. You will be notified once it is processed.`}
              style={{ marginTop: '0', marginBottom: '24px' }}
            />
          )}
            </>
          ) : (
            <>
              <FormGroup 
                label={
                  <span>
                    API <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={selectedApi}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup 
                label={
                  <span>
                    API key name <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={apiKeyName}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
                />
              </FormGroup>

              <FormGroup 
                label="API key"
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <ClipboardCopy
                  hoverTip="Copy to clipboard"
                  clickTip="Copied!"
                  style={{ fontSize: '14px' }}
                >
                  {generatedApiKey}
                </ClipboardCopy>
              </FormGroup>

              <Alert
                variant="warning"
                isInline
                title="Copy your API key"
                style={{ marginTop: '16px' }}
              >
                <div style={{ marginTop: '4px', fontSize: '14px' }}>
                  This API key is displayed only once. You will need to request a new one if this one is lost.
                </div>
              </Alert>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {modalStep === 'form' ? (
            <>
              <Button
                key="request"
                variant="primary"
                onClick={() => {
                  // Check if API requires approval
                  if (selectedApi && !apisRequiringApproval.includes(selectedApi)) {
                    // Generate API key and go to step 2
                    // Format: KASDZ-U1pWW-KASDZ-UhpBx (4 chars - 5 chars - 4 chars - 5 chars)
                    const generateKeyPart = (length: number) => {
                      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                      let result = '';
                      for (let i = 0; i < length; i++) {
                        result += chars.charAt(Math.floor(Math.random() * chars.length));
                      }
                      return result;
                    };
                    const newApiKey = `${generateKeyPart(5)}-${generateKeyPart(5)}-${generateKeyPart(5)}-${generateKeyPart(5)}`;
                    setGeneratedApiKey(newApiKey);
                    setModalStep('success');
                  } else {
                    // API requires approval - add to table with Pending status and show alert
                    const newApiKey: APIKey = {
                      name: apiKeyName,
                      status: 'Pending',
                      tiers: selectedTier,
                      api: selectedApi,
                      activeTime: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      useCase: useCase || undefined
                    };
                    setApiKeys(prev => [newApiKey, ...prev]);
                    // Reset filters to show the new key
                    setStatusFilter('Pending');
                    setTiersFilter([]);
                    setApiFilter([]);
                    setSearchValue('');
                    setAlertApiKeyInfo({ api: selectedApi, apiKeyName });
                    setShowSuccessAlert(true);
                    setIsRequestModalOpen(false);
                    setModalStep('form');
                    setSelectedApi('');
                    setApiKeyName('');
                    setSelectedTier('');
                    setUseCase('');
                    setHasAttemptedTierSelection(false);
                  }
                }}
                isDisabled={!selectedApi || !apiKeyName || !selectedTier}
              >
                Request
              </Button>
              <Button
                key="cancel"
                variant="link"
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setModalStep('form');
                  setSelectedApi('');
                  setApiKeyName('');
                  setSelectedTier('');
                  setUseCase('');
                  setHasAttemptedTierSelection(false);
                  setGeneratedApiKey('');
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                key="save"
                variant="primary"
                onClick={() => {
                  // Add API key to table with Active status
                  const newApiKey: APIKey = {
                    name: apiKeyName,
                    status: 'Active',
                    tiers: selectedTier,
                    api: selectedApi,
                    activeTime: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    useCase: useCase || undefined
                  };
                  setApiKeys(prev => [newApiKey, ...prev]);
                  // Reset filters to show the new key
                  setStatusFilter('Active');
                  setTiersFilter([]);
                  setApiFilter([]);
                  setSearchValue('');
                  // Show success alert
                  setAlertApiKeyInfo({ api: selectedApi, apiKeyName });
                  setShowSuccessAlert(true);
                  setIsRequestModalOpen(false);
                  setModalStep('form');
                  setSelectedApi('');
                  setApiKeyName('');
                  setSelectedTier('');
                  setUseCase('');
                  setHasAttemptedTierSelection(false);
                  setGeneratedApiKey('');
                }}
              >
                Save
              </Button>
              <Button
                key="cancel"
                variant="link"
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setModalStep('form');
                  setSelectedApi('');
                  setApiKeyName('');
                  setSelectedTier('');
                  setUseCase('');
                  setHasAttemptedTierSelection(false);
                  setGeneratedApiKey('');
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>

      {/* Edit pending API key modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingApiKey(null);
          setEditApiKeyName('');
          setEditSelectedApi('');
          setEditSelectedTier('');
          setEditUseCase('');
        }}
        variant="small"
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader>
          <Title headingLevel="h2">
            {editingApiKey?.status === 'Active' ? 'Edit active API key' : 'Edit pending API key'}
          </Title>
        </ModalHeader>
        <ModalBody style={{ padding: '24px' }}>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
            {editingApiKey?.status === 'Active' 
              ? 'You can edit active API keys to change tiers or add more details.'
              : 'You can edit the pending API keys to correct mistakes or add more details.'}
          </p>

          <Alert
            variant="warning"
            isInline
            title={
              editingApiKey?.status === 'Active'
                ? 'This API key will become pending approval after the update.'
                : 'This API key will remain pending approval after updates.'
            }
            style={{ marginBottom: '16px' }}
          />

          <FormGroup 
            label={
              <span>
                API <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            {editingApiKey?.status === 'Active' ? (
              <TextInput
                value={editSelectedApi}
                readOnly
                style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none', cursor: 'default' }}
              />
            ) : (
              <Dropdown
                isOpen={isEditApiDropdownOpen}
                onOpenChange={(isOpen) => setIsEditApiDropdownOpen(isOpen)}
                toggle={(toggleRef) => (
                  <MenuToggle 
                    ref={toggleRef} 
                    onClick={() => setIsEditApiDropdownOpen(!isEditApiDropdownOpen)} 
                    isExpanded={isEditApiDropdownOpen}
                    style={{ width: '100%' }}
                  >
                    {editSelectedApi || ''}
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  {availableApis.map((api) => (
                    <DropdownItem
                      key={api}
                      onClick={() => {
                        setEditSelectedApi(api);
                        setIsEditApiDropdownOpen(false);
                      }}
                    >
                      {api}
                    </DropdownItem>
                  ))}
                </DropdownList>
              </Dropdown>
            )}
          </FormGroup>

          <FormGroup 
            label={
              <span>
                API key name <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={editApiKeyName}
              onChange={(_, value) => setEditApiKeyName(value)}
            />
          </FormGroup>

          <FormGroup 
            label={
              <span>
                Tiers <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <Dropdown
              isOpen={isEditTierDropdownOpen}
              onOpenChange={(isOpen) => setIsEditTierDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle 
                  ref={toggleRef} 
                  onClick={() => setIsEditTierDropdownOpen(!isEditTierDropdownOpen)} 
                  isExpanded={isEditTierDropdownOpen}
                  style={{ width: '100%' }}
                >
                  {editSelectedTier ? `${editSelectedTier} (Limits: 1 daily)` : ''}
                </MenuToggle>
              )}
            >
              <DropdownList>
                {availableTiers.map((tier) => (
                  <DropdownItem
                    key={tier}
                    onClick={() => {
                      setEditSelectedTier(tier);
                      setIsEditTierDropdownOpen(false);
                    }}
                  >
                    {tier} (Limits: 1 daily)
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </FormGroup>

          <FormGroup label="Use case" style={{ marginBottom: '16px' }}>
            <TextArea
              value={editUseCase}
              onChange={(_, value) => setEditUseCase(value)}
              rows={4}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="save"
            variant="primary"
            onClick={() => {
              if (editingApiKey) {
                // Update the API key in the table
                setApiKeys(prev => prev.map(key => 
                  key.name === editingApiKey.name 
                    ? {
                        ...key,
                        name: editApiKeyName,
                        api: editSelectedApi,
                        tiers: editSelectedTier,
                        useCase: editUseCase || undefined,
                        // If editing Active API key, change status to Pending
                        status: editingApiKey.status === 'Active' ? 'Pending' : key.status
                      }
                    : key
                ));
                setIsEditModalOpen(false);
                setEditingApiKey(null);
                setEditApiKeyName('');
                setEditSelectedApi('');
                setEditSelectedTier('');
                setEditUseCase('');
              }
            }}
            isDisabled={!editSelectedApi || !editApiKeyName || !editSelectedTier}
          >
            Save
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={() => {
              setIsEditModalOpen(false);
              setEditingApiKey(null);
              setEditApiKeyName('');
              setEditSelectedApi('');
              setEditSelectedTier('');
              setEditUseCase('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete pending API key modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingApiKey(null);
          setDeleteConfirmationText('');
        }}
        variant="small"
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ExclamationTriangleIcon style={{ color: '#F0AB00', fontSize: '24px' }} />
            <Title headingLevel="h2">
              {deletingApiKey?.status === 'Active' ? 'Delete active API key' : 'Delete pending API key'}
            </Title>
          </div>
        </ModalHeader>
        <ModalBody style={{ padding: '24px' }}>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6a6e73' }}>
            {deletingApiKey?.status === 'Active'
              ? 'The API key will be deleted and removed. The deletion will immediately disable access for all applications currently using it.'
              : 'The API key will be deleted and removed before approval. The deletion can not be undone.'}
          </p>

          <FormGroup 
            label={
              <span>
                Type <span style={{ color: '#0066CC' }}>{deletingApiKey?.name || 'API key name'}</span> to confirm <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={deleteConfirmationText}
              onChange={(_, value) => setDeleteConfirmationText(value)}
              placeholder=""
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="delete"
            variant="danger"
            onClick={() => {
              if (deletingApiKey && deleteConfirmationText === deletingApiKey.name) {
                // Remove the API key from the table
                setApiKeys(prev => prev.filter(key => key.name !== deletingApiKey.name));
                setIsDeleteModalOpen(false);
                setDeletingApiKey(null);
                setDeleteConfirmationText('');
              }
            }}
            isDisabled={deleteConfirmationText !== deletingApiKey?.name}
          >
            Delete
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setDeletingApiKey(null);
              setDeleteConfirmationText('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Reject API key modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setRejectingApiKey(null);
          setRejectionReason('');
        }}
        variant="small"
        style={{ maxWidth: '500px' }}
      >
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ExclamationTriangleIcon style={{ color: '#F0AB00', fontSize: '24px' }} />
            <Title headingLevel="h2">Reject API key</Title>
          </div>
        </ModalHeader>
        <ModalBody style={{ padding: '24px' }}>
          <p style={{ marginBottom: '24px', fontSize: '14px', color: '#151515' }}>
            This will deny this API key request. The applicant will be notified of the reason and can submit a new request.
          </p>

          <FormGroup label="API key name" style={{ marginBottom: '16px' }}>
            <TextInput
              value={rejectingApiKey?.name || ''}
              readOnly
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </FormGroup>

          <FormGroup label="Use case" style={{ marginBottom: '16px' }}>
            <TextInput
              value={rejectingApiKey?.useCase || ''}
              readOnly
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </FormGroup>

          <FormGroup 
            label={
              <span>
                Provide a reason for the rejection <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired
            style={{ marginBottom: '16px' }}
          >
            <TextArea
              value={rejectionReason}
              onChange={(_, value) => setRejectionReason(value)}
              placeholder="Give the requester some reasons why you reject this API key request"
              rows={4}
              aria-label="Rejection reason input"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="reject"
            variant="danger"
            onClick={handleConfirmReject}
            isDisabled={!rejectionReason.trim()}
          >
            Reject
          </Button>
          <Button
            key="cancel"
            variant="link"
            onClick={() => {
              setIsRejectModalOpen(false);
              setRejectingApiKey(null);
              setRejectionReason('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </PageSection>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Page>
  );
};

export { APIKeys };
