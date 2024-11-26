import React, { useState } from 'react'

function App() {
  const initialData =
  {
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
  }
  const [value, setValue] = useState(0)
  const [data,setData] = useState(initialData)
  console.log(value)
  // get percentage
  const handleAllocationPer = (row, percentage) => {
    const newValue = row.value + (row.value * (percentage / 100));
    console.log("new value:" , newValue)
    updateValue(row.id,newValue)
  }

// update value

const updateValue = (id,newValue) =>{
  const updatedRow = updatedRows(data.rows,id,newValue)
  console.log(updatedRow,"updated row")
  setData({rows:updatedRow})
}

  // update rows
  const updatedRows = (rows,id,newValue) =>{
    return rows.map((row)=>{
      if(row.id == id){
        const variance = ((newValue - row.value) / row.value) * 100;
        const updatedRow = { ...row, value: newValue, variance };
        return updatedRow;
      }
      if(row.children){
        
      }
      return row
    })
  }
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">lable</th>
            <th scope="col">value</th>
            <th scope="col">input</th>
            <th scope="col">allocation %</th>
            <th scope="col">allocation val</th>
            <th scope="col">variance %</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.rows?.map((row) => {
              return <>
                <tr key={row?.id}>
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
                  <td>{row.variance}%</td>
                </tr>
                {
                  row?.children?.map((child) => {
                    return <>
                      <tr>
                        <td>{child?.label}</td>
                        <td>{child?.value}</td>
                        <td>
                          <input type="number" onChange={(e) => setValue(e.target.value)}  />
                        </td>
                        <td>
                          <button className='btn btn-success' onClick={() => handleAllocationPer(child, value)}>Allocation%</button>
                        </td>
                        <td>
                          <button className='btn btn-danger'>Allocation val</button>
                        </td>
                        <td>0%</td>
                      </tr>
                    </>
                  })
                }
              </>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App



