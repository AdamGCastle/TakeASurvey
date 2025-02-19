import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResponsesService } from 'src/app/surveys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  constructor(private responsesService: ResponsesService, private cd: ChangeDetectorRef) { }

  surveys: Survey[];
  isLoading: boolean;
  dataError: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.isLoading = true;
    this.responsesService.getSurveys$().subscribe({
      next: (data) => {
        this.surveys = data;
        if(this.surveys != null){
          this.isLoading = false;
        }

        this.cd.markForCheck();
    },
    error: (err) => {
      console.log("Error fetching surveys:", err);
      this.dataError = true;
      this.errorMessage = "Failed to load surveys. Please try again later.";
      this.isLoading = false;
      this.cd.markForCheck();
    }
  })
  }
}
