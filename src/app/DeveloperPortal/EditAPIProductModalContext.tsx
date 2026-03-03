import * as React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Title,
  FormGroup,
  TextInput,
  TextArea,
  Radio,
  Grid,
  GridItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  Card,
  CardBody,
  Tooltip,
  Divider,
  Alert,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Badge,
  SearchInput,
} from '@patternfly/react-core';
import { PlusIcon } from '@patternfly/react-icons';
import { InfoIconOutline } from './InfoIconOutline';
import './DeveloperPortal.css';

const availableTags = ['Aircraft', 'Ticket', 'Payment', 'Client'];
const lifecycleOptions = ['Experimental', 'Production', 'Deprecated', 'Retired'] as const;
interface HTTPRoute {
  name: string;
  planPolicy: string;
  planDetails?: string;
}
const availableHttpRoutes: HTTPRoute[] = [
  { name: 'Airflight-1', planPolicy: 'Airflight-plans', planDetails: 'Gold: 100/day; Silver: 50/day; Bronze: 10/day' },
  { name: 'Airflight-2', planPolicy: 'N/A' },
  { name: 'backstage.io/expose:true', planPolicy: 'N/A' },
  { name: 'route-1', planPolicy: 'route-plans', planDetails: 'Gold: 200/day; Silver: 100/day; Bronze: 20/day' },
  { name: 'route-2', planPolicy: 'N/A' },
  { name: 'route-3', planPolicy: 'route-plans-2', planDetails: 'Gold: 150/day; Silver: 75/day; Bronze: 15/day' },
];

function loadStoredDetails(productName: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem('apiProductDetails');
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, Record<string, unknown>>;
    return map[productName] || null;
  } catch {
    return null;
  }
}

function parsePlanDetails(planDetails?: string): { name: string; value: string }[] {
  if (!planDetails) return [];
  return planDetails.split(';').map((tier) => {
    const [name, value] = tier.split(':').map((s) => s.trim());
    return { name, value };
  });
}

export interface SavePayload {
  mode: 'create' | 'edit';
  productName: string;
  productDetails: Record<string, unknown>;
  newProduct: {
    name: string;
    version: string;
    route: string;
    policy: string;
    tags: string[];
    status: 'Draft' | 'Published';
    lifecycle?: string;
    namespace: string;
    resourceName?: string;
    openApiSpecUrl?: string;
    documentationUrl?: string;
    description?: string;
    apiKeyApproval?: 'manual' | 'automatic';
  };
}

interface APIProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  editingProductName: string | null;
  onSave: (data: SavePayload) => void;
  afterCreate?: (productName: string) => void;
}

const APIProductFormModal: React.FunctionComponent<APIProductFormModalProps> = ({
  isOpen,
  onClose,
  mode,
  editingProductName,
  onSave,
  afterCreate,
}) => {
  const [apiProductName, setApiProductName] = React.useState('');
  const [resourceName, setResourceName] = React.useState('');
  const [version, setVersion] = React.useState('V1');
  const [selectedTag, setSelectedTag] = React.useState('Aircraft');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [openApiSpecUrl, setOpenApiSpecUrl] = React.useState('');
  const [openApiSpecUrlError, setOpenApiSpecUrlError] = React.useState('');
  const [isOpenApiSpecMenuOpen, setIsOpenApiSpecMenuOpen] = React.useState(false);
  const [documentationUrl, setDocumentationUrl] = React.useState('');
  const [documentationUrlFocused, setDocumentationUrlFocused] = React.useState(false);
  const [selectedHttpRoute, setSelectedHttpRoute] = React.useState('');
  const [isHttpRouteDropdownOpen, setIsHttpRouteDropdownOpen] = React.useState(false);
  const [httpRouteSearchValue, setHttpRouteSearchValue] = React.useState('');
  const [httpRouteSortBy, setHttpRouteSortBy] = React.useState('Name');
  const [httpRoutePolicies, setHttpRoutePolicies] = React.useState('');
  const [creationLifecycle, setCreationLifecycle] = React.useState('Production');
  const [isCreationLifecycleDropdownOpen, setIsCreationLifecycleDropdownOpen] = React.useState(false);
  const [isCreationPublishStatusDropdownOpen, setIsCreationPublishStatusDropdownOpen] = React.useState(false);
  const [creationPublishStatus, setCreationPublishStatus] = React.useState<'Draft' | 'Published'>('Draft');
  const [apiKeyApproval, setApiKeyApproval] = React.useState<'manual' | 'automatic'>('manual');

  const selectedRouteObject = React.useMemo(() => {
    if (!selectedHttpRoute) return null;
    return availableHttpRoutes.find((r) => r.name === selectedHttpRoute) || null;
  }, [selectedHttpRoute]);

  const filteredHttpRoutes = React.useMemo(() => {
    const term = httpRouteSearchValue.trim().toLowerCase();
    if (!term) return availableHttpRoutes;
    return availableHttpRoutes.filter((r) => r.name.toLowerCase().includes(term));
  }, [httpRouteSearchValue]);

  const validateUrl = (url: string): string => {
    if (!url || url.trim() === '') return '';
    try {
      new URL(url);
      return '';
    } catch {
      return 'Enter the full path to your API spec file. Eg.https://github.com/backstage/.';
    }
  };
  const handleOpenApiSpecUrlChange = (value: string) => {
    setOpenApiSpecUrl(value);
    setOpenApiSpecUrlError(validateUrl(value));
  };

  React.useEffect(() => {
    if (!isOpen || mode !== 'edit' || !editingProductName) return;
    const stored = loadStoredDetails(editingProductName) as Record<string, unknown> | null;
    if (!stored) {
      setApiProductName(editingProductName);
      setResourceName('');
      setVersion('V1');
      setSelectedTag('Aircraft');
      setDescription('');
      setOpenApiSpecUrl('');
      setDocumentationUrl('');
      setSelectedHttpRoute('');
      setHttpRoutePolicies('');
      setCreationLifecycle('Production');
      setCreationPublishStatus('Draft');
      setApiKeyApproval('manual');
      return;
    }
    setApiProductName((stored.name as string) || editingProductName);
    setResourceName((stored.api as string) || (stored.resourceName as string) || '');
    setVersion((stored.version as string) || 'V1');
    setSelectedTag((stored.tag as string) || 'Aircraft');
    setDescription((stored.productDescription as string) || '');
    setOpenApiSpecUrl((stored.openApiSpecUrl as string) || '');
    setOpenApiSpecUrlError('');
    setDocumentationUrl((stored.documentationUrl as string) || '');
    setSelectedHttpRoute((stored.route as string) || '');
    setHttpRoutePolicies((stored.policies as string) || '');
    setCreationLifecycle((stored.lifecycle as string) || 'Production');
    setCreationPublishStatus(((stored.status as string) === 'Published' ? 'Published' : 'Draft') as 'Draft' | 'Published');
    setApiKeyApproval((stored.apiKeyApproval as string) === 'Automatic' ? 'automatic' : 'manual');
  }, [isOpen, mode, editingProductName]);

  const resetForm = React.useCallback(() => {
    setApiProductName('');
    setResourceName('');
    setVersion('V1');
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
  }, []);

  const handleClose = React.useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = React.useCallback(() => {
    const productName = apiProductName;
    const policy = httpRoutePolicies || selectedRouteObject?.planPolicy || 'N/A';
    const newProduct = {
      name: productName,
      version,
      route: selectedHttpRoute,
      policy,
      tags: [selectedTag],
      status: creationPublishStatus,
      lifecycle: creationLifecycle,
      namespace: 'namespace-1',
      resourceName,
      openApiSpecUrl,
      documentationUrl: documentationUrl || undefined,
      description,
      apiKeyApproval,
    };
    const productDetails: Record<string, unknown> = {
      name: productName,
      tag: selectedTag,
      productDescription: description,
      status: creationPublishStatus,
      version,
      namespace: 'namespace-1',
      apiKeyApproval: apiKeyApproval === 'manual' ? 'Need manual approval' : 'Automatic',
      api: resourceName,
      route: selectedHttpRoute,
      policies: policy,
      openApiSpecUrl,
      documentationUrl: documentationUrl || undefined,
      lifecycle: creationLifecycle,
    };
    try {
      const storedProducts = localStorage.getItem('apiProductDetails');
      const productsMap = storedProducts ? JSON.parse(storedProducts) as Record<string, unknown> : {};
      if (mode === 'edit' && editingProductName && editingProductName !== productName) {
        delete productsMap[editingProductName];
      }
      productsMap[productName] = productDetails;
      localStorage.setItem('apiProductDetails', JSON.stringify(productsMap));
    } catch (e) {
      console.error('Failed to save product details to localStorage:', e);
    }
    onSave({ mode, productName, productDetails, newProduct });
    if (mode === 'create' && afterCreate) afterCreate(productName);
    resetForm();
    onClose();
  }, [
    apiProductName,
    version,
    selectedHttpRoute,
    httpRoutePolicies,
    selectedRouteObject,
    selectedTag,
    creationPublishStatus,
    creationLifecycle,
    resourceName,
    openApiSpecUrl,
    documentationUrl,
    description,
    apiKeyApproval,
    mode,
    editingProductName,
    onSave,
    afterCreate,
    resetForm,
    onClose,
  ]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} variant="large" style={{ maxWidth: '800px' }}>
      <ModalHeader>
        <Title headingLevel="h2">{mode === 'edit' ? 'Edit API product' : 'Create API product'}</Title>
        <p style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>
          {mode === 'edit'
            ? 'Update your API product configuration.'
            : 'Create API product by registering existing API, associate route and policy.'}
        </p>
      </ModalHeader>
      <ModalBody style={{ padding: '24px', paddingTop: '8px' }}>
        <Title headingLevel="h3" size="md" style={{ marginBottom: '16px', marginTop: '0' }}>
          API product info
        </Title>
        <Grid hasGutter>
          <GridItem span={6}>
            <FormGroup label={<span>API product name <span style={{ color: '#C9190B' }}>*</span></span>} isRequired={false} style={{ marginBottom: '16px' }}>
              <TextInput value={apiProductName} onChange={(_, value) => setApiProductName(value)} />
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Give a unique name for your API product.</p>
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label={<span>Resource name <span style={{ color: '#C9190B' }}>*</span></span>} isRequired={false} style={{ marginBottom: '16px' }}>
              <TextInput value={resourceName} onChange={(_, value) => setResourceName(value)} />
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Kubernetes resource name with lowercase, hyphens. Eg.flight_API.</p>
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label={<span>Version <span style={{ color: '#C9190B' }}>*</span></span>} isRequired={false} style={{ marginBottom: '16px' }}>
              <TextInput value={version} onChange={(_, value) => setVersion(value)} />
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Give a version to your API product.</p>
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label="Tag" style={{ marginBottom: '16px' }}>
              <Dropdown
                isOpen={isTagDropdownOpen}
                onOpenChange={(o) => setIsTagDropdownOpen(o)}
                toggle={(toggleRef) => (
                  <MenuToggle ref={toggleRef} onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)} isExpanded={isTagDropdownOpen} style={{ width: '100%' }}>
                    {selectedTag || 'Aircraft'}
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  {availableTags.map((tag) => (
                    <DropdownItem key={tag} onClick={() => { setSelectedTag(tag); setIsTagDropdownOpen(false); }}>{tag}</DropdownItem>
                  ))}
                </DropdownList>
              </Dropdown>
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Add a tag to your API product.</p>
            </FormGroup>
          </GridItem>
        </Grid>
        <FormGroup label="Description" style={{ marginBottom: '24px' }}>
          <TextArea value={description} onChange={(_, value) => setDescription(value)} rows={1} />
        </FormGroup>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>Add API and Associate route</Title>
          <Tooltip content="Register an existing API and associate an HTTRroute for your API product">
            <Button variant="plain" aria-label="Info" style={{ padding: '4px' }}><InfoIconOutline size={16} /></Button>
          </Tooltip>
        </div>
        <FormGroup label={<span>Open API Spec URL <span style={{ color: '#C9190B' }}>*</span></span>} isRequired={false} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <TextInput value={openApiSpecUrl} onChange={(_, value) => handleOpenApiSpecUrlChange(value)} placeholder="" style={{ flex: 1 }} validated={openApiSpecUrlError ? 'error' : 'default'} />
            <Dropdown isOpen={isOpenApiSpecMenuOpen} onSelect={() => setIsOpenApiSpecMenuOpen(false)} onOpenChange={(o) => setIsOpenApiSpecMenuOpen(o)} toggle={(toggleRef) => (
              <MenuToggle ref={toggleRef} variant="plain" onClick={() => setIsOpenApiSpecMenuOpen(!isOpenApiSpecMenuOpen)} isExpanded={isOpenApiSpecMenuOpen} aria-label="Add API spec options" style={{ padding: '8px' }}><PlusIcon /></MenuToggle>
            )} popperProps={{ appendTo: () => document.body, position: 'right' as const, enableFlip: true, preventOverflow: true }}>
              <DropdownList><DropdownItem key="upload-yaml" onClick={() => setIsOpenApiSpecMenuOpen(false)}>Upload YAML file</DropdownItem></DropdownList>
            </Dropdown>
          </div>
          {openApiSpecUrlError ? <FormHelperText><HelperText><HelperTextItem variant="error">{openApiSpecUrlError}</HelperTextItem></HelperText></FormHelperText> : <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Enter the full path to your API spec file. Eg.https://github.com/backstage/.</p>}
        </FormGroup>
        <FormGroup label="Documentation URL" isRequired={false} style={{ marginBottom: '16px' }}>
          <TextInput value={documentationUrl} onChange={(_, value) => setDocumentationUrl(value)} onFocus={() => setDocumentationUrlFocused(true)} onBlur={() => setDocumentationUrlFocused(false)} placeholder={documentationUrlFocused ? 'https://doc.example.com/api' : ''} style={{ width: '100%' }} />
          <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Link to external documentation for this API</p>
        </FormGroup>
        <FormGroup label={<span>HTTPRoute <span style={{ color: '#C9190B' }}>*</span></span>} isRequired={false} style={{ marginBottom: '24px' }}>
          <Dropdown
            isOpen={isHttpRouteDropdownOpen}
            onOpenChange={(o) => { setIsHttpRouteDropdownOpen(o); if (!o) setHttpRouteSearchValue(''); }}
            toggle={(toggleRef) => (
              <MenuToggle ref={toggleRef} onClick={() => setIsHttpRouteDropdownOpen(!isHttpRouteDropdownOpen)} isExpanded={isHttpRouteDropdownOpen} style={{ width: '100%' }}>
                {selectedHttpRoute || 'Select HTTPRoute'}
              </MenuToggle>
            )}
            popperProps={{ appendTo: () => document.body, position: 'right' as const, enableFlip: true, preventOverflow: true }}
          >
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #d0d0d0', display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#fff' }} onClick={(e) => e.stopPropagation()}>
              <SearchInput placeholder="Search..." value={httpRouteSearchValue} onChange={(_, value) => setHttpRouteSearchValue(value)} onClear={() => setHttpRouteSearchValue('')} style={{ flex: 1, minWidth: 0 }} />
              <select value={httpRouteSortBy} onChange={(e) => setHttpRouteSortBy(e.target.value)} style={{ padding: '6px 24px 6px 8px', fontSize: '14px', color: '#151515', border: '1px solid #8a8d90', borderRadius: '4px', backgroundColor: '#fff', cursor: 'pointer', minWidth: '80px' }}><option value="Name">Name</option></select>
            </div>
            <DropdownList style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredHttpRoutes.map((route) => (
                <DropdownItem key={route.name} onClick={() => { setSelectedHttpRoute(route.name); setIsHttpRouteDropdownOpen(false); setHttpRouteSearchValue(''); }} style={{ padding: '8px 12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontWeight: 500, color: '#151515' }}>{route.name}</div>
                    <div style={{ fontSize: '12px', color: '#6a6e73' }}>Associated PlanPolicy: {route.planPolicy}{route.planDetails ? ` (${route.planDetails})` : ''}</div>
                  </div>
                </DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
          <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Select an HTTPRoute. Eg.backstage.io/expose:true. API product will be created in the same namespace.</p>
        </FormGroup>
        <Divider style={{ marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>HTTPRoute policies</Title>
          <Tooltip content="Policies attach to a certain HTTPRoute"><Button variant="plain" aria-label="Info" style={{ padding: '4px' }}><InfoIconOutline size={16} /></Button></Tooltip>
        </div>
        {selectedHttpRoute && selectedRouteObject?.planPolicy && selectedRouteObject.planPolicy !== 'N/A' && selectedRouteObject.planDetails ? (
          <Card style={{ marginBottom: '24px', border: '1px solid #d0d0d0' }}>
            <CardBody>
              <div style={{ marginBottom: '12px' }}><span style={{ fontWeight: 500, color: '#151515' }}>PlanPolicy: </span><span style={{ color: '#151515' }}>{selectedRouteObject.planPolicy}</span></div>
              <div><span style={{ fontWeight: 500, color: '#151515', marginRight: '8px' }}>Tiers:</span>
                {parsePlanDetails(selectedRouteObject.planDetails).map((tier, index) => {
                  let badgeColor = '#6a6e73', badgeBgColor = '#f5f5f5';
                  if (tier.name === 'Gold') { badgeColor = '#795600'; badgeBgColor = '#fef5e7'; } else if (tier.name === 'Silver') { badgeColor = '#6a6e73'; badgeBgColor = '#f5f5f5'; } else if (tier.name === 'Bronze') { badgeColor = '#004d99'; badgeBgColor = '#e6f1fa'; }
                  return <Badge key={index} isRead style={{ marginRight: '8px', backgroundColor: badgeBgColor, color: badgeColor, border: `1px solid ${badgeColor}`, padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>{tier.name}: {tier.value}</Badge>;
                })}
              </div>
            </CardBody>
          </Card>
        ) : selectedHttpRoute && selectedRouteObject?.planPolicy === 'N/A' ? (
          <Alert variant="warning" title="PlanPolicy association Failed: PlanPolicy does not have the right auth policy" style={{ marginBottom: '24px' }} />
        ) : selectedHttpRoute ? (
          <FormGroup style={{ marginBottom: '24px' }}>
            <TextArea value={httpRoutePolicies} onChange={(_, value) => setHttpRoutePolicies(value)} rows={1} placeholder="" />
          </FormGroup>
        ) : (
          <Card style={{ marginBottom: '24px', border: '1px solid #d0d0d0', backgroundColor: '#fafafa' }}><CardBody /></Card>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>Lifecycle and Visibility</Title>
          <Tooltip content="Configure lifecycle state and catalog visibility for this API product"><Button variant="plain" aria-label="Info" style={{ padding: '4px' }}><InfoIconOutline size={16} /></Button></Tooltip>
        </div>
        <Grid hasGutter style={{ marginBottom: '24px' }}>
          <GridItem span={6}>
            <FormGroup label="Lifecycle" fieldId="creation-lifecycle" style={{ marginBottom: 0 }}>
              <Dropdown isOpen={isCreationLifecycleDropdownOpen} onOpenChange={(o) => setIsCreationLifecycleDropdownOpen(o)} toggle={(toggleRef) => (
                <MenuToggle ref={toggleRef} onClick={() => setIsCreationLifecycleDropdownOpen(!isCreationLifecycleDropdownOpen)} isExpanded={isCreationLifecycleDropdownOpen} style={{ width: '100%' }}>{creationLifecycle}</MenuToggle>
              )}>
                <DropdownList>
                  {lifecycleOptions.map((opt) => (
                    <DropdownItem key={opt} onClick={() => { setCreationLifecycle(opt); setIsCreationLifecycleDropdownOpen(false); }}>{opt}</DropdownItem>
                  ))}
                </DropdownList>
              </Dropdown>
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>API lifecycle state</p>
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup label="Publish Status" fieldId="creation-publish-status" style={{ marginBottom: 0 }}>
              <Dropdown
                isOpen={isCreationPublishStatusDropdownOpen}
                onOpenChange={(o) => setIsCreationPublishStatusDropdownOpen(o)}
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
                  <DropdownItem onClick={() => { setCreationPublishStatus('Draft'); setIsCreationPublishStatusDropdownOpen(false); }}>Draft</DropdownItem>
                  <DropdownItem onClick={() => { setCreationPublishStatus('Published'); setIsCreationPublishStatusDropdownOpen(false); }}>Published</DropdownItem>
                </DropdownList>
              </Dropdown>
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '8px', marginBottom: 0 }}>Controls catalog visibility (Draft = hidden from consumers)</p>
            </FormGroup>
          </GridItem>
        </Grid>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Title headingLevel="h3" size="md" style={{ marginBottom: 0 }}>API Key approval</Title>
          <Tooltip content="Information about API Key approval"><Button variant="plain" aria-label="Info" style={{ padding: '4px' }}><InfoIconOutline size={16} /></Button></Tooltip>
        </div>
        <Grid hasGutter style={{ marginBottom: '16px' }}>
          <GridItem span={6}>
            <FormGroup style={{ marginBottom: 0 }}>
              <Radio isChecked={apiKeyApproval === 'manual'} name="apiKeyApproval" onChange={() => setApiKeyApproval('manual')} label="Need manual approval" id="manual-approval" />
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '4px', marginLeft: '24px', marginBottom: 0 }}>Requires approval for requesting this API.</p>
            </FormGroup>
          </GridItem>
          <GridItem span={6}>
            <FormGroup style={{ marginBottom: 0 }}>
              <Radio isChecked={apiKeyApproval === 'automatic'} name="apiKeyApproval" onChange={() => setApiKeyApproval('automatic')} label="Automatic" id="automatic-approval" />
              <p style={{ fontSize: '12px', color: '#6a6e73', marginTop: '4px', marginLeft: '24px', marginBottom: 0 }}>Keys are created without need to be approved.</p>
            </FormGroup>
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleSubmit} isDisabled={!apiProductName || !resourceName || !version || !openApiSpecUrl || !selectedHttpRoute}>
          {mode === 'edit' ? 'Save' : 'Create'}
        </Button>
        <Button variant="link" onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

interface ContextValue {
  isOpen: boolean;
  mode: 'create' | 'edit';
  editingProductName: string | null;
  openEditModal: (productName: string) => void;
  openCreateModal: () => void;
  closeModal: () => void;
  registerOnSave: (cb: (data: SavePayload) => void) => () => void;
}

const EditAPIProductModalContext = React.createContext<ContextValue | null>(null);

export function useEditAPIProductModal(): ContextValue {
  const ctx = React.useContext(EditAPIProductModalContext);
  if (!ctx) throw new Error('useEditAPIProductModal must be used within EditAPIProductModalProvider');
  return ctx;
}

export function EditAPIProductModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'create' | 'edit'>('create');
  const [editingProductName, setEditingProductName] = React.useState<string | null>(null);
  const saveCallbackRef = React.useRef<((data: SavePayload) => void) | null>(null);

  const openEditModal = React.useCallback((productName: string) => {
    setEditingProductName(productName);
    setMode('edit');
    setIsOpen(true);
  }, []);

  const openCreateModal = React.useCallback(() => {
    setEditingProductName(null);
    setMode('create');
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    setEditingProductName(null);
  }, []);

  const registerOnSave = React.useCallback((cb: (data: SavePayload) => void) => {
    saveCallbackRef.current = cb;
    return () => { saveCallbackRef.current = null; };
  }, []);

  const handleSave = React.useCallback((data: SavePayload) => {
    saveCallbackRef.current?.(data);
    closeModal();
  }, [closeModal]);

  const value: ContextValue = React.useMemo(() => ({
    isOpen,
    mode,
    editingProductName,
    openEditModal,
    openCreateModal,
    closeModal,
    registerOnSave,
  }), [isOpen, mode, editingProductName, openEditModal, openCreateModal, closeModal, registerOnSave]);

  return (
    <EditAPIProductModalContext.Provider value={value}>
      {children}
      <APIProductFormModal
        isOpen={isOpen}
        onClose={closeModal}
        mode={mode}
        editingProductName={editingProductName}
        onSave={handleSave}
      />
    </EditAPIProductModalContext.Provider>
  );
}
