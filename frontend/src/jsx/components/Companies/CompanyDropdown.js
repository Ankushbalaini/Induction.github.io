import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_ROOT_URL } from "../../constants";

// api call
async function getCompanies(token) {
  return fetch(`${API_ROOT_URL}/company/companyDropdownList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(),
  }).then((data) => data.json());
}

const CompanyDropdown = (props) => {
  const token = useSelector((state) => state.auth.auth.token);
  const [selected, setSelected] = useState(props.prevSelected);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState();

  const callApi = async (token) => {
    const response = await getCompanies(token);
    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option key={index} value={row._id}>{row?.company?.name ?? row._id}</option>
      ));
      setOption(rows);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      callApi(token);
    }
  }, []);
  const pageContent = loading ? <option>Loading</option> : <>{option}</>;
  return <>{pageContent}</>;
};

export default CompanyDropdown;
