import React from 'react'

const TableComponent = ({ name, tableHeaders, data }) => {
   return (
      <div className='row dashboardCard'>
         <div className=''>
            <h3>{name}</h3>
            <hr style={{ 'color': '#0075c9', 'height': '3px', "backgroundColor": "#0075c9" }} />
            <div className='App table-responsive'>
               <table className="table">
                  <tr>
                     {tableHeaders.map((theader) => {
                        return (
                           <th>{theader}</th>
                        )
                     })}
                  </tr>
                  {data.map((val, key) => {
                     let vals =Object.keys(val);
                     return (
                        <tr key={key}>
                           {vals.map((k, key) => {
                              return (
                                 <td key={key}>{val[k]}</td>
                              )
                           })}
                           {/* <td><span class="dot"></span>{val["pension_provider"]}</td>
                           <td>{val.client_name}</td>
                           <td>{val.client_id}</td>
                           <td>{val.phone_no}</td>
                           <td>{val.company_name}</td>
                           <td>{val.status}</td> */}
                        </tr>
                     )
                  })}
               </table>
            </div>

         </div>
      </div>
   )
}

export default TableComponent;