import React from "react";

export default function FileUploadButton({ onChange, accept }) {
  const inputRef = React.useRef();

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <button type="button" className="btn" onClick={handleClick}>
        Upload File
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        accept={accept}
        style={{ display: "none" }}
      />
    </>
  );
}
