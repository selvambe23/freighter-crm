import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ViewShipment from "./Components/ViewShipment/ViewShipment";
import ViewShipmentDetails from "./Components/ViewShipmentDetails/ViewShipmentDetails";
import Header from './Components/Header/Header';
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Header} />
        <Route path="/viewShipments" component={ViewShipment} />
        <Route
          path="/viewShipmentDetails/:id"
          component={ViewShipmentDetails}
        />
      </Router>
    </div>
  );
};

export default App;
