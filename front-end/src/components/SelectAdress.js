import React from 'react';
const SelectAddress = () => {
  return (
    <label htmlFor="address">
      <select name="address" id='select-add' >
        <option value="Rua">Rua</option>
        <option value="Avenida">Avenida</option>
        <option value="Alameda">Alameda</option>
      </select>
    </label>
  );
};
export default SelectAddress;
