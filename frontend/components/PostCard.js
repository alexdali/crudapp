import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Card, Header, Icon, Item, Divider, Label } from 'semantic-ui-react';
// import ItemStyles from './styles/ItemStyles';
//import BlockStyles from './styles/BlockStyles';


// const Block = styled.div`
//   background: white;
//   border: 1px solid rgba(0, 0, 0, 0.1)};
//   /* ${props => props.theme.offWhite}; */
//   border-radius: 5px;
//   box-shadow: ${props => props.theme.bs};
//   position: relative;
//   /* display: flex;
//   flex-direction: column; */
//   display: block;
//   margin: 1.8rem auto;
//   padding: 5px 0 10px;

//   img {
//     width: 100%;
//     height: 400px;
//     object-fit: scale-down;
//     /* object-fit: cover; */
//   }
//   p {
//     /* text-align: left;
//     font-size: 12px;
//     line-height: 2;
//     font-weight: 300;
//     /* flex-grow: 1; */
//     /* padding: 0 3rem; */
//     /* font-size: 1.5rem; */
//   }
//   .buttonList {
//     display: grid;
//     width: 100%;
//     border-top: 1px solid ${props => props.theme.lightgrey};
//     grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//     grid-gap: 1px;
//     background: ${props => props.theme.lightgrey};
//     & > * {
//       background: white;
//       border: 0;
//       font-size: 1rem;
//       padding: 1rem;
//     }
//   }
// `;

// const Title = styled.h3`
//   margin: 2px 1rem;
//   text-align: left;
//   /* margin-top: -0.5rem; */
//   /* transform: skew(-5deg) rotate(-1deg); */
//   text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
//   a {
//     background: ${props => props.theme.green};
//     display: inline;
//     line-height: 1.3;
//     font-size: 1.1rem;
//     text-align: center;
//     /* color: white; */
//     padding: 0 1rem;
//   }
// `;

// const Description = styled.p`
//   text-align: justify;
//   /* font-size: 12px; */
//   line-height: 2;
//   font-weight: 300;
//   padding: 0 2rem;
//   font-size: 0.85rem;
// `;

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
    const { id, userId, title, content, createdDate } = this.props.postcard;
    console.log('PostCard this.props', this.props);
    return (
      <Item>
      {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
      <Item.Content>
        <Item.Header as='a'>{title}</Item.Header>
        <Divider clearing />
        <Label as='span' color='orange' ribbon='right'>
        {createdDate}
        </Label>
        <Item.Meta>{userId}</Item.Meta>
        <Item.Description><p>{content}</p></Item.Description>
        {/* <Item.Extra>{createdDate}</Item.Extra> */}

        <Divider horizontal></Divider>

        <Item.Extra>
        {/* <Icon name='comment alternate outline' /> Комментарии
      <Label size='medium' color='teal' floating>
        22
      </Label> */}
      <Label  size="medium" >
    <Icon name='comment alternate outline'/> 12
  </Label>

        {/* <Icon name='comment alternate outline'  corner='top right' />
        10 комментариев */}

        </Item.Extra>
      </Item.Content>
    </Item>
     /*  <Card fluid raised>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{userId}</Card.Meta>
      <Card.Meta>{createdDate}</Card.Meta>
      <Card.Description>{content}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='comment alternate outline' />
        10 комментариев
      </a>
    </Card.Content>
  </Card>
     <Block>
        <Title>
          <Link
            href={{
              pathname: '/user',
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <Description>{item.userId}</Description>
        <Description>{item.createdDate}</Description>
        <div>{item.content}</div>
      </Block> */
    );
  }
}
export default PostCard;
