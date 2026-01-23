import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  FormGroup,
  TextInput,
  TextArea,
  Radio,
  Card,
  CardBody,
  Tooltip,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Badge,
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
  PlusIcon,
  InfoCircleIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Import apiDetailsData from APIDetails.tsx
// For now, we'll define a simplified version here
const apiDetailsData: Record<string, any> = {
  'Flights API': {
    name: 'Flights API',
    tag: 'Ticket',
    description: 'Description of the API. Validated aggregated stream activity fact table, used for metrics.',
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    apiKeyApproval: 'Need manual approval',
    api: 'Air-flight-api',
    resourceName: 'air-flight-api',
    route: 'Airflight-1',
    policies: 'Airflight-plans',
    openApiSpecUrl: 'https://github.com/backstage/flights-api/blob/main/openapi.yaml',
  },
  'Booking API': {
    name: 'Booking API',
    tag: 'Payment',
    description: 'Retrieve detailed information about flight bookings including passenger details and payment status.',
    productDescription: 'Description of the API product.',
    status: 'Draft',
    version: 'V1',
    apiKeyApproval: 'Need manual approval',
    api: 'Booking-api',
    resourceName: 'booking-api',
    route: 'Booking-1',
    policies: 'Booking-plans',
    openApiSpecUrl: 'https://github.com/backstage/booking-api/blob/main/openapi.yaml',
  },
  // Add more as needed
};

// HTTPRoute interface
interface HTTPRoute {
  name: string;
  planPolicy: string;
  planDetails?: string;
}

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

const EditAPIProduct: React.FunctionComponent = () => {
  const { apiName } = useParams<{ apiName: string }>();
  const navigate = useNavigate();
  
  // Decode API name from URL and get details
  const decodedApiName = apiName ? decodeURIComponent(apiName) : '';
  
  // Try to get product details from localStorage first (for newly created products)
  const getStoredProductDetails = (): any => {
    try {
      const storedProducts = localStorage.getItem('apiProductDetails');
      if (storedProducts) {
        const productsMap = JSON.parse(storedProducts);
        return productsMap[decodedApiName] || null;
      }
    } catch (e) {
      console.error('Failed to read product details from localStorage:', e);
    }
    return null;
  };
  
  const storedProductDetails = getStoredProductDetails();
  
  const apiDetails = storedProductDetails 
    ? { ...apiDetailsData[decodedApiName] || {}, ...storedProductDetails }
    : (decodedApiName && apiDetailsData[decodedApiName] 
      ? apiDetailsData[decodedApiName] 
      : {
          name: decodedApiName || '',
          tag: 'Aircraft',
          description: '',
          productDescription: '',
          status: 'Draft',
          version: 'V1',
          apiKeyApproval: 'Need manual approval',
          api: '',
          resourceName: '',
          route: '',
          policies: '',
          openApiSpecUrl: '',
        });

  // Form states - initialize with existing data
  const [apiProductName, setApiProductName] = React.useState(apiDetails.name || '');
  const [resourceName, setResourceName] = React.useState(apiDetails.resourceName || apiDetails.api || '');
  const [version, setVersion] = React.useState(apiDetails.version || 'V1');
  const [selectedTag, setSelectedTag] = React.useState(apiDetails.tag || 'Aircraft');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = React.useState(false);
  const [description, setDescription] = React.useState(apiDetails.productDescription || '');
  const [openApiSpecUrl, setOpenApiSpecUrl] = React.useState(apiDetails.openApiSpecUrl || '');
  const [openApiSpecUrlError, setOpenApiSpecUrlError] = React.useState<string>('');
  const [isOpenApiSpecMenuOpen, setIsOpenApiSpecMenuOpen] = React.useState(false);
  const [selectedHttpRoute, setSelectedHttpRoute] = React.useState(apiDetails.route || '');
  const [isHttpRouteDropdownOpen, setIsHttpRouteDropdownOpen] = React.useState(false);
  const [httpRoutePolicies, setHttpRoutePolicies] = React.useState(apiDetails.policies || '');
  const [apiKeyApproval, setApiKeyApproval] = React.useState<'manual' | 'automatic'>(
    apiDetails.apiKeyApproval === 'Need manual approval' || apiDetails.apiKeyApproval === 'manual' ? 'manual' : 'automatic'
  );
  
  // Update form fields when apiDetails changes (e.g., when navigating to edit page)
  React.useEffect(() => {
    // Re-read from localStorage in case it was updated
    const currentStoredProductDetails = getStoredProductDetails();
    const currentApiDetails = currentStoredProductDetails 
      ? { ...apiDetailsData[decodedApiName] || {}, ...currentStoredProductDetails }
      : (decodedApiName && apiDetailsData[decodedApiName] 
        ? apiDetailsData[decodedApiName] 
        : {
            name: decodedApiName || '',
            tag: 'Aircraft',
            description: '',
            productDescription: '',
            status: 'Draft',
            version: 'V1',
            apiKeyApproval: 'Need manual approval',
            api: '',
            resourceName: '',
            route: '',
            policies: '',
            openApiSpecUrl: '',
          });
    
    if (currentApiDetails) {
      setApiProductName(currentApiDetails.name || '');
      setResourceName(currentApiDetails.resourceName || currentApiDetails.api || '');
      setVersion(currentApiDetails.version || 'V1');
      setSelectedTag(currentApiDetails.tag || 'Aircraft');
      setDescription(currentApiDetails.productDescription || '');
      setOpenApiSpecUrl(currentApiDetails.openApiSpecUrl || '');
      setSelectedHttpRoute(currentApiDetails.route || '');
      setHttpRoutePolicies(currentApiDetails.policies || '');
      setApiKeyApproval(
        currentApiDetails.apiKeyApproval === 'Need manual approval' || currentApiDetails.apiKeyApproval === 'manual' ? 'manual' : 'automatic'
      );
    }
  }, [decodedApiName]); // Re-run when API name changes
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

  // URL validation function
  const validateUrl = (url: string): string => {
    if (!url || url.trim() === '') {
      return '';
    }
    try {
      new URL(url);
      return '';
    } catch (e) {
      return 'Enter the full path to your API spec file. Eg.https://github.com/backstage/.';
    }
  };

  const handleOpenApiSpecUrlChange = (value: string) => {
    setOpenApiSpecUrl(value);
    const error = validateUrl(value);
    setOpenApiSpecUrlError(error);
  };

  // Get selected HTTPRoute object
  const selectedRouteObject = React.useMemo(() => {
    if (!selectedHttpRoute) return null;
    return availableHttpRoutes.find(route => route.name === selectedHttpRoute);
  }, [selectedHttpRoute]);

  // Parse plan details to extract tier information
  const parsePlanDetails = (planDetails?: string) => {
    if (!planDetails) return [];
    const tiers = planDetails.split(';').map(tier => {
      const [name, value] = tier.split(':').map(s => s.trim());
      return { name, value };
    });
    return tiers;
  };

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

  const handleSave = () => {
    // Handle save logic here
    // In a real app, this would make an API call to update the API product
    console.log('Saving API product:', {
      apiProductName,
      resourceName,
      version,
      selectedTag,
      description,
      openApiSpecUrl,
      selectedHttpRoute,
      httpRoutePolicies,
      apiKeyApproval
    });
    
    // Get the selected route object to extract policy
    const routeObject = selectedRouteObject;
    const policy = httpRoutePolicies || routeObject?.planPolicy || 'N/A';
    
    // Update product details in localStorage
    try {
      const productDetails = {
        name: apiProductName,
        tag: selectedTag,
        productDescription: description,
        status: apiDetails.status || 'Draft',
        version: version,
        namespace: apiDetails.namespace || 'namespace-1',
        apiKeyApproval: apiKeyApproval === 'manual' ? 'Need manual approval' : 'Automatic',
        api: resourceName,
        route: selectedHttpRoute,
        policies: policy,
        openApiSpecUrl: openApiSpecUrl
      };
      const storedProducts = localStorage.getItem('apiProductDetails');
      const productsMap = storedProducts ? JSON.parse(storedProducts) : {};
      productsMap[apiProductName] = productDetails;
      localStorage.setItem('apiProductDetails', JSON.stringify(productsMap));
    } catch (e) {
      console.error('Failed to save product details to localStorage:', e);
    }
    
    // Navigate back to API product details page
    navigate(`/developer-portal/api-details/${encodeURIComponent(apiProductName)}`);
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
                <NavItem itemId="dev-portal" isActive icon={<CodeIcon />} onClick={() => handleNavClick('dev-portal')}>
                  API products
                </NavItem>
              )}
              <NavItem itemId="api-keys" icon={<CogIcon />} onClick={() => handleNavClick('api-keys')}>
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
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: '16px' }}>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
              API products
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(decodedApiName)}`)}>
              {decodedApiName}
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            Edit API product
          </BreadcrumbItem>
        </Breadcrumb>

        <Title headingLevel="h1" size="2xl" style={{ marginBottom: '32px' }}>
          Edit API product
        </Title>

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
            <DropdownList style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {availableHttpRoutes.map((route) => (
                <DropdownItem
                  key={route.name}
                  onClick={() => {
                    setSelectedHttpRoute(route.name);
                    setIsHttpRouteDropdownOpen(false);
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
              <InfoCircleIcon style={{ fontSize: '16px', color: '#151515' }} />
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

        <FormGroup style={{ marginBottom: '24px' }}>
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

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <Button variant="secondary" onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(decodedApiName)}`)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            isDisabled={!apiProductName || !resourceName || !version || !selectedHttpRoute}
          >
            Save
          </Button>
        </div>
      </PageSection>
    </Page>
  );
};

export default EditAPIProduct;
