import React, { Component } from 'react';
import { Route } from 'react-router-dom';
var countries = [
    {
        "id": "1",
        "sortname": "AF",
        "name": "Afghanistan",
        "text": "Afghanistan",
        "timezone": 29,
        "currency": "2",
        "languageCode": "en",
        "currency_format": "en"
    },
    {
        "id": "2",
        "sortname": "AL",
        "name": "Albania",
        "text": "Albania",
        "timezone": 6,
        "currency": "3",
        "languageCode": "el",
        "currency_format": "el"
    },
    {
        "id": "3",
        "sortname": "DZ",
        "name": "Algeria",
        "text": "Algeria",
        "timezone": 6,
        "currency": "32",
        "languageCode": "en",
        "currency_format": "en"
    },
    {
        "id": "4",
        "sortname": "AS",
        "name": "American Samoa",
        "text": "American Samoa",
        "timezone": 95,
        "currency": "1",
        "languageCode": "en",
        "currency_format": "en"
    }];
var studentList = [
    {
        studentId: 1,
        images: [],
        fName: 'Rajat',
        lName: 'Srivastava',
        fatherName: 'Kamal',
        email: 'ak@gmail.com',
        address: '41/2 Nehru Nagar',
        mobile: '9126023200',
        gender: 'Male',
        dob: '1995-08-22',
        countryId: '3',
    }
]

export const PrivateRoute = ({
    layout: Layout,
    component: Component,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                <Layout>
                    <Component {...props} studentList={studentList} countries={countries} createUserSucess={(message, data) => {
                        createUserSucess(message, data);
                    }} />
                </Layout>}
        />
    );
export const createUserSucess = (message, data) => {
    studentList.push(data);
}

