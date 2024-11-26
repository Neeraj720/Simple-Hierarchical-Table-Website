// import React, { useState } from 'react';

// const initialData = {
//     rows: [
//         {
//             id: "electronics",
//             label: "Electronics",
//             value: 1500,
//             children: [
//                 { id: "phones", label: "Phones", value: 800 },
//                 { id: "laptops", label: "Laptops", value: 700 },
//             ],
//         },
//         {
//             id: "furniture",
//             label: "Furniture",
//             value: 1000,
//             children: [
//                 { id: "tables", label: "Tables", value: 300 },
//                 { id: "chairs", label: "Chairs", value: 700 },
//             ],
//         },
//     ],
// };

// const App2 = () => {
//     const [data, setData] = useState(initialData);

//     const updateValue = (id, newValue) => {
//         const updatedRows = updateRows(data.rows, id, newValue);
//         console.log(updatedRows ,"updatedRows")
//         setData({ rows: updatedRows });
//     };

//     const updateRows = (rows, id, newValue) => {
//         return rows.map(row => {
//             if (row.id === id) {
//                 const variance = ((newValue - row.value) / row.value) * 100;
//                 const updatedRow = { ...row, value: newValue, variance };
//                 return updatedRow;
//             }
//             if (row.children) {
//                 const updatedChildren = updateRows(row.children, id, newValue); //updatedRow
//                 const newTotal = updatedChildren.reduce((sum, child) => sum + child.value, 0);
//                 const variance = ((newTotal - row.value) / row.value) * 100;
//                 return { ...row, children: updatedChildren, value: newTotal, variance };
//             }

//             return row;
//         });
//     };

//     const handlePercentageAllocation = (row, percentage) => {
//         const newValue = row.value + (row.value * (percentage / 100));
//         // console.log(newValue,"new value")
//         updateValue(row.id, newValue);
//     };

//     const handleValueAllocation = (row, newValue) => {
//         updateValue(row.id, newValue);
//     };

//     const renderRows = (rows) => {
//         return rows.map(row => (
//             <React.Fragment key={row.id}>
//                 <tr>
//                     <td>{row.label}</td>
//                     <td>{row.value.toFixed(2)}</td>
//                     <td>
//                         <input type="number" id={`input-${row.id}`} />
//                     </td>
//                     <td>
//                         <button onClick={() => {
//                             const percentage = parseFloat(document.getElementById(`input-${row.id}`).value);
//                             if (!isNaN(percentage)) handlePercentageAllocation(row, percentage);
//                         }}>Allocation %</button>
//                     </td>
//                     <td>
//                         <button onClick={() => {
//                             const value = parseFloat(document.getElementById(`input-${row.id}`).value);
//                             if (!isNaN(value)) handleValueAllocation(row, value);
//                         }}>Allocation Val</button>
//                     </td>
//                     <td>{row.variance ? `${row.variance.toFixed(2)}%` : '0%'}</td>
//                 </tr>
//                 {row.children && renderRows(row.children)}
//             </React.Fragment>
//         ));
//     };

//     const grandTotal = data.rows.reduce((sum, row) => sum + row.value, 0);

//     return (
//         <div>
//             <h1>Hierarchical Table</h1>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Label</th>
//                         <th>Value</th>
//                         <th>Input</th>
//                         <th>Allocation %</th>
//                         <th>Allocation Val</th>
//                         <th>Variance %</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {renderRows(data.rows)}
//                     <tr>
//                         <td><strong>Grand Total</strong></td>
//                         <td><strong>{grandTotal.toFixed(2)}</strong></td>
//                         <td colSpan="4"></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default App2;

import React, { useState } from 'react';

function App2() {
  // Initial data
  const initialData = {
    rows: [
      {
        id: 'electronics',
        label: 'Electronics',
        value: 1400,
        children: [
          { id: 'phones', label: 'Phones', value: 800 },
          { id: 'laptops', label: 'Laptops', value: 700 },
        ],
      },
      {
        id: 'furniture',
        label: 'Furniture',
        value: 1000,
        children: [
          { id: 'tables', label: 'Tables', value: 300 },
          { id: 'chairs', label: 'Chairs', value: 700 },
        ],
      },
    ],
  };

  const [data, setData] = useState(initialData);

  const handlePercentageUpdate = (rowId, percentage) => {
    const updatedData = updateRow(data.rows, rowId, percentage, 'percent');
    setData({ rows: updatedData });
  };

  const handleValueUpdate = (rowId, value) => {
    const updatedData = updateRow(data.rows, rowId, value, 'value');
    setData({ rows: updatedData });
  };

  const updateRow = (rows, id, value, type) => {
    return rows.map((row) => {
      if (row.id === id) {
        if (row.children) {
          // If the row has children, update children first
          const updatedChildren = updateRow(row.children, id, value, type);
          const totalChildValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
          const updatedParentValue = totalChildValue;

          const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;

          return {
            ...row,
            value: parseFloat(updatedParentValue.toFixed(2)),
            totalVariance: parseFloat(parentVariance.toFixed(2)),
            children: updatedChildren,
          };
        } else {
          // If the row doesn't have children, just update it directly
          let updatedValue = row.value;
          let variance = 0;

          if (type === 'percent') {
            updatedValue += (updatedValue * value) / 100;
            variance = (value / 100) * 100;
          } else if (type === 'value') {
            updatedValue = value;
            variance = ((updatedValue - row.value) / row.value) * 100;
          }

          return {
            ...row,
            value: parseFloat(updatedValue.toFixed(2)),
            variance: parseFloat(variance.toFixed(2)),
          };
        }
      }

      // Recursively update the children rows
      if (row.children) {
        const updatedChildren = updateRow(row.children, id, value, type);
        const totalChildValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
        const updatedParentValue = totalChildValue;
        const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;

        return {
          ...row,
          value: parseFloat(updatedParentValue.toFixed(2)),
          totalVariance: parseFloat(parentVariance.toFixed(2)),
          children: updatedChildren,
        };
      }

      return row;
    });
  };

  const calculateGrandTotal = () => {
    const totalValue = data.rows.reduce((sum, row) => sum + row.value, 0);
    return totalValue.toFixed(2);
  };

  const renderRow = (row) => (
    <React.Fragment key={row.id}>
      <tr>
        <td>{row.label}</td>
        <td>{row.value}</td>
        <td>
          <input type="number" onChange={(e) => setInputValue(e.target.value)} />
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => handlePercentageUpdate(row.id, parseFloat(inputValue))}
          >
            Allocation %
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleValueUpdate(row.id, parseFloat(inputValue))}
          >
            Allocation Val
          </button>
        </td>
        <td>{row.variance || row.totalVariance}%</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <tr key={child.id}>
            <td>{`-- ${child.label}`}</td>
            <td>{child.value}</td>
            <td>
              <input
                type="number"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={() => handlePercentageUpdate(child.id, parseFloat(inputValue))}
              >
                Allocation %
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleValueUpdate(child.id, parseFloat(inputValue))}
              >
                Allocation Val
              </button>
            </td>
            <td>{child.variance}%</td>
          </tr>
        ))}
    </React.Fragment>
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(renderRow)}
          <tr>
            <td><strong>Grand Total</strong></td>
            <td>{calculateGrandTotal()}</td>
            <td colSpan="4"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App2;
