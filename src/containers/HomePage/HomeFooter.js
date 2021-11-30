import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from '../../assets/logogc-ft.png';

class HomeFooter extends Component {

    render() {
        return (
            <footer>
                <div className="left-content">
                    <div className="logo-footer">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="text-logo">
                        <p>asdasd</p>
                    </div>
                </div>
                <div className="center-content">
                    Chao2 em
                </div>
                <div className="right-content">
                    Chao2 em
                </div>
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
