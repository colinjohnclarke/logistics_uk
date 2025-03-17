import { Trace } from "./trace";

export interface Driver {
  driverID: number;
  surname: string;
  forename: string;
  vehicleRegistration: string;
  traces: Trace[];
}
