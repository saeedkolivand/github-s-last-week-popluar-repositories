import React, { useState } from "react";
import { TabsPropsTypes } from "./tabs.types";
import "./tabs.style.scss";
import Button from "../button/Button";

const Tabs: React.FC<TabsPropsTypes> = (props) => {
  const { tabs, panels } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabToggle = (index: number) => setActiveIndex(index);

  const checkActive = (index: number, className: string) =>
    activeIndex === index ? className : "";

  return (
    <>
      <div className="tabs">
        {tabs.map((item, index) => (
          <Button
            className={`tab flex-center ${checkActive(index, "active")}`}
            onClick={() => handleTabToggle(index)}
            key={`tab-${index}`}
            aria-label="tabs-label"
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="panels">
        {panels.map((panel, index) => (
          <span
            className={`panel ${checkActive(index, "active")}`}
            key={`panel-${index}`}
            aria-label="panel-label"
          >
            {panel}
          </span>
        ))}
      </div>
    </>
  );
};

export default Tabs;
