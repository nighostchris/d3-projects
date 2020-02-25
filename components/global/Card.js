import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ header, children }) => (
  <Card className="shadow mb-4">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">{header}</h6>
    </div>
    <Card.Body>{children}</Card.Body>
  </Card>
);

export default CustomCard;
