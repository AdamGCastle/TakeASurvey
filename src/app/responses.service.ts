import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Survey, Question, Answer } from './models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ResponsesService {
 
  constructor(private httpClient: HttpClient) { }
//POPULATES RESPONSELIST PROPERTY WITH ANSWER DATA FROM DATABASE
  public bothreceived : boolean = false;
  public questionsreceived : boolean = false;
  public answersreceived : boolean = false;

  getSurveys$(){
    return this.httpClient.get<{}>('https://localhost:44322/api/Surveys')
                  .pipe(
                    map((data: { [key: number]: Survey }) => {
                    const dataArray: Survey[] = [];
                    for (const key in data) {
                      if(data.hasOwnProperty(key)){
                      dataArray.push({...data[key]}); }} 

                    return dataArray; }))

  }

  getSurvey$(id: string):Observable<Survey>{
    return this.httpClient.get<Survey>(`https://localhost:44322/api/Surveys/${id}`)    

  }

  getQuestions$(){
    return this.httpClient.get<{}>('https://localhost:44322/api/questions')
                  .pipe(
                    map((data: { [key: number]: Question }) => {
                    const dataArray: Question[] = [];
                    for (const key in data) {
                      if(data.hasOwnProperty(key)){
                      dataArray.push({...data[key]}); }} 

                    return dataArray; }))
                  // .subscribe(data => { 
                  //   this.questionList = data; 
                  //   this.questionsreceived = true;
                  //   if(this.answersreceived === true) {this.bothreceived = true}
                  //   console.log(`Receieved questions`)
                  //   console.log(this.questionList);
                  //   }); 
  }
  getResponses$(){
    return this.httpClient.get<{}>('https://localhost:44322/api/answers')
                .pipe(
                  map((data: { [key: number]: Answer }) => {
                  const dataArray: Answer[] = [];
                  for (const key in data) {
                    if(data.hasOwnProperty(key)){
                    dataArray.push({...data[key]}); }}
                  return dataArray;}))
                    
                
  }

  put(responses){
    
    return this.httpClient.put('https://localhost:44322/api/surveys', responses);    
  }

  public surveyList: Survey[];
 
  public questionList: Question[]; 

  public responseList: Answer[];
  
}
