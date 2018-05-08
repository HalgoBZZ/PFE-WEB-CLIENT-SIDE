import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';
import { ReleveurListComponent } from './releveur-list/releveur-list.component';
import { TourneeNonEffectueeComponent } from './tournee-non-effectuee/tournee-non-effectuee.component';
import { TourneeAvaliderComponent } from './tournee-avalider/tournee-avalider.component';
import { PlanificationComponent } from './planification/planification.component';
import { HistoriqueComponent } from './historique/historique.component';
import { MapsComponent } from './maps/maps.component';
import { PlanningComponent } from './planning/planning.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { HttpModule } from '@angular/http';
import { ReleveurService } from './services/releveur.service';
import { PlanificationService } from './services/planification.service';
import { OperationService } from './services/operation.service';
import { ResponsableService } from './services/responsable.service';
import { TourneeService } from './services/tournee.service';
import { LoginService } from './services/login.service';
import { UploadImageService } from './services/upload-image.service';
import { LoaderService } from './services/loading.service';
import { HomeComponent } from './home/home.component';
import { PassforgetComponent } from './passforget/passforget.component';
import { CodeverificationComponent } from './codeverification/codeverification.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SecteurService } from './services/secteur.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    SideNavComponent,
    ResponsableListComponent,
    ReleveurListComponent,
    TourneeNonEffectueeComponent,
    TourneeAvaliderComponent,
    PlanificationComponent,
    HistoriqueComponent,
    MapsComponent,
    PlanningComponent,
    DashboardComponent,
    NotFoundComponent,
    ProfileComponent,
    HelpComponent,
    HomeComponent,
    PassforgetComponent,
    CodeverificationComponent,
    ChangepasswordComponent,
  ],
  entryComponents: [],

  imports: [
    NgbModule,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    routing
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
     // apiKey: 'AIzaSyBOogobsBag7Ubi30TO5g077ovV8S7dpCg'
     ],
  providers: [ReleveurService,
  PlanificationService,
  OperationService,
  ResponsableService,
  TourneeService,
  LoginService,
  UploadImageService,
  LoaderService,
  SecteurService
],
  bootstrap: [AppComponent]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));
