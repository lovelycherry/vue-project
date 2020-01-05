/* eslint-disable no-mixed-spaces-and-tabs */
<template>
	<div class="active">
		<div class="mui-content">
			<ul
				class="mui-table-view mui-table-view-striped mui-table-view-condensed"
			>
				<li
					class="mui-table-view-cell"
					v-for="item in showList"
					:key="item.id"
					@click="gotoActivePage(item.id)"
				>
					<div class="mui-table">
						<div class="mui-table-cell mui-col-xs-10">
							<h4 class="mui-ellipsis">{{ item.tit }}</h4>
							<h5>{{ item.name }}</h5>
							<p class="mui-h6 mui-ellipsis">
								{{ item.cont }}
							</p>
						</div>
						<div class="mui-table-cell mui-col-xs-2 mui-text-right">
							<span class="mui-h5">{{ item.date }}</span>
						</div>
					</div>
				</li>
			</ul>
			<mt-spinner type="snake" v-if="loading"></mt-spinner>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import axios from 'axios';
export default {
	data() {
		return {
			showList: [],
			loading: true,
			index: 0,
			//newList为模拟获取的后端数据
			newList: [],
			topDist: '',
			i: 0,
			j: 3,
			allLoaded: false
		};
	},
	created: function() {
		this.getdata();
		//this.showList = this.newList[this.index];
		window.addEventListener('scroll', this.scrollFn);
		axios.get('/api/localData').then(res => {
			if (res.data.errno === 0) {
				this.newList = res.data.data.newList;
				console.log(this.newList);
			}
		});
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.scrollFn);
	},
	methods: {
		scrollFn() {
			if (this.loading || this.allLoaded) return;
			var totelDist =
				(document.documentElement.scrollTop || document.body.scrollTop) +
				document.documentElement.clientHeight;
			var ul = document.getElementsByClassName('mui-table-view')[0];
			this.topDist = this.getOffsetTop(ul.lastChild);
			if (this.topDist <= totelDist) {
				if (this.index < this.newList.length - 1) {
					this.index++;
					this.getdata();
				}
			}
		},
		getdata() {
			this.i++;
			console.log(this.i);
			this.loading = true;
			//获取数据
			var t1 = setTimeout(this.fetch, 1000);
		},
		fetch() {
			this.showList = this.showList.concat(this.newList[this.index]);
			if (this.showList.length === this.newList.total) {
				this.allLoaded = true;
			}
			this.loading = false;
		},
		//获取元素距离文档顶端的高度
		getOffsetTop(obj) {
			var tmp = obj.offsetTop;
			var node = obj.offsetParent;
			while (node !== null) {
				tmp += node.offsetTop;
				node = node.offsetParent;
			}
			return tmp;
		},
		gotoActivePage(id) {
			this.$router.push({ path: `/active/activePage/${id}` });
		}
	}
};
</script>
<style scoped>
.mui-content > .mui-table-view:first-child {
	margin-top: 0;
}
.active {
	padding-bottom: 50px;
}
.mui-table-view-cell {
	padding: 15px 15px;
}
.mui-content {
	position: relative;
}
span {
	display: inline-block;
	height: 28px;
	width: 100%;
}
</style>
<style>
.mint-spinner-snake {
	position: absolute;
	left: 50%;
	bottom: 0px;
	margin-left: 50px;
	margin-left: -14px;
}
</style>
