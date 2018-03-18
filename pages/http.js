import React, { Component } from 'react'
import { Button, InputItem, WingBlank, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import * as httpAction from '../actions/http'
import Layout from '../components/Layout'
import MenuBar from '../components/MenuBar'

class Http extends Component {
  static getInitialProps({ req, isServer}) {
    const language = req ? req.headers['accept-language'] : navigator.language
    return { language, isServer }
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      loading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.loading) {
      if (nextProps.user.success) {
        Toast.success('loginSuccessfully');
        this.props.getTimeList();
      } else {
        Toast.fail(nextProps.user.errmsg);
      }
      this.setState({ loading: false });
    }
  }
  login = () => {
    const {name, password} = this.state;
    if (name && password) {
      this.setState({ loading: true });
      this.props.login(name, password);
    }
  }

  upDate(e, type) {
    if (type == 'name') {
      this.setState({ name: e });
    } else if (type == 'password') {
      this.setState({ password: e });
    }
  }
  render() {
    const { language, url: { pathname }} = this.props
    const {name, password, loading} = this.state;
    return (
      <Layout language={language}>
        <MenuBar
          pathname={pathname}
          >
          <div >
            <WingBlank>
              <div style={{ display: 'inline-block', width: '30%' }}>userName:</div>
              <div style={{ display: 'inline-block', width: '70%' }} ><InputItem type="text" value={name} onChange={(e) => this.upDate(e, 'name')} /></div>
            </WingBlank>

            <WingBlank>
              <div style={{ display: 'inline-block', width: '30%' }}>passWord:</div>
              <div style={{ display: 'inline-block', width: '70%' }} ><InputItem type="password" value={password} onChange={(e) => this.upDate(e, 'password')} /></div>
            </WingBlank>
            <Button type="primary" loading={loading} onClick={this.login}>login</Button></div>
        </MenuBar>
      </Layout>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.http.user,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(httpAction.login, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Http)