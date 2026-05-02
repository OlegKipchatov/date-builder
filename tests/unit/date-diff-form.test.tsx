import type { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DateDiffForm } from "@/src/entities/date-diff/ui/date-diff-form";

const saveCalculation = vi.fn();
const clearSavedHistory = vi.fn();
const applyHistoryItem = vi.fn();
const copyShareText = vi.fn(async () => true);

vi.mock("@/src/entities/date-diff/model/use-date-diff", () => ({
  useDateDiff: () => ({
    mode: "range",
    dateA: "2024-01-01",
    dateB: "2024-01-03",
    resultLabel: "Между датами: 2 дн.",
    history: [
      {
        id: "1",
        mode: "range",
        dateA: "2024-01-01",
        dateB: "2024-01-03",
        daysDiff: 2,
        timestamp: "2024-01-03T00:00:00.000Z",
      },
    ],
    setMode: vi.fn(),
    setDateA: vi.fn(),
    setDateB: vi.fn(),
    saveCalculation,
    applyPreset: vi.fn(),
    applyHistoryItem,
    clearSavedHistory,
    copyShareText,
  }),
}));

vi.mock("@heroui/react", () => ({
  Tabs: Object.assign(
    ({ children }: { children: ReactNode }) => <div>{children}</div>,
    {
      ListContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      List: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Tab: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      Indicator: () => <span>*</span>,
    },
  ),
  Button: ({ children, onPress }: { children: ReactNode; onPress?: () => void }) => (
    <button onClick={onPress}>{children}</button>
  ),
  Label: ({ children }: { children: ReactNode }) => <label>{children}</label>,
  DateField: {
    Group: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Input: ({ children }: { children: (segment: unknown) => ReactNode }) => <div>{children({})}</div>,
    Segment: () => <span>seg</span>,
    Suffix: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
  DateRangePicker: Object.assign(
    ({ children }: { children: ReactNode }) => <div>{children}</div>,
    {
      RangeSeparator: () => <span>-</span>,
      Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      TriggerIndicator: () => <span>v</span>,
      Popover: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    },
  ),
  DatePicker: Object.assign(
    ({ children }: { children: ReactNode }) => <div>{children}</div>,
    {
      Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      TriggerIndicator: () => <span>v</span>,
      Popover: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    },
  ),
  RangeCalendar: Object.assign(
    ({ children }: { children: ReactNode }) => <div>{children}</div>,
    {
      Header: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      YearPickerTrigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      YearPickerTriggerHeading: () => <span>May</span>,
      YearPickerTriggerIndicator: () => <span>v</span>,
      NavButton: () => <button>nav</button>,
      Grid: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      GridHeader: ({ children }: { children: (day: string) => ReactNode }) => <div>{children("Mon")}</div>,
      HeaderCell: ({ children }: { children: ReactNode }) => <span>{children}</span>,
      GridBody: ({ children }: { children: (date: unknown) => ReactNode }) => <div>{children({})}</div>,
      Cell: () => <span>1</span>,
    },
  ),
  Calendar: Object.assign(
    ({ children }: { children: ReactNode }) => <div>{children}</div>,
    {
      Header: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      YearPickerTrigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
      YearPickerTriggerHeading: () => <span>May</span>,
      YearPickerTriggerIndicator: () => <span>v</span>,
      NavButton: () => <button>nav</button>,
      Grid: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      GridHeader: ({ children }: { children: (day: string) => ReactNode }) => <div>{children("Mon")}</div>,
      HeaderCell: ({ children }: { children: ReactNode }) => <span>{children}</span>,
      GridBody: ({ children }: { children: (date: unknown) => ReactNode }) => <div>{children({})}</div>,
      Cell: () => <span>1</span>,
    },
  ),
  Separator: () => <hr />,
}));

describe("DateDiffForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders current difference", () => {
    render(<DateDiffForm />);

    expect(screen.getByText("Между датами: 2 дн.")).toBeInTheDocument();
  });

  it("calls save handler by primary action", () => {
    render(<DateDiffForm />);

    fireEvent.click(screen.getByText("Сохранить расчет"));

    expect(saveCalculation).toHaveBeenCalled();
  });

  it("calls clear history action", () => {
    render(<DateDiffForm />);

    fireEvent.click(screen.getByText("Очистить"));

    expect(clearSavedHistory).toHaveBeenCalled();
  });
});
