import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Card, Header, Icon, Item, Divider, Label,
} from 'semantic-ui-react';
// import ItemStyles from './styles/ItemStyles';
// import BlockStyles from './styles/BlockStyles';

const ItemContent = styled.p`
    max-height: 100px;
    overflow: hidden;
  /* text-align: justify;
  line-height: 2;
  font-weight: 300;
  padding: 0 2rem;
  font-size: 0.85rem; */
`;

class PostCard extends Component {
  static propTypes = {
    postcard: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      createdDate: PropTypes.string,
    }).isRequired,
  };

  render() {
    const {
      id, userId, title, content, createdDate,
    } = this.props.postcard;
    console.log('PostCard this.props', this.props);
    return (
      <Link
        href={{
          pathname: './post',
          query: { id },
        }}
      >
        <a>
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{title}</Item.Header>
              <Divider clearing />
              <Label as='span' color='orange' ribbon='right'>
                {createdDate}
              </Label>
              <Item.Meta>{userId}</Item.Meta>
              <Item.Description>
                <ItemContent clasName='item-content'>{content}</ItemContent>
              </Item.Description>
              <Divider horizontal></Divider>
              <Item.Extra>
                <Label size="medium" >
                  <Icon name='comment alternate outline'/> 12
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </a>
      </Link>
    );
  }
}
export default PostCard;
