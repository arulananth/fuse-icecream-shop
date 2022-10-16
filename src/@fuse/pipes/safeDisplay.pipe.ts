import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'safeDisplay'
})
export class SafeDisplayPipe implements PipeTransform {
    constructor() {
    }

    transform(value: any, args?: any): any {
        return (value != null || value != undefined) ? value : '';
    }
}