import { BottomDrawer } from "@adev/ui-kit";
import { FC } from "react";
import ExportInformationView from "./ExportInformationView";

interface ExportInformationProps {
  open?: boolean;
  onClose?: () => void;
  file?: string;
}

const ExportInformation: FC<ExportInformationProps> = ({
  open,
  onClose,
  file,
}) => {
  return (
    <div style={{ zIndex: 999 }}>
      <BottomDrawer open={open} onClose={onClose}>
        <ExportInformationView file={file} onClose={onClose}></ExportInformationView>
      </BottomDrawer>
    </div>
  );
};

export default ExportInformation;
