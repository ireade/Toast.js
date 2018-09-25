class Toast {

	constructor(options){
		if ( !options.message ) {
	        throw new Error('Toast require object for configuration e.g: {message: "hello"}');
	        return;
	    }
	    this.toastContainerEl = document.querySelector('.toastjs-container');
    	this.toastEl = document.querySelector('.toastjs');
  
    	this.options = options;
	    this.type = options.type || options.default;

	    if(options.timer){
	    	this.timer = options.timer;

	    	if(isNaN(this.timer)){
	    		throw new Error('Toast require a numeric value e.g: {timer: 2000}');
	        	return;
	    	}

	    	if(this.timer){
		    	setTimeout((t) => {
		    		this._close();
		    		console.log('ToastJs was timeout using timer option');
		    	}, this.timer);
		    }
	    }

	    // init default with no timer
	    this._init();
	}

	_createElements(){
		return new Promise((resolve, reject) => {
	        this.toastContainerEl = document.createElement('div');
	        this.toastContainerEl.classList.add('toastjs-container');
	        this.toastContainerEl.setAttribute('role', 'alert');
	        this.toastContainerEl.setAttribute('aria-hidden', true); 

	        this.toastEl = document.createElement('div');
	        this.toastEl.classList.add('toastjs');

	        this.toastContainerEl.appendChild(this.toastEl);
	        document.body.appendChild(this.toastContainerEl);

	        setTimeout(() => resolve(), 500);
	    });
	}

	_addEventListeners(){
		document.querySelector('.toastjs-btn--close').addEventListener('click', () => {
	        this._close();
	    })

	    if ( this.options.customButtons ) {
	        const customButtonsElArray = Array.prototype.slice.call( document.querySelectorAll('.toastjs-btn--custom') );
	        customButtonsElArray.map( (el, index) => {
	            el.addEventListener('click', (event) => this.options.customButtons[index].onClick(event) );
	        });
	    }
	}

	_close(){
		return new Promise((resolve, reject) => {
	        this.toastContainerEl.setAttribute('aria-hidden', true); 
	        setTimeout(() => {
	            this.toastEl.innerHTML = '';
	            this.toastEl.classList.remove('default', 'success', 'warning', 'danger');
	            if ( this.focusedElBeforeOpen ) {
	                this.focusedElBeforeOpen.focus();
	            }
	            resolve();
	        }, 1000); 
	    });
	}

	_open(){
		this.toastEl.classList.add(this.options.type);
	    this.toastContainerEl.setAttribute('aria-hidden', false); 

	    let customButtons = '';
	    if ( this.options.customButtons ) {
	        customButtons = this.options.customButtons.map( (customButton, index) => {
	            return `<button type="button" class="toastjs-btn toastjs-btn--custom">${customButton.text}</button>`
	        } )
	        customButtons = customButtons.join('');
	    }

	    this.toastEl.innerHTML = `
	        <p>${this.options.message}</p>
	        <button type="button" class="toastjs-btn toastjs-btn--close">close</button>
	        ${customButtons}
	    `;

	    this.focusedElBeforeOpen = document.activeElement;
	    document.querySelector('.toastjs-btn--close').focus();
	}

	_init(){
		Promise.resolve().then(() => {
	        if ( this.toastContainerEl ) { 
	            return Promise.resolve();
	        }
	        return this._createElements();
	    }).then(() => {
	        if ( this.toastContainerEl.getAttribute('aria-hidden') == 'false'  ) {
	            return this._close();
	        }
	        return Promise.resolve();
	    }).then(() => {
	        this._open();
	        this._addEventListeners();
	    })
	}
}

window.Toast = Toast;

