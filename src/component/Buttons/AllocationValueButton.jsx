import React from 'react';

const AllocationValueButton = ({ row, value, onClick }) => {
  return (
    <button className='btn btn-danger' onClick={() => onClick(row, value)}>
      Allocation Val
    </button>
  );
};

export default AllocationValueButton;
