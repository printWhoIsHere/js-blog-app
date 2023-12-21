class Modal {
  constructor(modalName) {
    this.showBtn = document.querySelector(`[data-for-modal=\'${modalName}\']`)
    this.modal = document.querySelector(`[data-modal=\'${modalName}\']`)
    this.closeBtn = this.modal.querySelector('.close')
    this.body = document.querySelector('body')

    this.showBtn.addEventListener('click', this.showModal.bind(this))
    this.closeBtn.addEventListener('click', this.hideModal.bind(this))
    document.addEventListener('keydown', this.handleEsc.bind(this))
  }

  showModal() {
    this.modal.classList.add('active-modal')
    this.body.classList.add('body-scroll-lock')
  }

  hideModal() {
    this.modal.classList.remove('active-modal')
    this.body.classList.remove('body-scroll-lock')
  }

  handleEsc() {
    if (event.key === 'Escape') this.hideModal()
  }
}

new Modal('modal-1')
new Modal('modal-2')
