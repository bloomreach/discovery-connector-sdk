// @ts-ignore
// reference - https://github.com/RafaelGoulartB/next-ecommerce/blob/master/components/productItem.js

/*
 import { useQuery } from '@apollo/client';
 import {Link} from 'preact-router';
 import {
 FaCartArrowDown,
 FaCartPlus,
 FaRegHeart,
 FaHeart,
 } from 'react-icons/fa';
 import StarRatings from 'react-star-ratings';
 import { toggleCart, toggleWishlist } from '../utils/toggleProductStates';
 import { CART, WISHLIST } from '../apollo/client/queries';

 export default function ProductSection({ id, name, rating, img_url, price }) {
 const cart = useQuery(CART);
 const wishlist = useQuery(WISHLIST);

 return (
 <article>
 <div className="top-buttons">
 <button className="add-wishlist" onClick={() => toggleWishlist(id)}>
 {wishlist.data.wishlist.products.includes(id) && (
 <FaHeart size={20} color="#D8D8D8" />
 )}
 {!wishlist.data.wishlist.products.includes(id) && (
 <FaRegHeart size={20} color="#D8D8D8" />
 )}
 </button>
 </div>

 <div className="product-img-box">
 <Link href={`/product/${id}`}>
 <img className="product-img" src={img_url} />
 </Link>
 </div>

 <Link href={`/product/${id}`}>
 <a className="product-name">{name}</a>
 </Link>

 <div className="rating">
 <StarRatings
 rating={parseFloat(rating)}
 starRatedColor="#F9AD3D"
 numberOfStars={5}
 name="rating"
 starDimension="20px"
 starSpacing="1px"
 />
 </div>

 <div className="price">
 <p className="price-value">${price}</p>
 <button className="add-cart" onClick={() => toggleCart(id)}>
 {cart.data.cart.products.includes(id) && (
 <FaCartArrowDown size={18} color="#D8D8D8" />
 )}
 {!cart.data.cart.products.includes(id) && (
 <FaCartPlus size={18} color="#D8D8D8" />
 )}
 </button>
 </div>
 </article>
 );
 }

 */
export {};
