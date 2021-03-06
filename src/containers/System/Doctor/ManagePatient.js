import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy, postSendCancelBooking } from '../../../services/userService';
import moment from 'moment';
import { reduce } from 'lodash';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import CancelBook from './CancelBook';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isOpenCancelModal: false,
            dataCancelModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        });
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    handleBtnDelete = (item) => {
        let dataDelete = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenCancelModal: true,
            dataCancelModal: dataDelete
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    closeCancelModal = () => {
        this.setState({
            isOpenCancelModal: false,
            dataCancelModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if(res && res.errCode === 0){
            this.setState({
                isShowLoading: false
            })
            toast.success('G???i ????n thu???c th??nh c??ng !');
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('G???i ????n thu???c th???t b???i !')
        }
    }

    sendCancelBook = async (dataChildModalCancel) => {
        let { dataCancelModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendCancelBooking({
            email: dataChildModalCancel.email,
            doctorId: dataCancelModal.doctorId,
            patientId: dataCancelModal.patientId,
            timeType: dataCancelModal.timeType,
            languge: this.props.language,
            patientName: dataCancelModal.patientName
        });
        if(res && res.errCode === 0){
            this.setState({
                isShowLoading: false
            })
            toast.success('H???y l???ch h???n th??nh c??ng !');
            this.closeCancelModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('H???y l???ch h???n th???t b???i !');
            console.log("Error send cancel booking: ", res);
        }
    }
    
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isOpenCancelModal, dataCancelModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text={'Vui l??ng ch??? gi??y l??t...'}
                >
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        QU???N L?? B???NH NH??N KH??M B???NH
                    </div>
                    <div className="manage-patient-body row">
                        <div className="col-5 form-group">
                            <label>Ch???n ng??y kh??m</label>
                            <DatePicker 
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <th>S??? Th??? T???</th>
                                    <th>Th???i gian</th>
                                    <th>H??? v?? T??n</th>
                                    <th>?????a ch???</th>
                                    <th>Gi???i t??nh</th>
                                    <th>Ch???c n??ng</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi 
                                        : 
                                        item.timeTypeDataPatient.valueEn
                                        let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi 
                                        :
                                        item.patientData.genderData.valueEn
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <button className="mp-btn-confirm"
                                                        onClick={() => this.handleBtnConfirm(item)}
                                                    >X??c nh???n</button>
                                                    <button className="mp-btn-delete"
                                                        onClick={() => this.handleBtnDelete(item)}
                                                    >H???y l???ch h???n n??y</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Kh??ng c?? l???ch kh??m c???n x??c nh???n ho??n th??nh !</td>
                                    </tr>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal 
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
                <CancelBook 
                    isOpenModal={isOpenCancelModal}
                    dataModal={dataCancelModal}
                    closeCancelModal={this.closeCancelModal}
                    sendCancelBook={this.sendCancelBook}
                />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
