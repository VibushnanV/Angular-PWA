
import { AfterViewInit, Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
  ],
})
export class OtpInputComponent implements OnInit, ControlValueAccessor, OnDestroy{
  otpInputConfig:any= {
    otpLength: 6,
    autoFocus: true,
  }
  value: any = 1;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  constructor() { }
  ngOnDestroy(): void {
    this.onTouched();
  }

  onModelChange(): void {
    console.log(this.value)
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // You can implement this if you want to handle disabling the input
  }


  ngOnInit(): void {
  }

}
