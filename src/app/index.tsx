import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { DeveloperPortal } from '@app/DeveloperPortal/DeveloperPortal';
import { APIDetails } from '@app/DeveloperPortal/APIDetails';
import { APIKeys } from '@app/DeveloperPortal/APIKeys';
import { Observability } from '@app/DeveloperPortal/Observability';
import { APIKeyDetails } from '@app/DeveloperPortal/APIKeyDetails';
import { APIKeyRequestDetails } from '@app/DeveloperPortal/APIKeyRequestDetails';
import CreateAPIProduct from '@app/DeveloperPortal/CreateAPIProduct';
import APIs from '@app/APIs/APIs';
import APIDetailsPage from '@app/APIs/APIDetailsPage';
import SelfService from '@app/SelfService/SelfService';
import RegisterComponent from '@app/RegisterComponent/RegisterComponent';
import Policies from '@app/Policies/Policies';
import PolicyDetails from '@app/Policies/PolicyDetails';
import RequestPolicy from '@app/Policies/RequestPolicy';
import { Home } from '@app/Home/Home';
import { Catalog } from '@app/Catalog/Catalog';
import { Docs } from '@app/Docs/Docs';
import { LearningPaths } from '@app/LearningPaths/LearningPaths';
import { PortalSettings } from '@app/Settings/PortalSettings';
import { AppRoutes, routes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  // Set default role to API consumer on app startup
  React.useEffect(() => {
    try {
      if (!localStorage.getItem('currentRole')) {
        localStorage.setItem('currentRole', 'API consumer');
      }
    } catch (e) {
      console.error('Failed to set default role:', e);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Root redirects to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* APIs page without AppLayout (has its own layout) */}
        <Route path="/apis" element={<APIs />} />
        
        {/* APIs Detail page */}
        <Route path="/apis/api-details/:apiName" element={<APIDetailsPage />} />
        
        {/* Self-service page without AppLayout (has its own layout) */}
        <Route path="/self-service" element={<SelfService />} />
        
        {/* Register component page without AppLayout (has its own layout) */}
        <Route path="/register-component" element={<RegisterComponent />} />
        
        {/* Policies page without AppLayout (has its own layout) */}
        <Route path="/policies" element={<Policies />} />
        
        {/* Request Policy page */}
        <Route path="/policies/request" element={<RequestPolicy />} />
        
        {/* Policy Details page */}
        <Route path="/policies/policy-details/:policyName" element={<PolicyDetails />} />
        
        {/* Home page without AppLayout (has its own layout) */}
        <Route path="/home" element={<Home />} />
        
        {/* Catalog page without AppLayout (has its own layout) */}
        <Route path="/catalog" element={<Catalog />} />
        
        {/* Docs page without AppLayout (has its own layout) */}
        <Route path="/docs" element={<Docs />} />
        
        {/* Learning Paths page without AppLayout (has its own layout) */}
        <Route path="/learning" element={<LearningPaths />} />
        
        {/* Observability page without AppLayout (has its own layout) */}
        <Route path="/observability" element={<Observability />} />
        
        {/* Developer portal page without AppLayout (has its own layout) */}
        <Route path="/developer-portal" element={<DeveloperPortal />} />
        
        {/* Create API Product page */}
        <Route path="/developer-portal/create-api-product" element={<CreateAPIProduct />} />
        
        {/* API Keys page */}
        <Route path="/developer-portal/api-keys" element={<APIKeys />} />
        
        {/* API Details page with dynamic API name */}
        <Route path="/developer-portal/api-details/:apiName" element={<APIDetails />} />
        
        {/* API Key Details page with dynamic key name */}
        <Route path="/developer-portal/api-key-details/:keyName" element={<APIKeyDetails />} />
        
        {/* API Key Request Details page with dynamic request name */}
        <Route path="/developer-portal/api-key-request-details/:requestName" element={<APIKeyRequestDetails />} />
        
        {/* Portal Settings page without AppLayout (has its own layout) */}
        <Route path="/settings/portal" element={<PortalSettings />} />
        
        {/* All other pages with AppLayout */}
        <Route
          path="*"
          element={
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
