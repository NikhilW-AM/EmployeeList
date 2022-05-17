import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employeeInter } from '../employeeInter';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  constructor(private _router: Router) { }

  employeeArray: employeeInter[] = []
  ngOnInit(): void {
    this.employeeArray = JSON.parse(localStorage.getItem('emp') || "[]")
    console.log(this.employeeArray);

  }

  onSelect(i: number) {
    this._router.navigate(['employee/add', i])
  }

  onDelete(i: number) {
    this.employeeArray.splice(i, 1)
    localStorage.setItem('emp', JSON.stringify(this.employeeArray))
  }
}
