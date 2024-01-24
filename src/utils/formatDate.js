import dayjs from "dayjs";

export const formatDate = (date) => {
  const dayjsDate = dayjs(date);
  return dayjsDate.isValid()
    ? dayjsDate.format("MMMM, DD, YYYY")
    : "none selected";
};
