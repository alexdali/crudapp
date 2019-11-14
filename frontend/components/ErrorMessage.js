// import styled from 'styled-components';
import { Icon, Message } from 'semantic-ui-react';

// const SpinnerDiv = styled.div`
//   /* margin: 52px; */
//   padding: 52px;
// `;

// const ErrorMessage = (props) => <p>Error: {props.error.message}</p>;
const ErrorMessage = (props) => {
  console.log('ErrorMessage props: ', props);
  const errMess = props.error.message ? props.error.message.replace('GraphQL error: ', '') : props.error;
  return (
  <Message negative>
    {/* <Message.Header>Ошибка!</Message.Header> */}
    <p>{errMess}</p>
</Message>);
};

export default ErrorMessage;
