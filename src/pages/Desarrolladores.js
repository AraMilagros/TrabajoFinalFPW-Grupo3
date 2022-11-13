import React from "react";
import Card from "../components/Card";
import "../../src/assets/css/cards.css";
import Header from "../components/Header";
import image1 from "../assets/img/desarrolladores/image1.jpg";
import image2 from "../assets/img/desarrolladores/image2.jpg";
import image3 from "../assets/img/desarrolladores/image3.jpg";
import image4 from "../assets/img/desarrolladores/image4.jpg";
import image5 from "../assets/img/desarrolladores/image5.jpg";
import image6 from "../assets/img/desarrolladores/image6.jpg";

import desarrollador from '../assets/json/desarrollador.json';
const fotos = [image1, image2, image3, image4, image5, image6];

function Desarrolladores() {
  return (
    <>
      {/* <Header /> */}
      <div className="container d-flex align-items-center h-100">
        <div className="row">
          {desarrollador.map(({ title, edad, interes, presentation, url, id }) =>
          (<div className="col-md-4" key={id}>
            <Card imageSource={fotos[id-1]} title={title} edad={edad} interes={interes} presentation={presentation} url={url} />
          </div>))}
        </div>
        <div className="row"></div>
      </div>
    </>
  );
}

export default Desarrolladores;