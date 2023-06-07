import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import close_button from  "./../../images/close_button.svg";
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
        <img
                src={close_button}
                className="close-button" 
              />
          </button>
        </div>
        <div className="message"> 个人手帐页正在开发中，敬请期待！</div>
      </div>
    </div>
  );
};

export default AlertModal;
