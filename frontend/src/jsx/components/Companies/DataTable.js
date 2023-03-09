import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import ActionDropDown from "../Dashboard/ActionDropDown";
import FilterComponent from "./FilterComponent";
import { Link } from "react-router-dom";

import { tableStyles } from "../Instructor/Instructor-1/tableStyles";

// const tableCustomStyles = {
//   headCells: {
//     style: {
//       fontSize: '15px',
//       // fontWeight: 'bold',
//       // paddingLeft: '0 8px',
//       // justifyContent: 'center',
//       backgroundColor: '#ff6a59',
//     },
//   },
// }

const Table = (props) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,    
      sortable: true,
      grow: 1,
      className: "col-3",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      hide: "sm",          
    },
    {
      name: "Slug",
      selector: (row) => row.companyID,
      sortable: true,
      hide: "sm",
    },  
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div>
          <Link
          className={`badge light ${(row?.userID.status)? 'badge-success': 'badge-danger'}`}
          to="/companies"
          onClick={() => props.changeCompanyStatus(row?.userID._id, row.userID.status) }
          
        >
          { (row?.userID.status) ? 'Active' : 'Inactive'}
        </Link>
        </div>
      )
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <ActionDropDown
            trackOnclick={props.trackOnclick}
            userData={row}
            trackDeleteClick={props.trackDeleteClick}
          />
        </div>
      ),
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title=""
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={tableStyles}
      // customStyles={tableCustomStyles}
    />
  );
};

export default Table;
