import { Events } from "@web/common/types/types";
import { ErrorAlert, EventItem } from "@web/components/components";
import { FC } from "react";

import styles from "./styles.module.scss";

const EventList: FC<Events> = ({ items }) => {
  if (!items) {
    return (
      <ErrorAlert>
        <h2>No data found</h2>
      </ErrorAlert>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem {...event} key={event.id} />
      ))}
    </ul>
  );
};

export { EventList };
