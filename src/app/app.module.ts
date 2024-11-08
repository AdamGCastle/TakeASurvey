import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'takesurvey/:id', component: TakeSurveyComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    TakeSurveyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
