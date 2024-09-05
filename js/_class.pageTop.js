"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ページ上部へボタンを生成するクラス
 */
var PageTop = /*#__PURE__*/function () {
  /**
   * コンストラクター
   * @param  {Object} options 初期設定:
   *                            target: 監視対象セレクター（ヘッダー）
   *                            elementId: 生成する要素のid
   */
  function PageTop(options) {
    var _this = this;

    _classCallCheck(this, PageTop);

    if (!options.target) return false;
    var parentSelector = options.parent || 'body',
        PARENT = document.querySelector(parentSelector),
        TARGET = document.querySelector(options.target),
        PAGE_TOP = document.createElement('div'),
        elementId = options.elementId || 'page-top',
        observerOptions = {
      threshold: 0
    };
    if (!PARENT) return false;
    if (!TARGET) return false;

    if (options.margin && /^\d+$/.test(options.margin)) {
      observerOptions.rootMargin = options.margin + 'px 0px 0px 0px';
    }

    PAGE_TOP.setAttribute('id', elementId);

    if (options.label) {
      PAGE_TOP.textContent = options.label;
    }

    PARENT.appendChild(PAGE_TOP);
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting && entries[0].boundingClientRect.y < 0) {
        PAGE_TOP.classList.add('active');
        PAGE_TOP.style.pointerEvents = 'auto';
      } else {
        PAGE_TOP.classList.remove('active');
        PAGE_TOP.style.pointerEvents = 'none';
      }
    }, observerOptions);
    observer.observe(TARGET);
    PAGE_TOP.addEventListener('click', function () {
      _this._smoothScroll(0, 5);
    });
  }
  /**
   * スムーススクロール
   * @param  {Number} targetPos 移動する位置（上部なので0）
   * @param  {Number} speed     移動スピード（1～100　100でアニメーションなし）
   */


  _createClass(PageTop, [{
    key: "_smoothScroll",
    value: function _smoothScroll() {
      var targetPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (speed > 100) {
        speed = 100;
      }

      var currentPos = window.scrollY,
          diff = targetPos - currentPos,
          easeOut = function easeOut(p) {
        return p * (2 - p);
      };

      var progress = 0;

      var move = function move() {
        progress += speed;
        var moveTo = currentPos + diff * easeOut(progress / 100);
        window.scrollTo(0, moveTo);

        if (moveTo !== targetPos) {
          requestAnimationFrame(move);
        }
      };

      requestAnimationFrame(move);
    }
  }]);

  return PageTop;
}();