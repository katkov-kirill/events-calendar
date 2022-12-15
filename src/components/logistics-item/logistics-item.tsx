import Image from "next/legacy/image";
import { FC } from "react";
import styles from "./styles.module.scss";

type LogisticsItemProps = {
  imageSrc: string;
  children: React.ReactNode;
};

const LogisticsItem: FC<LogisticsItemProps> = ({ children, imageSrc }) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Image src={imageSrc} width={25} height={25} />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export { LogisticsItem };
