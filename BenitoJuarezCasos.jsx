import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function BenitoJuarezCasos (){
    const [datos,setDatos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const respuesta  = await axios.get("http://localhost:8089/v1/vigilancia/buscar/Benitojuarez");
                console.log(respuesta.data)
                setDatos(respuesta.data);
            }catch (error){
                console.error("error al mostrar los datos",error);
            }
        };
        fetchData();

    }, []);

 
    return (
        <div style={{textAlign: "center"}}>
          <h2>Casos en Benito Juárez</h2>
          <button >Predecir siguiente mes</button>
          {renderCasos(datos)}
        </div>
      );
    };
 
    const CasosVirus = ({ casosVirus }) => {
      return (
        <table style={{ borderSpacing: "5px", border: "none", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Virus</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Mes</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Históricos</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Predictibles</th>
            </tr>
          </thead>
          <tbody>
            {casosVirus.map((virus) => (
              virus.casos.map((caso, index) => (
                <tr key={`${virus.nombreVirus}-${caso.mes}`} style={{borderBottom: "2px solid #ccc" }}>
                  {index === 0 && (
                    <td rowSpan={virus.casos.length} style={{ textAlign: "center", width: "20%" }}>
                      {virus.nombreVirus}
                    </td>
                  )}
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.mes}</td>
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.casosHistoricos}</td>
                  <td style={{ textAlign: "center", width: "20%" }}>{caso.casosPredictibles}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      );
    };
      
    const CasosBacterias = ({ casosBacterias }) => {
      console.log("Casos de Bacterias:", casosBacterias);
    
      let nombreMostrado = false;
    
      return (
        <table style={{ borderSpacing: "5px", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Bacteria</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Mes</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Históricos</th>
              <th style={{ textAlign: "center", width: "20%", height: "40px" }}>Casos Predictibles</th>
            </tr>
          </thead>
          <tbody>
            {casosBacterias.map((bacteria) => (
              bacteria.casosBacterias.map((caso, index) => (
                <tr key={`${bacteria.nombreBacterias}-${caso.mes}`} style={{ borderBottom: "1px solid #ccc" }}>
                  {index === 0 && (
                    <td rowSpan={bacteria.casosBacterias.length} style={{ textAlign: "center" }}>
                      {nombreMostrado ? null : bacteria.nombreBacterias}
                    </td>
                  )}
                  <td style={{ textAlign: "center" }}>{caso.mes}</td>
                  <td style={{ textAlign: "center" }}>{caso.casosHistoricos}</td>
                  <td style={{ textAlign: "center" }}>{caso.casosPredictibles}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      );
    };
    
      
    const renderCasos = (datos) => {
      return (
        <>
          {datos.map((item) => (
            <React.Fragment key={item.alcaldia}>
             
              <CasosVirus casosVirus={item.virusCasos} />
              <CasosBacterias casosBacterias={item.bacteriasCasos} />
            </React.Fragment>
          ))}
        </>
      );
}

export default BenitoJuarezCasos;
