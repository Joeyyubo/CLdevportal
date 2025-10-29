import * as React from 'react';
import {
  Page,
  PageSection,
  Title,
} from '@patternfly/react-core';

const Home: React.FunctionComponent = () => {
  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Home
        </Title>
      </PageSection>
    </Page>
  );
};

export { Home };

