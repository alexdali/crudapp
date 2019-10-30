import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Radio,
  Header,
  Segment,
  Button,
  Checkbox,
  Icon,
  Table,
  Form,
} from 'semantic-ui-react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import CreateFormCategoryTP from './CreateFormCategoryTP';
// import Error from './ErrorMessage';

const RowDiv = styled.div`
  margin: 52px 0px;
  padding: 30px 10px;
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
  form {
    > div.inline.fields.radio-buttons {
      /* margin: 0 0 1em; */
      border: 1px solid rgba(34, 36, 38, 0.15);
      padding: 1em 1em;
    }
    /* div.radio-buttons {
      padding: 10px 0;
    } */
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

// const perScreen = 5;

const ALL_CATEGORYTAXPAYERS_QUERY = gql`
  query ALL_CATEGORYTAXPAYERS_QUERY {
    categoryTaxPayers(orderBy: category_ASC) {
      id
      category
      categoryID
      taxRegime
      taxRegimeID
      isActive
    }
  }
`;

const UPDATE_CATEGORYTAXPAYER_MUTATION = gql`
  mutation UPDATE_CATEGORYTAXPAYER_MUTATION(
    $id: ID!
    $category: String!
    $categoryID: String!
    $taxRegime: String!
    $taxRegimeID: String!
    $isActive: Boolean!
  ) {
    updateCategoryTaxPayer(
      id: $id
      category: $category
      categoryID: $categoryID
      taxRegime: $taxRegime
      taxRegimeID: $taxRegimeID
      isActive: $isActive
    ) {
      id
      category
      categoryID
      taxRegime
      taxRegimeID
      isActive
    }
  }
`;

const CategoryTaxPayersAP = props => (
  <Query query={ALL_CATEGORYTAXPAYERS_QUERY}>
    {({ data: { categoryTaxPayers }, loading: loadingQuery }) => {
      console.log(
        'const CategoryTaxPayersAP categoryTaxPayers: ',
        categoryTaxPayers
      );
      if (loadingQuery)
        return (
          <div>
            <p>Загрузка...</p>
            <Icon loading name="spinner" />
          </div>
        );
      if (!categoryTaxPayers) {
        return null;
      }
      // console.log('const CategoryTaxPayersAP: props:', props);
      return (
        <RowDiv>
          <div>
            <Segment.Group>
              <Segment>
                <Table compact celled definition>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1}>
                        ID Категория
                      </Table.HeaderCell>
                      <Table.HeaderCell width={5}>
                        Категория налогоплательщика
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2}>ID Режим</Table.HeaderCell>
                      <Table.HeaderCell width={5}>
                        Режим налогообложения
                      </Table.HeaderCell>
                      <Table.HeaderCell colSpan="3">Статус</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {categoryTaxPayers.map(categoryTaxPayer => (
                      <RowItem
                        key={categoryTaxPayer.id}
                        categoryTaxPayer={categoryTaxPayer}
                      />
                    ))}
                  </Table.Body>
                </Table>
                <CreateFormCategoryTP />
              </Segment>
            </Segment.Group>
          </div>
        </RowDiv>
      );
    }}
  </Query>
);

class RowItem extends Component {
  static propTypes = {
    categoryTaxPayer: PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      categoryID: PropTypes.string,
      taxRegime: PropTypes.string,
      taxRegimeID: PropTypes.string,
      isActive: PropTypes.bool,
    }).isRequired,
  };

  state = {
    categoryTaxPayer: this.props.categoryTaxPayer,
    // showCreate: '',
    readOnly: true,
    showEdit: '',
  };

  enableEdit = val => {
    console.log('RowItem enableEdit');
    // const { categoryTP } = this.state;
    // let categoryTP = {};
    // categoryTP = { ...categoryTaxPayer };
    if (val === '1') {
      this.setState({
        showEdit: '1',
        readOnly: false,
        // categoryTP,
      });
    } else {
      this.setState({
        showEdit: '',
        readOnly: true,
        categoryTaxPayer: this.props.categoryTaxPayer,
        // categoryTP: {
        //   category: '',
        //   categoryID: '',
        //   taxRegime: '',
        //   taxRegimeID: '',
        //   // isActive: true,
        //   isActive: undefined,
        // },
      });
    }
  };

  handleChange = (e, data) => {
    const { name, type, value } = e.target;
    // console.log(`handleChange: e: `, e);
    console.log(`handleChange: data: `, data);
    console.log(
      `handleChange: name: ${name}, type: ${type}, value: ${value}, data.checked: ${
        data.checked
      }, data.name: ${data.name}`
    );

    let val = value;
    let nam = name;

    if (data.name === 'isActive') {
      val = data.checked;
      nam = data.name;
    }

    const { categoryTaxPayer } = this.state;
    categoryTaxPayer[nam] = val;
    this.setState({ categoryTaxPayer });
  };

  updateCategoryTP = async updateCategoryTaxPayer => {
    // e.preventDefault();
    // console.log('updateCategoryTP e: ', e);
    // console.log('CategoryTaxPayersAP updateCategoryTP this.state: ', this.state);
    const { categoryTaxPayer } = this.state;
    console.log(
      'CategoryTaxPayersAP updateCategoryTP this.state.categoryTaxPayer: ',
      categoryTaxPayer
    );
    const res = await updateCategoryTaxPayer({
      variables: {
        id: categoryTaxPayer.id,
        category: categoryTaxPayer.category,
        categoryID: categoryTaxPayer.categoryID,
        taxRegime: categoryTaxPayer.taxRegime,
        taxRegimeID: categoryTaxPayer.taxRegimeID,
        isActive: categoryTaxPayer.isActive,
      },
      // refetchQueries: [{ query: ALL_CATEGORYTAXPAYERS_QUERY, variables: {} }],
    });
    console.log('updateCategoryTP UPDATED!!!! res: ', res);
    this.setState({
      categoryTaxPayer: this.props.categoryTaxPayer,
      // categoryTaxPayer: {
      //   category: '',
      //   categoryID: '',
      //   taxRegime: '',
      //   taxRegimeID: '',
      //   // isActive: true,
      //   isActive: undefined,
      // },
      showEdit: '',
      readOnly: true,
    });
  };

  render() {
    console.log('RowItem render -> props', this.props);
    console.log('RowItem render -> state', this.state);
    const {
      categoryTaxPayer,
      // showCreate,
      readOnly,
      showEdit,
    } = this.state;
    console.log('RowItem render -> state.categoryTaxPayer', categoryTaxPayer);
    return (
      <Mutation
        mutation={UPDATE_CATEGORYTAXPAYER_MUTATION}
        variables={
          categoryTaxPayer
          // {categoryTaxPayer: this.state.categoryTaxPayer,categoryTaxPayerId: this.props.categoryTaxPayer.id,}
        }
        refetchQueries={() => ['ALL_CATEGORYTAXPAYERS_QUERY']}
      >
        {(
          updateCategoryTaxPayer,
          { loading: loadingUpdate, error: errorUpdate }
        ) => (
          <Table.Row>
            <Table.Cell>
              <Form.Input
                // key={keyRefresh}
                fluid
                name="categoryID"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // value={readOnly ? categoryTaxPayer.categoryID : categoryTP.categoryID}
                defaultValue={categoryTaxPayer.categoryID}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                // key={keyRefresh}
                fluid
                name="category"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // defaultValue={categoryTaxPayer.category}
                // value={readOnly ? categoryTaxPayer.category : categoryTP.category}
                defaultValue={categoryTaxPayer.category}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                // key={keyRefresh}
                fluid
                name="taxRegimeID"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // value={
                //   readOnly ? categoryTaxPayer.taxRegimeID : categoryTP.taxRegimeID
                // }
                defaultValue={categoryTaxPayer.taxRegimeID}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Form.Input
                // key={keyRefresh}
                fluid
                name="taxRegime"
                readOnly={readOnly}
                disabled={loadingUpdate}
                loading={loadingUpdate}
                // value={readOnly ? categoryTaxPayer.taxRegime : categoryTP.taxRegime}
                defaultValue={categoryTaxPayer.taxRegime}
                onChange={this.handleChange}
                // width={8}
                required
              />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                // key={keyRefresh}
                toggle
                name="isActive"
                readOnly={readOnly}
                disabled={loadingUpdate}
                // checked={readOnly ? categoryTaxPayer.isActive : categoryTP.isActive}
                checked={categoryTaxPayer.isActive}
                onChange={this.handleChange}
                // required
              />
            </Table.Cell>

            {showEdit === '' ? (
              <Table.Cell collapsing colSpan="2">
                <Button
                  // TODO tooltip
                  icon
                  size="large"
                  onClick={() => this.enableEdit('1')}
                >
                  <Icon name="edit outline" />
                </Button>
                <Button icon size="large">
                  <Icon name="trash alternate outline" />
                </Button>
              </Table.Cell>
            ) : (
              <Table.Cell collapsing colSpan="2">
                <Button
                  onClick={() => this.updateCategoryTP(updateCategoryTaxPayer)}
                >
                  Обнов{loadingUpdate ? 'ление' : 'ить'}
                </Button>
                <Button onClick={() => this.enableEdit('')}>Отмена</Button>
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Mutation>
    );
  }
}

export default CategoryTaxPayersAP;
