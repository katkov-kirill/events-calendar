import { FC } from "react";
import styles from "./styles.module.scss";

type ErrorAlertProps = {
  children: React.ReactNode;
};

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export { ErrorAlert };
