export class ModalView {
  modal = document.querySelector('.display-modal');
  overlay = document.querySelector('.overlay');
  buttonOpenModal = document.querySelector('.show-modal');
  buttonCloseModal = document.querySelector('.close-modal');

  _addModal() {
    this.modal.showModal();
  }
}
