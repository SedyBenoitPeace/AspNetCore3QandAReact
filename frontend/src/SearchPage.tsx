import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestion, QuestionData } from './QuestionData/QuestionData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const SearchPage: FC<RouteComponentProps> = ({
    location,
}) => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('criteria') || '';
    useEffect(() => {
        const doSearch = async (criteria: string) => {
            const foundResult = await searchQuestion(criteria);
            setQuestions(foundResult);
        };
        doSearch(search);;
    }, [search]);
    return <Page title="Search Results">
        {
            search && (
                <p
                    css={css`
                    font-size: 16px;
                    font-style: italic;
                    margin-top: 0px;
                    `}
                >
                    for "{search}"
                </p>
            )
        }
        <QuestionList data={questions}></QuestionList>
    </Page>;
};