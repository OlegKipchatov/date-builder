import type { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DateDiffForm } from "@/src/entities/date-diff/ui/date-diff-form";

const saveCalculation = vi.fn();
const clearSavedHistory = vi.fn();
const applyHistoryItem = vi.fn();

vi.mock("@/src/entities/date-diff/model/use-date-diff", () => ({
  useDateDiff: () => ({
    dateA: "2024-01-01",
    dateB: "2024-01-03",
    daysDiff: 2,
    history: [
      {
        id: "1",
        dateA: "2024-01-01",
        dateB: "2024-01-03",
        daysDiff: 2,
        timestamp: "2024-01-03T00:00:00.000Z",
      },
    ],
    setDateA: vi.fn(),
    setDateB: vi.fn(),
    recalculate: vi.fn(),
    saveCalculation,
    applyHistoryItem,
    clearSavedHistory,
  }),
}));

vi.mock("@heroui/react", () => ({
  Button: ({ children, onPress }: { children: ReactNode; onPress?: () => void }) => (
    <button onClick={onPress}>{children}</button>
  ),
  Card: ({ children, onPress }: { children: ReactNode; onPress?: () => void }) => (
    <div onClick={onPress}>{children}</div>
  ),
  CardBody: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardFooter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DateRangePicker: () => <div>DateRangePicker</div>,
  Divider: () => <hr />,
}));

describe("DateDiffForm", () => {
  it("renders current difference", () => {
    render(<DateDiffForm />);

    expect(screen.getByText("Difference: 2 day(s)")).toBeInTheDocument();
  });

  it("calls save handler by primary action", () => {
    render(<DateDiffForm />);

    fireEvent.click(screen.getByText("Вычислить"));

    expect(saveCalculation).toHaveBeenCalled();
  });

  it("calls clear history action", () => {
    render(<DateDiffForm />);

    fireEvent.click(screen.getByText("Очистить"));

    expect(clearSavedHistory).toHaveBeenCalled();
  });
});
