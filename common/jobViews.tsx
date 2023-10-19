import React from "react";
import { AbsenceType } from "./job";

export const AbsenceTypeView = (type: AbsenceType) => {
  if (type == AbsenceType.kDisrespectfulReason) {
    return (
      <span
        style={{
          color: "var(--ep-color-primary)",
          fontWeight: "700",
        }}
      >
        Н
      </span>
    );
  } else if (type == AbsenceType.kRespectfulReason) {
    return (
      <span
        style={{
          color: "var(--ep-color-success)",
          fontWeight: "700",
        }}
      >
        У
      </span>
    );
  } else if (type == AbsenceType.kRecalculation) {
    return (
      <span
        style={{
          color: "var(--ep-text-color)",
          fontWeight: "700",
        }}
      >
        З
      </span>
    );
  }
};
