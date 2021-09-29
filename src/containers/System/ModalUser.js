import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }
    
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true){
            //call api
            this.props.createNewUser(this.state);
        }
        
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modal-user-container'}
                size="lg"
            >
            <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
            <ModalBody>
                <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input 
                        type="text" 
                        onChange={(event)=> {this.handleOnChageInput(event, "email")}}
                        value={this.state.email}
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input 
                            type="password" 
                            onChange={(event)=> {this.handleOnChageInput(event, "password")}}
                            value={this.state.password}
                        />
                    </div>
                    <div className="input-container">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            onChange={(event)=> {this.handleOnChageInput(event, "firstName")}}
                            value={this.state.firstName}
                        />
                    </div>
                    <div className="input-container">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            onChange={(event)=> {this.handleOnChageInput(event, "lastName")}}
                            value={this.state.lastname}
                        />
                    </div>
                    <div className="input-container">
                        <label>Address</label>
                        <input 
                            type="text" 
                            onChange={(event)=> {this.handleOnChageInput(event, "address")}}
                            value={this.state.address}
                        />
                    </div>
                    <div className="input-container">
                        <label>Phone Number</label>
                        <input 
                            type="text" 
                            onChange={(event)=> {this.handleOnChageInput(event, "phonenumber")}}
                            value={this.state.phonenumber}
                        />
                    </div>
                </div>
            </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className="px-3" 
                    onClick={()=>{this.handleAddNewUser()}}
                    >Add new</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
      )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




