require('es6-promise').polyfill();
require('isomorphic-fetch');
import React from 'react'
export default class FetchFn extends React.Component {

	static fetchFn(opt, cb, error) {
		let type = opt.type;
		let option = { method: 'get', credentials: 'include' };
		option.headers = new Headers({
			'Accept': 'application/json,text/plain, */*',
			'Content-Type': 'application/json; charset=utf-8',
		});
		if (type == 'post') {
			option.method = 'post';
			option.body = JSON.stringify(opt.data);
		}
		if (type == 'file') {
			option.method = 'post';
			option.body = opt.data;

		}
		fetch(opt.url, option)
			.then(function (response) {
				if (!response.ok || response.url.indexOf('/ant/login') != -1) {
					error()
				} else {
					let data = response.json();
					return data;
				}

			}).then(function (json) {
				if (cb)
					cb(json);
			}).catch(function (ex) {
				if (ex.description == '无效字符') {
					error()
				}
				if (opt.type == 'get') {
					error()
				}
				console.log('通信失败', ex);
			});
	}
}