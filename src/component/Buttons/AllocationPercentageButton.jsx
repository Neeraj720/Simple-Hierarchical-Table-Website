import React from 'react';

const AllocationPercentageButton = ({ row, value, onClick }) => {
  return (
    <button className='btn btn-success' onClick={() => onClick(row, value)}>
      Allocation%
    </button>
  );
};

export default AllocationPercentageButton;
