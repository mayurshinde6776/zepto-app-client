import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@mui/material';
import { DLT, REMOVE } from './redux/actions/actions';
import { loadStripe } from '@stripe/stripe-js';


const Header = () => {

  // get data from store
  const getdata = useSelector((state) => state.cartreducer.carts);

  // console.log("getdata",getdata);

  const dispatch = useDispatch();

  const [price, setPrice] = useState();


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  }

  const total = () => {
    let price = 0;
    getdata.map((ele, key) => {
      price = ele.price * ele.qnty + price;

      if(price<100)
      {
        price+=50
      }
     else {
      price-=50
     }
      
    });
    setPrice(price);
  }

  useEffect(() => {
    total();
  }, [total])

  const remove = (item) => {
    dispatch(REMOVE(item))
  }


  //payment integration 
  // dummy visa card number to test: 4000003560000008
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51OYoZhSEOKoo6wPzNtFIx0iTGNiwnZIUzWHKi3zDlRwToMvIGFElKf3gpIagGBqwrG2tT96ojJLjfEHuSAeKOslx00Bj2msRAW");

    const body = {
      products: getdata
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch('https://zepto-app-server.onrender.com/api/create-checkout-session', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  }

  return (
    <>
    <Navbar bg="" data-bs-theme="" style={{ height: '60px', background: "#28a745" }}>
      <Container>
        <Nav className="me-auto">
          <Link to='/' className='text-decoration-none text-light' >Zepto</Link>
          <Link to='/' className='text-decoration-none text-white mx-2'>Home</Link>
        </Nav>
  
        <Badge badgeContent={getdata.length} color="primary"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <i className="fa-solid fa-cart-plus text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
        </Badge>
      </Container>
  
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          getdata.length ?
            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <Link to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style={{ width: "5rem", height: '5rem' }} alt='' />
                        </Link>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : ₹ {e.price} </p>
                        <p>Quantity : {e.qnty} </p>
                        <hr />
                        <p style={{ color: 'red', fontSize: 20, cursor: "pointer" }} onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}>
                          <i className='fas fa-trash smalltrash'></i>
                        </p>
                      </td>
                      <td className='mt-5' style={{ color: 'red', fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                        <i className='fas fa-trash largetrash'></i>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3">
                      <div className='d-flex justify-content-between'>
                        <p className='text-left'>Total: ₹ {price}</p>
                        <button className='btn btn-success' type='button' onClick={makePayment}>Checkout</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div> :
            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: 'relative' }}>
              <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: 'pointer' }} />
              <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
              <img src='./cart.gif' alt='' className='emptycart_img' style={{ padding: 10, width: "5rem" }} />
            </div>
        }
      </Menu>
    </Navbar>
  
    <div className='fixed-bottom'>
      <Navbar
        className='footer mt-4'
        style={{ height: '50px', background: '#28a745' }}
      >
        <Container>
          <Nav className="me-auto">
            <Link to='/' className='text-decoration-none text-light'>
              Zepto
            </Link>
            <Link to='/' className='text-decoration-none text-white mx-2'>
              Home
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  </>
  
  );
}

export default Header;