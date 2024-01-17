import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ){}

  age_form = this.fb.group({
    day: ['', Validators.required],
    month: ['', Validators.required],
    year: ['', Validators.required],
  })

  date = {
    day: 0,
    month: 0,
    year: 0,
  }

  ngOnInit(){
    this.age_form.clearValidators();
  }

  ageSubmitHandler(){
    if (this.age_form.invalid) {
      this.age_form.markAllAsTouched();
      return;
    }

    let day = Number(this.age_form.get('day')?.value || 0);
    let month = Number(this.age_form.get('month')?.value || 0);
    let year = Number(this.age_form.get('year')?.value || 0);

    console.log(day, month, year);


    const today = new Date();
    const _year = today.getFullYear();
    const _month = today.getMonth() + 1;
    const _day = today.getDate();

    console.log(_day, _month, _year);


    this.date.year = _year - year - (_month < month || (_month === month && _day < day) ? 1 : 0);

    console.log(this.date);


    if (_month < month || (_month === month && _day < day)) {
      this.date.month = 12 - (month - _month) - (_day < day ? 1 : 0);
      this.date.day = new Date(_year, month - 1, day).getDate() - _day;
    } else {
      this.date.month = _month - month;
      this.date.day = _day - day;
    }
  }

}
