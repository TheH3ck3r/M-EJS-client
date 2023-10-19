import {
  BottomDrawer,
  Button,
  Spinner,
  Text,
} from "@adev/ui-kit";
import { useState } from "react";
import { Certificate } from "../../common/certificate";
import styles from "./CertificatesList.module.scss";
import useSWR from "swr";
import EditCertificate from "../EditCertificate";
import getAvailableJournal from "@common/auth";
import { CertificatesFetcher } from "@common/fetchers";
import CertificatesCard from "./CertificateCard";
import { DevelopmentIcon } from "components/icons";
import { animationFadeInClassNames } from "@common/app";
import clsx from "clsx";
import DeleteCertificate from "components/EditCertificate/DeleteCertificate";

const CertificatesList = () => {
  const [certificateType, setCertificateType] = useState(false);
  const availableJournal = getAvailableJournal();
  const {
    data: certificates,
    error: certificatesError,
    mutate,
  } = useSWR(() => {
    if (availableJournal) {
      return `/v1/certificates/${availableJournal}?with_students_name=1`;
    }
  }, CertificatesFetcher);
  const [isCertificateOpen, setCertificateOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<
    Certificate | undefined
  >();

  if (!certificates && !certificatesError)
    return (
      <>
        <div className={styles.loading}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </>
    );

  return (
    <>
      <div className={clsx(styles.CertificatesList, animationFadeInClassNames)}>
        <div className={styles.tabs}>
          <div className={styles.tabsList} role="tablist">
            <button
              onClick={() => setCertificateType(false)}
              role="tab"
              tabIndex={0}
              className={clsx(
                styles.tabsTitle,
                !certificateType && styles.tabsSelected
              )}
            >
              Справки
            </button>
            <button
              onClick={() => setCertificateType(true)}
              role="tab"
              tabIndex={-1}
              className={clsx(
                styles.tabsTitle,
                certificateType && styles.tabsSelected
              )}
            >
              Перезачеты
            </button>
            <div
              className={styles.tabsLine}
              style={
                !certificateType
                  ? { transform: "translateX(0px)" }
                  : { transform: "translateX(100%)" }
              }
            ></div>
          </div>
        </div>

        {certificatesError ? (
          <div className={styles.noCertificates}>Вы еще ничего не добавили</div>
        ) : (
          <>
            {!certificateType ? (
              <div className={styles.list}>
                {certificates.items?.map(
                  (certificate: Certificate, index: number) => (
                    <CertificatesCard
                      onClick={() => {
                        setCurrentCertificate(certificate);
                        setCertificateOpen(true);
                      }}
                      key={index}
                      certificate={certificate}
                    ></CertificatesCard>
                  )
                )}
              </div>
            ) : (
              <>
                <div className={styles.development}>
                  <DevelopmentIcon></DevelopmentIcon>
                  <Text>В разработке</Text>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.floating}>
        <Button
          onClick={() => {
            setCertificateOpen(true);
          }}
          view="action"
          className={styles.floating_button}
          rounded
        >
          +
        </Button>
      </div>

      <BottomDrawer
        open={isCertificateOpen}
        onClose={() => {
          setCertificateOpen(false);
          setTimeout(() => {
            setCurrentCertificate(undefined);
          }, 250);
        }}
        className={styles.BottomDrawer}
        staticCurtain={true}
      >
        {currentCertificate?.id ? (
          <DeleteCertificate
            onChange={() => {
              mutate({ revalidate: false });
            }}
            onClose={() => {
              setCertificateOpen(false);
            }}
            certificate={currentCertificate}
          ></DeleteCertificate>
        ) : (
          <EditCertificate
            certificate={currentCertificate}
            onClose={() => {
              setCertificateOpen(false);
            }}
            onChange={() => {
              mutate();
            }}
          ></EditCertificate>
        )}
      </BottomDrawer>
    </>
  );
};

export default CertificatesList;
