export const getThisWeeksMonday = (now: Date) => {
  const d = new Date(now);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

  return new Date(d.setDate(diff));
};
export const getThisWeeksFriday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -2 : 5); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const getThisWeeksSaturday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -1 : 6); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const getThisWeeksSunday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? 0 : 7); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const getDateFromCalendarDateDetails = ({
  year,
  month,
  day,
  hour,
  minutes,
  seconds,
}: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minutes: string;
  seconds: string;
}) => {
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minutes),
    Number(seconds)
  );
};
