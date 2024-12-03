import React from 'react';
import AllocationPercentageButton from '../Buttons/AllocationPercentageButton';
import AllocationValueButton from '../Buttons/AllocationValueButton';

const TableRow = ({ row, value, setValue, handleAllocationPer, handleAllocationValue }) => {
  return (
    <>
      <tr>
        <td>{row?.label}</td>
        <td>{row?.value}</td>
        <td>
          <input type="number" onChange={(e) => setValue(e.target.value)} required />
        </td>
        <td>
          <AllocationPercentageButton row={row} value={value} onClick={handleAllocationPer} />
        </td>
        <td>
          <AllocationValueButton row={row} value={value} onClick={handleAllocationValue} />
        </td>
        <td>{row.totalVariance ? row.totalVariance : 0}%</td>
      </tr>
      {row?.children?.map((child) => (
        <tr key={child.id}>
          <td>{child?.label}</td>
          <td>{child?.value}</td>
          <td>
            <input type="number" onChange={(e) => setValue(e.target.value)} />
          </td>
          <td>
            <AllocationPercentageButton row={child} value={value} onClick={handleAllocationPer} />
          </td>
          <td>
            <AllocationValueButton row={child} value={value} onClick={handleAllocationValue} />
          </td>
          <td>{child.variance ? child.variance : 0}%</td>
        </tr>
      ))}
    </>
  );
};

export default React.memo(TableRow);
