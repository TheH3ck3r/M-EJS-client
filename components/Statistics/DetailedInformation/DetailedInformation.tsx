import { BottomDrawer } from "@adev/ui-kit";
import DetailedInformationView from "./DetailedInformationView";
import React, { FC } from "react";

interface DetailedInformationProps {
  open?: boolean;
  onClose?: () => void;
}

const DetailedInformation: FC<DetailedInformationProps> = ({
  open,
  onClose,
}) => {
  return (
    <div style={{ zIndex: 999 }}>
      <BottomDrawer open={open} onClose={onClose}>
        <DetailedInformationView></DetailedInformationView>
      </BottomDrawer>
    </div>
  );
};

export default DetailedInformation;
