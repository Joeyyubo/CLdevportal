import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  Title,
  Tabs,
  Tab,
  TabTitleText,
  Grid,
  GridItem,
  Card,
  CardBody,
  Label,
  ActionGroup,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Tooltip,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TextInput,
  TextArea,
  FormGroup,
  Alert,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
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
  HelpIcon,
  BellIcon,
  CodeBranchIcon,
  UsersIcon,
  ClockIcon,
  TimesCircleIcon,
  StarIcon,
  ArrowUpIcon,
} from '@patternfly/react-icons';
import './DeveloperPortal.css';

// Sample API key request details data
const apiKeyRequestDetailsData: Record<string, any> = {
  'A new keys': {
    name: 'A new keys',
    status: 'Pending',
    apiName: 'Get Flights tickets',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Jan 20,2026 at 16:15PM',
  },
  'development keys': {
    name: 'development keys',
    status: 'Pending',
    apiName: 'Get Flights tickets',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Oct 25,2025 at 16:15PM',
  },
  'Production keys': {
    name: 'Production keys',
    status: 'Pending',
    apiName: 'Get Flights tickets',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Sep 05,2025 at 16:15PM',
  },
  'Dev test keys': {
    name: 'Dev test keys',
    status: 'Pending',
    apiName: 'List My Bookings',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Nov 01,2025 at 16:15PM',
  },
  'Research key': {
    name: 'Research key',
    status: 'Pending',
    apiName: 'List My Bookings',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Dec 25,2026 at 16:15PM',
  },
  'Integration keys': {
    name: 'Integration keys',
    status: 'Rejected',
    apiName: 'Create Booking',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'May 10,2027 at 16:15PM',
  },
  'test-Key_1': {
    name: 'test-Key_1',
    status: 'Rejected',
    apiName: 'Create Booking',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'May 11,2028 at 16:15PM',
  },
  'learn-Key_2': {
    name: 'learn-Key_2',
    status: 'Rejected',
    apiName: 'List My Bookings',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'April 20,2029 at 16:15PM',
  },
  'try-Key_3': {
    name: 'try-Key_3',
    status: 'Rejected',
    apiName: 'Create Booking',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'Mar 06,2026 at 16:15PM',
  },
  'Trial-Key_4': {
    name: 'Trial-Key_4',
    status: 'Rejected',
    apiName: 'Get Refund Status',
    plan: 'Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;',
    requestTime: 'May 20,2025 at 16:15PM',
  },
};

const APIKeyRequestDetails: React.FunctionComponent = () => {
  const { requestName } = useParams<{ requestName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = React.useState(false);
  const [isReapplyModalOpen, setIsReapplyModalOpen] = React.useState(false);
  const [revokeConfirmText, setRevokeConfirmText] = React.useState('');
  const [descriptionText, setDescriptionText] = React.useState('');
  const [reapplyDescriptionText, setReapplyDescriptionText] = React.useState('');
  const [showEditSuccess, setShowEditSuccess] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
  const [selectedReapplyPlan, setSelectedReapplyPlan] = React.useState('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = React.useState(false);
  const [isReapplyPlanDropdownOpen, setIsReapplyPlanDropdownOpen] = React.useState(false);

  // Decode the request name from URL
  const decodedRequestName = requestName ? decodeURIComponent(requestName) : null;
  const requestDetails = decodedRequestName ? apiKeyRequestDetailsData[decodedRequestName] : null;

  if (!requestDetails) {
    return <div>API key request not found</div>;
  }

  const handleTabClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    const tabKey = typeof eventKey === 'number' ? eventKey : 0;
    setActiveTab(tabKey);
  };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dev-portal') {
      navigate('/developer-portal');
    } else if (itemId === 'apis') {
      navigate('/apis');
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
          <Button variant="plain" aria-label="Help" style={{ color: '#151515' }}>
            <HelpIcon />
          </Button>
          <Button variant="plain" aria-label="Notifications" style={{ color: '#151515' }}>
            <BellIcon />
          </Button>
          <Button variant="plain" aria-label="User" style={{ color: '#151515' }}>
            <UserIcon />
          </Button>
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
      <Page masthead={masthead} sidebar={sidebar}>
        <PageSection>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal')}>
                API portal
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button variant="link" isInline onClick={() => navigate('/developer-portal#api-keys')}>
                API keys
              </Button>
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Title headingLevel="h1" size="2xl">
                {requestDetails.name}
              </Title>
              <Button variant="plain" aria-label="Star">
                <StarIcon style={{ fill: '#0066CC' }} />
              </Button>
              <Label
                variant="outline"
                icon={requestDetails.status === 'Pending' ? <ClockIcon /> : <TimesCircleIcon />}
                color={requestDetails.status === 'Pending' ? 'blue' : 'red'}
              >
                {requestDetails.status}
              </Label>
            </div>
            {requestDetails.status === 'Rejected' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button variant="primary" onClick={() => setIsReapplyModalOpen(true)}>Reapply</Button>
              </div>
            )}
          </div>

          <Tabs activeKey={activeTab} onSelect={handleTabClick} style={{ marginBottom: '24px' }}>
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
            <Tab eventKey={1} title={<TabTitleText>Settings</TabTitleText>} />
          </Tabs>

          {activeTab === 0 && (
            <Grid hasGutter>
              <GridItem span={6}>
                <Card style={{ height: '100%' }}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <Title headingLevel="h3" size="lg">About</Title>
                    </div>

                    <ActionGroup style={{ marginBottom: '24px' }}>
                      <Button variant="link">
                        <FileAltIcon style={{ marginRight: '6px' }} />
                        VIEW API
                      </Button>
                      <Button variant="link">
                        <CodeBranchIcon style={{ marginRight: '6px' }} />
                        VIEW SOURCE
                      </Button>
                      <Button variant="link">
                        <UsersIcon style={{ marginRight: '6px' }} />
                        CONTACT OWNER
                      </Button>
                    </ActionGroup>

                    <DescriptionList columnModifier={{ default: '1Col', md: '1Col' }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Name</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button 
                            variant="link" 
                            isInline
                            onClick={() => navigate(`/developer-portal/api-key-request-details/${encodeURIComponent(requestDetails.name)}`)}
                          >
                            {requestDetails.name}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>API key plan</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{requestDetails.plan}</span>
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>Request time</DescriptionListTerm>
                        <DescriptionListDescription>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#67b350' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#67b350' }}></div>
                            {requestDetails.requestTime}
                          </div>
                        </DescriptionListDescription>
                      </DescriptionListGroup>

                      <DescriptionListGroup>
                        <DescriptionListTerm>API</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Button 
                            variant="link" 
                            isInline
                            onClick={() => navigate(`/developer-portal/api-details/${encodeURIComponent(requestDetails.apiName)}`)}
                          >
                            {requestDetails.apiName}
                          </Button>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          )}

          {activeTab === 1 && (
            <div>
              {showEditSuccess && (
                <Alert
                  variant="success"
                  title="API key request update successfully"
                  className="no-shadow-alert"
                  isLiveRegion
                  style={{ marginBottom: '16px' }}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <strong>{requestDetails.name}</strong> has been updated.
                  </div>
                </Alert>
              )}

              {/* API key request update section - only show if not rejected */}
              {requestDetails.status !== 'Rejected' && (
                <Card style={{ border: '1px solid #67b350', marginBottom: '24px' }}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: '#67b350',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ArrowUpIcon style={{ color: 'white', fontSize: '16px' }} />
                      </div>
                      <Title headingLevel="h3" size="lg">API key request update</Title>
                    </div>
                    <p style={{ marginBottom: '16px', color: '#151515' }}>
                      Edit this API key request.
                    </p>
                    <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>Edit API key request</Button>
                  </CardBody>
                </Card>
              )}

              {/* Danger zone section */}
              <Card style={{ border: '1px solid #c9190b' }}>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: '#f0ab00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ExclamationTriangleIcon style={{ color: 'white', fontSize: '16px' }} />
                    </div>
                    <Title headingLevel="h3" size="lg">Danger zone</Title>
                  </div>
                  <p style={{ marginBottom: '16px', color: '#151515' }}>
                    Permanently delete this API key request. This action cannot be undone and will immediately revoke access for any applications using this key.
                  </p>
                  <Button variant="danger" onClick={() => setIsRevokeModalOpen(true)}>Revoke API key request</Button>
                </CardBody>
              </Card>
            </div>
          )}
        </PageSection>
      </Page>

      {/* Edit API key request modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setDescriptionText('');
          setSelectedPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
          setIsPlanDropdownOpen(false);
        }}
        variant="small"
        title="Edit this API key request"
        style={{
          '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)'
        } as React.CSSProperties}
      >
        <ModalHeader>
          <Title headingLevel="h2">Edit this API key request</Title>
          <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px' }}>
            Upgrade the API credential to use the API.
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup label="API *" isRequired style={{ marginBottom: '24px' }}>
            <TextInput
              id="api-input"
              readOnly
              value={requestDetails.api}
              style={{
                backgroundColor: '#f5f5f5',
                userSelect: 'none',
                outline: 'none',
                cursor: 'default'
              }}
            />
          </FormGroup>

          <FormGroup label="API plan *" isRequired style={{ marginBottom: '24px' }}>
            <Dropdown
              isOpen={isPlanDropdownOpen}
              onOpenChange={(isOpen) => setIsPlanDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle ref={toggleRef} onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)} isExpanded={isPlanDropdownOpen}>
                  {selectedPlan}
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem
                  key="gold"
                  onClick={() => {
                    setSelectedPlan('Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;');
                    setIsPlanDropdownOpen(false);
                  }}
                >
                  Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;
                </DropdownItem>
                <DropdownItem
                  key="platinum"
                  onClick={() => {
                    setSelectedPlan('Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;');
                    setIsPlanDropdownOpen(false);
                  }}
                >
                  Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;
                </DropdownItem>
              </DropdownList>
            </Dropdown>
          </FormGroup>

          <FormGroup label="Use case & description">
            <p style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '8px' }}>
              Share your use case with API owner to get quick approval.
            </p>
            <TextArea
              id="description-input"
              value={descriptionText}
              onChange={(_, value) => setDescriptionText(value)}
              aria-label="Description input"
              rows={6}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="request"
            variant="primary"
            onClick={() => {
              setIsEditModalOpen(false);
              setDescriptionText('');
              setSelectedPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
              setIsPlanDropdownOpen(false);
              setShowEditSuccess(true);
              setTimeout(() => setShowEditSuccess(false), 5000);
            }}
          >
            Request
          </Button>
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => {
              setIsEditModalOpen(false);
              setDescriptionText('');
              setSelectedPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
              setIsPlanDropdownOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Revoke API key request modal */}
      <Modal
        isOpen={isRevokeModalOpen}
        onClose={() => {
          setIsRevokeModalOpen(false);
          setRevokeConfirmText('');
        }}
        variant="small"
        style={{
          '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)'
        } as React.CSSProperties}
      >
        <ModalHeader>
          <Title headingLevel="h2">Revoke this API key request?</Title>
        </ModalHeader>
        <ModalBody>
          <Alert
            variant="danger"
            title="This action cannot be undone"
            className="no-shadow-alert"
            isLiveRegion
            style={{ marginBottom: '24px' }}
          >
            Revoking this API key request will immediately revoke request for API key. Proceed with caution.
          </Alert>

          <p style={{ fontWeight: 'bold', marginBottom: '24px' }}>
            To confirm revoking, type the API key name below:
          </p>

          <TextInput
            id="api-key-name-readonly"
            readOnly
            value={requestDetails.name}
            style={{
              backgroundColor: '#f5f5f5',
              userSelect: 'none',
              outline: 'none',
              cursor: 'default',
              marginBottom: '24px'
            }}
          />

          <FormGroup label="Type the name of the API key to confirm *" isRequired>
            <TextInput
              id="revoke-confirm-input"
              value={revokeConfirmText}
              onChange={(_, value) => setRevokeConfirmText(value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="revoke"
            variant="danger"
            isDisabled={revokeConfirmText !== requestDetails.name}
            onClick={() => {
              setIsRevokeModalOpen(false);
              setRevokeConfirmText('');
              navigate(`/developer-portal?revoked=${encodeURIComponent(requestDetails.name)}#api-keys`);
            }}
          >
            Revoke
          </Button>
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => {
              setIsRevokeModalOpen(false);
              setRevokeConfirmText('');
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Reapply API key request modal */}
      <Modal
        isOpen={isReapplyModalOpen}
        onClose={() => {
          setIsReapplyModalOpen(false);
          setReapplyDescriptionText('');
          setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
          setIsReapplyPlanDropdownOpen(false);
        }}
        variant="small"
        style={{
          '--pf-v6-c-backdrop--BackgroundColor': 'rgba(200, 200, 200, 0.8)'
        } as React.CSSProperties}
      >
        <ModalHeader>
          <Title headingLevel="h2">Reapply for API key</Title>
          <div style={{ fontSize: '14px', color: '#6a6e73', marginTop: '8px' }}>
            Reapply for the API credential to use the API.
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup label="API *" isRequired style={{ marginBottom: '24px' }}>
            <TextInput
              id="reapply-api-input"
              readOnly
              value={requestDetails.apiName}
              style={{
                backgroundColor: '#f5f5f5',
                userSelect: 'none',
                outline: 'none',
                cursor: 'default'
              }}
            />
          </FormGroup>

          <FormGroup label="API plan *" isRequired style={{ marginBottom: '24px' }}>
            <Dropdown
              isOpen={isReapplyPlanDropdownOpen}
              onOpenChange={(isOpen) => setIsReapplyPlanDropdownOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle ref={toggleRef} onClick={() => setIsReapplyPlanDropdownOpen(!isReapplyPlanDropdownOpen)} isExpanded={isReapplyPlanDropdownOpen}>
                  {selectedReapplyPlan}
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem
                  key="silver"
                  onClick={() => {
                    setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
                    setIsReapplyPlanDropdownOpen(false);
                  }}
                >
                  Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;
                </DropdownItem>
                <DropdownItem
                  key="gold"
                  onClick={() => {
                    setSelectedReapplyPlan('Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;');
                    setIsReapplyPlanDropdownOpen(false);
                  }}
                >
                  Gold plan: 200 reqs/day; 1k reqs/week; 5k reqs/month;
                </DropdownItem>
                <DropdownItem
                  key="platinum"
                  onClick={() => {
                    setSelectedReapplyPlan('Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;');
                    setIsReapplyPlanDropdownOpen(false);
                  }}
                >
                  Platinum plan: 500 reqs/day; 2.5k reqs/week; 15k reqs/month;
                </DropdownItem>
              </DropdownList>
            </Dropdown>
          </FormGroup>

          <FormGroup label="Use case & description">
            <p style={{ fontSize: '12px', color: '#6a6e73', marginBottom: '8px' }}>
              Share your use case with API owner to get quick approval.
            </p>
            <TextArea
              id="reapply-description-input"
              value={reapplyDescriptionText}
              onChange={(_, value) => setReapplyDescriptionText(value)}
              aria-label="Description input"
              rows={6}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            key="reapply"
            variant="primary"
            onClick={() => {
              setIsReapplyModalOpen(false);
              setReapplyDescriptionText('');
              setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
              setIsReapplyPlanDropdownOpen(false);
              // Navigate back to API keys page or show success message
              navigate('/developer-portal#api-keys');
            }}
          >
            Reapply
          </Button>
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => {
              setIsReapplyModalOpen(false);
              setReapplyDescriptionText('');
              setSelectedReapplyPlan('Silver plan: 100 reqs/day; 500 reqs/week; 3000 reqs/month;');
              setIsReapplyPlanDropdownOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export { APIKeyRequestDetails };

