import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import Tabs from "./Tabs";

describe("ُTabs test cases", () => {
  afterAll(cleanup);

  it("should show Tabs component based on passed data", () => {
    render(<Tabs panels={["panel1", "panel2"]} tabs={["tab1", "tab2"]} />);

    const tabElement = screen.getAllByLabelText("tabs-label");
    const panelElement = screen.getAllByLabelText("panel-label");
    expect(tabElement.length).toBeGreaterThan(1);
    expect(panelElement.length).toBeGreaterThan(1);
  });

  it("should show active", () => {
    render(<Tabs panels={["panel1", "panel2"]} tabs={["tab1", "tab2"]} />);

    const tabElement = screen.getAllByLabelText("tabs-label");
    const panelElement = screen.getAllByLabelText("panel-label");

    expect(tabElement[0].classList.contains("active")).toBeTruthy();

    expect(panelElement[0].classList.contains("active")).toBeTruthy();
  });
});
