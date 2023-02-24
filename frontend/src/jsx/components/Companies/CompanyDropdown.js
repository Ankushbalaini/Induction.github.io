import React, { Fragment, useEffect, useState } from "react";


// api call
async function getCompanies() {
    return fetch("http://localhost:8081/api/company/companyDropdownList", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    }).then((data) => data.json());
}

   
const CompanyDropdown = (props) => {
    const [selected, setSelected] = useState(props.prevSelected);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();

    const callApi = async () =>{
        const response = await getCompanies();
        if ("status" in response && response.status == true) {
            const rows = response.data.map((row, index) => (
                <option value={row._id}>{ row?.company?.name ?? row._id}</option>
            ));
            setOption(rows);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(loading){
            callApi();
        }
    },[]);
    const pageContent = (loading) ? <option>Loading</option> : <>{option}</>;
    return(
        <>
        {pageContent}
        </>
    )
};

export default CompanyDropdown;