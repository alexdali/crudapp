import React, { Component } from 'react';
// import { ApolloConsumer, Mutation } from 'react-apollo';
import { Mutation, Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
// import Link from 'next/link';
import Router from 'next/router';
import {
  Menu,
  Tab,
  Segment,
  Button,
  Checkbox,
  Icon,
  Table,
  Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import CategoryTaxPayers from './CategoryTaxPayers';
import { CURRENT_USER_QUERY } from './User';
// import Home from '../pages/index';
import Error from './ErrorMessage';

const RowDiv = styled.div`
  /* margin: 10px;
  padding: 5px; */
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  .menu-account-info {
    font-family: 'Montserrat Alternates', 'Roboto', 'Open Sans', sans-serif,
      'Arial';
  }
  .segment.segment-bottom {
    display: flex;
    justify-content: space-between;
  }
`;

const FormTab = styled.div`
  .ui.bottom.attached.segment > form {
    div.fields.form-group-submit {
      /* display: none; */
      display: ${props => props.submitShow};
    }
    div.fields.form-group-edit {
      /* display: flex; */
      display: ${props => props.editShow};
    }
  }
`;

const FormDiv = styled.div`
  display: none;
  height: 100px;
`;

// const perScreen = 5;

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      id
      title
      userId
      content
      createdDate
    }
  }
`;

// const CREATE_PROFILETAXPAYER_MUTATION = gql`
//   mutation CREATE_PROFILETAXPAYER_MUTATION(
//     $name: String!
//     $IINBIN: String!
//   ) {
//     createProfileTaxPayer(
//       name: $name
//       IINBIN: $IINBIN
//       birthDay: $birthDay
//     ) {
//       id
//       name
//       IINBIN
//       birthDay
//      }
//   }
// `;

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION(
    $userId: String!
    $postId: String!
    $title: String!
    $content: String!
  ) {
    updatePost(
      userId: $userId
      postId: $postId
      title: $title
      content: $content)
      {
        id
        title
        userId
        content
        createdDate
    }
  }
`;


/* eslint-disable */
const Composed = adopt({
  //user: ({render}) => <User>{render}</User>,
  profilesTPQuery: ({render}) => <Query query={ALL_PROFILETAXPAYERS_QUERY}>{render}</Query>,
  //toggleCart: ({render}) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  updateProfileTP: ({render}) => <Mutation mutation={UPDATE_PROFILETAXPAYER_MUTATION}>{render}</Mutation>,
  createProfileTP: ({render}) => <Mutation mutation={CREATE_PROFILETAXPAYER_MUTATION}>{render}</Mutation>,
});
/* eslint-enable */

class ProfileTaxInfo extends Component {
  state = {
    user: { name: '', password: '' },
    post: {
      id: '',
      title: '',
      userId: '',
      content: '',
      createdDate: '',
    },
    activeItem: '1',
    show: '',
    readOnlyTab1: true,
    addFormOpen: false,
  };

  showSubmit = () => {
    // console.log('ProfileTaxInfo showSubmit');
    this.setState({
      readOnlyTab1: false,
    });
  };

  showCreate = show => {
    console.log('ProfileTaxInfo showCreate');
    if (show === '1') {
      this.setState({
        show: '1',
      });
    } else {
      this.setState({
        show: '',
        post: {
          id: '',
      title: '',
      userId: '',
      content: '',
      createdDate: '',
        },
      });
    }
  };

  updateItem = async (e, updateUserData) => {
    e.preventDefault();
    console.log('updateItem e: ', e);
    // console.log('updateItem this.state: ', this.state);
    const res = await updateUserData({
      variables: {
        password: this.state.profileTP.password,
        name: this.state.profileTP.name,
      },
    });
    // console.log('UPDATED!!!!');
    this.setState({ user: { name: '', password: '' }, readOnlyTab1: true });
  };

  createProfile = async (e, createProfileTaxPayer) => {
    e.preventDefault();
    console.log('createProfile e: ', e);
    // console.log('updateItem this.state: ', this.state);
    const { profileTP } = this.state;
    const res = await createProfileTaxPayer({
      variables: { ...profileTP },
    });
    // console.log('UPDATED!!!!');
    this.setState({
      post: {
        id: '',
      title: '',
      userId: '',
      content: '',
      createdDate: '',
      },
      // readOnlyTab1: true
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    // console.log(`handleChange: e: `, e);
    console.log(`handleChange: name: ${name}, type: ${type}, value: ${value}`);

    const val = type === 'number' ? parseFloat(value) : value;
    const { user } = this.state;
    user[name] = val;
    // console.log(`handleChange: obj user: `, user);
    this.setState({ user });
    // if (name === 'name') {
    //   this.setState({ user: { name: val } });
    // }
  };

  getAddForm = (createProfileTaxPayer, loading, error) => {
    // if (!me) return null;
    const { profileTP } = this.state;
    return (
      <FormTab>
        <Form
          onSubmit={e => this.createProfile(e, createProfileTaxPayer)}
          loading={loading}
          // error={<Error error={error} />}
          error
        >
          <Form.Group>
            <Form.Input
              fluid
              label="Имя / Наименование"
              id="name"
              name="name"
              // value={me.name}
              // readOnly={readOnly}
              disabled={loading}
              width={8}
              required
              // defaultValue={profileTP.name || ''}
              value={profileTP.name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="ИИН / БИН"
              name="IINBIN"
              // value={me.id}
              value={profileTP.IINBIN}
              // readOnly={readOnly}
              width={8}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Категория налогоплательщика"
              name="category"
              // value={me.permissions[0]}
              value={profileTP.category}
              // readOnly={readOnly}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Дата рождения"
              name="BirthDay"
              // value={me.permissions[0]}
              value={profileTP.birthDay}
              // readOnly={readOnly}
              width={8}
            />
            <Form.Input
              fluid
              label="Дата регистрации"
              name="registrationDay"
              // value={me.email}
              value={profileTP.registrationDay}
              // readOnly={readOnly}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Номер патента"
              name="patentNumber"
              // value={me.permissions[0]}
              value={profileTP.patentNumber}
              // readOnly={readOnly}
              width={8}
            />
            <Form.Input
              fluid
              label="ФИО директора"
              name="directorName"
              // value={me.email}
              value={profileTP.directorName}
              // readOnly={readOnly}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Контактный телефон"
              name="phone"
              // value={me.permissions[0]}
              value={profileTP.phone}
              // readOnly={readOnly}
              width={8}
            />
            <Form.Input
              fluid
              label="Е-майл"
              name="email"
              // value={me.email}
              value={profileTP.email}
              // readOnly={readOnly}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Дополнительная информация"
              name="addInfo"
              // value={me.permissions[0]}
              value={profileTP.addInfo}
              // readOnly={readOnly}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Тарифный план"
              name="TariffTaxService"
              // value={me.permissions[0]}
              value={profileTP.TariffTaxService}
              // readOnly={readOnly}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Начальная дата тарифного плана"
              name="tariffStartDate"
              // value={me.permissions[0]}
              value={profileTP.tariffStartDate}
              // readOnly={readOnly}
              width={8}
            />
            <Form.Input
              fluid
              label="Дата окончания тарифного плана"
              name="tariffExpiryDate"
              // value={me.email}
              value={profileTP.tariffExpiryDate}
              // readOnly={readOnly}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label="Юридический адрес"
              name="legalAddress"
              // value={me.permissions[0]}
              value={profileTP.legalAddress}
              // readOnly={readOnly}
              width={8}
            />
            <Form.Input
              fluid
              label="Физический адрес"
              name="actualAddress"
              // value={me.email}
              value={profileTP.actualAddress}
              // readOnly={readOnly}
              width={8}
            />
          </Form.Group>
          <Form.Group className="form-group-submit">
            <Form.Field
              id="form-password-submit"
              name="password"
              type="password"
              placeholder="пароль"
              defaultValue={this.state.user.password || ''}
              onChange={this.handleChange}
              control="input"
              label="Пароль"
            />
            <Form.Field
              id="form-button-submit"
              control={Button}
              content="Создать профайл"
              label="Отправить запрос на создание профайла"
            />
          </Form.Group>
        </Form>
      </FormTab>
    );
  };

  handleItemClick = (e, { name }) => {
    // this.setState({ activeItem: name });
    this.setState({ show: name, activeItem: name });
  };

  render() {
    // console.log('ProfileTaxInfo render -> props', this.props);
    // console.log('ProfileTaxInfo render -> state', this.state);
    // const CategoryTP = <CategoryTaxPayers />;
    // console.log('ProfileTaxInfo render -> state', this.state);
    const {
      profileTP,
      activeItem,
      show,
      readOnlyTab1,
      addFormOpen,
    } = this.state;
    // const submitShow = readOnlyTab1 === true ? flex : none;
    // const AddForm = this.getAddForm(user, readOnlyTab1);

    return (
      <Query query={ALL_PROFILETAXPAYERS_QUERY}>
        {({ data, loading: loadingQuery }) => {
          const { profileTaxPayers } = data;
          console.log('ProfileTaxInfo data: ', data);

          if (loadingQuery)
            return (
              <div>
                <p>Загрузка...</p>
              </div>
            );
          if (!profileTaxPayers) {
            // return <Home />;
            return null;
          }
          return (
            <Mutation
              mutation={UPDATE_PROFILETAXPAYER_MUTATION}
              variables={profileTP}
            >
              {(
                updateProfileTaxPayer,
                { loading: loadingUpdate, error: errorUpdate }
              ) => (
                <RowDiv>
                  <div>
                    <Segment.Group>
                      <Segment>
                        <Table compact celled definition>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>№</Table.HeaderCell>
                              <Table.HeaderCell>+</Table.HeaderCell>
                              <Table.HeaderCell width={5}>
                                Имя / Наименование
                              </Table.HeaderCell>
                              <Table.HeaderCell width={5}>
                                Категория
                              </Table.HeaderCell>
                              <Table.HeaderCell width={2}>
                                ИИН / БИН
                              </Table.HeaderCell>
                              <Table.HeaderCell colSpan="3">
                                Тарифный план
                              </Table.HeaderCell>
                              {/* <Table.HeaderCell></Table.HeaderCell> */}
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {profileTaxPayers.map(profileTaxPayer => (
                              <>
                                <Table.Row key={profileTaxPayer.id}>
                                  <Table.Cell collapsing>
                                    {/* <Checkbox slider /> */}1
                                  </Table.Cell>
                                  <Table.Cell collapsing>
                                    <Button
                                      // floated="right"
                                      icon
                                      // labelPosition="left"
                                      // primary
                                      size="mini"
                                    >
                                      <Icon name="caret down" />
                                    </Button>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {profileTaxPayer.name}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {profileTaxPayer.category.category}
                                    {profileTaxPayer.category.taxRegime}
                                  </Table.Cell>
                                  <Table.Cell collapsing>
                                    {profileTaxPayer.IINBIN}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {profileTaxPayer.TariffTaxService.name}
                                  </Table.Cell>
                                  <Table.Cell collapsing>
                                    <Button
                                      // floated="right"
                                      icon
                                      // labelPosition="left"
                                      // primary
                                      size="mini"
                                    >
                                      <Icon name="edit outline" />
                                    </Button>
                                  </Table.Cell>
                                  <Table.Cell collapsing>
                                    <Button
                                      // floated="right"
                                      icon
                                      // labelPosition="left"
                                      // primary
                                      size="mini"
                                    >
                                      <Icon name="trash alternate outline" />
                                    </Button>
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row key={profileTaxPayer.id}>
                                  <Table.Cell collapsing />
                                  <Table.Cell colSpan="8">
                                    <Form />
                                  </Table.Cell>
                                </Table.Row>
                              </>
                            ))}
                          </Table.Body>

                        </Table>
                      </Segment>
                      {show === '1' && (
                        <Mutation
                          mutation={CREATE_PROFILETAXPAYER_MUTATION}
                          variables={profileTP}
                        >
                          {(
                            createProfileTaxPayer,
                            { loading: loadingCreate, error: errorCreate }
                          ) => (
                            <Segment attached="bottom">
                              {this.getAddForm(
                                createProfileTaxPayer,
                                loadingCreate,
                                errorCreate
                              )}
                            </Segment>
                          )}
                        </Mutation>
                      )}

                      <Segment className="segment-bottom">
                        {show === '1' && (
                          <Button
                            // floated="right"
                            icon
                            labelPosition="left"
                            // primary
                            size="small"
                            onClick={() => this.showCreate('')}
                          >
                            <Icon name="delete" /> Отмена
                          </Button>
                        )}
                        <Button
                          // floated="right"
                          icon
                          labelPosition="left"
                          // primary
                          size="small"
                          onClick={() => this.showCreate('1')}
                        >
                          <Icon name="user" /> Добавить профиль
                        </Button>
                      </Segment>
                      {/* <>
                        <CategoryTaxPayers>
                          {({ data: dataCategoryTP }) => {
                            console.log('category: ', dataCategoryTP);
                            const { categoryTaxPayers } = dataCategoryTP;
                            return (
                              <ul>
                                {categoryTaxPayers.map(categoryTP => (
                                  <li key={categoryTP.id}>
                                    <p>{categoryTP.category}</p>
                                    <p>{categoryTP.taxRegime}</p>
                                    <p>{categoryTP.isActive}</p>
                                  </li>
                                ))}
                              </ul>
                            );
                          }}
                        </CategoryTaxPayers>
                      </> */}
                    </Segment.Group>
                  </div>
                </RowDiv>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default ProfileTaxInfo;
