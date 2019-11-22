import React from 'react';
import { Segment, Placeholder } from 'semantic-ui-react';

const loop = (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(
      <Segment raised key={i}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>,
    );
  }
  return arr;
};

const LoadingBar = ({ count }) => (<> {loop(count)} </>);

export default LoadingBar;
