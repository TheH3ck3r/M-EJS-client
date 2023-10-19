import { AbsenceType } from "./job";
import { uuid } from "./types";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  vkLink: string;
  absenceType?: AbsenceType;
}

export interface StudentWithAbsenceType {
  id?: uuid;
  firstName: string;
  lastName: string;
  absenceType: AbsenceType;
}

export const StudentToStudentWithAbsenceType = (student: Student, type: AbsenceType): StudentWithAbsenceType => {
  return{
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    absenceType: type,
  }
}

export interface StudentWithMissingCounts {
  studentId: string;
  missingCount: number;
  disrespectfulMissingCount: number;
  respectfulMissingCount: number;
}