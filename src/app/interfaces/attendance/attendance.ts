import { Time } from "@angular/common";

export interface Attendance {

attendanceDate?: Date,
in_time? : Time,
out_time?: Time,
work_hours? : Time,
attendanceStatus? : string


}
