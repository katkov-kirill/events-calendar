import Link from "next/link";
import { FC } from "react";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
};

const Button: FC<ButtonProps> = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return <button onClick={onClick}>{children}</button>;
  }

  return <button>{children}</button>;
};

export { Button };
