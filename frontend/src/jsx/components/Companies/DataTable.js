import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import DropDownBlog from "../Dashboard/DropDownBlog";
import FilterComponent from "./FilterComponent";
import Button from 'react-bootstrap/Button';
import { Fragment } from "react";

const Table = props => {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow: 1,
      className: 'col-3'
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      hide: "sm"
    },
    {
      name: "Slug",
      selector: "companyID",
      sortable: true,
      hide: "sm"
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <Fragment>
            <div className="d-flex">
            <Button onClick={()=>props.actionHandler(row)}
              href="#"
              className="btn btn-primary shadow btn-xs sharp me-1">
              <i className="fas fa-pencil-alt"></i>
            </Button>
            
            <Button onClick={()=>props.deleteClick(row.name)}
              href="#"
              className="btn btn-danger shadow btn-xs sharp"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </div>
          </Fragment>

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
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;
// <DropDownBlog onEdit={()=>props.actionHandler(row)} onDelete={()=>props.deleteClick(row.name)}/>