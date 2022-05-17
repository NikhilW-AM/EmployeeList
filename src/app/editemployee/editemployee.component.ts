import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '../countries';
import { employeeInter } from '../employeeInter';
import { FetchService } from '../fetch.service';
import { hobby } from '../hobby';
import { states } from '../states';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

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

  Id: string | null = ''
  employeeObj?: employeeInter
  employeeListArray: employeeInter[] = []
  countryArray: countries[] = []
  stateArray: any[] = []
  hobbiesArray: hobby[] = [
    { hob: "writing", isCorrect: false },
    { hob: "reading", isCorrect: false },
    { hob: "playing", isCorrect: false },
  ]

  AddEmployeeForm!: FormGroup
  constructor(private _fetchService: FetchService, private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.AddEmployeeForm = this._fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      hobby: this._fb.array(this.hobbiesArray.map(contact => this.createHobby(contact)), [Validators.required]),
      communication: ['', Validators.min(1)]
    })
    this.getLocalstorageData()
    this.getCountryData()

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

  getLocalstorageData() {
    this.employeeListArray = []
    this.employeeListArray = JSON.parse(localStorage.getItem('emp') || "[]");
    this.getRoutePara()
    //console.log(this.employeeListArray);
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

  getRoutePara() {
    this.Id = this._route.snapshot.paramMap.get('id')
    if (this.Id) {
      this.employeeObj = this.employeeListArray[parseInt(this.Id) - 1]
      this.hobbiesArray = this.employeeObj?.hobby
      this._fetchService.getStateData(this.employeeObj.country).subscribe((state: any) => {
        this.stateArray = state.map((value: any) => {
          return {
            name: value.state_name
          }
        })

      })
      this.setFormData()
    }

    console.log(this.employeeObj?.hobby);
  }

  setFormData() {
    this.AddEmployeeForm.get("name")?.setValue(this.employeeObj?.name);
    this.AddEmployeeForm.get("date")?.setValue(this.employeeObj?.date);
    this.AddEmployeeForm.get("mobile")?.setValue(this.employeeObj?.mobile);
    this.AddEmployeeForm.get("email")?.setValue(this.employeeObj?.email);
    this.AddEmployeeForm.get("password")?.setValue(this.employeeObj?.password);
    this.AddEmployeeForm.get("address")?.setValue(this.employeeObj?.address);
    this.AddEmployeeForm.get("country")?.setValue(this.employeeObj?.country);
    this.AddEmployeeForm.get("state")?.setValue(this.employeeObj?.state);
    this.AddEmployeeForm.get("gender")?.setValue(this.employeeObj?.gender);
    //this.AddEmployeeForm.get("hobby")?.setValue(this.employeeObj?.hobby);
    this.AddEmployeeForm.get("communication")?.setValue(this.employeeObj?.communication);

    if (this.employeeObj)
      for (let i = 0; i < this.employeeObj?.hobby.length; i++) {
        ((this.AddEmployeeForm.controls['hobby'] as FormArray).at(i) as FormGroup).get('isCorrect')?.setValue(this.hobbiesArray[i].isCorrect)
      }

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

  onSubmit() {
    //console.log(this.AddEmployeeForm.value);
    if (this.Id)
      this.employeeListArray[parseInt(this.Id) - 1] = this.AddEmployeeForm.value
    localStorage.setItem('emp', JSON.stringify(this.employeeListArray))
    this._router.navigate(['/employee'])
  }
}
