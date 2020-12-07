import React from "react";
import { MainNav } from "../../components/HeaderFooter";
import { PlayerPane } from "../../components/Annotations";
import "./VapPage.scss";

export const VapPage = () => {
  return (
    <div className="container full-screen">
      <div className="row h-10 justify-content-center align-items-center">
        <div className="container " style={{ width: 1444 }}>
          <div className="row">
            <MainNav />
          </div>

          <div className="row align-items-center" >
            <div className="col-12 no-gutters">
              <PlayerPane />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
