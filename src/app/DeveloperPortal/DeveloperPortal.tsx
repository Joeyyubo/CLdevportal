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
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  TextInput,
  TextArea,
  Radio,
  Divider as PFDivider,
} from '@patternfly/react-core';
import {
  StarIcon,
  BellIcon,
  UserIcon,
  CaretDownIcon,
  HomeIcon,
  ArchiveIcon,
  CogIcon,
  FileAltIcon,
  GraduationCapIcon,
  PlusCircleIcon,
  ShieldAltIcon,
  ExclamationCircleIcon,
  CodeIcon,
  ExclamationTriangleIcon,
  PencilAltIcon,
  TrashIcon,
  PlusIcon,
  InfoCircleIcon,
  CheckIcon,
} from '@patternfly/react-icons';
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
  namespace: string;
}

// Initial API products data
const initialApiProducts: APIProduct[] = [
  { name: 'Flight ticket API', version: 'V1', route: 'petstore-1', policy: 'toystore-plans', tags: ['Ticket'], status: 'Draft', namespace: 'namespace-1' },
  { name: 'Flight API', version: 'V2', route: 'petstore-2', policy: 'N/A', tags: ['Payment'], status: 'Published', namespace: 'namespace-1' },
  { name: 'Ticket API', version: 'V1', route: 'petstore-3', policy: 'toystore-plans', tags: ['Aircraft'], status: 'Published', namespace: 'namespace-2' },
  { name: 'Flight API', version: 'V2', route: 'petstore-4', policy: 'N/A', tags: ['Payment'], status: 'Draft', namespace: 'namespace-3' },
];

const DeveloperPortal: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userToggleRef = React.useRef<HTMLButtonElement>(null);
  
  // API Product states
  const [apiProducts, setApiProducts] = React.useState<APIProduct[]>(initialApiProducts);
  const [statusFilter, setStatusFilter] = React.useState('All'); // 'All', 'Draft', 'Published'
  const [policyFilter, setPolicyFilter] = React.useState('All');
  const [routeFilter, setRouteFilter] = React.useState('All');
  const [namespaceFilter, setNamespaceFilter] = React.useState('All');
  const [tagsFilter, setTagsFilter] = React.useState('All');
  const [productSearchValue, setProductSearchValue] = React.useState('');
  const [productPage, setProductPage] = React.useState(1);
  const [productPerPage, setProductPerPage] = React.useState(10);
  
  // Create API Product modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [apiProductName, setApiProductName] = React.useState('');
  const [resourceName, setResourceName] = React.useState('');
  const [version, setVersion] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState('Aircraft');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [openApiSpecUrl, setOpenApiSpecUrl] = React.useState('');
  const [selectedHttpRoute, setSelectedHttpRoute] = React.useState('');
  const [isHttpRouteDropdownOpen, setIsHttpRouteDropdownOpen] = React.useState(false);
  const [httpRoutePolicies, setHttpRoutePolicies] = React.useState('');
  const [apiKeyApproval, setApiKeyApproval] = React.useState<'manual' | 'automatic'>('manual');
  
  // Available tags and HTTP routes
  const availableTags = ['Aircraft', 'Ticket', 'Payment', 'Client'];
  const availableHttpRoutes = ['backstage.io/expose:true', 'route-1', 'route-2', 'route-3'];
  
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

  return (
    <>
      <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Title headingLevel="h1" size="2xl" style={{ marginBottom: '8px' }}>
              API Product
          </Title>
            <p style={{ fontSize: '14px', color: '#6a6e73', marginBottom: '16px' }}>
              Manage your API product before publishing.
            </p>
            
            {/* Divider line */}
            <div style={{ 
              borderBottom: '1px solid #d0d0d0', 
              marginBottom: '24px',
              marginTop: '8px'
            }} />
              />
            )}
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
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}
                    value={policyFilter}
                    onChange={(e) => setPolicyFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {Array.from(new Set(apiProducts.map(p => p.policy))).map(policy => (
                      <option key={policy} value={policy}>{policy}</option>
                    ))}
              </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Route</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}
                    value={routeFilter}
                    onChange={(e) => setRouteFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {Array.from(new Set(apiProducts.map(p => p.route))).map(route => (
                      <option key={route} value={route}>{route}</option>
                    ))}
                  </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Namespace</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '16px' }}
                    value={namespaceFilter}
                    onChange={(e) => setNamespaceFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {Array.from(new Set(apiProducts.map(p => p.namespace))).map(namespace => (
                      <option key={namespace} value={namespace}>{namespace}</option>
                    ))}
                  </select>

                  <Title headingLevel="h3" size="md" style={{ marginBottom: '8px', marginTop: '16px' }}>Tags</Title>
                  <select 
                    style={{ width: '100%', padding: '8px', border: '1px solid #d0d0d0', borderRadius: '4px' }}
                    value={tagsFilter}
                    onChange={(e) => setTagsFilter(e.target.value)}
                  >
                        <option value="All">All</option>
                    {Array.from(new Set(apiProducts.flatMap(p => p.tags))).map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </GridItem>

              <GridItem span={9}>
                  <Card>
                    <CardBody>
                      <div style={{ marginBottom: '16px' }}>
                      <Title headingLevel="h2" size="lg" style={{ marginBottom: '16px' }}>
                        API product ({apiProducts.length})
                        </Title>
                      <SearchInput
                        placeholder="Search"
                        value={productSearchValue}
                        onChange={(_, value) => setProductSearchValue(value)}
                        onClear={() => setProductSearchValue('')}
                        style={{ width: '100%', maxWidth: '300px' }}
                      />
                      </div>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '800px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #d0d0d0' }}>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '20%' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '10%' }}>Version</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Route</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '15%' }}>Policy</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Tags</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Status</th>
                          <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px', fontWeight: 'bold', width: '12%' }}>Namespace</th>
                          <th style={{ textAlign: 'left', padding: '12px', paddingRight: '60px', fontSize: '14px', fontWeight: 'bold', width: '7%' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {apiProducts
                          .filter(product => {
                            if (statusFilter !== 'All' && product.status !== statusFilter) return false;
                            if (policyFilter !== 'All' && product.policy !== policyFilter) return false;
                            if (routeFilter !== 'All' && product.route !== routeFilter) return false;
                            if (namespaceFilter !== 'All' && product.namespace !== namespaceFilter) return false;
                            if (tagsFilter !== 'All' && !product.tags.includes(tagsFilter)) return false;
                            if (productSearchValue && !product.name.toLowerCase().includes(productSearchValue.toLowerCase())) return false;
                            return true;
                          })
                          .slice((productPage - 1) * productPerPage, productPage * productPerPage)
                          .map((product, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #d0d0d0' }}>
                              <td style={{ padding: '12px' }}>
                                <Button 
                                  variant="link" 
                                  isInline
                                onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(product.name)}`)}
                                >
                                {product.name}
                                </Button>
                              </td>
                            <td style={{ padding: '12px' }}>{product.version}</td>
                            <td style={{ padding: '12px' }}>{product.route}</td>
                            <td style={{ padding: '12px' }}>{product.policy}</td>
                              <td style={{ padding: '12px' }}>
                              {product.tags.map(tag => (
                                <Badge key={tag} isRead style={{ marginRight: '4px' }}>{tag}</Badge>
                              ))}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {product.status === 'Draft' ? (
                                    <>
                                      <DraftClipboardIcon size={16} />
                                      <span style={{ color: '#6a6e73' }}>Draft</span>
                                    </>
                                  ) : (
                                    <>
                                      <PublishedClipboardIcon size={16} />
                                      <span style={{ color: '#3e8635' }}>Published</span>
                                    </>
                                  )}
                                </div>
                              </td>
                            <td style={{ padding: '12px' }}>{product.namespace}</td>
                            <td style={{ padding: '12px', paddingRight: '60px' }}>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-start' }}>
                                {product.status === 'Draft' ? (
                                  <Button variant="link" isInline onClick={() => {
                                    setApiProducts(prev => prev.map(p => 
                                      p.name === product.name ? { ...p, status: 'Published' as const } : p
                                    ));
                                  }}>
                                    Publish
                                  </Button>
                                ) : (
                                  <Button variant="link" isInline onClick={() => {
                                    setApiProducts(prev => prev.map(p => 
                                      p.name === product.name ? { ...p, status: 'Draft' as const } : p
                                    ));
                                  }}>
                                    Unpublish
                                  </Button>
                                )}
                                <Button variant="plain" aria-label="Edit" onClick={() => {}} style={{ marginLeft: '0' }}>
                                  <PencilAltIcon />
                                </Button>
                                <Button variant="plain" aria-label="Delete" onClick={() => {
                                  setApiProducts(prev => prev.filter(p => p.name !== product.name));
                                }} style={{ marginLeft: '0' }}>
                                  <TrashIcon />
                                </Button>
                              </div>
                            </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <Pagination
                        itemCount={apiProducts.filter(product => {
                          if (statusFilter !== 'All' && product.status !== statusFilter) return false;
                          if (policyFilter !== 'All' && product.policy !== policyFilter) return false;
                          if (routeFilter !== 'All' && product.route !== routeFilter) return false;
                          if (namespaceFilter !== 'All' && product.namespace !== namespaceFilter) return false;
                          if (tagsFilter !== 'All' && !product.tags.includes(tagsFilter)) return false;
                          if (productSearchValue && !product.name.toLowerCase().includes(productSearchValue.toLowerCase())) return false;
                          return true;
                        }).length}
                        page={productPage}
                        perPage={productPerPage}
                        onSetPage={(_, page) => setProductPage(page)}
                        onPerPageSelect={(_, perPage) => {
                          setProductPerPage(perPage);
                          setProductPage(1);
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
      </PageSection>
      </Page>

      {/* Create API Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setApiProductName('');
          setResourceName('');
          setVersion('');
          setSelectedTag('Aircraft');
          setDescription('');
          setOpenApiSpecUrl('');
          setSelectedHttpRoute('');
          setHttpRoutePolicies('');
          setApiKeyApproval('manual');
        }}
        variant="large"
        style={{ maxWidth: '800px' }}
      >
        <ModalHeader>
          <Title headingLevel="h2">Create API product</Title>
          <p style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
            Create API product by registering existing API, associate route and policy.
          </p>
        </ModalHeader>
        <ModalBody style={{ padding: '24px', paddingTop: '8px' }}>
          {/* API product info */}
          <Title headingLevel="h3" size="md" style={{ marginBottom: '16px', marginTop: '0' }}>
            API product info
          </Title>
          
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
              placeholder="Air flight API"
            />
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
              Give a unique name for your API product.
            </p>
          </FormGroup>

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

          <FormGroup 
            label="Description"
            style={{ marginBottom: '24px' }}
          >
            <TextArea
              value={description}
              onChange={(_, value) => setDescription(value)}
              rows={4}
            />
          </FormGroup>

          <Divider style={{ marginBottom: '24px' }} />

          {/* Add API and Associate route */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              Add API and Associate route
            </Title>
            <Tooltip content="Information about adding API and associating route">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoCircleIcon style={{ fontSize: '16px', color: '#151515' }} />
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
                onChange={(_, value) => setOpenApiSpecUrl(value)}
                placeholder=""
                style={{ flex: 1 }}
              />
              <Button variant="plain" aria-label="Add" style={{ padding: '8px' }}>
                <PlusIcon />
              </Button>
            </div>
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
              Enter the full path to your API spec file. Eg.https://github.com/backstage/.
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
              onOpenChange={(isOpen) => setIsHttpRouteDropdownOpen(isOpen)}
                  toggle={(toggleRef) => (
                    <MenuToggle 
                      ref={toggleRef} 
                  onClick={() => setIsHttpRouteDropdownOpen(!isHttpRouteDropdownOpen)} 
                  isExpanded={isHttpRouteDropdownOpen}
                      style={{ width: '100%' }}
                    >
                  {selectedHttpRoute || ''}
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                {availableHttpRoutes.map((route) => (
                    <DropdownItem
                    key={route}
                      onClick={() => {
                      setSelectedHttpRoute(route);
                      setIsHttpRouteDropdownOpen(false);
                      }}
                    >
                    {route}
                    </DropdownItem>
                ))}
                  </DropdownList>
                </Dropdown>
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
              Select an HTTPRoute. Eg.backstage.io/expose:true. API product will be created in the same namespace.
            </p>
              </FormGroup>

          <Divider style={{ marginBottom: '24px' }} />

          {/* HTTPRoute policies */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              HTTPRoute policies
            </Title>
            <Tooltip content="Information about HTTPRoute policies">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoCircleIcon style={{ fontSize: '16px', color: '#151515' }} />
              </Button>
            </Tooltip>
          </div>

          <FormGroup style={{ marginBottom: '24px' }}>
                <TextArea
              value={httpRoutePolicies}
              onChange={(_, value) => setHttpRoutePolicies(value)}
              rows={6}
              placeholder=""
                />
              </FormGroup>

          <Divider style={{ marginBottom: '24px' }} />

          {/* API Key approval */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>
              API Key approval
            </Title>
            <Tooltip content="Information about API Key approval">
              <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}>
                <InfoCircleIcon style={{ fontSize: '16px', color: '#151515' }} />
                    </Button>
                  </Tooltip>
                </div>

          <FormGroup style={{ marginBottom: '16px' }}>
            <Radio
              isChecked={apiKeyApproval === 'manual'}
              name="apiKeyApproval"
              onChange={() => setApiKeyApproval('manual')}
              label="Need manual approval"
              id="manual-approval"
            />
            <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '4px', marginLeft: '24px', marginBottom: '16px' }}>
              Requires approval for requesting this API.
            </p>
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
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              // Handle create logic here
              setIsCreateModalOpen(false);
              setApiProductName('');
              setResourceName('');
              setVersion('');
              setSelectedTag('Aircraft');
              setDescription('');
              setOpenApiSpecUrl('');
              setSelectedHttpRoute('');
              setHttpRoutePolicies('');
              setApiKeyApproval('manual');
            }}
            isDisabled={!apiProductName || !resourceName || !version || !openApiSpecUrl || !selectedHttpRoute}
          >
            Create
          </Button>
          <Button
            variant="link"
            onClick={() => {
              setIsCreateModalOpen(false);
              setApiProductName('');
              setResourceName('');
              setVersion('');
              setSelectedTag('Aircraft');
              setDescription('');
              setOpenApiSpecUrl('');
              setSelectedHttpRoute('');
              setHttpRoutePolicies('');
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