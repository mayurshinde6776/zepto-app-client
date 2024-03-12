import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Cardsdata from './CardsData';
import "../css/style.css";
import { useDispatch } from 'react-redux';
import { ADD } from './redux/actions/actions';

const Cards = () => {
    const [data, setData] = useState(Cardsdata);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
        // Auto-close the modal after 3 seconds
        setTimeout(() => {
            handleClose();
        }, 2000);
    };

    const send = (e) => {
        dispatch(ADD(e));
        handleShow(); // Show the modal when item is added to the cart
    };

    return (
        <div className='container my-3 mb-5'>
          <div className="text-center">
      <h2 className="font-weight-bold text-success mb-4">Welcome to Zepto Food Delivery</h2>
      <p className="text-secondary">
        Experience a world of flavors at your fingertips with Zepto Food Delivery. We bring your favorite dishes from local restaurants straight to your doorstep.
      </p>
      <p className="text-secondary">
        Discover a seamless and convenient way to satisfy your cravings, whether it's a quick bite or a hearty feast.
        Order now and indulge in the joy of hassle-free dining!
      </p>
    </div>

            <div className='row d-flex justify-content-center align-items-center' >
                {data.map((element, id) => (
                    <Card key={id} style={{ width: '22rem', border: "none" }} className='mx-2 mt-4 card_style'>
                        <Card.Img variant="top" className='mt-3' src={element.imgdata} style={{ height: "16rem" }} />
                        <Card.Body>
                            <Card.Title className='text-success'>{element.rname}</Card.Title>
                            <Card.Text className='text-success'>
                                Price: ₹ {element.price}
                            </Card.Text>

                            <div className='button_div d-flex justify-content-center'>
      <Button
        onClick={() => send(element)}
        variant="dark"
        className='col-lg-12 custom-button'
      >
        Add to Cart
      </Button>
    </div>
                          
                        </Card.Body>
                    </Card>
                ))}
            </div>

          {/* Bootstrap Modal */}
          <Modal show={showModal} backdrop={false} keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton className='mx-4 my-0 text-center text-success'>
                    Item is added into the cart successfully.
                </Modal.Header>
            </Modal>
        </div>
    );
}

export default Cards;
