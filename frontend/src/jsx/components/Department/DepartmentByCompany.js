import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_ROOT_URL } from "../../constants";

// api call
async function getDepartments(token, company) {
  return fetch(`${API_ROOT_URL}/department/getDepartmentByComp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ parentCompany: company }),
  }).then((data) => data.json());
}

const DepartmentByCompany = (props) => {
  const token = useSelector((state) => state.auth.auth.token);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState();

  const callApi = async (token, company) => {
    const response = await getDepartments(token, company);
    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option key={row._id} value={row._id}>
          {row.name}
        </option>
      ));
      setOption(rows);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(props.parentCompany !==''){
      callApi(token, props.parentCompany);
    }
  }, [props.parentCompany]);
  const pageContent = loading ? <option>Loading</option> : <>{option}</>;
  return <>{pageContent}</>;
};

export default DepartmentByCompany;
