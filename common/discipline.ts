export enum DisciplineType {
  kLecture,
  kPractice,
  kLaboratory,
  kSR,
}

export interface Discipline {
  id: string;
  startAt?: Date;
  finishAt?: Date;
  name: string;
}

export const DisciplinesTypeName = () => {
  return ["Лекция", "Практика", "Лабораторная", "C/Р"];
};

export const DisciplineTypeName = (
  disciplineType: DisciplineType | undefined
) => {
  if (!disciplineType) {
    return DisciplinesTypeName()[DisciplineType.kLecture];
  }
  return DisciplinesTypeName()[disciplineType];
};

export const DisciplineInterval = () => {
  return [
    "9:00 - 10:30",
    "10:40 - 12:10",
    "12:40 - 14:10",
    "14:20 - 15:50",
    "16:20 - 17:50",
    "18:00 - 19:30",
    "19:40 - 21:00",
  ];
};

export const DisciplinePairNumber = (disciplineInterval: string) => {
  const router = new Map([
    ["9:00 - 10:30", 1],
    ["10:40 - 12:10", 2],
    ["12:40 - 14:10", 3],
    ["14:20 - 15:50", 4],
    ["16:20 - 17:50", 5],
    ["18:00 - 19:30", 6],
    ["19:40 - 21:00", 7],
  ]);

  return router.get(disciplineInterval) ?? DisciplineInterval()[0];
};

export const pairNumber = (startAt?: string, finishAt?: string) => {
  return [
    ["9:00", "10:30"],
    ["10:40", "12:10"],
    ["12:40", "14:10"],
    ["14:20", "15:50"],
    ["16:20", "17:50"],
    ["18:00", "19:30"],
    ["19:40", "21:00"],
  ].findIndex((item) => item[0] === startAt && item[1] === finishAt);
};

export const nextJobTime = (startAt?: string, finishAt?: string) => {
  return [
    ["9:00", "10:30"],
    ["10:40", "12:10"],
    ["12:40", "14:10"],
    ["14:20", "15:50"],
    ["16:20", "17:50"],
    ["18:00", "19:30"],
    ["19:40", "21:00"],
  ][pairNumber(startAt, finishAt) + 1];
};
