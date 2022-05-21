import React from "react";
import Storyitem from "../Storyitem/Storyitem";
import "./Storylist.css";

const Storylist = (props) => {
  return (
    <ul className="story-list">
      {props.items.map((story) => (
        <Storyitem key={story.id} items={story} test={"hello"} />
      ))}
    </ul>
  );
};

export default Storylist;
