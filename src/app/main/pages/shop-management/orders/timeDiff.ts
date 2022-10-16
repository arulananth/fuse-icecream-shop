import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
const moment = _moment;

@Pipe({name: 'timeDiff'})
export class TimeDifferencePipe implements PipeTransform {
  transform(value: any): string {
    let duration: any = moment.duration(value, 'seconds'); //.humanize();
    let data = duration._data;
    let timeDifference = `${data.days} days ${data.hours} hours ${data.minutes} minutes`;
    return timeDifference;
  }
}