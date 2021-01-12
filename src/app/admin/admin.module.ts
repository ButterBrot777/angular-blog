import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [ // path is empty because it is not main RouterModule. Root is /admin/
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
})

export class AdminModule {}
