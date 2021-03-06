﻿import React, { useEffect, useState, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { QuestionData } from './QuestionData/QuestionData';
import { RouteComponentProps } from 'react-router-dom';
import { PageTitle } from './PageTitle'
import { Page } from './Page'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUnansweredQuestionsActionCreator, AppState } from './Store';

interface Props extends RouteComponentProps {
    getUnansweredQuestions: () => Promise<void>;
    questions: QuestionData[] | null;
    questionsLoading: boolean;
}

const HomePage: FC<Props> = ({
    history,
    questions,
    questionsLoading,
    getUnansweredQuestions }) => {
    useEffect(() => {
        if (questions === null) {
            getUnansweredQuestions();
        }
    }, [questions, getUnansweredQuestions]);

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

const mapStateToProps = (store: AppState) => {
    return {
        questions: store.questions.unanswered,
        questionsLoading: store.questions.loading
    };
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
) => {
    return {
        getUnansweredQuestions: () =>
            dispatch(getUnansweredQuestionsActionCreator()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);