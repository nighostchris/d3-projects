import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

const Select = ({ title, placeholder, selected, setSelected, options }) => {

  return (
    <>
      { title && <h5 style={{ color: '#4e73df', fontWeight: 'bold' }}>{title}</h5> }
      <Typeahead
        id="custom-typeahead"
        options={options}
        selected={selected}
        placeholder={placeholder}
        onChange={(selected) => setSelected([...selected]) }
      />
    </>
  );
}

export default Select;
