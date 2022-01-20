export interface Question{
    
    questionID: number;
    text: string;
    totalResponses: number; 
    isMultipleChoice: boolean;
    surveyID: number
    answers: Answer[];

}

export interface QuestionsForAnswering{

    questionID: number;
    text: string;
    totalResponses: number; 
    isMultipleChoice: boolean;
    surveyID: number
    answers: Answer[];
    isValid: boolean;
    errorMessage: string;

}

export interface Answer {
    // id: string
    answerID: number;
    // optionNumber: number;
    text: string;
    countResponses: number;
    percentage: number;
    questionID: number;    
}

export interface Survey {
    name: string;
    surveyID: number;
    totalResponses: number;
    questions: QuestionsForAnswering[];
}