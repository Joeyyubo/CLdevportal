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
import { APIs } from '@app/APIs/APIs';
import { AppRoutes, routes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Root redirects to developer-portal */}
        <Route path="/" element={<Navigate to="/developer-portal" replace />} />
        
        {/* APIs page without AppLayout (has its own layout) */}
        <Route path="/apis" element={<APIs />} />
        
        {/* Developer Portal page without AppLayout (has its own layout) */}
        <Route path="/developer-portal" element={<DeveloperPortal />} />
        
        {/* API Keys page */}
        <Route path="/developer-portal/api-keys" element={<APIKeys />} />
        
        {/* Observability page */}
        <Route path="/developer-portal/observability" element={<Observability />} />
        
        {/* API Details page with dynamic API name */}
        <Route path="/developer-portal/api-details/:apiName" element={<APIDetails />} />
        
        {/* API Key Details page with dynamic key name */}
        <Route path="/developer-portal/api-key-details/:keyName" element={<APIKeyDetails />} />
        
        {/* API Key Request Details page with dynamic request name */}
        <Route path="/developer-portal/api-key-request-details/:requestName" element={<APIKeyRequestDetails />} />
        
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
