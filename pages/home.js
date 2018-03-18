import React, { Component } from 'react'
import {
  Card, Button, Flex, InputItem
} from 'antd-mobile'
import Router from 'next/router'
import Layout from '../components/Layout'
import MenuBar from '../components/MenuBar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import * as homeAction from '../actions/home'
export default class Home extends Component {
  static getInitialProps({ req, isServer}) {
    const language = req ? req.headers['accept-language'] : navigator.language
    return {
      language, isServer
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      number: 6,
      loading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.number) {
      this.setState({ number: nextProps.number });
    }
  }

  setNumbser(e) {
    this.setState({ number: e });
  }
  //加
  addNumber = () => {
    this.props.add(this.state.number);
  }
  //减
  subNumber = () => {
    this.props.sub(this.state.number);
  }
  http = () => {
    Router.push('/http');
  }
  counter = () => {
    Router.push('/counter');
  }
  render() {
    const {language, url: { pathname }} = this.props
    const {number} = this.state;
    return (
      <Layout language={language}>
        <MenuBar
          pathname={pathname}
          >
          <Card>
            <Card.Body>
              <div style={{ textAlign: 'center' }}>hello react-ant-mobile</div>
            </Card.Body>
          </Card>
          <Button type="primary" size="small" onClick={this.http} >httpPage</Button>
          <Button type="primary" size="small" onClick={this.counter} >counter</Button>
        </MenuBar>
      </Layout>
    )
  }
}
