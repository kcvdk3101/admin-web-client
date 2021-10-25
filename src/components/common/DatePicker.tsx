import React, { useContext, useRef } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { daysOfWeekNames, monthNames } from "../../constant";
import { DatepickerCtx, useDatepickerCtx } from "./DatePickerContext";

export const inputStyle = {
  paddingTop: "0.375rem",
  paddingBottom: "0.375rem",
};

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => (
  <RawDatePicker date={props.date} onChange={props.onChange}></RawDatePicker>
);

export const RawDatePicker: React.FC<{
  date: Date;
  onChange: (date: Date) => void;
}> = ({ date, onChange }) => {
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatepickerCtx(date, onChange, popupNode);

  return (
    <DatepickerCtx.Provider value={ctxValue}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className="flex" ref={ref}>
              <input
                className="border-2 rounded-l px-3 outline-none focus:border-gray-400 flex-grow"
                type="text"
                style={inputStyle}
                onFocus={(e) => ctxValue.showCalendar()}
                value={formattedDate(date)}
                readOnly
              />
              <button
                className="bg-gray-300 rounded-r flex items-center justify-center text-sm font-semibold text-gray-700 px-2 focus:outline-none"
                onClick={(e) => ctxValue.toggleCalendar()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                    fill="#666"
                  />
                </svg>
              </button>
            </div>
          )}
        </Reference>
        <Popper
          placement="bottom-start"
          innerRef={(node) => (popupNode.current = node)}
        >
          {({ ref, style, placement }) =>
            ctxValue.isVisible ? (
              <Calendar
                placement={placement}
                style={style}
                ref={ref as React.Ref<HTMLDivElement>}
              />
            ) : null
          }
        </Popper>
      </Manager>
    </DatepickerCtx.Provider>
  );
};

interface CalendarProps {
  style: React.CSSProperties;
  placement: string;
  ref: React.Ref<HTMLDivElement>;
}

const Calendar: React.FC<CalendarProps> = React.forwardRef<
  HTMLDivElement,
  CalendarProps
>((props, ref) => {
  const { view } = useContext(DatepickerCtx);

  let selectionComponent = null;
  switch (view) {
    case "date":
      selectionComponent = <DateSelection />;
      break;
    case "month":
      selectionComponent = <MonthSelection />;
      break;
    case "year":
      selectionComponent = <YearSelection />;
      break;
  }

  return (
    <div
      className="bg-white relative shadow-lg max-w-xs w-64 p-2 rounded-lg"
      ref={ref}
      data-placement={props.placement}
      style={props.style}
    >
      {selectionComponent}
    </div>
  );
});

/**
 * Date Selection Component
 * @param props
 */
const DateSelection: React.FC<{}> = () => {
  const {
    nextMonth,
    prevMonth,
    viewMonths,
    viewYears,
    selectDate,
    visible: { month, year },
    isSelectedDate,
  } = useContext(DatepickerCtx);

  const dates = [];

  for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
    dates.push(<div key={`emptybefore${i}`}></div>);
  }

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    dates.push(
      <button
        key={`day${i}`}
        className={`hover:bg-gray-200 rounded p-1 text-sm ${
          isSelectedDate(i) ? "bg-gray-300 font-semibold" : ""
        }`}
        onClick={() => selectDate(i)}
        style={{ textAlign: "center" }}
      >
        {i}
      </button>
    );
  }

  return (
    <div
      className="text-gray-800"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch",
      }}
    >
      <button className={buttonClassName} onClick={(e) => prevMonth()}>
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: "2/5" }}
        onClick={(e) => viewMonths()}
      >
        {monthNames[month]}
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: "5/7" }}
        onClick={(e) => viewYears()}
      >
        {year}
      </button>

      <button className={buttonClassName} onClick={(e) => nextMonth()}>
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {daysOfWeekNames.map((day) => (
        <div
          key={(200 + day).toString()}
          className="p-1 text-sm font-semibold"
          style={{ textAlign: "center" }}
        >
          {day[0]}
        </div>
      ))}

      {dates}
    </div>
  );
};

/**
 * Month Selection Component
 * @param props
 */
const MonthSelection: React.FC<{}> = (props) => {
  const { viewYears, selectMonth, nextYear, prevYear, visible } =
    useContext(DatepickerCtx);

  return (
    <div
      className="h-48"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch",
      }}
    >
      <div className="flex" style={{ gridColumn: "1/5" }}>
        <CalButton chevron="left" onClick={(e) => prevYear()} />
        <CalButton className="flex-grow" onClick={(e) => viewYears()}>
          {visible.year}
        </CalButton>
        <CalButton chevron="right" onClick={(e) => nextYear()} />
      </div>

      {monthNames.map((month, index) => (
        <CalButton onClick={(e) => selectMonth(index)}>
          {month.substring(0, 3)}
        </CalButton>
      ))}
    </div>
  );
};

/**
 * Year Selection Component
 * @param props
 */
const YearSelection: React.FC<{}> = (props) => {
  const {
    selectYear,
    prevDecade,
    nextDecade,
    visible: { year },
  } = useContext(DatepickerCtx);

  let years = [];
  let [minYear, maxYear] = [year - 6, year + 6];

  for (let i = minYear; i < maxYear; i++) {
    years.push(<CalButton onClick={(e) => selectYear(i)}>{i}</CalButton>);
  }

  return (
    <div
      className="h-48"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch",
      }}
    >
      <div className="flex" style={{ gridColumn: "1/5" }}>
        <CalButton chevron="left" onClick={(e) => prevDecade()} />
        <CalButton className="flex-grow">
          {`${minYear} - ${maxYear - 1}`}
        </CalButton>
        <CalButton chevron="right" onClick={(e) => nextDecade()} />
      </div>

      {years}
    </div>
  );
};

const buttonClassName =
  "hover:bg-gray-200 rounded p-1 text-sm flex align-center justify-center focus:outline-none";

const CalButton: React.FC<{
  chevron?: "right" | "left";
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = (props) => {
  let children = null;

  if (props.chevron && props.chevron === "left")
    children = (
      <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
  else if (props.chevron && props.chevron === "right")
    children = (
      <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
  else children = props.children;

  return (
    <button
      className={`${buttonClassName} ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

/**
 * Util functions
 */
/**
 * For formatting date
 * @param date
 */
function formattedDate(date: Date): string {
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

/**
 * Beginning of Day of Week of a Month
 * @param date
 */
function beginningDayOfWeek(m: number, y: number): number {
  return new Date(y, m, 1).getDay();
}

/**
 * Days in month
 */
function daysInMonth(month: number, year: number) {
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 1:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
}

/**
 * Is Leap Year
 * @param year
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
