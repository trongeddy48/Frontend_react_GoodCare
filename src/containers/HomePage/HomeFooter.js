import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2021 GoodCare. More infomation ? Contact me now !!
                    <a target="blank" href="https://www.facebook.com/thanhtrong.nguyen.735"> &#8594; Click here &#8592;</a>
                </p>
                {/* <div className="footer-content-left">
                    <p>&copy; 2021 GoodCare. More infomation ? Contact me now !!
                        <a target="blank" href="https://www.facebook.com/thanhtrong.nguyen.735"> &#8594; Click here &#8592;</a>
                    </p>
                </div>
                <div className="footer-content-right">
                    <p>
                        <a target="blank" href="#"><i className="fab fa-facebook-square"></i></a>
                    </p>
                </div> */}
            </div>
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
