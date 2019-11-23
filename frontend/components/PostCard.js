import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';
import {
  Icon, Item, Divider, Label,
} from 'semantic-ui-react';

const ItemContent = styled.p`
    max-height: 80px;
    overflow: hidden;
`;
const ItemBlock = styled.div`
  div.item > div.content > .post-meta {
      display: flexbox;
      justify-content: space-between;
   }
   .extra {
      margin-top: 10px;
    }
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
      id, userId, title, content, createdDate, numberOfCommentsPost, author,
    } = this.props.postcard;
    // console.log('PostCard this.props', this.props);
    return (
      <Link
        href={{
          pathname: './post',
          query: { id },
        }}
      >
        <a>
          <ItemBlock>
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{title}</Item.Header>
              <Divider clearing />

              <div className="post-meta">
                <p><Label as='span' color='orange'>{author.name}</Label></p>
                <p><Label as='span' color='orange' ribbon='right'>
                  {moment(createdDate).format('DD MMMM YYYY')}
                </Label></p>
              </div>

              <Item.Description>
                <ItemContent clasName='item-content'>{content}</ItemContent>
              </Item.Description>

              <Item.Extra>
                <Label size="medium" >
                  <Icon name='comment alternate outline'/> {numberOfCommentsPost}
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
          </ItemBlock>
        </a>
      </Link>
    );
  }
}
export default PostCard;
