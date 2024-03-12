import React, { useEffect, useState } from 'react';
import { Table } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DLT, REMOVE } from './redux/actions/actions';
import "../css/cardDetails.css"
import { Button } from 'react-bootstrap';

const CardsDetails = () => {

    const [data, setData] = useState([]);

    console.log("data", data);
    // get data from url
    const { id } = useParams();
    //console.log(id);


    const history = useNavigate();

    const dispatch = useDispatch();

    //get data from redux store
    const getdata = useSelector((state) => state.cartreducer.carts);

    //cpmpare data from store and params
    const compare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id
        });
        setData(comparedata);
    }

    // when id is change then compare menthod is called
    useEffect(() => {
        compare();
    }, [id]);

    //add data
    const send = (e) => {
        //    console.log(e);
        dispatch(ADD(e));
    }

    const dlt = (id) => {
        dispatch(DLT(id));
        history('/')
    }

    //remove one item

    const remove = (item) => {
        dispatch(REMOVE(item))
    }

    return (
        <>
            <div className='container mt-2 mb-4'>
                <h2 className='text-center font-weight-bold text-success mb-4'>Item Details - Zepto Food Delivery</h2>
                <p className='text-secondary text-center mb-4'>
                    Welcome to the Item Details page! Here, you can review and manage the items in your cart.
                    Easily increase or decrease the quantity of each item, or remove items you no longer want.
                </p>

                <section className='container  mt-3'>
                    <div className='row'>
                        {data.map((ele) => (
                            <div key={ele.id} className='col-md-6 mb-4'>
                                <div className='items_img'>
                                    <img src={ele.imgdata} alt={ele.rname} className='img-fluid' />
                                </div>
                                <div className='details'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Restaurant</strong>: {ele.rname}</p>
                                                    <p><strong>Price</strong>: ₹ {ele.price}</p>
                                                    <p><strong>Dishes</strong>: {ele.address}</p>
                                                    <p><strong>Total</strong>: ₹ {ele.price * ele.qnty}</p>
                                                    <div className='mt-3 d-flex justify-content-between align-items-center quantity-control'>
  <Button variant="outline-success" className="quantity-btn minus" onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</Button>
  <span className="quantity">{ele.qnty}</span>
  <Button variant="outline-success" className="quantity-btn plus" onClick={() => send(ele)}>+</Button>
</div>



                                                </td>
                                                <td>
                                                    <p><strong>Rating</strong>: <span className='badge bg-success'>{ele.rating} ★</span></p>
                                                    <p><strong>Order Review</strong>: {ele.somedata}</p>
                                                    <p><strong>Remove</strong>: <i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: 'red', fontSize: '20', cursor: 'pointer' }}></i></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>

    )
}

export default CardsDetails