import * as React from 'react';
import {
  Page,
  PageSection,
  Title,
} from '@patternfly/react-core';

const Catalog: React.FunctionComponent = () => {
  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Catalog
        </Title>
      </PageSection>
    </Page>
  );
};

export { Catalog };

