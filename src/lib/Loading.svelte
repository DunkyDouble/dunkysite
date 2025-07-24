<img alt="Loading" src="/loading.png" class="loading" draggable="false" />

<style>
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading {
		width: 52px;
		height: 52px;
		animation-name: spinner;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: 0s;
		user-select: none;
	}
</style>
