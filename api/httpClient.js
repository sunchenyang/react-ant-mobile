import React from 'react'
import FetchFn from './fetchFn';
//后台接口地址，需要修改 server.js 实现反向代理,解决跨域问题
const baseURI = 'http://127.0.0.1:8080/ant/ant/ant-cgi';

export default class HttpClient extends React.Component {


	static AjaxGet(url, cb) {
		let opt = {
			type: 'get',
			url: baseURI + url
		};
		FetchFn.fetchFn(opt, cb, (err) => {
			cb();
		});
	}
	static AjaxPost(url, data, cb) {
		let opt = {
			type: 'post',
			url: baseURI + url,
			data: data
		};
		FetchFn.fetchFn(opt, cb, (err) => {
		});
	}
}
