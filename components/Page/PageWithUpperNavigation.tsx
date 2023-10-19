import { Container, Text } from "@adev/ui-kit";
import { FC } from "react";
import { PageProps } from "./Page";
import styles from "./Page.module.scss";
import { ArrowIcon } from "components/icons";

const PageWithoutNavigation: FC<PageProps> = ({
  children,
  label = "",
  noContainer = false,
  style,
}) => {
  const content = <div>{children}</div>;

  return (
    <>
      <div className={styles.UpperNavigation}>
        <a
          className={styles.UpperNavigationPrevButton}
          onClick={() => {
            window.history.back();
          }}
          tabIndex={1}
        >
          <ArrowIcon></ArrowIcon>
        </a>
        <Text
          typography="headline-md"
          style={{ marginBottom: 0, marginTop: 0 }}
          as="h1"
        >
          {label}
        </Text>
      </div>
      <main style={{ ...style, paddingTop: "4em" }}>
        {noContainer ? content : <Container adaptive>{content}</Container>}
      </main>
    </>
  );
};

export default PageWithoutNavigation;
