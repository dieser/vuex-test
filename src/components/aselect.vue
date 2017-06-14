<script>
	export default {
		name: 'aselect',
		data: () => {
			return {
				visible: false
			}
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			toggle() {
				this.visible = !this.visible;
			},
			select(option) {
			    this.$emit("input", option);
			}
		}
	}
</script>

<template>
	<div class="aselect" :data-value="value" :data-list="list">
	    <div class="selector" @click="toggle()">
	        <div class="label">
				<span>{{ value }}</span>
	        </div>
			<div class="arrow" :class="{ expanded : visible }"></div>
	        <div :class="{ hidden : !visible, visible }">
	            <ul>
	                <li :class="{ current : item === value }" v-for="item in list" @click="select(item)">{{ item }}</li>
	            </ul>
	        </div>
	    </div>
	</div>
</template>

<style lang="scss" scoped>
	.aselect {
		width: 250px;
		background: white;
		.selector {
			border: 1px solid gainsboro;
			background: #F8F8F8;
			position: relative;
			z-index: 1;
			.arrow {
				position: absolute;
				right: 10px;
				top: 40%;
				width: 0;
				height: 0;
				border-left: 7px solid transparent;
				border-right: 7px solid transparent;
				border-top: 10px solid #888;
				transform: rotateZ(0deg) translateY(0px);
				transition-duration: 0.3s;
				transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
			}
			.expanded {
				transform: rotateZ(180deg) translateY(2px);
			}
			.label {
				width: 99%;
				display: block;
				padding: 10px;
				font-size: 16px;
				color: #888;
			}
		}
		ul {
			width: 100%;
			list-style-type: none !important;
			padding-left: 0 !important;
			overflow: none;
			font-size: 16px;
			background: white;
			border: 1px solid gainsboro;
			position: absolute;
			z-index: 1;
		}
		li {
			padding: 12px;
			color: #666;
			&:hover {
				background: #f5f5f5;
			}
		}
		.current {
			background: #f5f5f5;
		}
		.hidden {
			visibility: hidden;
		}
		.visible {
			visibility: visible;
		}
	}
</style>
