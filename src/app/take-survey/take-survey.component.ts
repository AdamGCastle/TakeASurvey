import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResponsesService } from 'src/app/surveys.service';
import { Question, QuestionResponse, Survey, SurveyResponse } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TakeSurveyComponent implements OnInit {
  sub: Subscription;

  constructor(private responsesService: ResponsesService,
              private router: Router,
              private route: ActivatedRoute,
               private cd: ChangeDetectorRef) {
  }

  survey: Survey;
  surveySubmitted: boolean;
  isLoading: boolean;
  showDbReactivationMessage: boolean;
  formValid: boolean;
  dataError: boolean;
  errorMessage: string;

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.handleDbSleepMode();
    this.responsesService.getSurvey$(id).subscribe({
      next: (data) => {
        this.survey = data;
        this.survey.questions = this.survey.questions.map(d => ({
          ...d,
          responseValid: false,
          validationMessage: '',
          multipleChoiceOptions: d.multipleChoiceOptions.map(o => ({
              ...o,
              selected: false
            }))
        }));

        this.dataError = false;
        this.isLoading = false;
        this.showDbReactivationMessage = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.log("Error fetching survey:", err);
        this.dataError = true;
        this.errorMessage = "Failed to load the survey. Please try again later.";
        this.isLoading = false;
        this.showDbReactivationMessage = false;
        this.cd.markForCheck();
      }
    });
  }

  reset() {
    location.reload();
  }

  logResponse(e: any, question: Question, chosenOptionId: number){

    if(!question.multipleAnswersPermitted) {

      this.survey.questions.forEach(q => {
        if (q.id == question.id){
          q.multipleChoiceOptions.forEach(o => {
            o.selected = o.id == chosenOptionId;
          });
        }
      });
    }

    this.validateQuestion(question);
    this.cd.markForCheck();
  }

  toggleSelection(option: any) {
    option.selected = !option.selected;
  }

  handleDbSleepMode() {
    setTimeout( () => {
      this.showDbReactivationMessage = this.isLoading;
      this.cd.markForCheck();
    }, 5000);
  }

  validateQuestion(question: Question) {

    if (!question) {
      return;
    };

    question.responseValid = question.isMultipleChoice ?
                                  question.multipleChoiceOptions.some(x => x.selected) :
                                  question.responseText.replace(' ', '') != '' && question.responseText != null;

    let instruction = question.isMultipleChoice ? 'select' : 'enter';
    question.validationMessage = question.responseValid ? '' : `Please ${instruction} a response.`;

    this.formValid = this.survey.questions.every(x => x.responseValid)
    this.cd.markForCheck();
  }

  submitSurvey() {
    let surveyResponse: SurveyResponse = {
      surveyTakerName: this.survey.takerName,
      surveyId: this.survey.id,
      questionResponses: this.survey.questions.map(x => ({
        text: x.responseText,
        questionId: x.id,
        multipleChoiceOptionResponses: x.multipleChoiceOptions.filter(y => y.selected).map(y => ({
          multipleChoiceOptionId: y.id
        }))
      }))
    }

    this.isLoading = true;

    this.responsesService.submitSurvey(surveyResponse).subscribe({
      next: (model) => {
        this.survey = model;
        this.survey.questions.forEach(question => {
          question.multipleChoiceOptions.forEach(option => {
            option.percentage = this.survey.timesTaken === 0 ? 0 : Math.round((option.timesSelected / this.survey.timesTaken) * 100 );
          });
        });

        this.surveySubmitted = true;
        this.isLoading = false;
        this.dataError = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.log("Error submitting survey:", err);
        this.dataError = true;
        this.errorMessage = "Failed to submit survey. Please try again later.";
        this.isLoading = false;
        this.surveySubmitted = true;
        this.cd.markForCheck();
      }
    })
  };

  onBackClick() {
    if (this.surveySubmitted && this.dataError) {
      this.surveySubmitted = false;
      this.dataError = false;
      this.cd.markForCheck();
    } else {
      this.router.navigate(['/']);
    }
  }
}
