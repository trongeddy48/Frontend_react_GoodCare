import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try{
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user);
                alert('Đăng nhập thành công !');
                console.log('login success')
            }
        }catch(error) {
            if(error.response) {
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            alert('Đăng nhập thất bại !');
            console.log('anhdaden', error.response)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleEnterKey = (event) => {
        if(event.keyCode === 13){
            this.handleLogin();
        }
    }
    
    render() {
        return (
            <div className ="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Đăng nhập Quản trị GoodCare</div>
                        <div className="col-12 form-group login-input">
                            <label>Tên đăng nhập:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nhập tên đăng nhập..." 
                                value={this.state.username} 
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu:</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className="form-control" 
                                    placeholder="Nhập mật khẩu..." 
                                    onChange={(event) => {this.handleOnChangePassword(event)}}
                                    onKeyDown={(event) => this.handleEnterKey(event)}
                                />
                                <span
                                    onClick={() => {this.handleShowHidePassword()}}
                                ><i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                                
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => {this.handleLogin()}}>Đăng nhập</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Bạn đã quên mật khẩu ?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Hoặc bạn có thể đăng nhập với:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
