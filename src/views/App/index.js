import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix, Row, Col} from 'antd';
import 'antd/dist/antd.less'
import NavPath from '../../components/NavPath'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import {fetchProfile, logout} from '../../actions/user';
import Login from '../Login/index'
import './index.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        user: PropTypes.string,
        children: PropTypes.node.isRequired,
        isAuthenticated: React.PropTypes.bool,
        routing: PropTypes.object
    };
    componentWillMount() {
        const {actions, isAuthenticated,routing,user} = this.props;
        actions.fetchProfile();
        this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);
    }

    renderAuthenticatedPage(user) {
        return (
            <div className="ant-layout-aside">
                <Sidebar />
                <div className="ant-layout-main">
                    <Header user={user}/>
                    <NavPath />
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }

    render() {
        const {isAuthenticated,user }= this.props;
        console.log(user)
        return (
            <div>
                {isAuthenticated?this.renderAuthenticatedPage(user):<Login/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {routing,users:{user,isAuthenticated}} = state;
    return {
        user,
        isAuthenticated,
        routing
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchProfile, logout}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
