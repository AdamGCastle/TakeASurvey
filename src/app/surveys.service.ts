import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Survey, Question, MultipleChoiceOption, SurveyResponse } from './models';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ResponsesService {

  constructor(private httpClient: HttpClient) { }

  public bothreceived : boolean = false;
  public questionsreceived : boolean = false;
  public answersreceived : boolean = false;

  getSurveys$(): Observable<Survey[]>{
    return this.httpClient
      .get(`${environment.webApiUrl}/Surveys/ReadAll`)
      .pipe(
        map((data: { [key: number]: Survey }) => {
          const surveys: Survey[] = [];
          for (const key in data) {
            if(!data.hasOwnProperty(key)){
               continue;
            }

            surveys.push({...data[key]});
          }

          return surveys;
        }),

        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
  }

  // getSurvey$(id: string):Observable<Survey>{
  //   return this.httpClient.get<Survey>(`${environment.webApiUrl}/Surveys/ReadById?id=${id}`);
  // }

  getSurvey$(id: string): Observable<Survey> {
    return this.httpClient
      .get<Survey>(`${environment.webApiUrl}/Surveys/ReadById?id=${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching survey:', error.error);
          return throwError(() => new Error(error.error));
        })
      );
  }

  submitSurvey(surveyResponse: SurveyResponse){
    console.log('surveyResponse to submit: ', surveyResponse);

    return this.httpClient
      .put<Survey>(`${environment.webApiUrl}/Surveys/SubmitSurveyResponse`, surveyResponse)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error submitting survey:', error.error);
          return throwError(() => new Error(error.error));
        })
      );
  }

  public surveyList: Survey[];

  public questionList: Question[];

  public responseList: MultipleChoiceOption[];

}
