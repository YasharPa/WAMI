export class ModalView {
  modal = document.querySelector('.display-modal');
  buttonCloseModal = document.querySelector('.close-modal');
  modalForm = document.querySelector('.modal-form');

  _addModal() {
    this.modal.showModal();
  }

  _renderModal(activity) {
    const activityDate = new Date(activity.date);
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    console.log(activity);
    const modalHtml = `
    <form class="modal-form">
        <button formmethod="dialog" class="close-modal">&times;</button>
        <div class="modal-properties">
            <h1 class="activity-name">${activity.type}</h1>
            <h2 class="activity-date">date: ${formatter.format(
              activityDate
            )}</h2>
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
