import React, { FC } from "react";
import { TabsValue } from "../TabsTypes";
import "./TabsWithToggles.scss";
export interface IToggleBlockProps {
    /**
     * Options
     */
    options: Array<TabsValue>;
    /** defaultValue*/
    defaultValue?: TabsValue;
    style?: React.CSSProperties;
    onChange?: (value?: TabsValue) => void;
}
/**
 * Single-selection tabs
 */
declare const TabsWithToggles: FC<IToggleBlockProps>;
export default TabsWithToggles;
