<template>
	<div class="message">
		<div class="head">留言板</div>
		<textarea
			placeholder="请输入要评论的内容（最多120字）"
			maxlength="120"
			v-model="mes"
		></textarea>
		<button class="submit" @click="onsubmit">提交评论</button>
		<div class="floor" v-for="(item, index) in getMessage" :key="index">
			<div class="tit">第{{ index + 1 }}层 用户:{{ item.name }}</div>
			<div class="tit1">发表时间{{ item.time }}</div>
			<div>{{ item.cont }}</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios';
export default {
	data() {
		return {
			getMessage: [],
			mes: ''
		};
	},
	created() {
		axios.get('/api/localData').then(res => {
			if (res.data.errno === 0) {
				this.getMessage = res.data.data.message;
				console.log(this.getMessage);
			}
		});
	},
	methods: {
		onsubmit() {
			if (this.mes.trim().length === 0) {
				return Toast('输入内容不能为空');
			} else {
				var date = new Date();
				var info = {
					name: 'xiaowanzi',
					time: date.toLocaleString(),
					cont: this.mes
				};
				this.getMessage.push(info);
			}
		}
	}
};
</script>
<style scoped lang="less">
.message {
	height: 100%;
	.head {
		background: #669999;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 8%;
	}
	textarea {
		margin-top: 2px;
		border: 1px solid #9999;
	}
	.submit {
		width: 100%;
		background: #669999;
	}
	.floor {
		.tit,
		.tit1 {
			background: #999;
		}
	}
}
</style>
