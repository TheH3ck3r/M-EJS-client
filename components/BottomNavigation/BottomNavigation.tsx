import Link from "next/link";
import React, { FC, useState } from "react";
import styles from "./BottomNavigation.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";

interface BottomNavigationItem {
  icon: React.ReactNode;
  iconSelected: React.ReactNode;
  title: string;
  link: string;
}

interface BottomNavigationProps {
  items: Array<BottomNavigationItem>;
}

const BottomNavigation: FC<BottomNavigationProps> = ({ items }) => {
  const { pathname } = useRouter();
  const [focusItem, setFocusItem] = useState<number | undefined>(undefined);

  return (
    <div className={styles.BottomNavigation}>
      {items.map((item, index) => (
        <Link href={item.link} key={index}>
          <div
            tabIndex={index}
            onPointerDown={() => {
              setFocusItem(index);
            }}
            onPointerCancel={() => {
              setTimeout(() => {
                setFocusItem(undefined);
              }, 500);
            }}
            onPointerOut={() => {
              setTimeout(() => {
                setFocusItem(undefined);
              }, 500);
            }}
            className={clsx(
              styles.BottomNavigationItem,
              item.link == pathname && styles.BottomNavigationItemSelected,
              index == focusItem && styles.BottomNavigationItemFocused
            )}
          >
            <div>{item.link == pathname ? item.iconSelected : item.icon}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
