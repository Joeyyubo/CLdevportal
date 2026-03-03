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
  Badge,
  Title,
  Grid,
  GridItem,
  SearchInput,
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
  Card,
  CardBody,
  Tooltip,
  Label,
  Checkbox,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  TextInput,
  TextArea,
  Radio,
  Divider as PFDivider,
  Alert,
  AlertActionLink,
  AlertActionCloseButton,
  FormHelperText,
  HelperText,
  HelperTextItem,
} from '@patternfly/react-core';
import {
  StarIcon,
  UserIcon,
  CaretDownIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  KeyIcon,
  ClipboardCheckIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  PencilAltIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  TimesIcon,
} from '@patternfly/react-icons';
import { ApiProductsNavIcon } from './ApiProductsNavIcon';
import { InfoIconOutline } from './InfoIconOutline';
import './DeveloperPortal.css';

// Clipboard icon components
const DraftClipboardIcon: React.FunctionComponent<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
    <path d="M4 2C4 1.44772 4.44772 1 5 1H11C11.5523 1 12 1.44772 12 2V14C12 14.5523 11.5523 15 11 15H5C4.44772 15 4 14.5523 4 14V2Z" stroke="#6a6e73" strokeWidth="1.5" fill="none"/>
    <path d="M6 1V3H10V1" stroke="#6a6e73" strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="4" r="1" fill="#6a6e73"/>
  </svg>
);

const PublishedClipboardIcon: React.FunctionComponent<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
    <path d="M4 2C4 1.44772 4.44772 1 5 1H11C11.5523 1 12 1.44772 12 2V14C12 14.5523 11.5523 15 11 15H5C4.44772 15 4 14.5523 4 14V2Z" stroke="#3e8635" strokeWidth="1.5" fill="none"/>
    <path d="M6 1V3H10V1" stroke="#3e8635" strokeWidth="1.5" fill="none"/>
    <path d="M6 8L7.5 9.5L10 7" stroke="#3e8635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// API Product interface
interface APIProduct {
  name: string;
  version: string;
  route: string;
  policy: string;
  tags: string[];
  status: 'Draft' | 'Published';
  lifecycle?: string;
  authentication?: string;
  namespace: string;
  resourceName?: string;
  openApiSpecUrl?: string;
  documentationUrl?: string;
  description?: string;
  apiKeyApproval?: 'manual' | 'automatic';
}

// Initial API products data
const initialApiProducts: APIProduct[] = [
  { name: 'Flight ticket API', version: 'V1', route: 'petstore-1', policy: 'toystore-plans', tags: ['analytics', 'metrics'], status: 'Draft', lifecycle: 'Production', namespace: 'namespace-1' },
  { name: 'Flight API', version: 'V2', route: 'petstore-2', policy: 'N/A', tags: [], status: 'Published', lifecycle: 'Production', namespace: 'namespace-1' },
  { name: 'Ticket API', version: 'V1', route: 'petstore-3', policy: 'toystore-plans', tags: ['payments', 'billing'], status: 'Published', lifecycle: 'Production', namespace: 'namespace-2' },
  { name: 'Flight API', version: 'V2', route: 'petstore-4', policy: 'N/A', tags: ['ecommerce', 'retail'], status: 'Published', lifecycle: 'Production', namespace: 'namespace-3' },
  { name: 'Payment API', version: 'V1', route: 'petstore-5', policy: 'toystore-plans', tags: ['identity', 'auth'], status: 'Published', lifecycle: 'Production', namespace: 'namespace-1' },
];

const DeveloperPortal: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  
  // API Product states
  const [apiProducts, setApiProducts] = React.useState<APIProduct[]>(initialApiProducts);
  const [statusFilter, setStatusFilter] = React.useState('All'); // 'All', 'Draft', 'Published'
  const [policyFilter, setPolicyFilter] = React.useState<string[]>([]);
  const [routeFilter, setRouteFilter] = React.useState<string[]>([]);
  const [namespaceFilter, setNamespaceFilter] = React.useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = React.useState<string[]>([]);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = React.useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = React.useState(false);
  const [isNamespaceDropdownOpen, setIsNamespaceDropdownOpen] = React.useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = React.useState(false);
  const [productSearchValue, setProductSearchValue] = React.useState('');
  
  // Create API Product modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [apiProductName, setApiProductName] = React.useState('');
  const [resourceName, setResourceName] = React.useState('');
  const [version, setVersion] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState('Aircraft');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [openApiSpecUrl, setOpenApiSpecUrl] = React.useState('');
  const [openApiSpecUrlError, setOpenApiSpecUrlError] = React.useState<string>('');
  const [isOpenApiSpecMenuOpen, setIsOpenApiSpecMenuOpen] = React.useState(false);
  const [documentationUrl, setDocumentationUrl] = React.useState('');
  const [documentationUrlFocused, setDocumentationUrlFocused] = React.useState(false);
  
  // Publish notification state
  const [showPublishNotification, setShowPublishNotification] = React.useState(false);
  const [publishedApiProductName, setPublishedApiProductName] = React.useState('');

  // URL validation function
  const validateUrl = (url: string): string => {
    if (!url || url.trim() === '') {
      return ''; // Empty is allowed (will be validated on submit if required)
    }
    try {
      // Try to create a URL object to validate the URL format
      new URL(url);
      return ''; // Valid URL
    } catch (e) {
      return 'Enter the full path to your API spec file. Eg.https://github.com/backstage/';
    }
  };

  const handleOpenApiSpecUrlChange = (value: string) => {
    setOpenApiSpecUrl(value);
    const error = validateUrl(value);
    setOpenApiSpecUrlError(error);
  };
  const [selectedHttpRoute, setSelectedHttpRoute] = React.useState('');
  const [isHttpRouteDropdownOpen, setIsHttpRouteDropdownOpen] = React.useState(false);
  const [httpRouteSearchValue, setHttpRouteSearchValue] = React.useState('');
  const [httpRouteSortBy, setHttpRouteSortBy] = React.useState<string>('Name');
  const [httpRoutePolicies, setHttpRoutePolicies] = React.useState('');
  const [apiKeyApproval, setApiKeyApproval] = React.useState<'manual' | 'automatic'>('manual');
  const [creationLifecycle, setCreationLifecycle] = React.useState<string>('Production');
  const [isCreationLifecycleDropdownOpen, setIsCreationLifecycleDropdownOpen] = React.useState(false);
  const [isCreationPublishStatusDropdownOpen, setIsCreationPublishStatusDropdownOpen] = React.useState(false);
  const [creationPublishStatus, setCreationPublishStatus] = React.useState<'Draft' | 'Published'>('Draft');
  const [editingProductName, setEditingProductName] = React.useState<string | null>(null);
  
  const lifecycleOptions = ['Experimental', 'Production', 'Deprecated', 'Retired'] as const;
  
  // HTTPRoute interface with PlanPolicy information
  interface HTTPRoute {
    name: string;
    planPolicy: string;
    planDetails?: string; // e.g., "Gold: 100/day; Silver: 50/day; Bronze: 10/day"
  }

  // Available tags and HTTP routes
  const availableTags = ['Aircraft', 'Ticket', 'Payment', 'Client'];
  const availableHttpRoutes: HTTPRoute[] = [
    {
      name: 'Airflight-1',
      planPolicy: 'Airflight-plans',
      planDetails: 'Gold: 100/day; Silver: 50/day; Bronze: 10/day'
    },
    {
      name: 'Airflight-2',
      planPolicy: 'N/A'
    },
    {
      name: 'backstage.io/expose:true',
      planPolicy: 'N/A'
    },
    {
      name: 'route-1',
      planPolicy: 'route-plans',
      planDetails: 'Gold: 200/day; Silver: 100/day; Bronze: 20/day'
    },
    {
      name: 'route-2',
      planPolicy: 'N/A'
    },
    {
      name: 'route-3',
      planPolicy: 'route-plans-2',
      planDetails: 'Gold: 150/day; Silver: 75/day; Bronze: 15/day'
    }
  ];
  
  // Filter HTTPRoutes by search (for the select menu)
  const filteredHttpRoutes = React.useMemo(() => {
    const term = httpRouteSearchValue.trim().toLowerCase();
    if (!term) return availableHttpRoutes;
    return availableHttpRoutes.filter(r => r.name.toLowerCase().includes(term));
  }, [httpRouteSearchValue]);

  // Get selected HTTPRoute object
  const selectedRouteObject = React.useMemo(() => {
    if (!selectedHttpRoute) return null;
    return availableHttpRoutes.find(route => route.name === selectedHttpRoute);
  }, [selectedHttpRoute]);

  // Open edit modal when navigating with ?edit=ProductName (e.g. from APIDetails pen icon)
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editName = params.get('edit');
    if (editName) {
      setEditingProductName(decodeURIComponent(editName));
      setIsCreateModalOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  // Load form when modal opens for edit
  React.useEffect(() => {
    if (!isCreateModalOpen || !editingProductName) return;
    const product = apiProducts.find(p => p.name === editingProductName);
    let stored: any = null;
    try {
      const raw = localStorage.getItem('apiProductDetails');
      if (raw) stored = JSON.parse(raw)[editingProductName] || null;
    } catch (_) {}
    setApiProductName(product?.name || stored?.name || editingProductName);
    setResourceName(product?.resourceName ?? stored?.api ?? stored?.resourceName ?? '');
    setVersion(product?.version || stored?.version || 'V1');
    setSelectedTag(product?.tags?.[0] || stored?.tag || 'Aircraft');
    setDescription(product?.description ?? stored?.productDescription ?? '');
    setOpenApiSpecUrl(product?.openApiSpecUrl ?? stored?.openApiSpecUrl ?? '');
    setOpenApiSpecUrlError('');
    setDocumentationUrl(product?.documentationUrl ?? stored?.documentationUrl ?? '');
    setSelectedHttpRoute(product?.route || stored?.route || '');
    setHttpRoutePolicies(product?.policy ?? stored?.policies ?? '');
    setCreationLifecycle(product?.lifecycle || stored?.lifecycle || 'Production');
    setCreationPublishStatus((product?.status || stored?.status) === 'Published' ? 'Published' : 'Draft');
    setApiKeyApproval(stored?.apiKeyApproval === 'Automatic' ? 'automatic' : 'manual');
  }, [isCreateModalOpen, editingProductName]);
  
  // Parse plan details to extract tier information
  const parsePlanDetails = (planDetails?: string) => {
    if (!planDetails) return [];
    // Parse format: "Gold: 100/day; Silver: 50/day; Bronze: 10/day"
    const tiers = planDetails.split(';').map(tier => {
      const [name, value] = tier.split(':').map(s => s.trim());
      return { name, value };
    });
    return tiers;
  };
  
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
  const [connectivityLinkExpanded, setConnectivityLinkExpanded] = React.useState(true);

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

  // Toggle functions for multiple select filters
  const handlePolicyToggle = (policy: string) => {
    setPolicyFilter(prev => {
      if (prev.includes(policy)) {
        return prev.filter(p => p !== policy);
      } else {
        return [...prev, policy];
      }
    });
  };

  const handleRouteToggle = (route: string) => {
    setRouteFilter(prev => {
      if (prev.includes(route)) {
        return prev.filter(r => r !== route);
      } else {
        return [...prev, route];
      }
    });
  };

  const handleNamespaceToggle = (namespace: string) => {
    setNamespaceFilter(prev => {
      if (prev.includes(namespace)) {
        return prev.filter(n => n !== namespace);
      } else {
        return [...prev, namespace];
      }
    });
  };

  const handleTagsToggle = (tag: string) => {
    setTagsFilter(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
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
    } else if (itemId === 'api-keys-approval') {
      navigate('/developer-portal/api-keys-approval');
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
                    <rect x="2" y="2" width="2" height="12" rx="1" fill="black"/>
                    <path d="M 6 4 L 6 12 L 14 8 L 6 4 Z" fill="black"/>
                    <path d="M 8 8 L 14 4 L 14 12 L 8 8 Z" fill="black" opacity="0.85"/>
                  </svg>
                  Kuadrant
                </span>
              }
              id="connectivity-link-group"
              isExpanded={connectivityLinkExpanded}
              onToggle={() => setConnectivityLinkExpanded(!connectivityLinkExpanded)}
            >
              {currentRole !== 'API consumer' && (
                <NavItem itemId="dev-portal" isActive={location.pathname === '/developer-portal' && !location.pathname.includes('/api-keys')} icon={<ApiProductsNavIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" isActive={location.pathname === '/developer-portal/api-keys'} icon={<KeyIcon />} onClick={() => handleNavClick('api-keys')}>
                My API keys
              </NavItem>
              {currentRole === 'API owner' && (
                <NavItem itemId="api-keys-approval" isActive={location.pathname === '/developer-portal/api-keys-approval'} icon={<ClipboardCheckIcon />} onClick={() => handleNavClick('api-keys-approval')}>
                  API keys approval
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

  return (
    <>

      {/* Publish Notification */}
      {showPublishNotification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 1000,
          maxWidth: '500px',
          width: '100%'
        }}>
          <Alert
            variant="success"
            isLiveRegion
            title="API product has been successfully published"
            actionClose={
              <AlertActionCloseButton onClose={() => setShowPublishNotification(false)} />
            }
          >
            <div style={{ marginTop: '8px', fontSize: '14px' }}>
              API product: {publishedApiProductName}
            </div>
          </Alert>
        </div>
      )}
      
      <Page masthead={masthead} sidebar={sidebar}>
      <PageSection className="developer-portal-main-content">
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
              API Product
          </Title>
            <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
              Make your API discoverable and usable within an enterprise.
            </p>
            
            {/* Divider line */}
            <div style={{ 
              borderBottom: '1px solid #d0d0d0', 
              marginBottom: '24px',
              marginTop: '8px'
            }} />
          </div>
        </div>

        {/* API products content */}
        {/* Create API Product button */}
                {currentRole === 'API owner' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
            <Button variant="primary" icon={<PlusCircleIcon />} onClick={() => setIsCreateModalOpen(true)}>
              Create API Product
            </Button>
                  </div>
                )}

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
                      <span style={{ fontWeight: 'bold' }}>{apiProducts.length}</span>
                </div>
                <div
                  role="button"
                      onClick={() => setStatusFilter('Draft')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#6a6e73',
                        border: statusFilter === 'Draft' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                        marginBottom: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DraftClipboardIcon size={20} />
                        <span>Draft</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#6a6e73' }}>{apiProducts.filter(p => p.status === 'Draft').length}</span>
                </div>
                <div
                  role="button"
                      onClick={() => setStatusFilter('Published')}
                  style={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#3e8635',
                        border: statusFilter === 'Published' ? '2px solid #0066CC' : '2px solid transparent',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PublishedClipboardIcon size={20} />
                        <span style={{ color: '#3e8635' }}>Published</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#3e8635' }}>{apiProducts.filter(p => p.status === 'Published').length}</span>
                </div>
              </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Policy</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <Dropdown
                      isOpen={isPolicyDropdownOpen}
                      onOpenChange={(isOpen) => setIsPolicyDropdownOpen(isOpen)}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          onClick={() => setIsPolicyDropdownOpen(!isPolicyDropdownOpen)}
                          isExpanded={isPolicyDropdownOpen}
                          style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                            {policyFilter.length === 0 ? (
                              <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                            ) : (
                              <>
                                {policyFilter.map(policy => (
                                  <Label
                                    key={policy}
                                    onClose={() => handlePolicyToggle(policy)}
                                    style={{ margin: 0 }}
                                  >
                                    {policy}
                                  </Label>
                                ))}
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Button
                                    variant="plain"
                                    aria-label="Clear all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPolicyFilter([]);
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
                      <DropdownList style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {Array.from(new Set(apiProducts.map(p => p.policy))).map(policy => (
                          <DropdownItem
                            key={policy}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePolicyToggle(policy);
                            }}
                          >
                            <Checkbox
                              isChecked={policyFilter.includes(policy)}
                              id={`policy-${policy}`}
                              label={policy}
                              onChange={() => handlePolicyToggle(policy)}
                            />
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </Dropdown>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Route</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <Dropdown
                      isOpen={isRouteDropdownOpen}
                      onOpenChange={(isOpen) => setIsRouteDropdownOpen(isOpen)}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
                          isExpanded={isRouteDropdownOpen}
                          style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                            {routeFilter.length === 0 ? (
                              <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                            ) : (
                              <>
                                {routeFilter.map(route => (
                                  <Label
                                    key={route}
                                    onClose={() => handleRouteToggle(route)}
                                    style={{ margin: 0 }}
                                  >
                                    {route}
                                  </Label>
                                ))}
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Button
                                    variant="plain"
                                    aria-label="Clear all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setRouteFilter([]);
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
                      <DropdownList style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {Array.from(new Set(apiProducts.map(p => p.route))).map(route => (
                          <DropdownItem
                            key={route}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRouteToggle(route);
                            }}
                          >
                            <Checkbox
                              isChecked={routeFilter.includes(route)}
                              id={`route-${route}`}
                              label={route}
                              onChange={() => handleRouteToggle(route)}
                            />
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </Dropdown>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Namespace</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <Dropdown
                      isOpen={isNamespaceDropdownOpen}
                      onOpenChange={(isOpen) => setIsNamespaceDropdownOpen(isOpen)}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          onClick={() => setIsNamespaceDropdownOpen(!isNamespaceDropdownOpen)}
                          isExpanded={isNamespaceDropdownOpen}
                          style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                            {namespaceFilter.length === 0 ? (
                              <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                            ) : (
                              <>
                                {namespaceFilter.map(namespace => (
                                  <Label
                                    key={namespace}
                                    onClose={() => handleNamespaceToggle(namespace)}
                                    style={{ margin: 0 }}
                                  >
                                    {namespace}
                                  </Label>
                                ))}
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Button
                                    variant="plain"
                                    aria-label="Clear all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setNamespaceFilter([]);
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
                      <DropdownList style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {Array.from(new Set(apiProducts.map(p => p.namespace))).map(namespace => (
                          <DropdownItem
                            key={namespace}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNamespaceToggle(namespace);
                            }}
                          >
                            <Checkbox
                              isChecked={namespaceFilter.includes(namespace)}
                              id={`namespace-${namespace}`}
                              label={namespace}
                              onChange={() => handleNamespaceToggle(namespace)}
                            />
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </Dropdown>
                  </div>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
                  <div style={{ marginBottom: '16px' }}>
                    <Dropdown
                      isOpen={isTagsDropdownOpen}
                      onOpenChange={(isOpen) => setIsTagsDropdownOpen(isOpen)}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                          isExpanded={isTagsDropdownOpen}
                          style={{ width: '100%', minHeight: '36px', padding: '4px 8px' }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%', minHeight: '28px' }}>
                            {tagsFilter.length === 0 ? (
                              <span style={{ color: '#6a6e73', fontSize: '14px' }}>All</span>
                            ) : (
                              <>
                                {tagsFilter.map(tag => (
                                  <Label
                                    key={tag}
                                    onClose={() => handleTagsToggle(tag)}
                                    style={{ margin: 0 }}
                                  >
                                    {tag}
                                  </Label>
                                ))}
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Button
                                    variant="plain"
                                    aria-label="Clear all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTagsFilter([]);
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
                      <DropdownList style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {Array.from(new Set(apiProducts.flatMap(p => p.tags))).map(tag => (
                          <DropdownItem
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagsToggle(tag);
                            }}
                          >
                            <Checkbox
                              isChecked={tagsFilter.includes(tag)}
                              id={`tag-${tag}`}
                              label={tag}
                              onChange={() => handleTagsToggle(tag)}
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
                    <CardBody style={{ overflow: 'hidden' }}>
                      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Title headingLevel="h2" size="lg">
                            All API products
                          </Title>
                          <Tooltip content="API product is a basic unit consisting of API resource, HTTPRoutes, and its associated policies.">
                            <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                              <InfoIconOutline size={16} />
                            </Button>
                          </Tooltip>
                        </div>
                        <SearchInput
                          placeholder="Search"
                          value={productSearchValue}
                          onChange={(_, value) => setProductSearchValue(value)}
                          onClear={() => setProductSearchValue('')}
                          style={{ width: '100%', maxWidth: '300px' }}
                        />
                      </div>
                    <div style={{ width: '100%', overflowX: 'auto', overflowY: 'visible', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ minWidth: '1100px', width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '12%', minWidth: '100px' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '6%', minWidth: '64px' }}>Version</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '9%', minWidth: '90px' }}>Route</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '10%', minWidth: '100px' }}>Policy</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '10%', minWidth: '90px' }}>Tags</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '8%', minWidth: '80px' }}>Status</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '10%', minWidth: '95px' }}>Lifecycle</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '14px', fontWeight: 'bold', width: '11%', minWidth: '110px' }}>Authentication</th>
                          <th style={{ textAlign: 'left', padding: '16px 8px 16px 20px', fontSize: '14px', fontWeight: 'bold', width: '10%', minWidth: '105px' }}>Namespace</th>
                          <th style={{ textAlign: 'left', padding: '16px 20px 16px 8px', fontSize: '14px', fontWeight: 'bold', width: '14%', minWidth: '140px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {apiProducts
                          .filter(product => {
                            if (statusFilter !== 'All' && product.status !== statusFilter) return false;
                            if (policyFilter.length > 0 && !policyFilter.includes(product.policy)) return false;
                            if (routeFilter.length > 0 && !routeFilter.includes(product.route)) return false;
                            if (namespaceFilter.length > 0 && !namespaceFilter.includes(product.namespace)) return false;
                            if (tagsFilter.length > 0 && !tagsFilter.some(tag => product.tags.includes(tag))) return false;
                            if (productSearchValue && !product.name.toLowerCase().includes(productSearchValue.toLowerCase())) return false;
                            return true;
                          })
                          .map((product, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                              <td style={{ padding: '16px 20px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(product.name)}`)}
                                >
                                {product.name}
                                </Button>
                              </td>
                            <td style={{ padding: '16px 20px' }}>{product.version}</td>
                            <td style={{ padding: '16px 20px' }}>{product.route}</td>
                            <td style={{ padding: '16px 20px' }}>{product.policy}</td>
                              <td style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                  {product.tags && product.tags.length > 0
                                    ? product.tags.map((tag, i) => (
                                        <Label key={i} variant="outline" color="grey" style={{ margin: 0 }}>
                                          {tag}
                                        </Label>
                                      ))
                                    : <span style={{ color: '#6a6e73' }}>-</span>}
                                </div>
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                {product.status === 'Draft' ? (
                                  <span style={{ display: 'inline-block', padding: '2px 8px', fontSize: '12px', borderRadius: '16px', border: '1px solid #8a8d90', color: '#151515', backgroundColor: 'transparent' }}>Draft</span>
                                ) : (
                                  <span style={{ display: 'inline-block', padding: '2px 8px', fontSize: '12px', borderRadius: '16px', border: 'none', color: '#fff', backgroundColor: '#0066cc' }}>Published</span>
                                )}
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                <span style={{ display: 'inline-block', padding: '2px 8px', fontSize: '12px', borderRadius: '16px', border: 'none', color: '#fff', backgroundColor: '#0066cc' }}>{product.lifecycle || 'Production'}</span>
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                <span style={{ fontStyle: 'italic', color: '#151515' }}>{product.authentication ?? 'unknown'}</span>
                              </td>
                            <td style={{ padding: '16px 8px 16px 20px' }}>{product.namespace}</td>
                            <td style={{ padding: '16px 20px 16px 8px', textAlign: 'left' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {product.status === 'Draft' ? (
                                    <Button variant="link" isInline onClick={() => {
                                      setApiProducts(prev => prev.map(p => 
                                        p.name === product.name ? { ...p, status: 'Published' as const } : p
                                      ));
                                    }} style={{ padding: '0 4px', whiteSpace: 'nowrap' }}>
                                      Publish
                                    </Button>
                                  ) : (
                                    <Button variant="link" isInline onClick={() => {
                                      setApiProducts(prev => prev.map(p => 
                                        p.name === product.name ? { ...p, status: 'Draft' as const } : p
                                      ));
                                    }} style={{ padding: '0 4px', whiteSpace: 'nowrap' }}>
                                      Unpublish
                                    </Button>
                                  )}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
                                  <Button
                                    variant="plain"
                                    aria-label="Edit"
                                    onClick={() => {
                                      setEditingProductName(product.name);
                                      setIsCreateModalOpen(true);
                                    }}
                                    style={{ padding: '4px', minWidth: 'auto' }}
                                  >
                                    <PencilAltIcon />
                                  </Button>
                                  <Button variant="plain" aria-label="Delete" onClick={() => {
                                    setApiProducts(prev => prev.filter(p => p.name !== product.name));
                                  }} style={{ padding: '4px', minWidth: 'auto' }}>
                                    <TrashIcon />
                                  </Button>
                                </div>
                              </div>
                            </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </CardBody>
                  </Card>
              </GridItem>
            </Grid>
      </PageSection>
      </Page>

      {/* Create API Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingProductName(null);
          setApiProductName('');
          setResourceName('');
          setVersion('');
          setSelectedTag('Aircraft');
          setDescription('');
          setOpenApiSpecUrl('');
          setDocumentationUrl('');
          setDocumentationUrlFocused(false);
          setSelectedHttpRoute('');
          setHttpRoutePolicies('');
          setCreationLifecycle('Production');
          setCreationPublishStatus('Draft');
          setApiKeyApproval('manual');
        }}
        variant="large"
        style={{ maxWidth: '800px' }}
      >
        <ModalHeader>
          <Title headingLevel="h2">{editingProductName ? 'Edit API product' : 'Create API product'}</Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
            {editingProductName ? 'Update your API product configuration.' : 'Create API product by registering existing API, associate route and policy.'}
          </p>
        </ModalHeader>
        <ModalBody style={{ padding: '24px', paddingTop: '8px' }}>
          {/* API product info */}
          <Title headingLevel="h3" size="md" style={{ marginBottom: '16px', marginTop: '0' }}>
            API product info
          </Title>
          
          <Grid hasGutter>
            {/* First row: API product name and Resource name */}
            <GridItem span={6}>
              <FormGroup 
                label={
                  <span>
                    API product name <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={apiProductName}
                  onChange={(_, value) => setApiProductName(value)}
                />
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  Give a unique name for your API product.
                </p>
              </FormGroup>
            </GridItem>

            <GridItem span={6}>
              <FormGroup 
                label={
                  <span>
                    Resource name <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={resourceName}
                  onChange={(_, value) => setResourceName(value)}
                />
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  Kubernetes resource name with lowercase, hyphens. Eg.flight_API.
                </p>
              </FormGroup>
            </GridItem>

            {/* Second row: Version and Tag */}
            <GridItem span={6}>
              <FormGroup 
                label={
                  <span>
                    Version <span style={{ color: '#C9190B' }}>*</span>
                  </span>
                }
                isRequired={false}
                style={{ marginBottom: '16px' }}
              >
                <TextInput
                  value={version}
                  onChange={(_, value) => setVersion(value)}
                />
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  Give a version to your API product.
                </p>
              </FormGroup>
            </GridItem>

            <GridItem span={6}>
              <FormGroup 
                label="Tag"
                style={{ marginBottom: '16px' }}
              >
                    <Dropdown
                  isOpen={isTagDropdownOpen}
                  onOpenChange={(isOpen) => setIsTagDropdownOpen(isOpen)}
                      toggle={(toggleRef) => (
                    <MenuToggle 
                      ref={toggleRef} 
                      onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)} 
                      isExpanded={isTagDropdownOpen}
                      style={{ width: '100%' }}
                    >
                      {selectedTag || 'Aircraft'}
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                    {availableTags.map((tag) => (
                          <DropdownItem
                        key={tag}
                            onClick={() => {
                          setSelectedTag(tag);
                          setIsTagDropdownOpen(false);
                            }}
                          >
                        {tag}
                          </DropdownItem>
                    ))}
                      </DropdownList>
                    </Dropdown>
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  Add a tag to your API product.
                </p>
              </FormGroup>
            </GridItem>
          </Grid>

          <FormGroup 
            label="Description"
            style={{ marginBottom: '24px' }}
          >
            <TextArea
              value={description}
              onChange={(_, value) => setDescription(value)}
              rows={1}
            />
          </FormGroup>

          {/* Add API and Associate route */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              Add API and Associate route
            </Title>
            <Tooltip content="Register an existing API and associate an HTTRroute for your API product">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoIconOutline size={16} />
              </Button>
            </Tooltip>
          </div>

          <FormGroup 
            label={
              <span>
                Open API Spec URL <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <TextInput
                value={openApiSpecUrl}
                onChange={(_, value) => handleOpenApiSpecUrlChange(value)}
                placeholder=""
                style={{ flex: 1 }}
                validated={openApiSpecUrlError ? 'error' : 'default'}
              />
              <Dropdown
                isOpen={isOpenApiSpecMenuOpen}
                onSelect={() => setIsOpenApiSpecMenuOpen(false)}
                onOpenChange={(isOpen) => setIsOpenApiSpecMenuOpen(isOpen)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    variant="plain"
                    onClick={() => setIsOpenApiSpecMenuOpen(!isOpenApiSpecMenuOpen)}
                    isExpanded={isOpenApiSpecMenuOpen}
                    aria-label="Add API spec options"
                    style={{ padding: '8px' }}
                  >
                    <PlusIcon />
                  </MenuToggle>
                )}
                popperProps={{ 
                  appendTo: () => document.body,
                  position: 'right' as const,
                  enableFlip: true,
                  preventOverflow: true
                }}
              >
                <DropdownList>
                  <DropdownItem
                    key="upload-yaml"
                    onClick={() => {
                      // TODO: Implement upload YAML file functionality
                      setIsOpenApiSpecMenuOpen(false);
                    }}
                  >
                    Upload YAML file
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            </div>
            {openApiSpecUrlError ? (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem variant="error">
                    {openApiSpecUrlError}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            ) : (
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                Enter the full path to your API spec file. Eg.https://github.com/backstage/.
              </p>
            )}
          </FormGroup>

          <FormGroup
            label="Documentation URL"
            isRequired={false}
            style={{ marginBottom: '16px' }}
          >
            <TextInput
              value={documentationUrl}
              onChange={(_, value) => setDocumentationUrl(value)}
              onFocus={() => setDocumentationUrlFocused(true)}
              onBlur={() => setDocumentationUrlFocused(false)}
              placeholder={documentationUrlFocused ? 'https://doc.example.com/api' : ''}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
              Link to external documentation for this API
            </p>
          </FormGroup>

          <FormGroup 
            label={
              <span>
                HTTPRoute <span style={{ color: '#C9190B' }}>*</span>
              </span>
            }
            isRequired={false}
            style={{ marginBottom: '24px' }}
          >
                <Dropdown
              isOpen={isHttpRouteDropdownOpen}
              onOpenChange={(isOpen) => {
                setIsHttpRouteDropdownOpen(isOpen);
                if (!isOpen) setHttpRouteSearchValue('');
              }}
                  toggle={(toggleRef) => (
                    <MenuToggle 
                      ref={toggleRef} 
                  onClick={() => setIsHttpRouteDropdownOpen(!isHttpRouteDropdownOpen)} 
                  isExpanded={isHttpRouteDropdownOpen}
                      style={{ width: '100%' }}
                    >
                  {selectedHttpRoute || 'Select HTTPRoute'}
                    </MenuToggle>
                  )}
                  popperProps={{ 
                    appendTo: () => document.body,
                    position: 'right' as const,
                    enableFlip: true,
                    preventOverflow: true
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px',
                      borderBottom: '1px solid #d0d0d0',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      backgroundColor: '#fff'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SearchInput
                      placeholder="Search..."
                      value={httpRouteSearchValue}
                      onChange={(_, value) => setHttpRouteSearchValue(value)}
                      onClear={() => setHttpRouteSearchValue('')}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <select
                      value={httpRouteSortBy}
                      onChange={(e) => setHttpRouteSortBy(e.target.value)}
                      style={{
                        padding: '6px 24px 6px 8px',
                        fontSize: '14px',
                        color: '#151515',
                        border: '1px solid #8a8d90',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        minWidth: '80px'
                      }}
                    >
                      <option value="Name">Name</option>
                    </select>
                  </div>
                  <DropdownList style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredHttpRoutes.map((route) => (
                    <DropdownItem
                    key={route.name}
                      onClick={() => {
                      setSelectedHttpRoute(route.name);
                      setIsHttpRouteDropdownOpen(false);
                      setHttpRouteSearchValue('');
                      }}
                      style={{ padding: '8px 12px' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ fontWeight: 500, color: '#151515' }}>{route.name}</div>
                        <div style={{ fontSize: '12px', color: '#6a6e73' }}>
                          Associated PlanPolicy: {route.planPolicy}
                          {route.planDetails && ` (${route.planDetails})`}
                        </div>
                      </div>
                    </DropdownItem>
                ))}
                  </DropdownList>
                </Dropdown>
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
              Select an HTTPRoute. Eg.backstage.io/expose:true. API product will be created in the same namespace.
            </p>
              </FormGroup>

          <Divider style={{ marginBottom: '24px' }} />

          {/* HTTPRoute policies - always show */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              HTTPRoute policies
            </Title>
            <Tooltip content="Policies attach to a certain HTTPRoute">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoIconOutline size={16} />
              </Button>
            </Tooltip>
          </div>

          {selectedHttpRoute && selectedRouteObject && selectedRouteObject.planPolicy && selectedRouteObject.planPolicy !== 'N/A' && selectedRouteObject.planDetails ? (
            <Card style={{ marginBottom: '24px', border: '1px solid #d0d0d0' }}>
              <CardBody>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: 500, color: '#151515' }}>PlanPolicy: </span>
                  <span style={{ color: '#151515' }}>{selectedRouteObject.planPolicy}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 500, color: '#151515', marginRight: '8px' }}>Tiers:</span>
                  {parsePlanDetails(selectedRouteObject.planDetails).map((tier, index) => {
                    // Determine badge color based on tier name
                    let badgeColor = '#6a6e73';
                    let badgeBgColor = '#f5f5f5';
                    if (tier.name === 'Gold') {
                      badgeColor = '#795600';
                      badgeBgColor = '#fef5e7';
                    } else if (tier.name === 'Silver') {
                      badgeColor = '#6a6e73';
                      badgeBgColor = '#f5f5f5';
                    } else if (tier.name === 'Bronze') {
                      badgeColor = '#004d99';
                      badgeBgColor = '#e6f1fa';
                    }
                    return (
                      <Badge
                        key={index}
                        isRead
                        style={{
                          marginRight: '8px',
                          backgroundColor: badgeBgColor,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}`,
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                      >
                        {tier.name}: {tier.value}
                      </Badge>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          ) : selectedHttpRoute && selectedRouteObject && selectedRouteObject.planPolicy === 'N/A' ? (
            <Alert
              variant="warning"
              title="PlanPolicy association Failed: PlanPolicy does not have the right auth policy"
              style={{ marginBottom: '24px' }}
            >
              The PlanPolicy{' '}
              <Button variant="link" isInline style={{ padding: 0, textDecoration: 'underline', fontSize: 'inherit' }}>
                '{selectedRouteObject.name}'
              </Button>{' '}
              does not have the right auth policy. Please check the{' '}
              <Button variant="link" isInline style={{ padding: 0, textDecoration: 'underline', fontSize: 'inherit' }}>
                PlanPolicy configuration
              </Button>
            </Alert>
          ) : selectedHttpRoute ? (
            <FormGroup style={{ marginBottom: '24px' }}>
              <TextArea
                value={httpRoutePolicies}
                onChange={(_, value) => setHttpRoutePolicies(value)}
                rows={1}
                placeholder=""
              />
            </FormGroup>
          ) : (
            <Card style={{ marginBottom: '24px', border: '1px solid #d0d0d0', backgroundColor: '#fafafa' }}>
              <CardBody>
              </CardBody>
            </Card>
          )}

          {/* Lifecycle and Visibility */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              Lifecycle and Visibility
            </Title>
            <Tooltip content="Configure lifecycle state and catalog visibility for this API product">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoIconOutline size={16} />
              </Button>
            </Tooltip>
          </div>
          <Grid hasGutter style={{ marginBottom: '24px' }}>
            <GridItem span={6}>
              <FormGroup label="Lifecycle" fieldId="creation-lifecycle" style={{ marginBottom: 0 }}>
                <Dropdown
                  isOpen={isCreationLifecycleDropdownOpen}
                  onOpenChange={(isOpen) => setIsCreationLifecycleDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsCreationLifecycleDropdownOpen(!isCreationLifecycleDropdownOpen)}
                      isExpanded={isCreationLifecycleDropdownOpen}
                      style={{ width: '100%' }}
                    >
                      {creationLifecycle}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {lifecycleOptions.map((option) => (
                      <DropdownItem
                        key={option}
                        onClick={() => {
                          setCreationLifecycle(option);
                          setIsCreationLifecycleDropdownOpen(false);
                        }}
                      >
                        {option}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  API lifecycle state
                </p>
              </FormGroup>
            </GridItem>
            <GridItem span={6}>
              <FormGroup label="Publish Status" fieldId="creation-publish-status" style={{ marginBottom: 0 }}>
                <Dropdown
                  isOpen={isCreationPublishStatusDropdownOpen}
                  onOpenChange={(isOpen) => setIsCreationPublishStatusDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setIsCreationPublishStatusDropdownOpen(!isCreationPublishStatusDropdownOpen)}
                      isExpanded={isCreationPublishStatusDropdownOpen}
                      style={{ width: '100%' }}
                    >
                      {creationPublishStatus}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    <DropdownItem onClick={() => { setCreationPublishStatus('Draft'); setIsCreationPublishStatusDropdownOpen(false); }}>
                      Draft
                    </DropdownItem>
                    <DropdownItem onClick={() => { setCreationPublishStatus('Published'); setIsCreationPublishStatusDropdownOpen(false); }}>
                      Published
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
                  Controls catalog visibility (Draft = hidden from consumers)
                </p>
              </FormGroup>
            </GridItem>
          </Grid>

          {/* API Key approval */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              API Key approval
            </Title>
            <Tooltip content="Information about API Key approval">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoIconOutline size={16} />
              </Button>
            </Tooltip>
                </div>

          <Grid hasGutter style={{ marginBottom: '16px' }}>
            <GridItem span={6}>
              <FormGroup style={{ marginBottom: 0 }}>
                <Radio
                  isChecked={apiKeyApproval === 'manual'}
                  name="apiKeyApproval"
                  onChange={() => setApiKeyApproval('manual')}
                  label="Need manual approval"
                  id="manual-approval"
                />
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '4px', marginLeft: '24px', marginBottom: 0 }}>
                  Requires approval for requesting this API.
                </p>
              </FormGroup>
            </GridItem>
            <GridItem span={6}>
              <FormGroup style={{ marginBottom: 0 }}>
                <Radio
                  isChecked={apiKeyApproval === 'automatic'}
                  name="apiKeyApproval"
                  onChange={() => setApiKeyApproval('automatic')}
                  label="Automatic"
                  id="automatic-approval"
                />
                <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '4px', marginLeft: '24px', marginBottom: 0 }}>
                  Keys are created without need to be approved.
                </p>
              </FormGroup>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              const productName = apiProductName;
              const routeObject = selectedRouteObject;
              const policy = httpRoutePolicies || routeObject?.planPolicy || 'N/A';
              const newProduct: APIProduct = {
                name: productName,
                version: version,
                route: selectedHttpRoute,
                policy: policy,
                tags: [selectedTag],
                status: creationPublishStatus,
                lifecycle: creationLifecycle,
                namespace: 'namespace-1',
                resourceName: resourceName,
                openApiSpecUrl: openApiSpecUrl,
                documentationUrl: documentationUrl || undefined,
                description: description,
                apiKeyApproval: apiKeyApproval
              };
              const productDetails = {
                name: productName,
                tag: selectedTag,
                productDescription: description,
                status: creationPublishStatus,
                version: version,
                namespace: 'namespace-1',
                apiKeyApproval: apiKeyApproval === 'manual' ? 'Need manual approval' : 'Automatic',
                api: resourceName,
                route: selectedHttpRoute,
                policies: policy,
                openApiSpecUrl: openApiSpecUrl,
                documentationUrl: documentationUrl || undefined,
                lifecycle: creationLifecycle
              };
              if (editingProductName) {
                setApiProducts(prev =>
                  editingProductName === productName
                    ? prev.map(p => (p.name === editingProductName ? newProduct : p))
                    : prev.filter(p => p.name !== editingProductName).concat([newProduct])
                );
                try {
                  const storedProducts = localStorage.getItem('apiProductDetails');
                  const productsMap = storedProducts ? JSON.parse(storedProducts) : {};
                  if (editingProductName !== productName) delete productsMap[editingProductName];
                  productsMap[productName] = productDetails;
                  localStorage.setItem('apiProductDetails', JSON.stringify(productsMap));
                } catch (e) {
                  console.error('Failed to save product details to localStorage:', e);
                }
              } else {
                setApiProducts(prev => [...prev, newProduct]);
                try {
                  const storedProducts = localStorage.getItem('apiProductDetails');
                  const productsMap = storedProducts ? JSON.parse(storedProducts) : {};
                  productsMap[productName] = productDetails;
                  localStorage.setItem('apiProductDetails', JSON.stringify(productsMap));
                } catch (e) {
                  console.error('Failed to save product details to localStorage:', e);
                }
                navigate(`/developer-portal/api-details/${encodeURIComponent(productName)}?created=true`);
              }
              setIsCreateModalOpen(false);
              setEditingProductName(null);
              setApiProductName('');
              setResourceName('');
              setVersion('');
              setSelectedTag('Aircraft');
              setDescription('');
              setOpenApiSpecUrl('');
              setOpenApiSpecUrlError('');
              setDocumentationUrl('');
              setDocumentationUrlFocused(false);
              setSelectedHttpRoute('');
              setHttpRoutePolicies('');
              setCreationLifecycle('Production');
              setCreationPublishStatus('Draft');
              setApiKeyApproval('manual');
            }}
            isDisabled={!apiProductName || !resourceName || !version || !openApiSpecUrl || !selectedHttpRoute}
          >
            {editingProductName ? 'Save' : 'Create'}
          </Button>
          <Button
            variant="link"
            onClick={() => {
              setIsCreateModalOpen(false);
              setEditingProductName(null);
              setApiProductName('');
              setResourceName('');
              setVersion('');
              setSelectedTag('Aircraft');
              setDescription('');
              setOpenApiSpecUrl('');
              setDocumentationUrl('');
              setDocumentationUrlFocused(false);
              setSelectedHttpRoute('');
              setHttpRoutePolicies('');
              setCreationLifecycle('Production');
              setCreationPublishStatus('Draft');
              setApiKeyApproval('manual');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export { DeveloperPortal };