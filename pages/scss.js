import React, { Component } from 'react'
import { Card } from 'antd-mobile'
import Layout from '../components/Layout'
import MenuBar from '../components/MenuBar'
import stylesheet from 'styles/index.scss'

export default class Scss extends Component {
  static getInitialProps ({ req }) {
    const language = req ? req.headers['accept-language'] : navigator.language
    return {
      language
    }
  }


  render () {
    const {language,url: { pathname }} = this.props


    return (
      <Layout language={language}>
        <MenuBar
          pathname={pathname}
        >
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Card className="card">
            <Card.Body  className="body" >
            <div className="blue">This is blue Card </div>
          </Card.Body>
        </Card>
        <Card className="card">
            <Card.Body  className="body" >
            <div className="green">This is blue Card </div>
          </Card.Body>
        </Card>
        <Card className="card">
            <Card.Body  className="body" >
            <div className="pink">This is blue Card </div>
          </Card.Body>
        </Card>
        
        </MenuBar>
      </Layout>
    )
  }
}
