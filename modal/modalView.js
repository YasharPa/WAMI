export class ModalView {
  modal = document.querySelector('.display-modal');
  buttonCloseModal = document.querySelector('.close-modal');
  modalForm = document.querySelector('.modal-form');

  _addModal() {
    this.modal.showModal();
  }

  _renderModal(activity) {
    console.log(activity);
    const modalHtml = `
    <form class="modal-form">
        <button formmethod="dialog" class="close-modal">&times;</button>
        <div class="modal-properties">
            <h1 class="activity-name">${activity.type}</h1>
            <h2 class="activity-date">date: ${activity.date}</h2>
            <p class="activity-review">${activity.review}</p>
        </div>
    </form>
`;
    this.modalForm.innerHTML = modalHtml;
    this._clearModal(modalHtml);
  }

  _clearModal(modal) {
    const modalProperties = document.querySelector('.modal-properties');
    console.log(modalProperties.textContent.length);

    if (this.modalForm.textContent) return;

    modalProperties = '';
  }
}
