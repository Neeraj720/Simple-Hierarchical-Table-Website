import React from 'react';
import TableRow from './TableRow';

const Table = ({ data, value, setValue, handleAllocationPer, handleAllocationValue, calculateGrandTotal }) => {
  return (
    <div className="container mt-3">
      <h3 className='text-center mb-3'>Simple Hierarchical Table Website</h3>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
            <th scope="col">Input</th>
            <th scope="col">Allocation %</th>
            <th scope="col">Allocation Val</th>
            <th scope="col">Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row) => (
            <TableRow
              key={row?.id}
              row={row}
              value={value}
              setValue={setValue}
              handleAllocationPer={handleAllocationPer}
              handleAllocationValue={handleAllocationValue}
            />
          ))}
        </tbody>
      </table>
      <div>
        <h5>Grand Total: {calculateGrandTotal()}</h5>
      </div>
    </div>
  );
};

export default Table;
