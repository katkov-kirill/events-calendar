import { FC } from "react";
import { LogisticsItem } from "@web/components/components";
import Image from "next/legacy/image";
import styles from "./styles.module.scss";

type EventLogisticsProps = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

const EventLogistics: FC<EventLogisticsProps> = ({
  date,
  address,
  image,
  imageAlt,
}) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={image} alt={imageAlt} layout="fill" />
      </div>
      <ul className={styles.list}>
        <LogisticsItem imageSrc="/images/date-green.svg">
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem imageSrc="/images/location-green.svg">
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export { EventLogistics };
