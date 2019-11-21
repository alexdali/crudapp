import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';
import {
  Card, Header, Icon, Item, Divider, Label,
} from 'semantic-ui-react';
// import ItemStyles from './styles/ItemStyles';
// import BlockStyles from './styles/BlockStyles';

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

//#__next > div > div.Page__IndexDiv-peqh5w-2.gseUfm > div > div > div.thirteen.wide.column > div > div > div > div.thirteen.wide.column > div > div:nth-child(1) > a > div > div > div.post-meta
// .post-meta {
//      display: flexbox;
//      justify-content: space-between;
//    }

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
      id, userId, title, content, createdDate, numberOfCommentsPost, author
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
          <ItemBlock>
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{title}</Item.Header>
              <Divider clearing />
              
              <div className="post-meta">
                <p><Label  as='span' color='orange'>{author.name}</Label></p>
                <p><Label as='span' color='orange' ribbon='right'>
                  {moment(createdDate).format('DD MMMM YYYY')}
                </Label></p>
                
                {/*<Item.Meta>*/}
                  
                {/*</Item.Meta>*/}
              

              </div>
              
                
              <Item.Description>
                <ItemContent clasName='item-content'>{content}</ItemContent>
              </Item.Description>
              {/*<Divider horizontal></Divider>*/}
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
