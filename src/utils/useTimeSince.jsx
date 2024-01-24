import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function useTimeSince(date) {
  return dayjs(date).fromNow();
}
