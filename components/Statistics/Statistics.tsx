import Page from "components/Page";
import {
  Column,
  Island,
  Row,
  Spinner,
  Button,
  NotificationBox,
  Notify,
} from "@adev/ui-kit";
import styles from "./Statistics.module.scss";
import { AttendanceFetcher } from "@common/fetchers";
import useSWR from "swr";
import getAvailableJournal from "@common/auth";
import { useState } from "react";
import DetailedInformation from "./DetailedInformation/DetailedInformation";
import { animationFadeInClassNames, kBaseEndpoint } from "@common/app";
import axios from "axios";
import ExportInformation from "./ExportInformation/ExportInformation";
import { AlertIcon } from "components/icons";

interface JobsStatisticsProps {
  journalId: string;
  jobCount: number;
  disrespectfulMissingCount: number;
  studentCount: number;
}

const getAttendancePercent = (stats: JobsStatisticsProps) => {
  return Math.round(
    100 -
      (stats.disrespectfulMissingCount * 100) /
        (stats.jobCount * (stats.studentCount ?? 1))
  );
};

const Statistics = () => {
  const availableJournal = getAvailableJournal();

  const [detailedInformationOpen, setDetailedInformationOpen] = useState(false);
  const [file, setFile] = useState(undefined);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const { data: jobsStats, error } = useSWR<JobsStatisticsProps>(() => {
    if (availableJournal) {
      return `v1/jobs/journal/${availableJournal}/stats`;
    }
  }, AttendanceFetcher);

  const exportStats = async () => {
    try {
      if (!availableJournal) {
        return;
      }
      const response = await axios.get(
        `${kBaseEndpoint}/stats/v1/stats/${availableJournal}`
      );
      setFile(response.data.file);
    } catch (error: any) {
      console.log(error);
      Notify({
        title: "Ошибка",
        content: <>Ошибка экспорта статистики</>,
        icon: <AlertIcon></AlertIcon>,
        autoCloseDelay: 5000,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  if (error || !jobsStats)
    return (
      <Page label="Статистика">
        <div className={styles.loading}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </Page>
    );

  return (
    <>
      <NotificationBox
        position="top-center"
        autoCloseDelay={10000}
        rootStyle={{ zIndex: 10 }}
      ></NotificationBox>
      <Page label="Статистика">
        <div className={animationFadeInClassNames}>
          <Row spacing={1}>
            <Column col={12}>
              <Island>
                <div className={styles.content}>
                  <span>Всего пар</span>
                  <span>{jobsStats?.jobCount ?? 0}</span>
                </div>
              </Island>
            </Column>
            <Column col={12}>
              <Island>
                <div className={styles.content}>
                  <span>Всего пропусков</span>
                  <span>{jobsStats?.disrespectfulMissingCount ?? 0}</span>
                </div>
              </Island>
            </Column>
            <Column col={12}>
              <Island>
                <div className={styles.content}>
                  <span>Процент посещаемости</span>
                  <span>{getAttendancePercent(jobsStats!)}%</span>
                </div>
              </Island>
            </Column>
            <Column col={12}>
              <Button
                width="available"
                onClick={() => {
                  setDetailedInformationOpen(true);
                }}
              >
                Подробная информация
              </Button>
            </Column>
            <Column col={12}>
              {!isButtonLoading ? (
                <Button
                  width="available"
                  onClick={() => {
                    setButtonLoading(true);
                    exportStats();
                  }}
                >
                  Экспорт
                </Button>
              ) : (
                <Button width="available" progress>
                  Экспорт
                </Button>
              )}
            </Column>
          </Row>
        </div>
      </Page>
      <DetailedInformation
        open={detailedInformationOpen}
        onClose={() => {
          setDetailedInformationOpen(false);
        }}
      ></DetailedInformation>
      <ExportInformation
        open={file != undefined}
        onClose={() => {
          setFile(undefined);
        }}
        file={file}
      ></ExportInformation>
    </>
  );
};

export default Statistics;
