import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// api call
async function getAllInductions(token) {
  return fetch("${API_ROOT_URL}/induction/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((data) => data.json());
}

const InductionDropdown = (props) => {
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState();
  const token = useSelector((state) => state.auth.auth.token);

  const callApi = async () => {
    const response = await getAllInductions(token);
    if ("status" in response && response.status == true) {
      const rows = response.data.map((row, index) => (
        <option value={row._id}>{row.title}</option>
      ));
      setOption(rows);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      callApi();
    }
  }, []);
  const pageContent = loading ? <option>Loading</option> : <>{option}</>;
  return <>{pageContent}</>;
};

export default InductionDropdown;
