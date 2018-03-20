import React, { Component } from 'react'
import {
  Card, Button, Flex, InputItem
} from 'antd-mobile'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import * as homeAction from '../actions/home'
class Counter extends Component {
  static getInitialProps({ req, isServer }) {

    return {
      isServer
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
  render() {
    const { language, url: { pathname } } = this.props
    const { number } = this.state;
    return (
      <div>
        <Card>
          <Card.Header title="redux" ></Card.Header>
          <Card.Body>
            <div><InputItem type="number" value={number} onChange={(e) => this.setNumbser(e)} /></div>
            <Flex>
              <Flex.Item><Button type="primary" size="small" onClick={this.addNumber} >+</Button></Flex.Item>
              <Flex.Item><Button size="small" onClick={this.subNumber} >-</Button></Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <Button type="primary" size="small" style={{ margin: '10px' }} onClick={this.http} >httpPage</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    number: state.home.number
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    add: bindActionCreators(homeAction.add, dispatch),
    sub: bindActionCreators(homeAction.sub, dispatch),
  }
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Counter)