import React from 'react';
import './header.css';
import { MdHistory } from "react-icons/md";;

export default class Header extends React.Component {
    render() {
        return (
            <div class="header">
                {/* <a href="#default" class="name">CONVIN</a> */}
                <div class="header-left">
                    <a href="/education">Education</a>
                    <a href="/entertainment">Entertainment</a>
                    <a href="/sports">Sports</a>
                </div>
                <div class="header-right">
                    <a href="/history">History</a>
                </div>
            </div>
            )
        }
    }