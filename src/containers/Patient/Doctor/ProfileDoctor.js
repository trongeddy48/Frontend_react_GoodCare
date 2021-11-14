import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
           dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if(id){
            let res = await getProfileDoctorById(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            
        }
        if(this.props.doctorId !== prevProps.doctorId){
            // this.getInfoDoctor(this.props.doctorId);
        }
    }

    
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVI = '', nameEn = '';
        if(dataProfile && dataProfile.positionData){
            nameVI = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left" 
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className="content-right">
                         <div className="up">
                            {language === LANGUAGES.VI ? nameVI : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                && <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="price">
                    Giá khám:
                        { dataProfile && dataProfile.Doctor_Info && language === LANGUAGES .VI &&
                            <NumberFormat 
                                className="currency"
                                value={dataProfile.Doctor_Info.priceTypeData.valueVi} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'VNĐ'} 
                            />
                        }

                        { dataProfile && dataProfile.Doctor_Info && language === LANGUAGES .EN &&
                            <NumberFormat 
                                className="currency"
                                value={dataProfile.Doctor_Info.priceTypeData.valueEn} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'USD'} 
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
