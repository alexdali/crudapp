import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
// import Title from './styles/Title';
// import ItemStyles from './styles/ItemStyles';
//import BlockStyles from './styles/BlockStyles';
// import PriceTag from './styles/PriceTag';
// import formatMoney from '../lib/formatMoney';
// import DeleteItem from './DeleteItem';
// import AddToCart from './AddToCart';

const Block = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1)};
  /* ${props => props.theme.offWhite}; */
  border-radius: 5px;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  /* display: flex;
  flex-direction: column; */
  display: block;
  margin: 1.8rem auto;
  padding: 5px 0 10px;

  img {
    width: 100%;
    height: 400px;
    object-fit: scale-down;
    /* object-fit: cover; */
  }
  p {
    /* text-align: left;
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    /* flex-grow: 1; */
    /* padding: 0 3rem; */
    /* font-size: 1.5rem; */
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

const Title = styled.h3`
  margin: 2px 1rem;
  text-align: left;
  /* margin-top: -0.5rem; */
  /* transform: skew(-5deg) rotate(-1deg); */
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.green};
    display: inline;
    line-height: 1.3;
    font-size: 1.1rem;
    text-align: center;
    /* color: white; */
    padding: 0 1rem;
  }
`;

const Description = styled.p`
  text-align: justify;
  /* font-size: 12px; */
  line-height: 2;
  font-weight: 300;
  padding: 0 2rem;
  font-size: 0.85rem;
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    // console.log('item component this.props', this.props);
    return (
      <Block>
        {/* {item.image && <img src={item.image} alt={item.title} />} */}
        <Title>
          <Link
            href={{
              pathname: '/user',
              query: { id: item.id },
            }}
          >
            <a>{item.firstName}</a>
          </Link>
        </Title>
        {/* <PriceTag>{formatMoney(item.price)}</PriceTag> */}
        <Description>{item.lastName}</Description>
        {/* <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id },
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <AddToCart item={item} />
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        </div> */}
      </Block>
    );
  }
}
export default Item;
