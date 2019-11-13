import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const SpinnerDiv = styled.div`
  /* margin: 52px; */
  padding: 52px;
`;

const Spinner = () => <SpinnerDiv>
          <div><Icon name="spinner" size="big"/></div>
        </SpinnerDiv>;

export default Spinner;
