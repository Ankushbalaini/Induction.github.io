import React, { Fragment, useMemo, useState ,useEffect} from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { useSelector } from "react-redux";
import { tableStyles } from "./tableStyles";
import { Button } from "react-bootstrap";

const Table = (props) => {
    // const [allTitles,setAllTitles]=useState()
    const {users, setUsers} = props;


  const token = useSelector((state) => state.auth.auth.token);

const dataset1 = [];

const allTitles = users.map(i=>dataset1.push(i.inductions.title))
console.log(allTitles,"allTitles...")

function removeDuplicates(){
    let unique = []
    dataset1.forEach(element =>{
        if(!unique.includes(element)){
            unique.push(element)
        }
    })
    return unique
  }





  const columns = [
    {
      name: "Induction Title",
      selector: "inductions.title",
      sortable: true,
      grow: 1,
      className: "col-3",
      cell: (row) => (
        
        <>
          <div className="d-flex align-items-center">
            {/* <div>{row.inductions.title}</div> */}
            <div>{removeDuplicates(dataset1)}</div>
          </div>
        </>
      ),
    },
    {
      name: "Total Attempted Inductions",
      selector: "total",
      sortable: true,
      grow: 1,
      className: "col-3",
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = users.filter(
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
    <>
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
    </>
  );
};

export default Table;
