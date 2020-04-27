import React, { useEffect, useState, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionData/QuestionData';
import { RouteComponentProps } from 'react-router-dom';
import { PageTitle } from './PageTitle'
import { Page } from './Page'

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            const unasweredQuestions = await getUnansweredQuestions();
            setQuestions(unasweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnansweredQuestions();
    }, []);

    const handleQuestionClick = () => {
        history.push('/ask');
    };

    return (
        <Page>
            <div css={css`
            margin: 50px auto 20px auto;
            padding: 30px 20px;
            max-width: 600px;
            `}>
                <div css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                `}>
                    <PageTitle>Unanswered Questions</PageTitle>
                    <PrimaryButton onClick={handleQuestionClick}>Ask a question</PrimaryButton>
                </div>
                {questionsLoading ? (
                    <div
                        css={css`
                    font-size: 16px;
                    font-style: italic;
                    `}
                    >
                        Loading...
                    </div>
                ) : (
                        <QuestionList data={questions || []}></QuestionList>
                    )}
            </div>
        </Page>
    );
}