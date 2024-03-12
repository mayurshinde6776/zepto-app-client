import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const history = useNavigate();

  const handleGoBack = () => {
    // Redirect to the home page '/'
    history('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Typography variant="h4" align="center" color="error" gutterBottom>
            Payment Cancelled!
          </Typography>
          <Typography variant="body1" align="center">
            Your payment process for the food delivery has been cancelled.
            If you need further assistance or would like to place a new order,
            please click the "Go Back" button below.
          </Typography>
          <Button variant="outlined" color="error" className="mt-3" onClick={handleGoBack}>
            Go Back
          </Button>
          {/* You can add more content or links here */}
        </Col>
      </Row>
    </Container>
  );
}

export default Cancel;
