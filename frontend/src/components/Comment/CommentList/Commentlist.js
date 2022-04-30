import React, { useContext } from "react";
import CommentItem from "../CommentItem/CommentItem";
import "./Commentlist.css";
import PopupComment from "../../Popup/PopupComment";
import AuthContext from "../../../context/AuthContext";

const Commentlist = (props) => {
  const { setPostCommentOpen } = useContext(AuthContext);

  return (
    <div>
      <form>
        <div className="form-group margin">
          <input
            type="text"
            className="form-control"
            autocomplete="off"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="发布你的评论"
            onClick={() => {
              setPostCommentOpen(true);
            }}
          />
        </div>
      </form>
      <ul className="comment-list">
        {props.items.map((comment) => (
          <CommentItem key={comment.id} id={comment.id} items={comment} />
        ))}
      </ul>
    </div>
  );
};

export default Commentlist;
