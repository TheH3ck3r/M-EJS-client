import { FC } from "react";
import { CheckboxPropsType } from "../../Checkbox/Checkbox";
import { TabsValue } from "../TabsTypes";
export type TabsWithCheckboxProps = {
    /**
     * Options
     */
    options?: Array<TabsValue>;
    /**
     * onChange callback handler
     */
    onChange?: (value: TabsValue[]) => void;
    checkboxProps?: CheckboxPropsType;
};
/**
 * Multiple choice tabs
 */
declare const TabsWithCheckboxes: FC<TabsWithCheckboxProps>;
export default TabsWithCheckboxes;
