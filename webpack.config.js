const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const express = require('express');
const app = express(); //请求server
const appData = require('./src/mock/news.json'); //加载本地数据文件

const localData = appData; //获取对应的本地数据

const apiRoutes = express.Router();
app.use('/api', apiRoutes); //通过路由请求数据
module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new htmlWebpackPlugin({
			//可将目标html转为内存中的数据
			template: path.join(__dirname, './src/index.html'),
			//需要解析的文件
			filename: 'index.html' //导出文件的文件名
			//默认此文件导出到当前项目的根目录
		})
	],
	devServer: {
		contentBase: './dist',
		hot: true,
		before(app) {
			app.get('/api/localData', (req, res) => {
				res.json({
					errno: 0,
					data: localData
				});
			});
		}
	},
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.html$/, use: ['raw-loader'] },
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},
	resolve: {
		alias: {
			// 修改 Vue 被导入时候的包的路径
			vue$: 'vue/dist/vue.js'
		}
	}
};
