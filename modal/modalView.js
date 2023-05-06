export class ModalView {
  modal = document.querySelector('.display-modal');
  buttonCloseModal = document.querySelector('.close-modal');
  modalForm = document.querySelector('.modal-form');

  _addModal() {
    this.modal.showModal();
  }

  _renderModal(activity) {
    const modalHtml = `
    <form class="modal-form">
        <div class="modal-properties">
        <h1 class="activity-name">${activity.type}</h1>
        <h2 class="activity-date">${activity.date}</h2>
        <p class="activity-review">${activity.review}</p>
        </div>
    </form>
`;
    console.log(this.modalForm);
    this.modalForm.insertAdjacentHTML('beforeend', modalHtml);
  }

  _clearModal(modal) {
    const modalProperties = document.querySelector('.modal-properties');
    console.log(modalProperties.textContent);
    modalProperties.textContent = '';
  }
}
