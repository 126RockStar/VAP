import React from "react";
import MainNav from "../../components/HeaderFooter/MainNav";
import Upload from "../../components/FileUpload/Upload";
import Footer from "../../components/HeaderFooter/Footer";
import "../../css/dashreel.css";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-md-12">
        <MainNav />

        <div className="row">
          {/* upload component */}
          <div className="col-md-5">
            <div style={{ marginTop: 50 }}>
              <Upload />
            </div>
          </div>
        </div>

        {/** footer */}
        <div className="container-fluid" style={{ marginTop: 40 }}>
          <Footer />
        </div>
      </div>
    );
  }
}
