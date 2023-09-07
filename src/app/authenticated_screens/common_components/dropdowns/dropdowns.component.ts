import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {
  form: FormGroup = new FormGroup({
    selectedValue:new FormControl('')
  });
  optionList:any[]=[]
  optionLabel:any
  optionValue:any
  selectedValue:any
  disableKey:any
  required=false
  disabled=false
  showClear=true
  filter=true
  placeholder:any
  filterPlaceholder:any
  filterBy:any
  resetFilterOnHide=false
  filterMatchMode:any
@Input('dropdowndata')
set in (value:any){
  this.optionList=value['list'],
  this.optionLabel=value['optionLabel'],
  this.optionValue=value['optionValue'],
  this.selectedValue=value['selectedValue'][this.optionValue]
  this.form.get('selectedValue')?.setValue(this.selectedValue)
  this.disableKey=value['disableKey']??''
  this.required=value['Isrequired']?value['Isrequired']:false
  this.disabled=value['IsDisable']?value['IsDisable']:false
  this.showClear=value['showClear']?value['showClear']:true
  this.filter=value['filter']?value['filter']:true
  this.resetFilterOnHide=value['resetFilterOnHide']?value['resetFilterOnHide']:true
  this.filterBy=value['filterBy']??this.optionLabel,this.optionValue
  if(value['Isrequired']){
    this.form.get('selectedValue')?.addValidators(Validators.required)
    this.form.get('selectedValue')?.updateValueAndValidity({onlySelf:true})
  }
  else{
    this.form.get('selectedValue')?.clearValidators()
  }
  this.placeholder=value['placeholder']
  this.filterPlaceholder=value['filterPlaceholder']
  this.filterMatchMode=value['filterMatchMode']
}
  constructor() {
  //   this.cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];
  this.selectedCityCode=this.cities[3]
  console.log(this.selectedCityCode)
  this.form.get('selectedValue')?.setValue(this.selectedCityCode['code'])
  console.log(this.form)
   }
  cities:any
  selectedCityCode:any
  ngOnInit(): void {

  }

}
