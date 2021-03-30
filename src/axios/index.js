import Jsonp from 'jsonp';
import axios from 'axios';
import Modal from 'antd/lib/modal/Modal';
import Utils from './../utils/utils';

export default class Axios {
	static requestajax(_this, url, params) {
		let data = {
			params: params,
		}
		this.ajax({
			url,
			data
		}).then((data) => {
			if (data && data.data.result) {
				_this.setState(
					{
						dataSource: data.data.result.list,
						pagination: Utils.pageState(data.data, (current) => {
							_this.params.page = current;
							_this.request();
						})
					}
				);
			}
		})
	}
	static jsonp(data) {
		return new Promise((resolve, reject) => {
			Jsonp(data.url, {
				param: 'callback',
				function(err, response) {
					if (response.code == '200') {
						resolve(response);
					} else {
						reject(response.messsage);
					}
				}
			})
		})
	}

	static ajax(options) {
		let loading;
		if (options.data && options.data.isShowLoading !== false) {
			loading = document.getElementById('ajaxLoading');
			loading.style.display = "block";
		}
		let baseApi = "https://mock.mengxuegu.com/mock/605592e20d58b864da03d1f8/mockapi";
		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: options.method,
				baseURL: baseApi,
				params: (options.data && options.data.params) || ""
			}).then(res => {
				if (options.data && options.data.isShowLoading !== false) {
					loading = document.getElementById('ajaxLoading');
					loading.style.display = "none";
				}
				if (res.status === 200) {
					if (res.data.success === "ok") {
						resolve(res);
					} else {
						Modal.info({
							title: "提示",
							content: res.data.msg
						})
					}
				} else {
					reject(res);
				}
			})
		})
	}
}