import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
           isShowDetailInfo: false,
        }
    }

    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            
        }
        
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }
    
    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">Dia chi khám</div>
                    <div className="name-clinic">Phong kham chuyen khoa</div>
                    <div className="detail-address">207 pho hue</div>
                </div>
                <div className="content-down">
                    { isShowDetailInfo === false && 
                        <div className="short-info">
                            GIÁ KHÁM: 200.000 VND. 
                            <span onClick={() => this.showHideDetailInfo(true)}>
                                Xem chi tiết.
                            </span>
                        </div>
                    }
                    { isShowDetailInfo === true && 
                        <>
                            <div className="title-price">Giá khám</div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">Giá khám</span>
                                    <span className="right">250.000đ</span>
                                </div>
                                <div className="note">
                                    Được ưu tiên khám trước khi đặt qua GoodCare.
                                </div>
                            </div>
                            <div className="payment">
                                aaaaaaaaaaaaaaa
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    Ẩn bảng giá.
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
