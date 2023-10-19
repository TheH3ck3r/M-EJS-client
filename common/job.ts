import { DisciplineType } from "./discipline";
import { Student, StudentWithAbsenceType } from "./student";
import { uuid } from "./types";

export enum AbsenceType {
  kDisrespectfulReason,
  kRespectfulReason,
  kRecalculation,
}

export interface JobWithAbsentStudents {
  id?: uuid;
  disciplineId?: uuid;
  journalId?: uuid;
  date?: Date;
  startAt?: string;
  finishAt?: string;
  disciplineType?: DisciplineType;
  students?: StudentWithAbsenceType[];
}

export const DefaultJobWithAbsentStudents = (): JobWithAbsentStudents => {
  return {
    disciplineId: undefined,
    journalId: "",
    date: new Date(),
    startAt: "9:00",
    finishAt: "10:30",
    disciplineType: DisciplineType.kLecture,
    students: [],
  };
};

export type Job = Omit<JobWithAbsentStudents, "students">;

export const JobToAddMissingDisciplineForm = (job?: Job) => {
  return {
    disciplineId: job?.disciplineId,
    startAt: job?.startAt,
    date: job?.date,
    finishAt: job?.finishAt,
    disciplineType: job?.disciplineType,
  };
};
