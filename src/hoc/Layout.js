import React from "react";
import { connect } from "react-redux";

const Layout = (props) => {
  return <div className="containerMain">{props.children}</div>;
};

export default connect(null)(Layout);
