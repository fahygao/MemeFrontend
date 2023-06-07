import React from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import "./NotificationList.css";

const NotificationList = (props) => {
  return (
    <ul className="notification-list">
      {props.items.map((notification) => (
        <NotificationItem key={notification.id} items={notification} />
      ))}
    </ul>
  );
};

export default NotificationList;
