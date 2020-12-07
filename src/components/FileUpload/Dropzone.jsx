/* eslint-disable no-undef */
import React, { Component } from "react";
import "./Dropzone.css";
import uploadIco from "../../images/upload2.png";

const fileListToArray = (list) => {
  const array = [];
  for (let i = 0; i < list.length; i += 1) {
    const file = list[i];
    const size = Math.round(file.size / 1000000); // in MB
    const filename = file.name;

    if (size > 100) {
      bootbox.alert("Only file less than 100MB is accepted!");
    } else if (
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) !=
      "csv"
    ) {
      bootbox.alert("Only csv file is accepted!");
    } else {
      array.push(list.item(i));
    }
  }
  return array;
};

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onFilesAdded(evt) {
    const { disabled, onFilesAdded } = this.props;

    if (!disabled && onFilesAdded) {
      const { files } = evt.target;
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
  }

  onDragOver(event) {
    const { disabled } = this.props;

    event.preventDefault();
    if (disabled) return;
    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    const { disabled } = this.props;
    event.preventDefault();

    if (!disabled && onFilesAdded) {
      const { files } = event.dataTransfer;
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  openFileDialog() {
    const { disabled } = this.props;
    if (disabled) return;
    this.fileInputRef.current.click();
  }

  render() {
    const { disabled } = this.props;
    const { hightlight } = this.state;
    return (
      <div
        className={`Dropzone ${hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          accept=".csv"
          onChange={this.onFilesAdded}
        />
        <div align="center">
          <img src={uploadIco} style={{ width: 50 }} alt="upload a file" />
          &nbsp;
          <span> Drop file to upload, or click to browse </span>
          <span style={{ fontSize: "13px" }}>
            <em>(Only *.csv file &lt;100MB will be accepted)</em>
          </span>
        </div>
      </div>
    );
  }
}

export default Dropzone;
