import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { getData, deleteData, API_URL } from "../../Utils";
import "./ViewShipment.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Shipment } from "../../interfaces";

const ViewShipment: React.FC = () => {
  const [data, setData] = useState<Array<Shipment> | undefined>();
  const [search, setSearch] = useState<any>('');

  useEffect(() => {
    getData(`${API_URL}/shipments`).then(respData => {
      console.log("Resp", respData);
      setData(respData);
    });
  }, []);

  const handleConfirmBox = (rowData: any) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(rowData)
        },
        {
          label: "Don't delete",
          onClick: () => {}
        }
      ]
    });
  };

  const handleDelete = (rowData: any) => {
    if (data) {
      deleteData(`${API_URL}/shipments/${rowData.id}`).then(() => {
        setData(data.filter(shipmentData => shipmentData.id !== rowData.id));
      });
    }
  };

  const handleSarch = (e: any) => {
    e.preventDefault();
    if (search) {
      console.log('search', search);
      getData(`${API_URL}/shipments?id_like=${search}`).then(respData => {
        console.log("Search Resp", respData);
        setData(respData);
      });
    }
  };

  const getDataTable = () => {
    if (!data) {
      return <></>;
    }

    const columns = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Origin",
        accessor: "origin"
      },
      {
        Header: "Destination",
        accessor: "destination"
      },
      {
        Header: "Mode",
        accessor: "mode"
      },
      {
        Header: "Total",
        accessor: "total"
      },
      {
        Header: "Type",
        accessor: "type"
      },
      {
        Header: "User ID",
        accessor: "userId"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "CRUD",
        Cell: (row: any) => (
          <div className="crudSection">
            <span className="viewLink">
              <Link to={`/viewShipmentDetails/${row.original.id}`}>
                View/Edit
              </Link>
            </span>
            <span className="deleteLink">
              <button onClick={() => handleConfirmBox(row.original)}>
                Delete
              </button>
            </span>
          </div>
        )
      }
    ];

    return <ReactTable data={data} columns={columns} defaultPageSize={5} />;
  };

  return (
    <>
      <div className="headerBlock">
        <div className="headerContent">
          <div className="leftBlock">
            <Link to="/">
              <img src="https://freighthub.com/wp-content/themes/freighthub/img/logo/logo.png" alt="logo"/>
            </Link>
          </div>
          <div className="rightBlock">
            <form action="" onSubmit={handleSarch}>
              <input type="text" className="searchBox" onChange={(e)=> setSearch(e.target.value)} />
              <button onClick={handleSarch}>Search</button>
            </form>
          </div>
        </div>
      </div>
      <h1>Shipment Details</h1>
      {getDataTable()}
    </>
  );
};

export default ViewShipment;
