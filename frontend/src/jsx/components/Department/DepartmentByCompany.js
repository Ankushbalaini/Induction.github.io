import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./styles.css";
import Select from "react-select";
 

// api call
async function getDepartments(token, company) { 
  const response = await fetch("http://localhost:8081/api/department/getDepartmentByComp", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  "x-access-token": token
  },
  body: JSON.stringify({ "parentCompany": company })
  });
  const data = await response.json();
  return data;
  }


const DepartmentByCompany = (props) => {
const token = useSelector((state) => state.auth.auth.token);
const [loading, setLoading] = useState(true);
const [optionList, setOptionList] = useState([]);
const [selectedOptions, setSelectedOptions] = useState();
useState(props.prevSelected);
//API CALL 
const callApi = async (token, company) => {
  const response = await getDepartments(token, company);
  if ("status" in response && response.status === true) {
  const rows = response.data.map((row, index) => ({
  value: row._id,
  label: row.name
  }));
  setOptionList(rows);
  setLoading(false);
  }
  }

   // Function triggered on selection
   function handleSelect(data) {
    setSelectedOptions(data);
  }


useEffect(() => {
  callApi(token, props.parentCompany, props.optionList);
  }, [props.parentCompany,props.optionList]);
  
console.log(optionList,"...optionList")


  return (
    <div>
       <div className="App">
    <div className="dropdown-container">
    <Select
          options={optionList}
          placeholder="Select Department"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
    </div>
  </div>
    </div>
  )
}

export default DepartmentByCompany
