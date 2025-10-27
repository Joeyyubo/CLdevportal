import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { DeveloperPortal } from '@app/DeveloperPortal/DeveloperPortal';
import { APIDetails } from '@app/DeveloperPortal/APIDetails';
import { AppRoutes, routes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Root redirects to developer-portal */}
        <Route path="/" element={<Navigate to="/developer-portal" replace />} />
        
        {/* Developer Portal page without AppLayout (has its own layout) */}
        <Route path="/developer-portal" element={<DeveloperPortal />} />
        
        {/* API Details page with dynamic API name */}
        <Route path="/developer-portal/api-details/:apiName" element={<APIDetails />} />
        
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
