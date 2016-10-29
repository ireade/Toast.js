'use strict';

function Toast(options) {

    if (!options.message) {
        throw new Error('Toast.js - You need to set a message to display');
        return;
    }

    this.options = options;
    this.options.type = options.type || 'default';

    this.toastContainerEl = document.querySelector('.toastjs-container');
    this.toastEl = document.querySelector('.toastjs');

    this._init();
}

Toast.prototype._createElements = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {

        _this.toastContainerEl = document.createElement('div');
        _this.toastContainerEl.classList.add('toastjs-container');
        _this.toastContainerEl.setAttribute('role', 'alert');
        _this.toastContainerEl.setAttribute('aria-hidden', true);

        _this.toastEl = document.createElement('div');
        _this.toastEl.classList.add('toastjs');

        _this.toastContainerEl.appendChild(_this.toastEl);
        document.body.appendChild(_this.toastContainerEl);

        setTimeout(function () {
            return resolve();
        }, 500);
    });
};

Toast.prototype._addEventListeners = function () {
    var _this2 = this;

    document.querySelector('.toastjs-btn--close').addEventListener('click', function () {
        _this2._close();
    });

    if (this.options.customButtons) {
        var customButtonsElArray = Array.prototype.slice.call(document.querySelectorAll('.toastjs-btn--custom'));
        customButtonsElArray.map(function (el, index) {
            el.addEventListener('click', function (event) {
                return _this2.options.customButtons[index].onClick(event);
            });
        });
    }
};

Toast.prototype._close = function () {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
        _this3.toastContainerEl.setAttribute('aria-hidden', true);
        setTimeout(function () {

            _this3.toastEl.innerHTML = '';
            _this3.toastEl.classList.remove('default', 'success', 'warning', 'danger');

            if (_this3.focusedElBeforeOpen) {
                _this3.focusedElBeforeOpen.focus();
            }

            resolve();
        }, 1000);
    });
};

Toast.prototype._open = function () {

    this.toastEl.classList.add(this.options.type);
    this.toastContainerEl.setAttribute('aria-hidden', false);

    var customButtons = '';
    if (this.options.customButtons) {
        customButtons = this.options.customButtons.map(function (customButton, index) {
            return '<button type="button" class="toastjs-btn toastjs-btn--custom">' + customButton.text + '</button>';
        });
        customButtons = customButtons.join('');
    }

    this.toastEl.innerHTML = '\n        <p>' + this.options.message + '</p>\n        <button type="button" class="toastjs-btn toastjs-btn--close">Close</button>\n        ' + customButtons + '\n    ';

    this.focusedElBeforeOpen = document.activeElement;
    document.querySelector('.toastjs-btn--close').focus();
};

Toast.prototype._init = function () {
    var _this4 = this;

    Promise.resolve().then(function () {
        if (_this4.toastContainerEl) {
            return Promise.resolve();
        }
        return _this4._createElements();
    }).then(function () {
        if (_this4.toastContainerEl.getAttribute('aria-hidden') == 'false') {
            return _this4._close();
        }
        return Promise.resolve();
    }).then(function () {
        _this4._open();
        _this4._addEventListeners();
    });
};