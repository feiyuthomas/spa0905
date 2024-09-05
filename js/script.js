(() => {
	const navigation = document.querySelectorAll('#navigation a'),
		nav = document.querySelector('body > header > nav'),
		navToggle = document.getElementById('nav-toggle'),
		header = document.querySelector('body > header');

	let scrollPositionFix = 0;

	if (window.getComputedStyle(header).position === 'fixed') {
		scrollPositionFix = -header.offsetHeight;
	}

	navigation.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();

			const url = new URL(item.href),
				hash = url.hash,
				id = hash.replace('#', '');

			let pos = 0;

			if (id) {
				const targetSection = document.getElementById(id);

				pos = targetSection.offsetTop - 20 + scrollPositionFix;
			}

			smoothScroll(pos, 5);

			if (window.getComputedStyle(nav).position === 'fixed') {
				navToggle.checked = false;
			}
		});
	});

	/**
	 * スムーススクロール
	 * @param  {Number} targetPos 移動する位置
	 * @param  {Number} speed     移動スピード（1～100　100でアニメーションなし）
	 */
	 function smoothScroll(targetPos = 0, speed = 1) {
		if (speed >100) {
			speed = 100;
		}

		const currentPos = window.scrollY,
			diff = targetPos - currentPos,
			easeOut = function (p) {
				return p * (2 - p);
			};

		let progress = 0;

		const move = () => {
			progress += speed;

			const moveTo = (currentPos + diff * easeOut(progress / 100));

			window.scrollTo(0, moveTo);

			if (moveTo !== targetPos) {
				requestAnimationFrame(move);
			}
		};

		requestAnimationFrame(move);
	};
})();