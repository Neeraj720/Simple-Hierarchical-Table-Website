import React, { useState } from 'react';

function App3() {
    const initialData = {
        "rows": [
            {
                "id": "electronics",
                "label": "Electronics",
                "value": 1500,
                "children": [
                    {
                        "id": "phones",
                        "label": "Phones",
                        "value": 800
                    },
                    {
                        "id": "laptops",
                        "label": "Laptops",
                        "value": 700
                    }
                ]
            },
            {
                "id": "furniture",
                "label": "Furniture",
                "value": 1000,
                "children": [
                    {
                        "id": "tables",
                        "label": "Tables",
                        "value": 300
                    },
                    {
                        "id": "chairs",
                        "label": "Chairs",
                        "value": 700
                    }
                ]
            }
        ]
    };

    const [value, setValue] = useState(0);
    const [data, setData] = useState(initialData);
    //   handle percentage button
    const handleAllocationPer = (row, percentage) => {
        updateValue(row.id, percentage);
    };

    const updateValue = (id, percentage) => {
        // send data id and percentege from here
        const updatedRows = updateRows(data.rows, id, percentage);
        setData({ rows: updatedRows });
    };
// handle row update function
    const updateRows = (rows, id, percentage) => {
        // get here
        return rows.map((row) => {
            if (row.id === id) { //let' say electronics == electronics
                if (row.children) { // parent have child
                    const totalInitialValue = row.children.reduce((sum, child) => sum + child.value, 0); //700+800 = 1500
                    //loop through the row
                    const updatedChildren = row.children.map((child) => {
                        const ratio = child.value / totalInitialValue; // get ratio like 700/1500 = 0.46 && 800/1500 = 0.53
                        const updatedChildValue = child.value + (child.value * percentage / 100); //700 + (700 * 10/100) = 770 and 880
                        const childVariance = ratio * percentage; // 0.46*10 = 4.6 && 0.53 * 10 = 5.33
                        // now return updated child array with updated values
                        return {
                            ...child,
                            value: parseFloat(updatedChildValue.toFixed(2)),
                            variance: parseFloat(childVariance.toFixed(2))
                        };
                    });


                    const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0); // 770+880 = 1650
                    const parentVariance = ((updatedParentValue - row.value) / row.value) * 100; // 1650-1500 / 1500 = 10%
                    //   return updated parent array with updated values
                    return {
                        ...row,
                        value: parseFloat(updatedParentValue.toFixed(2)),
                        totalVariance: parentVariance.toFixed(2),
                        children: updatedChildren
                    };
                    //   this block calculate child variance and updated value
                } else {
                    const updatedValue = row.value + (row.value * percentage / 100);
                    console.log("updatedValue:", updatedValue)
                    const variance = ((updatedValue - row.value) / row.value) * 100;
                    // return to the update rows child array 
                    return {
                        ...row,
                        value: parseFloat(updatedValue.toFixed(2)),
                        variance: variance.toFixed(2)
                    };
                }
            }

            //   if you want to change the value of child input field
            if (row.children) {
                // recorsive function with child values
                const updatedChildren = updateRows(row.children, id, percentage);
                // getting else block code child updated array

                // console.log(updatedChildren,"updatedChildren")//getting updated array with updated values like 880
                const updatedParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0); // 880+700 = 1580
                console.log(updatedParentValue, "updatedParentValue") // 1580
                const parentVariance = ((updatedParentValue - row.value) / row.value) * 100;//5.333
                // console.log(parentVariance,"parentVariance")

                return {
                    ...row,
                    value: parseFloat(updatedParentValue.toFixed(2)),
                    totalVariance: parentVariance.toFixed(2),
                    children: updatedChildren
                };
            }


            return row;
        });
    };

     // grand total code 
     const calculateGrandTotal = () => {
        const totalValue = data.rows.reduce((sum, row) => sum + row.value, 0);
        return totalValue.toFixed(0);
    };

    return (
        <>
            <div className="container mt-3">
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
                        {
                            data?.rows?.map((row) => (
                                <React.Fragment key={row?.id}>
                                    <tr>
                                        <td>{row?.label}</td>
                                        <td>{row?.value}</td>
                                        <td>
                                            <input type="number" onChange={(e) => setValue(e.target.value)} />
                                        </td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => handleAllocationPer(row, value)}>Allocation%</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger'>Allocation val</button>
                                        </td>
                                        <td>{row.totalVariance}%</td>
                                    </tr>
                                    {
                                        row?.children?.map((child) => (
                                            <tr key={child.id}>
                                                <td>{child?.label}</td>
                                                <td>{child?.value}</td>
                                                <td>
                                                    <input type="number" onChange={(e) => setValue(e.target.value)} />
                                                </td>
                                                <td>
                                                    <button className='btn btn-success' onClick={() => handleAllocationPer(child, value)}>Allocation%</button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger'>Allocation val</button>
                                                </td>
                                                <td>{child.variance}%</td>
                                            </tr>
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <h5>Grand Total:{calculateGrandTotal()}</h5>
                </div>
            </div>
        </>
    );
}

export default App3;
