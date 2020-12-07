import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Dropzone from "./Dropzone";
import "./Upload.css";
import { apiConstants } from "../../constants";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      successfullyUploaded: false,
      error: false,
      errorMessage: "",
      // percentLoaded: 0,
      // fileQuoteId: "",
    };
  }

  onFilesAdded = (files) => {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  };

  uploadFiles = () => {
    const { files } = this.state;
    this.setState({
      // uploadProgress: {},
      uploading: true,
      error: false,
      errorMessage: "",
      // fileQuoteId: "",
    });
    files.forEach((file) => {
      this.uploadCSVfile(file);
    });
  };

  async uploadCSVfile(file) {
    const { user, sendQuoteId } = this.props;
    const data = new FormData();
    data.append("file", file);
    data.append("user", user.firstName);

    await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
      url: apiConstants.QUOTE_UPLOAD_URL,
      onUploadProgress: (progressEvent) => {
        const loaded = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        console.log(Math.round(loaded));
      },
    })
      .then((response) => {
        // file upload sucessfully
        if (response.status === 400) {
          this.setState({
            successfullyUploaded: true,
            uploading: false,
            error: true,
            errorMessage: "internal server error",
          });
        } else {
          sendQuoteId(response.data);
          this.setState({
            successfullyUploaded: true,
            uploading: false,
            error: false,
            // fileQuoteId: response.data,
          });
        }
      })
      .catch((err) => {
        this.setState({
          successfullyUploaded: false,
          uploading: false,
          error: true,
          errorMessage: "network error",
        });
        console.error(err);
      });
  }

  renderActions() {
    const { successfullyUploaded, files, uploading } = this.state;

    if (successfullyUploaded) {
      return this.setState({ files: [], successfullyUploaded: false });
    }

    return (
      <button
        disabled={files.length === 0 || uploading}
        onClick={this.uploadFiles}
      >
        Upload
      </button>
    );
  }

  render() {
    const {
      uploading,
      successfullyUploaded,
      files,
      error,
      errorMessage,
    } = this.state;

    return (
      <div className="container">
        <form encType="multipart/form-data">
          <span>
            <h3>Upload Quote/Contract File</h3>
          </span>
          <div className="card">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={uploading || successfullyUploaded}
              />
            </div>

            <div className="Files">
              {files.map((file) => {
                return (
                  <div>
                    <span className="Filename">
                      {file.name}
                      &nbsp;&nbsp;&nbsp; Size :&nbsp;
                      {`${(file.size / 1000000).toFixed(2)}MB   `}
                      {!uploading ||
                        (!successfullyUploaded && (
                          <div className="spinner-border ml-auto" />
                        ))}
                    </span>
                    {error && (
                      <div className="alert alert-danger ">
                        <strong>Error: </strong>
                        {errorMessage}
                        &nbsp; occurred while uploading file.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.authentication.user,
});

export default connect(mapStateToProps, null)(Upload);
