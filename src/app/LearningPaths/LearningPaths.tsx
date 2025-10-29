import * as React from 'react';
import {
  Page,
  PageSection,
  Title,
} from '@patternfly/react-core';

const LearningPaths: React.FunctionComponent = () => {
  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Learning Paths
        </Title>
      </PageSection>
    </Page>
  );
};

export { LearningPaths };

