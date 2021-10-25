export type ViewState = "date" | "month" | "year";

export interface MonthYear {
  month: number;
  year: number;
}

export interface DatepickerContextType {
  date: Date | null;
  visible: MonthYear;
  view: "date" | "month" | "year";
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
  nextDecade: () => void;
  prevDecade: () => void;
  selectMonth: (m: number) => void;
  selectYear: (y: number) => void;
  selectDate: (d: number) => void;
  viewMonths: () => void;
  viewYears: () => void;
  isVisible: boolean;
  showCalendar: () => void;
  toggleCalendar: () => void;
  isSelectedDate: (d: number) => boolean;
}
