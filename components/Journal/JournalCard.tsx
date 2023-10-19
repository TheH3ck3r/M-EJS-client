import React, { FC } from "react";
import { Badge, Island, Skeleton, Text } from "@adev/ui-kit";
import styles from "./JournalCard.module.scss";
import { JournalFetcher } from "@common/fetchers";
import useSWR from "swr";
import { Discipline, DisciplineType } from "@common/discipline";
import getAvailableJournal from "@common/auth";

interface JournalCardProps {
  attendance: any;
  onClick?: (event?: React.MouseEvent) => void;
  loading?: boolean;
}

const JournalCard: FC<JournalCardProps> = ({
  attendance,
  onClick,
  loading,
}) => {
  const availableJournal = getAvailableJournal();

  const { data: disciplines, error: disciplinesError } = useSWR(() => {
    if (availableJournal) {
      return `/v1/disciplines/journal/${availableJournal}`;
    }
  }, JournalFetcher);

  if (loading) {
    return (
      <Island className={styles.JournalCard} onClick={onClick}>
        <div className={styles.JournalCardWrapper}>
          <div className={styles.JournalCardInfo}>
            <div className={styles.JournalCardDate} style={{ gap: "0.5em" }}>
              <Skeleton width="64px" height="16px" borderRadius="12px"></Skeleton>
              <Skeleton width="64px" height="16px" borderRadius="12px"></Skeleton>
            </div>
            <div className={styles.JournalCardContent} style={{ gap: "0.5em" }}>
              <Skeleton
                width="140px"
                height="24px"
                borderRadius="18px"
              ></Skeleton>
              <Skeleton
                width="140px"
                height="24px"
                borderRadius="18px"
              ></Skeleton>
            </div>
          </div>
          <div>
            <Skeleton width="50px" height="24px" borderRadius="18px"></Skeleton>
          </div>
        </div>
      </Island>
    );
  }

  const disciplineTypeToBadge = (type: DisciplineType) => {
    const badges = [
      <Badge key="Lecture" style={{ backgroundColor: "#EE1415" }}>
        лек
      </Badge>,
      <Badge key="Practice" style={{ backgroundColor: "#FF5E00" }}>
        пр
      </Badge>,
      <Badge key="Lab" style={{ backgroundColor: "#FFA600" }}>
        лаб
      </Badge>,
      <Badge
        key="SR"
        style={{ backgroundColor: "#F82F5B", whiteSpace: "nowrap" }}
      >
        с/р
      </Badge>,
    ];
    return badges[type];
  };

  if (!disciplines || disciplinesError) {
    return <div>Ошибка загрузки дисциплины</div>;
  }

  return (
    <Island className={styles.JournalCard} onClick={onClick}>
      <div className={styles.JournalCardWrapper}>
        <div className={styles.JournalCardInfo}>
          <div className={styles.JournalCardDate}>
            <Text weight="regular">{attendance.startAt}</Text>
            <Text weight="regular">{attendance.finishAt}</Text>
          </div>
          <div className={styles.JournalCardContent}>
            <Text typography="headline-xs" weight="bold">
              {
                disciplines.find(
                  (d: Discipline) => d.id == attendance.disciplineId
                ).name
              }
            </Text>
            <Text weight="regular">Отсутствуют: {attendance.missingCount}</Text>
          </div>
        </div>
        <div>{disciplineTypeToBadge(attendance.disciplineType)}</div>
      </div>
    </Island>
  );
};

export default JournalCard;
