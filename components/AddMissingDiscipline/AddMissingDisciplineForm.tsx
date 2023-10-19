import { kBaseEndpoint, ModifyStatuses } from "@common/app";
import { AbsenceType, JobWithAbsentStudents } from "@common/job";
import {
  Discipline,
  DisciplineInterval,
  DisciplinePairNumber,
  DisciplinesTypeName,
  DisciplineType,
  DisciplineTypeName,
  nextJobTime,
} from "@common/discipline";
import { JournalFetcher } from "@common/fetchers";
import { StudentWithAbsenceType } from "@common/student";
import axios from "axios";
import StudentList from "components/Journal/StudentList";
import dayjs from "dayjs";
import {
  Column,
  Container,
  Row,
  Input,
  Select,
  CalendarMobile,
  BottomDrawer,
  SelectValue,
  Button,
  Text,
  Spinner,
} from "@adev/ui-kit";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import styles from "./AddMissingDisciplineForm.module.scss";
import getAvailableJournal from "@common/auth";
import Router from "next/router";
import { HttpStatus } from "http-status-ts";

const PairNumberToTime = (pairNumber?: number) => {
  const pairTime = [
    { startAt: "9:00", finishAt: "10:30" },
    { startAt: "10:40", finishAt: "12:10" },
    { startAt: "12:40", finishAt: "14:10" },
    { startAt: "14:20", finishAt: "15:50" },
    { startAt: "16:20", finishAt: "17:50" },
    { startAt: "18:00", finishAt: "19:30" },
    { startAt: "19:40", finishAt: "21:00" },
  ];

  return pairTime[Number(pairNumber) - 1];
};

interface AddMissingDisciplineComponentFormProps {
  open?: boolean;
  onClose?: () => void;
  onChange?: (form: any, status: ModifyStatuses) => void;
  defaultValue?: JobWithAbsentStudents;
}

const AddMissingDisciplineForm: FC<AddMissingDisciplineComponentFormProps> = ({
  open,
  onClose,
  onChange,
  defaultValue,
}) => {
  const availableJournal = getAvailableJournal();

  const { data: disciplines, error: disciplinesLoadError } = useSWR<
    Array<Discipline>
  >(() => {
    if (availableJournal) {
      return `/v1/disciplines/journal/${availableJournal}`;
    }
  }, JournalFetcher);

  const [form, setForm] = useState<JobWithAbsentStudents>(
    defaultValue?.id != undefined
      ? defaultValue
      : {
          disciplineId: disciplines?.[0].id,
          disciplineType: DisciplineType.kLecture,
          students: [],
          date: defaultValue?.date,
          startAt: "9:00",
          finishAt: "10:30",
          journalId: availableJournal,
        }
  );

  useEffect(() => {
    (async () => {
      if (defaultValue?.id) {
        const response = await fetch(
          `${kBaseEndpoint}/attendance/v1/jobs/${defaultValue?.id}/students/journal/${availableJournal}`
        );

        if (response.status == HttpStatus.NO_CONTENT) {
          return setForm({ ...form, students: [] });
        }

        const json: StudentWithAbsenceType[] = await response.json();

        setForm({ ...form, students: json });
      }
    })();
  }, []);

  const deleteJob = (jobId: string) => {
    if (!jobId) {
      return;
    }
    axios.delete(`${kBaseEndpoint}/attendance/v1/job/${jobId}`);
  };

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isStudentListOpen, setStudentListOpen] = useState(false);
  const [deleteJobOpen, setDeleteJobOpen] = useState(false);

  const currentDiscipline = disciplines?.find(
    (discipline) => discipline.id === form?.disciplineId
  );

  const submitForm = async (
    form: JobWithAbsentStudents,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event?.preventDefault();

      const currentForm = {
        disciplineId: form.disciplineId,
        studentIds: form.students?.map((student) => student.id) ?? [],
        date: dayjs(form.date).format("YYYY-MM-DD"),
        startAt: form.startAt,
        finishAt: form.finishAt,
        journalId: form.journalId,
        absenceType: AbsenceType.kDisrespectfulReason,
        disciplineType: form.disciplineType,
        id: defaultValue?.id,
      };

      if (form?.id == undefined) {
        await axios.post(`${kBaseEndpoint}/attendance/v1/jobs`, currentForm);
        onChange?.(currentForm, ModifyStatuses.kCreate);
      } else {
        await axios.put(`${kBaseEndpoint}/attendance/v1/jobs`, currentForm);
        onChange?.(currentForm, ModifyStatuses.kUpdate);
      }

      onClose?.();
    } catch (error: any) {
      const http_status = error.response.status;
      if (http_status == 409) {
        Router.push(`/?notify=job_conflict-${crypto.randomUUID()}`);
      }
      onClose?.();
    }
  };

  return (
    <div style={{ zIndex: 999 }}>
      <BottomDrawer open={open} onClose={onClose}>
        <Container adaptive>
          <form onSubmit={(event) => submitForm(form, event)}>
            <Row spacing={1}>
              <Column col={12}>
                {disciplines && !disciplinesLoadError && (
                  <Select
                    dropdownStyles={{ zIndex: 10 }}
                    defaultValue={{
                      name: currentDiscipline?.name.toString(),
                      value: currentDiscipline?.id,
                    }}
                    onChange={(value: SelectValue<string>) =>
                      setForm({ ...form, disciplineId: value.value })
                    }
                    label="Выберите дисциплину"
                    options={disciplines.map((discipline: Discipline) => {
                      return { name: discipline.name, value: discipline.id };
                    })}
                  ></Select>
                )}
              </Column>

              <Column col={12}>
                <Select
                  dropdownStyles={{ zIndex: 10 }}
                  label="Выберите тип дисциплины"
                  defaultValue={{
                    name: DisciplineTypeName(form.disciplineType),
                    value: form.disciplineType,
                  }}
                  options={DisciplinesTypeName().map(
                    (disciplineType, index) => {
                      return {
                        name: disciplineType,
                        value: index,
                      };
                    }
                  )}
                  onChange={(value: SelectValue<number>) =>
                    setForm({
                      ...form,
                      disciplineType: value.value,
                    })
                  }
                ></Select>
              </Column>

              <Column col={12}>
                <Select
                  dropdownStyles={{ zIndex: 10 }}
                  defaultValue={{
                    name: `${form?.startAt} - ${form?.finishAt}`,
                    value: DisciplinePairNumber(
                      `${form?.startAt} - ${form?.finishAt}`
                    ),
                  }}
                  label="Время проведения"
                  onChange={(value: SelectValue<number>) =>
                    setForm({
                      ...form,
                      startAt: PairNumberToTime(value?.value)?.startAt,
                      finishAt: PairNumberToTime(value?.value)?.finishAt,
                    })
                  }
                  options={DisciplineInterval().map((interval, index) => {
                    return {
                      name: interval,
                      value: index + 1,
                    };
                  })}
                ></Select>
              </Column>

              <Column col={12}>
                <Input
                  defaultValue={dayjs(form?.date).format("DD.MM.YYYY")}
                  onClick={() => setCalendarOpen(true)}
                  label="Дата проведения"
                  readonly
                ></Input>
              </Column>

              <Column col={12}>
                {defaultValue?.id && !form?.students ? (
                  <div className={styles.loading}>
                    <Spinner mode="border"></Spinner>
                  </div>
                ) : (
                  <Input
                    label="Отсутствующие"
                    onClick={() => setStudentListOpen(true)}
                    defaultValue={form?.students
                      ?.map(
                        (student) => `${student.lastName} ${student.firstName}`
                      )
                      .join(", ")}
                    readonly
                  ></Input>
                )}
              </Column>
              <Column col={12}>
                <Button type="submit" view="action" width="available">
                  {!defaultValue?.id ? "Добавить" : "Сохранить изменения"}
                </Button>
              </Column>

              {defaultValue?.id && (
                <>
                  <Column col={12}>
                    <div className={styles.border}></div>
                  </Column>
                  {form.startAt != "19:40" && (
                    <Column col={12}>
                      <Button
                        view="default"
                        width="available"
                        onClick={() => {
                          const nextPair = nextJobTime(
                            form?.startAt,
                            form?.finishAt
                          );
                          submitForm({
                            ...form,
                            id: undefined,
                            startAt: nextPair[0],
                            finishAt: nextPair[1],
                          });
                        }}
                      >
                        Дублировать
                      </Button>
                    </Column>
                  )}
                  <Column col={12}>
                    <Button
                      view="default"
                      width="available"
                      onClick={() => {
                        setDeleteJobOpen(true);
                      }}
                    >
                      Удалить
                    </Button>
                  </Column>
                </>
              )}
            </Row>
          </form>
        </Container>
      </BottomDrawer>

      <BottomDrawer
        className={styles.BottomDrawer}
        open={isStudentListOpen}
        onClose={() => setStudentListOpen(false)}
      >
        <StudentList
          defaultValue={form?.students}
          onChange={(value: StudentWithAbsenceType[] | undefined) =>
            setForm({ ...form, students: value })
          }
          onClose={() => setStudentListOpen(false)}
          jobId={form?.id ?? ""}
        ></StudentList>
      </BottomDrawer>

      <BottomDrawer
        className={styles.BottomDrawer}
        open={deleteJobOpen}
        onClose={() => {
          setDeleteJobOpen(false);
        }}
      >
        <Container adaptive>
          <Row adaptive spacing={1}>
            <Column col={12}>
              <Text typography="headline-xs">
                Вы точно хотите удалить пару?
              </Text>
            </Column>
            <Column col={12}>
              <Button
                view="action"
                width="available"
                onClick={() => {
                  deleteJob(defaultValue?.id ?? "");
                  setDeleteJobOpen(false);
                  onClose?.();
                  onChange?.({ id: defaultValue?.id }, ModifyStatuses.kDelete);
                }}
              >
                Удалить
              </Button>
            </Column>
          </Row>
        </Container>
      </BottomDrawer>

      {isCalendarOpen && (
        <CalendarMobile
          defaultValue={[defaultValue?.date!]}
          onChange={(date: Date[]) => {
            if (date) {
              setForm({ ...form, date: date[0] });
            }
          }}
          disabledWeekDays={[0]}
          onClose={() => setCalendarOpen(false)}
        ></CalendarMobile>
      )}
    </div>
  );
};

export default AddMissingDisciplineForm;
