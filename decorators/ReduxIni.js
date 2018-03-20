import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'

export default (mapStateToProps, mapDispatchToProps) => Compt => withRedux(initStore, mapStateToProps, mapDispatchToProps)(Compt)