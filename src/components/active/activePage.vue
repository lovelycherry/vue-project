<template>
	<div>
		<div>{{ newList.tit }}</div>
		<div>{{ newList.name }}</div>
		<div>时间：{{ newList.date }}</div>
		<div>内容：{{ newList.cont }}</div>
	</div>
</template>
<script>
import axios from 'axios';
export default {
	data() {
		return {
			id: this.$route.params.id,
			//模拟的后端数据
			newList: []
		};
	},
	created: function() {
		console.log(this.id);
		axios.get('/api/localData').then(res => {
			if (res.data.errno === 0) {
				if (this.id == 7 || this.id == 14 || this.id == 21) {
					this.newList = res.data.data.newList[parseInt(this.id / 7 - 1)][6];
				} else {
					this.newList =
						res.data.data.newList[parseInt(this.id / 7)][(this.id % 7) - 1];
				}
			}
		});
	}
};
</script>
