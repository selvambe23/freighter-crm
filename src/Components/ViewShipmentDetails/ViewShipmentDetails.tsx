import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import "./ViewShipmentDetails.css";
import { Shipment, PostType } from "../../interfaces";
import { getData, postData, API_URL } from '../../Utils';

const ViewShipmentDetails: React.FC<{ match: any }> = ({ match }) => {
  const { params } = match;
  const [data, setData] = useState<Array<Shipment> | undefined>();
  const [isEdit, setEdit] = useState<Boolean>(false);
  const [name, setName] = useState<any>('');

  useEffect(() => {
    getData(`${API_URL}/shipments/${params.id}`)
      .then(respData => {
        console.log("Resp", respData);
        setData(respData);
      });
  }, [params.id]);

  useEffect(() => {
    if (data)
      console.log("View Shipment", data);
  }, [data]);

  const getSeriveItem = (service: any, index: any) => {
    return (<div key={index} className="serviceItems">
      {'type' in service && <div>
        <label>Service Type</label>
        <span>{service.type}</span>
        {service.value && <hr/>}
      </div>}
      {'value' in service && <div>
        <label>Service Value</label>
        <span>{service.value}</span>
      </div>}
    </div>);
  }

  const getServices = (services: any) => {
    if (!services)
      return <></>

    return (<div>
      <h3>Services Details</h3>
      {services.map((service: any, index: any) => getSeriveItem(service, index))}
    </div>)
  };

  const getCargoItem = (cargo: any, index: any) => {
    return (<div key={index} className="cargoItems">
      {'type' in cargo && <div>
        <label>cargo Type: </label>
        <span>{cargo.type}</span>
        <hr/>
      </div>}
      {'description' in cargo && <div>
        <label>Cargo Description: </label>
        <span>{cargo.description}</span>
        <hr/>
      </div>}
      {'volume' in cargo && <div>
        <label>Cargo Volume: </label>
        <span>{cargo.volume}</span>
      </div>}
    </div>);
  }

  const getCargos = (cargos: any) => {
    if (!cargos)
      return <></>
    return (<div>
      <h3>Cargo Details</h3>
      {cargos.map((cargo: any, index: any) => getCargoItem(cargo, index))}
    </div>)
  };


  const handleSubmit = (data: any) => {
    if (params.id) {
      data.name = name;
      postData(`${API_URL}/shipments/${params.id}`, data, PostType.PUT)
        .then(respData => {
          console.log("Resp", respData);
          setData(respData);
        });
    }
    setEdit(false)
  };

  const getFullDetailView = (data: any) => {
    if (!data)
      return <></>

    const fullView = <div>
      <Header></Header>
      <h1> Detailed view for shipment <br /><span className="header-shipment-title">{data.name}</span></h1>
      <div className="fullDetails">
        <Link to="/viewShipments" className="back-btn">&lt; Back</Link>
        <div className="basicDetails">
          <div>
            <label>Name: </label>
            <span>
              {isEdit ? <input
                type="text"
                defaultValue={data.name}
                onChange={(e) => setName(e.target.value)}
                className="nameBox" /> : data.name}
            </span>
            <span>
              {!isEdit ? <button onClick={() => setEdit(true)}>Edit</button> :
                <button onClick={() => handleSubmit(data)}>Save</button>}
            </span>
            <hr/>
          </div>
          <div>
            <label>Id: </label>
            <span>{data.id}</span>
            <hr/>
          </div>
          <div>
            <label>Mode: </label>
            <span>{data.mode}</span>
            <hr/>
          </div>
          <div>
            <label>Destination: </label>
            <span>{data.destination}</span>
            <hr/>
          </div>
          <div>
            <label>Origin: </label>
            <span>{data.origin}</span>
            <hr/>
          </div>
          <div>
            <label>Total: </label>
            <span>{data.total}</span>
            <hr/>
          </div>
          <div>
            <label>Status: </label>
            <span>{data.status}</span>
            <hr/>
          </div>
          <div>
            <label>User Id: </label>
            <span>{data.userId}</span>
          </div>
        </div>
        {getServices(data.services)}
        {getCargos(data.cargo)}
      </div>
    </div>
    return fullView;
  };

  return (
    <>
      {getFullDetailView(data)}
    </>
  )
};

export default ViewShipmentDetails;