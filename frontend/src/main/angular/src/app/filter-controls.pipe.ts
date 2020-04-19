import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Pipe({
  name: 'filterControls'
})
export class FilterControlsPipe implements PipeTransform {

  transform(controls: AbstractControl[], valueField: string, valueFilter: String): AbstractControl[] {
    if (!controls) {
      return [];
    }
    if (!valueFilter) {
      return controls;
    }

    return controls.filter(control => {
      let value = valueField ? control.get(valueField).value : JSON.stringify(control.value);
      return value ? value.toLowerCase().includes(valueFilter.toLowerCase()) : false
    });
  }

}
