import React from 'react'
import { Row,Col,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slices/wishlistSlice';
import { addtoCart } from '../Redux/Slices/cartSlice';
import Header from '../Components/Header';

function Wishlist() {
  const wishlist=useSelector((state) => state.wishlistSlice.wishlist);
  const dispatch=useDispatch()
 
  const handleCart =(product)=>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addtoCart)
  }

  return (
    <div>
      <Header/>
      <div className='container my-3 '>
        <Row>
          {wishlist?.length>0?wishlist?.map(product=>(
            <Col  className='mb-3' sm={12} md={6} lg={4} xl={3}>
            <Card className='shadow rounded' style={{ width: '18rem' }}>
              <Link to={`/view/${product.id}`}><Card.Img variant="top" style={{height:'180px'}} src={product.thumbnail} /></Link>
              <Card.Body>
                <Card.Title style={{height:'50px'}}>{product.title.slice(0,20)}...</Card.Title>
                <div className='d-flex justify-content-between'>
                  <Button onClick={()=>dispatch(removeFromWishlist(product.id))} className='btn btn-light fs-5'><i class="fa-solid fa-heart-circle-xmark text-danger"></i></Button>
                  <Button onClick={()=>handleCart(product)} className='btn btn-light fs-5'><i class="fa-solid fa-cart-shopping text-success"></i></Button>
                </div>
              </Card.Body>
            </Card>
          
          </Col>
          )): <div className='text-center '>
            <img src="https://limasy.com/img/empty-animation1.gif" alt="" />
            <h1 className='fw-bolder '>Your wishlist is empty</h1>
            </div>}
        </Row>
      </div>
    </div>
  )
}

export default Wishlist