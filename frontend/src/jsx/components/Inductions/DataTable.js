import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Inductions/ActionDropDown";
import FilterComponent from "./FilterComponent";
import { Dropdown } from "react-bootstrap";

import { tableStyles } from "../Instructor/Instructor/tableStyles";

const Table = props => {

  const columns = [
    {
      name: "Sr.No",
      selector: " ",
      sortable: true,
      hide: "sm",
      cell: (row,index) => index + 1,
    },
    {
      name: "Questions",
      selector: "question",
      sortable: true,
      hide: "sm",
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <div>
            {/* <button
              onClick={() => props.actionHandler(row)}
              style={{ marginRight: "5px", minWidth: "80px" }}
              className="btn btn-warning btn "
            >
              Edit
            </button>

            <button onClick={() => props.deleteClick(row.name)} className="btn btn-danger btn sweet-confirm" style={{ marginRight: "5px", minWidth: "100px" }}>Delete</button> */}
            {/* <DropDownBlog /> */}
          
            <ActionDropDown trackOnclick={props.trackOnclick} mcqData={row} trackDeleteClick={props.trackDeleteClick}/>


            </div>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
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
        onFilter={e => setFilterText(e.target.value)}
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
    />
  );
};

export default Table;

            // <ActionDropDown trackOnclick={props.trackOnclick} userData={row} trackDeleteClick={props.trackDeleteClick}/>
