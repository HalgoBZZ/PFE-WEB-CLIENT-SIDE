import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlanificationComponent } from './planification/planification.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ReleveurListComponent } from './releveur-list/releveur-list.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';
import { TourneeAvaliderComponent } from './tournee-avalider/tournee-avalider.component';
import { TourneeNonEffectueeComponent } from './tournee-non-effectuee/tournee-non-effectuee.component';
import { PlanningComponent } from './planning/planning.component';
import { MapsComponent } from './maps/maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { PassforgetComponent } from './passforget/passforget.component';
import { CodeverificationComponent } from './codeverification/codeverification.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { PdlComponent } from './pdl/pdl.component';
import { ReleveComponent } from './releve/releve.component';
import { MesuresComponent } from './mesures/mesures.component';


const appRoutes :Routes=[
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'forget', component: PassforgetComponent},
    { path: 'code', component: CodeverificationComponent},
    { path: 'changepwd', component: ChangepasswordComponent},
    { path: 'home', component: HomeComponent, children:[
        { path : 'planifications', component : PlanificationComponent, outlet: 'child1' },
        { path : 'historique', component : HistoriqueComponent, outlet: 'child1' },
        { path : 'releveurs', component : ReleveurListComponent, outlet: 'child1' },
        { path : 'responsables', component : ResponsableListComponent, outlet: 'child1' },
        { path : 'tourneeavalider', component : TourneeAvaliderComponent, outlet: 'child1' },
        { path : 'tourneenoneffectuee', component : TourneeNonEffectueeComponent, outlet: 'child1' },
        { path : 'planning', component : PlanningComponent, outlet: 'child1' },
        { path : 'map', component : MapsComponent, outlet: 'child1' },
        { path : 'dashboard', component : DashboardComponent, outlet: 'child1' },
        { path : 'help', component: HelpComponent, outlet: 'child1' },
        { path : 'profile', component: ProfileComponent, outlet: 'child1' },
        { path : '**', component: NotFoundComponent, outlet: 'notfound' },
        { path : 'pdl', component: PdlComponent, outlet: 'child1'},
        { path : 'releve', component:ReleveComponent, outlet: 'child1'},
        { path : 'mesures', component:MesuresComponent, outlet: 'child1'}
    ]},
        
] ;
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);