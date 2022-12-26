import { FC, useEffect, useState } from "react";

import { CommentAddDto, CommentGetDto } from "@web/common/types/types";
import CommentList from "../comment-list/comment-list";
import NewComment from "../new-comment/new-comment";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

type CommentsProps = {
  eventId: string;
};

const Comments: FC<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentGetDto[] | null>(null);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const fetchComments = () => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => setComments(data.comments));
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const addCommentHandler = (commentData: CommentAddDto) => {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errorMsg) {
          toast.success("Comment has been added.");
          fetchComments();
        } else {
          toast.error("Something went wrong.");
        }
      });
  };

  return (
    <section className={styles.comments}>
      <button className={styles.btn} onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
