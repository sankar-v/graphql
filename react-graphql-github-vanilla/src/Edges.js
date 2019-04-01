import React, { Component } from "react";
import uuid from "uuid";
import Node from "./Node";

const Edges = ({ edges }) => (  
  
  edges.map((edge) => {
    //alert("Edge:" + JSON.stringify(edge))
    return(
      <li key={uuid.v4()}>
        <Node node={edge.node} />
      </li>
    )
  }));

export default Edges;