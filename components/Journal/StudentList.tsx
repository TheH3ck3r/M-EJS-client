import { uuid } from "@common/types";
import {
  Column,
  Row,
  Island,
  Text,
  Container,
  Button,
  Spinner,
} from "@adev/ui-kit";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { JournalFetcher, StudentFetcher } from "../../common/fetchers";
import { Student } from "../../common/student";
import styles from "./StudentList.module.scss";
import getAvailableJournal from "@common/auth";
import { StudentWithAbsenceType } from "@common/student";
import { AbsenceTypeView } from "@common/jobViews";
import { AbsenceType } from "@common/job";

interface StudentListProps {
  defaultValue?: StudentWithAbsenceType[];
  onChange: (studentIds: StudentWithAbsenceType[] | undefined) => void;
  onClose: () => void;
  jobId: uuid;
}

const studentAbsenceTypeView = (
  array: Array<StudentWithAbsenceType>,
  studentId: uuid
) => {
  const currentStudent = array.find((student) => student.id === studentId);
  if (currentStudent) {
    return AbsenceTypeView(currentStudent.absenceType);
  }
  return <></>;
};

const StudentList: FC<StudentListProps> = ({
  onChange,
  onClose,
  defaultValue,
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
  const [absentStudents, setAbsentStudents] = useState<
    Array<StudentWithAbsenceType>
  >(defaultValue || []);

  const isAbsentStatusChangeForbidden = (student: StudentWithAbsenceType) => {
    return (
      student.absenceType == AbsenceType.kRespectfulReason ||
      student.absenceType == AbsenceType.kRecalculation
    );
  };

  useEffect(() => {
    onChange(absentStudents);
  }, [absentStudents]);

  console.log(absentStudents);

  const changeAbsentStatus = (student: StudentWithAbsenceType) => {
    if (isAbsentStatusChangeForbidden(student)) {
      return;
    }
    if (
      absentStudents?.some((currentStudent) => {
        return currentStudent.id == student.id;
      })
    ) {
      setAbsentStudents(
        absentStudents.filter((currentStudent) => {
          return currentStudent.id != student.id;
        })
      );
    } else {
      setAbsentStudents([...absentStudents, student]);
    }
  };

  if (studentsError)
    return (
      <>
        ААААААААААААА СТОП ОШИБКА 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0 0 0
      </>
    );
  if (!students)
    return (
      <>
        <div className={styles.spinner}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </>
    );

  return (
    <Container adaptive>
      <div className={styles.Headline}>
        <Text typography="headline-md">
          {!journal || journalError ? "Загрузка" : journal.title}
        </Text>
      </div>

      <Row spacing={1}>
        <Column col={12}>
          <Button
            className={styles.islandTop}
            onClick={() => {
              if (absentStudents.length == students.length) {
                setAbsentStudents([]);
                return;
              }
              setAbsentStudents(
                students.map((student: Student) => {
                  return {
                    id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    absenceType: AbsenceType.kDisrespectfulReason,
                  };
                })
              );
            }}
          >
            Отметить всех
          </Button>
        </Column>
        {students
          .sort((a, b) => a.lastName.localeCompare(b.lastName))
          ?.map((student, index) => (
            <Column key={student.id} col={12}>
              <Island
                className={styles.island}
                onClick={() =>
                  changeAbsentStatus({
                    ...student,
                    absenceType:
                      absentStudents.find(
                        (currentStudent: StudentWithAbsenceType) => {
                          return currentStudent.id == student.id;
                        }
                      )?.absenceType ?? AbsenceType.kDisrespectfulReason,
                  } as StudentWithAbsenceType)
                }
              >
                <span>
                  {index + 1}. {student.lastName} {student.firstName}
                </span>

                {studentAbsenceTypeView(absentStudents, student.id)}
              </Island>
            </Column>
          ))}
        <Column col={12}>
          <Button onClick={onClose} view="action" width="available">
            Продолжить
          </Button>
        </Column>
      </Row>
    </Container>
  );
};

export default StudentList;
