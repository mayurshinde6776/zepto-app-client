import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const history = useNavigate();

  const handleGoBack = () => {
    // Redirect to the home page '/'
    history('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Typography variant="h4" align="center" color="success" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" align="center">
            Your payment was successful. Thank you for your order!
            If you have any questions or concerns, feel free to contact us.
          </Typography>
          <Button variant="outlined" color="success" className="mt-3" onClick={handleGoBack}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Success;
