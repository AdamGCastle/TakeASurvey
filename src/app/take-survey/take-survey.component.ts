import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponsesService } from 'src/app/responses.service';
import { Question, Answer, Survey } from 'src/app/models';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TakeSurveyComponent implements OnInit {

  private serviceObvsSubscription: Subscription;

  sub: Subscription;

  constructor(private responsesService: ResponsesService,
              private route: ActivatedRoute,
               private cd: ChangeDetectorRef) {
  }

  // survey1: Survey = {
  //   "surveyID": 13,
  //   "name": "Farm Animals",
  //   "totalResponses": 0,
  //   "questions": [
  //     {
  //       "questionID": 29,
  //       "surveyID": 13,
  //       "text": "What is your favourite farm animal?",
  //       "isMultipleChoice": false,
  //       "totalResponses": 0,
  //       "answers": [
  //         {
  //           "answerID": 89,
  //           "text": "Cow",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 29
  //         },
  //         {
  //           "answerID": 90,
  //           "text": "Horse",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 29
  //         },
  //         {
  //           "answerID": 91,
  //           "text": "Pig",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 29
  //         },
  //         {
  //           "answerID": 92,
  //           "text": "Sheep",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 29
  //         }
  //       ]
  //     },
  //     {
  //       "questionID": 30,
  //       "surveyID": 13,
  //       "text": "Which of these animals don't you like?",
  //       "isMultipleChoice": true,
  //       "totalResponses": 0,
  //       "answers": [
  //         {
  //           "answerID": 93,
  //           "text": "Cow",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         },
  //         {
  //           "answerID": 94,
  //           "text": "Horse",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         },
  //         {
  //           "answerID": 95,
  //           "text": "Duck",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         },
  //         {
  //           "answerID": 96,
  //           "text": "Chicken",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         },
  //         {
  //           "answerID": 97,
  //           "text": "Pig",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         },
  //         {
  //           "answerID": 98,
  //           "text": "Goat",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 30
  //         }
  //       ]
  //     },
  //     {
  //       "questionID": 31,
  //       "surveyID": 13,
  //       "text": "How many times in the last year have you visited a farm?",
  //       "isMultipleChoice": false,
  //       "totalResponses": 0,
  //       "answers": [
  //         {
  //           "answerID": 99,
  //           "text": "Thre times or more",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 31
  //         },
  //         {
  //           "answerID": 100,
  //           "text": "Twice",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 31
  //         },
  //         {
  //           "answerID": 101,
  //           "text": "Once",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 31
  //         },
  //         {
  //           "answerID": 102,
  //           "text": "Not at all",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 31
  //         }
  //       ]
  //     },
  //     {
  //       "questionID": 32,
  //       "surveyID": 13,
  //       "text": "If you visited a farm, which of these activities would you do, if there was an option?",
  //       "isMultipleChoice": true,
  //       "totalResponses": 0,
  //       "answers": [
  //         {
  //           "answerID": 103,
  //           "text": "None of these activities appeals",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 104,
  //           "text": "Shearing Sheep",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 105,
  //           "text": "Herding Sheep",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 106,
  //           "text": "Birthing a lamb",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 107,
  //           "text": "Milking a cow",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 108,
  //           "text": "Petting Animals",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         },
  //         {
  //           "answerID": 109,
  //           "text": "Goats' cheese tasting",
  //           "countResponses": 0,
  //           "percentage": 0,
  //           "questionID": 32
  //         }
  //       ]
  //     }
  //   ]
  // }

  survey: Survey;

  questions: any[] = [];
  responseList: Answer[];
  questionnaireForm: FormGroup;
  formSubmitted: boolean = false;
  isLoading: boolean = false;
  // responseList$: Observable<Answer[]>;
  // questions$: Observable<Question[]>;
  formstate: any[] = [];
  formValid: boolean = false;
  totalResponses;


  ngOnInit() {

    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    // console.log(this.survey.questions.length);
    this.responsesService.getSurvey$(id)
      .subscribe(data => {
        this.survey = data;
        this.survey.questions = this.survey.questions.map(d => {
              //ADD EXTRA FRONT-END SPECIFIC DATA TO QUESTION OBJECT
              return {
                ...d,
                isValid: false,
                isTouched: false,
                errorMessage: ''                
              }
            });
        console.log(this.survey);          
        this.cd.markForCheck();            
      });      

    
    

    this.isLoading = false; 
  }

  reset() {
    location.reload()
  }

  logResponse(event, question, answer) {

    console.log(event.target.checked, question, answer);
    //GET THE QUESTION OBJECT IN THE ARRAY   
    const questionInState = this.formstate.find(q => q.questionID === question.questionID);
    if (questionInState) {
      console.log(`question in formstate already`);

      if (question.isMultipleChoice) {
        if (event.target.checked === true && questionInState.answers.some(a => a.id === answer.answerID) === false) { //  ADD ITEM TO FORMSTATE IF IT'S BEEN CHECKED (AND NOT ALREADY SELECTED SOMEHOW)     
          {
            questionInState.answers.push(answer);
            const indexToSplice = this.formstate.findIndex(q => q.questionID === question.questionID);
            this.formstate.splice(indexToSplice, 1, questionInState);
          }

        } else {  //TAKE ANSWER OUT OF FORMSTATE IF IT'S JUST BEEN UNCHECKED         

          let indexToSplice = questionInState.answers.findIndex(a => a.answerID === answer.answerID);
          questionInState.answers.splice(indexToSplice, 1);
          indexToSplice = this.formstate.findIndex(q => q.questionID === question.questionID);
          if (questionInState.answers.length > 0) {
            this.formstate.splice(indexToSplice, 1, questionInState);
          } else {
            this.formstate.splice(indexToSplice, 1);

          }
        }

      } else {
        questionInState.answers = [answer];
      }
    } else {  //IF THIS IS THE FIRST TIME THEY'RE ANSWERING THE QUESTION, JUST ADD THE RESPONSE TO THE FORMSTATE AND SAY IT'S VALID.

      this.formstate.push({ questionID: question.questionID, text: question.text, answers: [answer], isValid: true });
    }
    // console.log(` Here's the new formstate: `,this.formstate)
    this.validateForm(question);
  }

  validateForm(question) {

    if (!question) { return };
    const questionInState = this.formstate.find(q => q.questionID === question.questionID);
    if (questionInState) {

      // console.log(`This question has just been entered into the formstate, so it's now valid. About to set it as valid...`)
      question.isValid = true;
      const indexToSplice = this.questions.findIndex(q => q.questionID === question.questionID);
      question.errorMessage = "";
      this.questions.splice(indexToSplice, 1, question)

    } else {
      // console.log(`This question has just been taken out of the formstate, so it's not valid. About to set it as invalid...`)
      question.isTouched = true;
      question.isValid = false;
      const indexToSplice = this.questions.findIndex(q => q.questionID === question.questionID);
      question.errorMessage = "Please select at least one answer"
      this.questions.splice(indexToSplice, 1, question)

    }

    let allAnswered: boolean = this.questions.every(q => q.isValid > 0);
    if (allAnswered) { this.formValid = true; }

    this.cd.markForCheck();
  }


  submitForm() {

    console.log('submit')
    console.log(this.formstate);
    //INFORM USER OF HOW MANY QUESTIONS STILL LEFT TO ANSWER
    const answeredQuestionids = this.formstate.map(q => q.questionID);
    const unansweredQuestions = this.questions.filter(question => answeredQuestionids.indexOf(question.questionID) === -1);
    if (unansweredQuestions.length > 0) {
      alert(`There are ${unansweredQuestions.length} unanswered question(s)`);
    } else {
      //CHECK EACH QUESTION IS ANSWERED
      let questionsHaveAnswers: boolean = this.formstate.every(q => q.answers.length > 0);

      if (!questionsHaveAnswers) {
        alert('Please answer all questions')
      } else {
        //GET DATA INTO STRING ARRAY

        let answers = this.formstate.map(q => q.answers);
        let answers2 = [].concat.apply([], answers);
        let answerIDs = answers2.map(a => a.answerID);

        console.log(answerIDs);
        var merged = [].concat.apply([], answerIDs);
        let newResponses = merged.map(e => e.toString());

        //SEND PUT REQUEST TO BACKEND    

        console.log(`These are the responses that will be sent to the api:  ${newResponses}`);
        this.responsesService.put(newResponses).subscribe(data => { console.log(data) });

        // CALCULATE PERCENTAGES AGAIN 

        //THIS LOGIC IS WRONG, RAN OUT OF TIME. GOING TO HAVE TO MAKE DO WITH THE UN-UPDATED PERCENTAGES FOR NOW.

        // let total = 0;
        // merged.forEach(response => {
        //   //FIND ANSWER AND CORRESPONDING QUESTION(which contains the total number of times the question has been answered)
        //   let answerToIncrement = this.responseList.find(i => i.AnswerID === response);        
        //   let correspondingQuestion = this.questions.find(q => q.QuestionID === answerToIncrement.QuestionID);        
        //   //CALCULATE PRECENTAGES WITH NEW DATA        
        //   total = correspondingQuestion.TotalResponses + 1;        
        //   answerToIncrement.CountResponses++;

        //   let ratio = answerToIncrement.CountResponses / total;
        //   let percent = Math.round(ratio * 100);  
        //   console.log(`${answerToIncrement.CountResponses} is ${percent} of ${total}`)
        //   answerToIncrement.Percentage = percent;  
        //   //UPDATE ANSWERS IN RESPONSE ARRAY
        //   const indexToSplice = this.responseList.findIndex(r => r.AnswerID === answerToIncrement.AnswerID);      
        //   this.responseList.splice(indexToSplice, 1 , answerToIncrement) 
        //  })

        //SWITCH VIEW TO HIDE FORM INPUTS AND REVEAL RESPONSE PERCENTAGES
        this.totalResponses++;
        this.formSubmitted = true;
        console.log(this.responseList);
      }
    }
  }


}
