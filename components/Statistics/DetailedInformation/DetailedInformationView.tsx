import { Column, Container, Island, Row, Spinner, Text } from "@adev/ui-kit";
import getAvailableJournal from "@common/auth";
import {
  AttendanceFetcher,
  JournalFetcher,
  StudentFetcher,
} from "@common/fetchers";
import { Student, StudentWithMissingCounts } from "@common/student";
import useSWR from "swr";
import styles from "./DetailedInformationView.module.scss";

const DetailedInformationView = () => {
  const availableJournal = getAvailableJournal();

  const { data: journal, error: journalError } = useSWR(() => {
    if (availableJournal) {
      return `/v1/journal/${availableJournal}`;
    }
  }, JournalFetcher);

  const { data: students, error: studentsError } = useSWR<Array<Student>>(
    () => {
      if (availableJournal) {
        return `/v1/students/journal/${availableJournal}`;
      }
    },
    StudentFetcher
  );

  const { data: stats, error: statsError } = useSWR<
    Array<StudentWithMissingCounts>
  >(() => {
    if (availableJournal) {
      return `/v1/jobs/journal/${availableJournal}/student/stats/`;
    }
  }, AttendanceFetcher);

  if (studentsError || statsError)
    return (
      <>
        ААААААААААААА СТОП ОШИБКА 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
      </>
    );
  if (!students || !stats)
    return (
      <>
        <div className={styles.spinner}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </>
    );

  return (
    <>
      <Container adaptive>
        <div className={styles.header}>
          <Text typography="headline-md">
            {!journal || journalError
              ? "Загрузка"
              : `Статистика: ${journal.title}`}
          </Text>
        </div>
        <Row spacing={1}>
          {students
            .sort((a, b) => a.lastName.localeCompare(b.lastName))
            ?.map((student, index) => (
              <Column key={student.id} col={12}>
                <Island className={styles.island} onClick={() => {}}>
                  <span style={{ display: "flex", gap: "0.5em" }}>
                    {index + 1}.
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span>
                        {student.lastName} {student.firstName}
                      </span>
                      <span>
                        {"Всего пропусков: "}
                        {stats.find((stat: StudentWithMissingCounts) => {
                          return student.id == stat.studentId;
                        })?.missingCount ?? 0}
                      </span>
                      <span>
                        {"Пропуски по не ув: "}
                        {stats.find((stat: StudentWithMissingCounts) => {
                          return student.id == stat.studentId;
                        })?.disrespectfulMissingCount ?? 0}
                      </span>
                      <span>
                        {"Пропуски по ув: "}
                        {stats.find((stat: StudentWithMissingCounts) => {
                          return student.id == stat.studentId;
                        })?.respectfulMissingCount ?? 0}
                      </span>
                    </span>
                  </span>
                </Island>
              </Column>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default DetailedInformationView;
