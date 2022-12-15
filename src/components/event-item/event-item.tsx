import { Event } from "@web/common/types/types";
import { Button } from "@web/components/ui/ui";
import Image from "next/legacy/image";
import { FC } from "react";

import styles from "./styles.module.scss";

const EventItem: FC<Event> = ({ ...event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = event.location.replace(", ", "\n");

  const link = `/events/${event.id}`;

  return (
    <li className={styles.item}>
      <Image src={event.image} width={200} height={160} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{event.title}</h2>
          <div className={styles.date}>
            <Image src="/images/date.svg" width={25} height={25} />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <Image src="/images/location.svg" width={25} height={25} />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={link}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export { EventItem };
