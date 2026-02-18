import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DefaultReportModal } from "./ReportModal.composition";

beforeAll(() => {
  const patchDialog = (Proto) => {
    if (!Proto) return;

    if (!Proto.showModal) {
      Object.defineProperty(Proto, "showModal", {
        configurable: true,
        value: function () {
          this.setAttribute("open", "");
        },
      });
    }

    if (!Proto.close) {
      Object.defineProperty(Proto, "close", {
        configurable: true,
        value: function () {
          this.removeAttribute("open");
          this.dispatchEvent(new Event("close"));
        },
      });
    }
  };

  patchDialog(globalThis.HTMLDialogElement?.prototype);
  patchDialog(globalThis.HTMLElement?.prototype);
});

describe("ReportModal", () => {
  it("should render modal with content and title", async () => {
    render(<DefaultReportModal />);

    expect(await screen.findByText("Report this argument")).toBeTruthy();
    expect(await screen.findByRole("textbox")).toBeTruthy();
  });

  it("should render dropdown", async () => {
    const user = userEvent.setup();
    render(<DefaultReportModal />);

    const dropdownButton = await screen.findByRole("button", { name: /select a reason/i });
    await user.click(dropdownButton);

    expect(await screen.findByText("Incomprehensibility")).toBeTruthy();
  });
});
