export interface Survey {
  name: string;
  id: number;
  timesTaken: number;
  questions: Question[];
  responses: Response[];
  takerName: string;
}

export interface Question{

  id: number;
  text: string;
  responseText: string;
  totalResponses: number;
  isMultipleChoice: boolean;
  surveyID: number
  multipleChoiceOptions: MultipleChoiceOption[];
  responseValid: boolean
  validationMessage: string
  multipleAnswersPermitted: boolean;
}

export interface MultipleChoiceOption {
  id: number;
  text: string;
  selected: boolean
  countResponses: number;
  percentage: number;
  questionId: number;
  timesSelected
}

export interface SurveyResponse {
  surveyTakerName: string;
  surveyId: number;
  questionResponses: QuestionResponse[];
}

export interface QuestionResponse {
  text: string,
  multipleChoiceOptionResponses: MultipleChoiceOptionResponse[],
  questionId: number
}

export interface MultipleChoiceOptionResponse {
  multipleChoiceOptionId: number;
}
