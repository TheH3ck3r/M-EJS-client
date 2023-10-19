import {
  Badge,
  Column,
  Container,
  Island,
  Row,
  Spinner,
  Text,
} from "@adev/ui-kit";
import getAvailableJournal from "@common/auth";
import { JournalFetcher, StudentFetcher } from "@common/fetchers";
import { Student } from "@common/student";
import { uuid } from "@common/types";
import { FC } from "react";
import useSWR from "swr";
import styles from "../Journal/StudentList.module.scss";

interface CertificatesStudentListProps {
  onClose: () => void;
  defaultValue?: Student;
  onChange: (studentId: uuid | undefined) => void;
}

const CertificateStudentList: FC<CertificatesStudentListProps> = ({
  onClose,
  defaultValue,
  onChange,
}) => {
  const availableJournal = getAvailableJournal();
  const { data: students, error: studentsError } = useSWR<Array<Student>>(
    () => {
      if (availableJournal) {
        return `/v1/students/journal/${availableJournal}`;
      }
    },
    StudentFetcher
  );

  const { data: journal, error: journalError } = useSWR(
    `/v1/journal/${availableJournal}`,
    JournalFetcher
  );

  const SelectStudent = (student: Student) => {
    onChange(student.id);
    onClose();
  };

  if (!students || studentsError) {
    return (
      <>
        <div className={styles.spinner}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </>
    );
  }

  return (
    <>
      <Container adaptive>
        <div className={styles.Headline}>
          <Text typography="headline-md">
            {!journal || journalError ? "Загрузка" : journal.title}
          </Text>
        </div>

        <Row spacing={1}>
          {students
            ?.sort((a, b) => a.lastName.localeCompare(b.lastName))
            ?.map((student, index) => (
              <Column key={student.id} col={12}>
                <Island
                  className={styles.island}
                  onClick={() => SelectStudent(student)}
                >
                  <span>
                    {index + 1}. {student.lastName} {student.firstName}
                  </span>
                  {defaultValue?.id == student.id ? (
                    <>
                      <Badge
                        style={{
                          backgroundColor: "var(--ep-color-primary)",
                          height: "20px",
                          width: "20px",
                        }}
                      ></Badge>
                    </>
                  ) : (
                    <></>
                  )}
                </Island>
              </Column>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default CertificateStudentList;
