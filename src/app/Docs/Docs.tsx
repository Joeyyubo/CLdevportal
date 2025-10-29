import * as React from 'react';
import {
  Page,
  PageSection,
  Title,
} from '@patternfly/react-core';

const Docs: React.FunctionComponent = () => {
  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Docs
        </Title>
      </PageSection>
    </Page>
  );
};

export { Docs };

