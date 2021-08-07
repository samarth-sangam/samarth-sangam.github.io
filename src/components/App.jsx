// Libraries
import React from "react";

// components
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Main from "components/main/Main";

//style
import "styles/app.scss";

const App = () => (
  <div className="app">
    <Header name="Samarth Sangam" />
    <Main />
    <Footer />
  </div>
);

export default App;
