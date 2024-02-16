import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://dssj.stou.ac.th/api/data/fg?fac_code=10";

    fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-token': '$2y$10$TY2vwRplhBQwy1b.nfI2y.PkQzBFb3mEtpkr1ptubTKZfPw6yH.Ae',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
        setError(error.message);
      });
  }, []);

  const groupedData = data ? data.results.reduce((acc, item) => {
    const key = item.group_name; // replace 'group_name' with the property you want to group by
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {}) : {};

  return (
    <div style={{ margin: 'auto 0'}}>
    {error ? (
      <div>Error: {error}</div>
    ) : data ? (
      Object.keys(groupedData).map((groupName, index) => (
        <div key={index}>
          <h2>{groupName}</h2>
          <table>
        <thead>
          <tr>
            <th>no.</th>
            <th>ou</th>
            <th>division_code</th>
            <th>group_code</th>
            <th>group_name</th>
            <th>itm_type_code</th>
            <th>type_name</th>
            <th>fac_code</th>
            <th>fac_name</th>
            <th>education_type_level</th>
            <th>education_type_level_name</th>
            <th>subj_code</th>
            <th>subj_name</th>
            <th>rm_code</th>
            <th>rm_name</th>
            <th>ums_code</th>
            <th>warehouse_code</th>
            <th>bal_qty</th>
            <th>bal_amt</th>
          </tr>
        </thead>
        <tbody>
        {groupedData[groupName].map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{item.ou}</td>
            <td>{item.division_code}</td>
            <td>{item.group_code}</td>
            <td>{item.group_name}</td>
            <td>{item.itm_type_code}</td>
            <td>{item.type_name}</td>
            <td>{item.fac_code}</td>
            <td>{item.fac_name}</td>
            <td>{item.education_type_level}</td>
            <td>{item.education_type_level_name}</td>
            <td>{item.subj_code}</td>
            <td>{item.subj_name}</td>
            <td>{item.rm_code}</td>
            <td>{item.rm_name}</td>
            <td>{item.ums_code}</td>
            <td>{item.warehouse_code}</td>
            <td>{item.bal_qty}</td>
            <td>{item.bal_amt}</td>
            </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))
    ) : (
      "Loading..."
    )}
  </div>
  );
};

export default App;