import { FC, useEffect, useState } from "react";
import { Certificate, CertificateType } from "../../common/certificate";
import _ from "lodash";
import {
  BottomDrawer,
  Button,
  CalendarMobileRange,
  Column,
  Container,
  Input,
  Row,
  Select,
  SelectValue,
  Spinner,
  Text,
} from "@adev/ui-kit";
import { StudentFetcher } from "../../common/fetchers";
import { Student } from "../../common/student";
import dayjs from "dayjs";
import { CalendarIcon } from "components/icons";
import getAvailableJournal from "@common/auth";
import axios from "axios";
import { kBaseEndpoint, ModifyStatuses } from "@common/app";
import styles from "./EditCertificate.module.scss";
import CertificateStudentList from "./CertificateStudentList";
import { uuid } from "@common/types";

interface EditCertificateProps {
  certificate?: Certificate;
  onClose: () => void;
  onChange: (modifyStatus: ModifyStatuses) => void;
}

interface EditCertificateForm {
  studentId?: string;
  startAt?: Date;
  finishAt?: Date;
  journalId: string;
  type: CertificateType;
  rangeDate: Date[];
  note: string;
  idempotencyKey: string;
}

const EditCertificate: FC<EditCertificateProps> = ({
  certificate,
  onClose,
  onChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCertificateStudentList, setCertificateStudentListOpen] =
    useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const availableJournal = getAvailableJournal();
  useEffect(() => {
    StudentFetcher(`/v1/students/journal/${availableJournal}`).then(
      (data: Student[]) => {
        setStudents(data);
        if (!certificate?.studentId) {
          setFormValue({ ...formValue, studentId: data[0].id });
        }
      }
    );
  }, []);

  const currentStudent = () => {
    if (!students) {
      return;
    }
    const student = students.find((currentStudent: Student) => {
      return currentStudent.id == formValue.studentId;
    });
    if (!student) {
      return students[0];
    }
    return student;
  };

  const [formValue, setFormValue] = useState<EditCertificateForm>({
    studentId: certificate?.studentId ?? "",
    startAt: certificate?.startAt ?? undefined,
    finishAt: certificate?.finishAt ?? undefined,
    journalId: availableJournal ?? "",
    type: certificate?.type ?? CertificateType.kMedical,
    rangeDate: [],
    note: "",
    idempotencyKey: crypto.randomUUID(),
  });

  if (!students)
    return (
      <>
        <div className={styles.spinner}>
          <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>
        </div>
      </>
    );

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const currentForm = {
        startAt: dayjs(formValue.startAt).format("YYYY-MM-DD"),
        finishAt: dayjs(formValue.finishAt).format("YYYY-MM-DD"),
        studentId: formValue.studentId,
        journalId: formValue.journalId,
        type: formValue.type,
        note: formValue.note,
      };

      await axios.post(
        `${kBaseEndpoint}/certificate/v1/certificate/`,
        {
          ...currentForm,
        },
        {
          headers: {
            "Idempotency-Key": formValue.idempotencyKey,
          },
        }
      );
      onChange(ModifyStatuses.kCreate);
      onClose();
    } catch (error: any) {
      console.error(error);
    }
  };

  const certificateTypes = [
    {
      name: "Медицинская справка",
      value: CertificateType.kMedical,
    },
    {
      name: "Приказ университета",
      value: CertificateType.kDecree,
    },
    {
      name: "Свободное посещение",
      value: CertificateType.kFreeVisit,
    },
    {
      name: "Иной документ",
      value: CertificateType.kAnother,
    },
  ];

  return (
    <>
      <form onSubmit={submitForm}>
        <Container adaptive>
          <Row adaptive spacing={1}>
            <Column col={12}>
              <Text typography="headline-md" as="h1">
                Добавить справку
              </Text>
            </Column>

            <Column col={12}>
              <Input
                label="Студент"
                onClick={() => {
                  setCertificateStudentListOpen(true);
                }}
                defaultValue={`${currentStudent()?.lastName} ${
                  currentStudent()?.firstName
                }`}
                readonly
              ></Input>
            </Column>

            <Column col={12}>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  rounded
                  style={{ width: 44, height: 44 }}
                >
                  <CalendarIcon></CalendarIcon>
                </Button>

                <span>
                  {dayjs(formValue.startAt).format("DD.MM.YYYY")}
                  {" - "}
                  {dayjs(formValue.finishAt).format("DD.MM.YYYY")}
                </span>
              </div>
            </Column>

            <Column col={12}>
              <Select
                defaultValue={{
                  name: certificateTypes.find((certificate) => {
                    return certificate.value == formValue.type;
                  })?.name,
                }}
                onChange={(value: SelectValue<number>) => {
                  setFormValue({
                    ...formValue,
                    type: Number(value?.value),
                  });
                }}
                label="Тип документа:"
                options={certificateTypes}
              ></Select>
            </Column>

            <Column col={12}>
              <Button type="submit" view="action" width="available">
                Добавить
              </Button>
            </Column>
          </Row>
        </Container>
      </form>

      <BottomDrawer
        open={isCertificateStudentList}
        className={styles.BottomDrawer}
        onClose={() => setCertificateStudentListOpen(false)}
      >
        <CertificateStudentList
          defaultValue={currentStudent()}
          onClose={() => setCertificateStudentListOpen(false)}
          onChange={(studentId?: uuid) => {
            setFormValue({ ...formValue, studentId: studentId });
          }}
        ></CertificateStudentList>
      </BottomDrawer>

      {isCalendarOpen && (
        <CalendarMobileRange
          defaultValue={formValue.rangeDate}
          onClose={() => setIsCalendarOpen(false)}
          onChange={(currentDate: Array<Date>) =>
            setFormValue({
              ...formValue,
              startAt: currentDate[0],
              finishAt: currentDate[currentDate.length - 1],
              rangeDate: currentDate,
            })
          }
        />
      )}
    </>
  );
};

export default EditCertificate;
