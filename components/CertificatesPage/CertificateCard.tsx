import { Island, Text } from "@adev/ui-kit";
import dayjs from "dayjs";
import { FC } from "react";
import { Certificate, CertificateTypeView } from "../../common/certificate";
import styles from "./CertificateCard.module.scss";

interface CertificatesCardProps {
  certificate: Certificate;
  onClick?: (event?: React.MouseEvent) => void;
}

const CertificatesCard: FC<CertificatesCardProps> = ({
  certificate,
  onClick,
}) => {
  return (
    <Island className={styles.card} onClick={onClick}>
      <div className={styles.section}>
        <Text>{CertificateTypeView(certificate.type)}</Text>
        <Text>
          {certificate.lastName} {certificate.firstName}
        </Text>
        <div className={styles.time}>
          <Text>
            {dayjs(certificate.startAt).format("DD.MM.YYYY")}
            {" - "}
            {dayjs(certificate.finishAt).format("DD.MM.YYYY")}
          </Text>
        </div>
      </div>
    </Island>
  );
};

export default CertificatesCard;
