const MS_IN_DAY = 1000 * 60 * 60 * 24;

const toUtcDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);

  return Date.UTC(year, month - 1, day);
};

export const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA");
};

export const getDaysDiff = (dateA, dateB) => {
  const dateATimestamp = toUtcDate(dateA);
  const dateBTimestamp = toUtcDate(dateB);

  return Math.abs(Math.round((dateATimestamp - dateBTimestamp) / MS_IN_DAY));
};
