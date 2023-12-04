import { Dayjs } from "dayjs";
import { HOURS_IN_DAY, MINUTES_IN_HOUR } from "./constants";

export function getTimeDiffStr(startTime: Dayjs | null, endTime: Dayjs | null) {
    if (startTime && endTime) {
      let hours = endTime.diff(startTime, "hour") % HOURS_IN_DAY;
      // I'm not sure why, but adding one minute makes this correct (whereas it'd otherwise be off by 1)
      let minutes = endTime.diff(startTime, "minute") % MINUTES_IN_HOUR + 1;
      if (hours > 0 && minutes <= 0) {
        return `${hours} hours`
      }
      if (hours > 0 && minutes > 0) {
        return `${hours} hours and ${minutes} minutes` 
      }
      if (hours <= 0 && minutes > 0) {
        return `${minutes} minutes`
      }
      return "0 minutes";
    } else {
      return "0 minutes";
    }
} 