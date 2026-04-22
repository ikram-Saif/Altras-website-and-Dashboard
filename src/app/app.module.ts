import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms'
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurBranchesComponent } from './our-branches/our-branches.component';
import { HeaderComponent } from './header/header.component';
import { CalculateComponent } from './calculate/calculate.component';
import { AntiMoneyLunduringComponent } from './legals/anti-money-lunduring/anti-money-lunduring.component';
import { ComplaintComponent } from './legals/complaint/complaint.component';
import { ConsumerProtectionComponent } from './legals/consumer-protection/consumer-protection.component';
import { PrivacyPolicyComponent } from './legals/privacy-policy/privacy-policy.component';
import { TermsComponent } from './legals/terms/terms.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CountryListComponent } from './country-list/country-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavAndSidebarDashboardComponent } from './nav-and-sidebar-dashboard/nav-and-sidebar-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { StatusPopupComponent } from './status-popup/status-popup.component';
import { TransactionDetailsPopupComponent } from './transaction-details-popup/transaction-details-popup.component';
import { ReciverDetailsPopupComponent } from './reciver-details-popup/reciver-details-popup.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { ReceiversComponent } from './receivers/receivers.component';
import { EditReciverDetailsPopupComponent } from './edit-reciver-details-popup/edit-reciver-details-popup.component';
import { GlobalServiceComponent } from './global-service/global-service.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DeleteReceiverComponent } from './delete-receiver/delete-receiver.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlretsPopupComponent } from './alrets-popup/alrets-popup.component';
import { AlertNotificationComponent } from './alert-notification/alert-notification.component';
import { DashboardBranchesComponent } from './dashboard-branches/dashboard-branches.component';
import { AgmCoreModule } from '@agm/core';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { HelpComponent } from './help/help.component';
import { DisplayHelpVideoComponent } from './display-help-video/display-help-video.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfilePopupComponent } from './edit-profile-popup/edit-profile-popup.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { TodayRateComponent } from './today-rate/today-rate.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { SuccessTransactionComponent } from './success-transaction/success-transaction.component';
import { FailedTransactionComponent } from './failed-transaction/failed-transaction.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { AuthGuard } from './auth.guard';
// import { CheckHttpResponseInterceptor } from './services/check-http-response.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    OurBranchesComponent,
    HeaderComponent,
    CalculateComponent,
    AntiMoneyLunduringComponent,
    ComplaintComponent,
    ConsumerProtectionComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    CountryListComponent,
    DashboardComponent,
    HeaderTopComponent,
    SidebarComponent,
    NavAndSidebarDashboardComponent,
    TransactionsComponent,
    StatusPopupComponent,
    TransactionDetailsPopupComponent,
    ReciverDetailsPopupComponent,
    LiveChatComponent,
    ReceiversComponent,
    EditReciverDetailsPopupComponent,
    GlobalServiceComponent,
    AddReceiverComponent,
    DeleteReceiverComponent,
    ResetPasswordComponent,
    AlretsPopupComponent,
    AlertNotificationComponent,
    DashboardBranchesComponent,
    DeliveryAddressComponent,
    HelpComponent,
    DisplayHelpVideoComponent,
    UploadDocumentsComponent,
    InboxComponent,
    ProfileComponent,
    EditProfilePopupComponent,
    TodayRateComponent,
    SendMoneyComponent,
    SuccessTransactionComponent,
    FailedTransactionComponent,
    MyLoaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_oEO4aZDR18kW7pazArqs70bFolcAKP0'
    })

  
  ],
  providers: [AuthGuard , 
  // {
  //   provide: HTTP_INTERCEPTORS ,
  //   useClass: CheckHttpResponseInterceptor ,
  //   multi:true
  // }
] ,
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  
  constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
 }
