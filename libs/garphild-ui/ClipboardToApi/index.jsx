import React, { Component } from "react";
import PropTypes from "prop-types";

class ClipboardSendImage extends Component {
  componentDidMount() {
    window.addEventListener("paste", this.getClipboardFiles );
  }

  componentWillUnmount() {
    window.removeEventListener("paste", this.getClipboardFiles );
  }

  getClipboardFiles = (event) => {
    const { apiUrl, onFileFound, enabled } = this.props;
    if (!enabled) return null;
    const { items } = event.clipboardData;
    for (const index in items) {
      const item = items[index];
      if (item.kind === "file") {
        const blob = item.getAsFile();
        if (apiUrl) {
          this.sendImageToBackend(blob);
        }
        if (onFileFound) {
          onFileFound(blob);
        }
      }
    }
  }

  sendImageToBackend(file) {
    const { apiUrl, onUploadSuccess, onUploadFail } = this.props;
    const formData = new FormData();
    formData.append("file", file);
    fetch(apiUrl, {
      method: "POST",
      body: formData,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
    })
      .then((res) => {
        if (onUploadSuccess) {
          onUploadSuccess(res, file);
        }
      })
      .catch((err) => {
        if (onUploadFail) {
          onUploadFail(err, file);
        }
      });
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

ClipboardSendImage.defaultProps = {
  onUploadSuccess: null,
  onUploadFail: null,
  onFileFound: null,
  enabled: false,
}
ClipboardSendImage.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  onUploadFail: PropTypes.func,
  onFileFound: PropTypes.func,
  children: PropTypes.any,
  enabled: PropTypes.bool,
};

export default ClipboardSendImage;
