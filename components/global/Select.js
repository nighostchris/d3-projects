import React from 'react';
import { Form } from 'react-bootstrap';

const Select = ({ title, value, setValue, optionList }) => (
  <Form.Group>
    <Form.Label>{title}</Form.Label>
    <Form.Control
      as="select"
      value={value}
      onChange={(e) => setValue((e.target.value))}
    >
      {
        optionList.map((option, index) => (
          <option key={`form-control-option-${index}`}>
            {option}
          </option>
        ))
      }
    </Form.Control>
  </Form.Group>
);

export default Select;
