import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatCardModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from 'angular-6-social-login';
import { NgxPayPalModule  } from 'ngx-paypal';
// import {FormControl, Validators} from '@angular/forms';




import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent} from './admin/admin.component';
import { NavigationComponent} from './navigation/navigation.component';
import { DialogLogin } from './navigation/dialog-login';
import { MastersComponent, DialogEditMaster, DialogDeleteMaster } from './admin/masters/masters.component';
import { ChoseMasterComponent } from './client/choosemaster/choosemaster.component';
import { ApiService } from './api.service';
import { CitiesComponent } from './admin/cities/cities.component';
import { ClientsComponent, IsAdmin, IsReg } from './admin/clients/clients.component';
import { NewOrderComponent } from './client/neworder.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { OrdersComponent, DialogEditOrder, IsPaid, IsCompleted } from './admin/orders/orders.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthInterceptorService } from './authInterceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './client/user-register/user-register.component';
import { UserAccountComponent } from './client/user-account/user-account.component';
import { OrderHistoryComponent } from './client/order-history/order-history.component';
import { UserAccountService } from './services/user-account.service';
import { DialogEditClientComponent } from './admin/clients/dialog.edit.client.component';
import { DialogDeleteClientComponent } from './admin/clients/dialog.delete.client.component';
import { ClientsService } from './services/clients.service';
import { CitiesService } from './services/cities.service';
import { DialogEditCityComponent } from './admin/cities/dialog.edit.city.component';
import { DialogDeleteCityComponent } from './admin/cities/dialog.delete.city.component';
// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [

        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('902455189500-mpc1v2qsioej6o17e2no0rc122vh40bh.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}

const routes: Routes = [
  { path: '', component: ClientComponent},
  { path: 'client', component: ClientComponent},
  { path: 'register/:id', component: UserRegisterComponent},
  { path: 'account', component: UserAccountComponent, canActivate: [AuthGuardService]},
  { path: 'history', component: OrderHistoryComponent, canActivate: [AuthGuardService]},
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'clients', pathMatch: 'full'},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'masters', component: MastersComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'orders', component: OrdersComponent}
    ]
  },
  { path: 'neworder', component: NewOrderComponent},
  { path: '**', redirectTo: 'client'}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    NewOrderComponent,
    AdminComponent,
    NavigationComponent,
    MastersComponent,
    ChoseMasterComponent,
    DialogLogin,
    DialogEditClientComponent,
    DialogEditMaster,
    DialogEditOrder,
    DialogDeleteCityComponent,
    DialogDeleteClientComponent,
    DialogDeleteMaster,
    CitiesComponent,
    ClientsComponent,
    ScheduleComponent,
    OrdersComponent,
    IsAdmin,
    IsReg,
    IsPaid,
    IsCompleted,
    UserRegisterComponent,
    UserAccountComponent,
    OrderHistoryComponent,
    DialogEditCityComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SocialLoginModule,
    NgxPayPalModule
  ],
  entryComponents: [NavigationComponent,
    DialogLogin,
    AdminComponent,
    DialogEditClientComponent,
    DialogEditCityComponent,
    DialogEditMaster,
    DialogEditOrder,
    DialogDeleteCityComponent,
    DialogDeleteClientComponent,
    DialogDeleteMaster],
  providers: [
    ApiService,
    UserAccountService,
    ClientsService,
    CitiesService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

