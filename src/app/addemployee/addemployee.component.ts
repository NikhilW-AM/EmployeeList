import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { hobby } from '../hobby';
import { countries } from '../countries';
import { states } from '../states';
import { employeeInter } from '../employeeInter';
import { Router } from '@angular/router';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  value: number = 0;
  options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 }
    ]
  };

  employeeListArray: employeeInter[] = []
  countryArray: countries[] = []
  stateArray: states[] = []
  hobbiesArray: hobby[] = [
    { hob: "writing", isCorrect: false },
    { hob: "reading", isCorrect: false },
    { hob: "playing", isCorrect: false },
  ]

  isValidMobile: boolean = false

  AddEmployeeForm!: FormGroup
  constructor(private _fetchService: FetchService, private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.AddEmployeeForm = this._fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      hobby: this._fb.array(this.hobbiesArray.map(contact => this.createHobby(contact)), Validators.required),
      communication: ['', Validators.min(1)]
    })
    this.getLocalstorageData()
    this.getCountryData()
    console.log(this.isValidMobile);

  }


  quantities(): FormArray {
    return this.AddEmployeeForm.get("hobby") as FormArray
  }
  createHobby(h: any): FormGroup {
    return this._fb.group({
      hob: [h.hob],
      isCorrect: [h.isCorrect],
    })
  }

  getCountryData() {
    this._fetchService.getCountryData().subscribe((data: any) => {
      this.countryArray = data.map((value: any) => {
        return {
          name: value.country_name
        }
      })
      //console.log(this.countryArray);
    })
  }

  get m() {
    return this.AddEmployeeForm.get('mobile');
  }

  get e() {
    return this.AddEmployeeForm.get('email');
  }
  selectCountry(e: any) {
    if (this.countryArray) {
      this._fetchService.getStateData(e.target.value).subscribe((data: any) => {
        this.stateArray = data.map((value: any) => {
          return {
            name: value.state_name
          }
        })
      })
    }
  }

  getLocalstorageData() {
    this.employeeListArray = []
    this.employeeListArray = JSON.parse(localStorage.getItem('emp') || "[]");
    console.log(this.employeeListArray);
  }

  onSubmit() {
    //console.log(this.AddEmployeeForm.value);
    this.employeeListArray.push(this.AddEmployeeForm.value)
    localStorage.setItem('emp', JSON.stringify(this.employeeListArray))
    this._router.navigate(['/employee'])
  }
}
