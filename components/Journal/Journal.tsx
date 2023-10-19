import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import JournalCard from "./JournalCard";
import styles from "./Journal.module.scss";
import { Button, NotificationBox, Notify, Spinner } from "@adev/ui-kit";
import AddMissingDiscipline from "components/AddMissingDiscipline/AddMissingDiscipline";
import useSWR from "swr";
import { AttendanceFetcher, JournalFetcher } from "@common/fetchers";
import dayjs from "dayjs";
import _ from "lodash";
import { Job } from "@common/job";
import getAvailableJournal from "@common/auth";
import { AlertIcon } from "components/icons";
import { animationFadeInClassNames, ModifyStatuses } from "@common/app";
import clsx from "clsx";
import { pairNumber } from "@common/discipline";

interface JournalProps {
  date: Date;
}

const Journal: FC<JournalProps> = ({ date }) => {
  const [isStudentListOpen, setIsStudentListOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | undefined>(undefined);

  const availableJournal = getAvailableJournal();

  const {
    data: attendances,
    error: attendancesError,
    mutate,
  } = useSWR(() => {
    if (availableJournal) {
      return `/v1/jobs/journal/${availableJournal}/date/${dayjs(date).format(
        "YYYY-MM-DD"
      )}`;
    }
  }, AttendanceFetcher);

  const { data: disciplines, error: disciplinesError } = useSWR(() => {
    if (availableJournal) {
      return `/v1/disciplines/journal/${availableJournal}`;
    }
  }, JournalFetcher);

  const router = useRouter();
  const { notify } = router.query;
  useEffect(() => {
    if (notify?.toString().startsWith("job_conflict")) {
      Notify({
        title: "Ошибка",
        content: <>Пара на это время уже существует</>,
        icon: <AlertIcon></AlertIcon>,
        autoCloseDelay: 5000,
      });
    }
  }, [notify]);

  if (
    (!attendances && !attendancesError) ||
    (!disciplines && !disciplinesError)
  ) {
    return (
      <div>
        <div className={styles.Journal}>
          {_.range(3).map((item: number) => (
            <JournalCard
              loading={true}
              key={item}
              attendance={undefined}
            ></JournalCard>
          ))}
        </div>
        <div className={styles.floating}>
          <Button view="action" className={styles.floating_button} rounded>
            <Spinner color="#fff" mode="border" size="sm"></Spinner>
          </Button>
        </div>
      </div>
    );
  }

  

  return (
    <>
      <NotificationBox
        position="top-center"
        autoCloseDelay={10000}
        rootStyle={{ zIndex: 10 }}
      ></NotificationBox>
      {attendancesError ? (
        <div className={styles.NewJournal}>Вы еще ничего не добавили</div>
      ) : (
        <div className={clsx(styles.Journal, animationFadeInClassNames)}>
          {attendances
            ?.sort(
              (a: any, b: any) =>
                pairNumber(a.startAt, a.finishAt) -
                pairNumber(b.startAt, b.finishAt)
            )
            .map((attendance: any, index: number) => (
              <JournalCard
                onClick={() => {
                  setIsStudentListOpen(true);
                  setCurrentJob({ ...attendance, date: date });
                }}
                key={index}
                attendance={attendance}
              ></JournalCard>
            ))}
        </div>
      )}

      <div className={styles.floating}>
        <Button
          onClick={() => setIsStudentListOpen(true)}
          view="action"
          className={styles.floating_button}
          rounded
        >
          +
        </Button>
      </div>

      <AddMissingDiscipline
        defaultValue={{
          ...currentJob,
          journalId: availableJournal,
          date: date,
        }}
        open={isStudentListOpen}
        onClose={() => {
          setIsStudentListOpen(false);
          setCurrentJob(undefined);
        }}
        onChange={(form, status) => {
          if (status == ModifyStatuses.kDelete) {
            mutate(
              attendances.filter((attendance: Job) => {
                return attendance.id != form.id;
              }),
              { revalidate: false }
            );
            return;
          }
          mutate();
        }}
      ></AddMissingDiscipline>
    </>
  );
};

export default Journal;
