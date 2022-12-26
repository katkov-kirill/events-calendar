import { FC } from "react";
import { CommentGetDto } from "@web/common/types/types";
import styles from "./styles.module.scss";

type Props = {
  items: CommentGetDto[] | null;
};

const CommentList: FC<Props> = ({ items }) => {
  if (!items) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>Currently no comments</div>;
  }

  return (
    <ul className={styles.comments}>
      {items.map((item) => (
        <li key={item._id.toString()}>
          <p>{item.text}</p>
          <div>
            By <address>{item.email}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
