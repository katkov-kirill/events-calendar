import { FC } from "react";
import { Button } from "../components";
import styles from "./styles.module.scss";

type ResultsTitleProps = {
  date: Date;
};

const ResultsTitle: FC<ResultsTitleProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1>Events in {formattedDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};

export { ResultsTitle };
