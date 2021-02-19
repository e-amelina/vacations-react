import { Component } from "react";

export default class Modal extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="modal">
        <div className="modal__dialog slide-in-modal">
          <form className="vacation-form">
            <div className="vacation-form__header">
              <h4 className="vacation-form__title">Vacation Request</h4>
              <p className="vacation-form__days">8 Days</p>
            </div>
            <div className="vacation-form__content">
              <div className="vacation-form__row">
                <p className="vacation-form__suptitle">Dates</p>
                <div className="vacation-form__dates">
                  <div className="vacation-form__date">
                    <p className="vacation-form__date-text">From</p>
                    <input type="date" value="2021-02-12" />
                  </div>
                  <div className="vacation-form__date">
                    <p className="vacation-form__date-text">To</p>
                    <input type="date" value="2021-02-20" />
                  </div>
                </div>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__suptitle">Team</p>
                <select className="vacation-form__select">
                  <option value="" selected disabled hidden>Team name</option>
                  <option>Frontend Team</option>
                  <option>Backend Team</option>
                </select>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__suptitle">User</p>
                <select className="vacation-form__select">
                  <option value="" selected disabled hidden>User name</option>
                  <option>User 1</option>
                  <option>User 2</option>
                  <option>User 3</option>
                </select>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__suptitle">Vac Type</p>
                <select className="vacation-form__select">
                  <option>Paid Day Off (PD)</option>
                  <option>Lorem ipsum dolor sit amet consectetur.</option>
                  <option>Paid Day Off (PD)</option>
                  <option>Lorem ipsum dolor sit amet consectetur.</option>
                </select>
              </div>
              <div className="vacation-form__footer">
                <button className="vacation-form__btn vacation-form__cancel close_modal" onClick={hideModal}>
                  Cancel
                </button>
                <button className="vacation-form__btn vacation-form__send close_modal" onClick={hideModal}>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    );
      
  }

}

export function showModal(e) {
  document.querySelector('.modal__dialog').classList.remove("bounceOutDown");
  document.querySelector('.modal').classList.add("modal-active");
  document.body.classList.add("no-scroll");
}

export function hideModal(e) {
  e.preventDefault();
  document.querySelector('.modal__dialog').classList.add("bounceOutDown");
  setTimeout(() => {
    document.querySelector('.modal').classList.remove("modal-active");
    document.body.classList.remove("no-scroll");
  }, 500);
}
