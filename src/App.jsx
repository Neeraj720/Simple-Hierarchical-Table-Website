import React, { useState } from 'react';
import AllocationPercentageButton from './component/Buttons/AllocationPercentageButton';
import AllocationValueButton from './component/Buttons/AllocationValueButton';
import Table from './component/Table/Table';

function App() {
  const initialData = {
    "rows": [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1500,
        "children": [
          { "id": "phones", "label": "Phones", "value": 800 },
          { "id": "laptops", "label": "Laptops", "value": 700 }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000,
        "children": [
          { "id": "tables", "label": "Tables", "value": 300 },
          { "id": "chairs", "label": "Chairs", "value": 700 }
        ]
      }
    ]
  };

  const [value, setValue] = useState(0);
  const [data, setData] = useState(initialData);

  // handle percentage allocation
  const handleAllocationPer = (row, percentage) => {
    updateValue(row.id, percentage);
  };

  const updateValue = (id, percentage) => {
    const updatedRows = updateRowsByPer(data.rows, id, percentage);
    setData({ rows: updatedRows });
  };

  const updateRowsByPer = (rows, id, percentage) => {
    return rows.map((row) => {
      if (row.id === id) {
        if (row.children) {
          const totalInitialValue = row.children.reduce((sum, child) => sum + child.value, 0);
          const updatedChildren = row.children.map((child) => {
            const ratio = child.value / totalInitialValue;
            const updatedChildValue = child.value + (child.value * percentage / 100);
            const childVariance = ratio * percentage;
            return { ...child, value: parseFloat(updatedChildValue.toFixed(2)), variance: parseFloat(childVariance.toFixed(2)) };
          });

          const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
          const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;
          return { ...row, value: parseFloat(updatedParentValue.toFixed(2)), totalVariance: parentVariance.toFixed(2), children: updatedChildren };
        } else {
          const updatedValue = row.value + (row.value * percentage / 100);
          const variance = ((updatedValue - row.value) / row.value) * 100;
          return { ...row, value: parseFloat(updatedValue.toFixed(2)), variance: variance.toFixed(2) };
        }
      }
      if (row.children) {
        const updatedChildren = updateRowsByPer(row.children, id, percentage);
        const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
        const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;
        return { ...row, value: parseFloat(updatedParentValue.toFixed(2)), totalVariance: parentVariance.toFixed(2), children: updatedChildren };
      }
      return row;
    });
  };

  const handleAllocationValue = (row, value) => {
    const updatedRows = updateRowsByValue(data.rows, row.id, value);
    setData({ rows: updatedRows });
  };

  const updateRowsByValue = (rows, id, newValue) => {
    newValue = Number(newValue);
    if (isNaN(newValue)) return rows;
    return rows.map((row) => {
      if (row.id === id) {
        if (row.children) {
          const totalInitialValue = row.children.reduce((sum, child) => sum + child.value, 0);
          const updatedChildren = row.children.map((child) => {
            const contributionPer = (child.value / totalInitialValue) * 100;
            const updatedValue = (contributionPer * newValue) / 100;
            const variance = ((updatedValue - child.value) / child.value) * 100;
            return { ...child, value: parseFloat(updatedValue.toFixed(2)), variance: parseFloat(variance.toFixed(2)) };
          });

          const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
          const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;
          return { ...row, value: parseFloat(newValue.toFixed(2)), totalVariance: parentVariance.toFixed(2), children: updatedChildren };
        } else {
          const variance = ((newValue - row.value) / row.value) * 100;
          return { ...row, value: parseFloat(newValue.toFixed(2)), variance: variance.toFixed(2) };
        }
      }
      if (row.children) {
        const updatedChildren = updateRowsByValue(row.children, id, newValue);
        const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
        const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;
        return { ...row, value: parseFloat(updatedParentValue.toFixed(2)), totalVariance: parentVariance.toFixed(2), children: updatedChildren };
      }
      return row;
    });
  };

  const calculateGrandTotal = () => {
    const totalValue = data.rows.reduce((sum, row) => sum + row.value, 0);
    return totalValue.toFixed(0);
  };

  return (
    <Table
      data={data}
      value={value}
      setValue={setValue}
      handleAllocationPer={handleAllocationPer}
      handleAllocationValue={handleAllocationValue}
      calculateGrandTotal={calculateGrandTotal}
    />
  );
}

export default App;
