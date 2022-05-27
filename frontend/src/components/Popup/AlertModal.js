import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./AlertModal.css";

const AlertModal = (props) => {
  const { setAlertModalOpen } = useContext(AuthContext);

  return (
    <div className="modalBackground-alert">
      <div className="modalContainer-alert">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setAlertModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="message"> {props.message}</div>
      </div>
    </div>
  );
};

export default AlertModal;