import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';

const routes: Routes = [
  {path:'',redirectTo:'/employee',pathMatch:'full'},
  {path:'employee',component:EmployeelistComponent},
  {path:'employee/add',component:AddemployeeComponent},
  {path:'employee/add/:id',component:EditemployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
