import { FC } from "react";
import styles from "./styles.module.scss";

type EventContentProps = {
  children: React.ReactNode;
};

const EventContent: FC<EventContentProps> = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

export { EventContent };
