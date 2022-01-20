import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResponsesService } from 'src/app/responses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeComponent implements OnInit {

  constructor(private responsesService: ResponsesService, private cd: ChangeDetectorRef) { }
  
  surveys: Survey[]; 

  ngOnInit(): void {

    this.responsesService.getSurveys$().subscribe(data => {
      this.surveys = data;
      this.cd.markForCheck();
      console.log(this.surveys)
    })

  }

}
