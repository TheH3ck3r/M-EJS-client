import { FC } from "react";
import styles from "./ExportInformationView.module.scss";
import { Button, Column, Container, Row } from "@adev/ui-kit";
import Link from "next/link";

interface ExportInformationViewProps {
  file?: string;
  onClose?: () => void;
}

const ExportInformationView: FC<ExportInformationViewProps> = ({
  file,
  onClose,
}) => {
  return (
    <>
      <Container adaptive>
        <Row spacing={1}>
          <Column col={12}>
            <Link href={file ?? ""} download>
              <Button
                width="available"
                view="action"
                onClick={() => {
                  onClose?.();
                }}
              >
                Скачать
              </Button>
            </Link>
          </Column>
        </Row>
      </Container>
    </>
  );
};

export default ExportInformationView;
