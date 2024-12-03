import React from 'react';

const AllocationValueButton = ({ row, value, onClick }) => {
  console.log("child components table button")
  return (
    <button className='btn btn-danger' onClick={() => onClick(row, value)}>
      Allocation Val
    </button>
  );
};

export default React.memo(AllocationValueButton)
