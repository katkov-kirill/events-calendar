import { FC } from "react";
import { MainHeader } from "./main-header/main-header";
import styles from "./styles.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main className={styles.root}>{children}</main>
    </>
  );
};

export { Layout };
