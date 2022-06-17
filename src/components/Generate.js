import Amplify, { Storage } from 'aws-amplify';
import React, { Component, useEffect } from 'react';
import axios from "axios";
import { render } from 'react-dom';
import './genstyle.css';
import { ConsoleLogger } from '@aws-amplify/core';
const config = require('../config.json');
const $ = require('jquery');


class BusinessCard extends React.Component {
    state = {
        email: "",
        fullname: "",
        birthday: "",
        phone: "",
        job: "",
        employer: "",
        city: "",
        pfp: ""
    }

    async componentDidMount(){
        const response = await axios.get(`${config.api.invokeUrl}/users/${this.props.authObj.user.attributes.email}`);
        const pic = await Storage.get(`${this.props.authObj.user.attributes.email}.jpeg`, {level: 'public'});
        console.log(pic)
        this.setState({
            email : response.data.Item.email,
            fullname: response.data.Item.fullname,
            birthday : response.data.Item.birthday,
            phone : response.data.Item.phone_number,
            job : response.data.Item.job_title,
            employer : response.data.Item.employer,
            city: response.data.Item.city,
            pfp: pic //signed url
        })
    }

    render(){
        return(
            <div className = "container">
                <div className = "cardDiv">
                    <div className = "card">
                        <img src={this.state.pfp} alt="PFP" width="150" height="150"/>
                        <h1 className = "cardName">{this.state.fullname}</h1>
                        <h2 className = "cardJob">{this.state.job}</h2>
                        <p className = "cardEmail">{this.state.email}</p>
                        <p className = "cardPhoneNumber">{this.state.phone}</p>
                        <p className = "cardEmployer">{this.state.employer}</p>
                        <p className = "cardCity">{this.state.city}</p>
                        <p className = "cardBirthday">{this.state.birthday}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default BusinessCard