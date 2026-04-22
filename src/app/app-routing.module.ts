import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CalculateComponent } from './calculate/calculate.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurBranchesComponent } from './our-branches/our-branches.component';
import {AntiMoneyLunduringComponent} from './legals/anti-money-lunduring/anti-money-lunduring.component'
import {ComplaintComponent} from './legals/complaint/complaint.component';
import {ConsumerProtectionComponent}from './legals/consumer-protection/consumer-protection.component';
import{PrivacyPolicyComponent }from './legals/privacy-policy/privacy-policy.component';
import {TermsComponent} from './legals/terms/terms.component';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {ReceiversComponent} from './receivers/receivers.component'
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {DashboardBranchesComponent}from './dashboard-branches/dashboard-branches.component'
import { HelpComponent } from './help/help.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';
import { TodayRateComponent } from './today-rate/today-rate.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { SuccessTransactionComponent } from './success-transaction/success-transaction.component';
import { FailedTransactionComponent } from './failed-transaction/failed-transaction.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'calculate', component: CalculateComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'branches', component: OurBranchesComponent },
  { path: 'antiMoney', component: AntiMoneyLunduringComponent },
  { path: 'complaintPolicy', component: ComplaintComponent },
  { path: 'consumerProtection', component: ConsumerProtectionComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-use', component: TermsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registeration', component: RegistrationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'calculator', component:  CalculateComponent},
  { path: 'success-transaction', component:  SuccessTransactionComponent},
  { path: 'fail-transaction', component:  FailedTransactionComponent},
  { path: 'dashboard' , component:  DashboardComponent ,canActivate: [AuthGuard] 
  },
      { path: 'dashboard/send-money', component:  SendMoneyComponent ,canActivate: [AuthGuard]  },
      { path: 'dashboard/today-rate', component:  TodayRateComponent ,canActivate: [AuthGuard] },
      { path: 'dashboard/inbox', component:  InboxComponent ,canActivate: [AuthGuard] },
      { path: 'dashboard/profile', component:  ProfileComponent ,canActivate: [AuthGuard] },
      { path: 'dashboard/upload-documents', component:  UploadDocumentsComponent, canActivate: [AuthGuard] },
      { path: 'dashboard/add-receiver', component:  AddReceiverComponent,canActivate: [AuthGuard] },
      { path: 'dashboard/help', component: HelpComponent},
      { path: 'dashboard/delivary-address', component: DeliveryAddressComponent,canActivate: [AuthGuard]},
      { path: 'dashboard/branches', component: DashboardBranchesComponent,canActivate: [AuthGuard]},
      { path: 'dashboard/transactions', component: TransactionsComponent ,canActivate: [AuthGuard]},
      { path: 'dashboard/receivers', component: ReceiversComponent, canActivate: [AuthGuard]},
      {
        path: '**',
        redirectTo: 'dashboard'
      }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
