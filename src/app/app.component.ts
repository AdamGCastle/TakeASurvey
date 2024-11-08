import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponsesService } from './surveys.service';
import { Survey } from './models';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit {

  private serviceObvsSubscription: Subscription;
  constructor(private responsesService: ResponsesService, private cd: ChangeDetectorRef) {
  }


  questionnaireForm: FormGroup;
  formSubmitted: boolean = false;
  // responseList$: Observable<Answer[]>;
  // questions$: Observable<Question[]>;

  totalResponses;

  ngOnInit() {






    //   //POPULATE questions.answers
    //   this.questions.forEach(question => {
    //     question.answers = this.responseList.filter(r => r.questionID === question.QuestionID);
    //     if (this.questions.length > 0) {
    //       this.totalResponses = this.questions[0].TotalResponses;
    //     }
    //   })
    //   console.log(`App started! Total responses: ${this.totalResponses}`);
    //   console.log(this.questions)
    //   this.cd.markForCheck();
    // });
  }

  reset() {
    location.reload()  }


}
