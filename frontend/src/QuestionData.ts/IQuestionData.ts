﻿import { AnswerData } from "./IAnswerData";

export interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    Answers: AnswerData[];
}

const questions: QuestionData[] = [
    {
        questionId: 1,
        title: 'Why should I learn TypeScript?',
        content:
            'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
        userName: 'Bob',
        created: new Date(),
        Answers: [
            {
                answerId: 1,
                content: 'To catch problems earlier speeding up your developments',
                userName: 'Jane',
                created: new Date(),
            },
            {
                answerId: 2,
                content:
                    'So, that you can use the JavaScript features of tomorrow,today',
                userName: 'Fred',
                created: new Date(),
            },
        ],
    },
    {
        questionId: 2,
        title: 'Which state management tool should I use?',
        content:
            'There seem to be a fair few state management tools around for React - React, Unstated, ...Which one should I use?',
        userName: 'Bob',
        created: new Date(),
        Answers: [],
    },
];

export const getUnansweredQuestions = (): QuestionData[] => {
    return questions.filter(q => q.Answers.length === 0);
};