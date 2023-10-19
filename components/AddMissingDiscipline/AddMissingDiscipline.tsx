import { JobWithAbsentStudents } from "@common/job";
import { FC } from "react";
import AddMissingDisciplineForm from "./AddMissingDisciplineForm";
import React from "react";
import { ModifyStatuses } from "@common/app";

interface AddMissingDisciplineProps {
  open?: boolean;
  onClose?: () => void;
  onChange?: (form: any, status: ModifyStatuses) => void;
  defaultValue?: JobWithAbsentStudents;
}

const AddMissingDiscipline: FC<AddMissingDisciplineProps> = ({
  open,
  onClose,
  onChange,
  defaultValue,
}) => {
  return (
    <div style={{ zIndex: 999 }}>
      {open && (
        <AddMissingDisciplineForm
          open={open}
          onClose={onClose}
          onChange={onChange}
          defaultValue={defaultValue}
        ></AddMissingDisciplineForm>
      )}
    </div>
  );
};

export default AddMissingDiscipline;
