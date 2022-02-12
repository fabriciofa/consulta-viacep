function State() {
    this.container = null;
    this.btnClose = null;
}

const state = new State();

export function init() {
    state.container = document.querySelector("#modal-contact");
    state.btnClose = document.querySelector("[name=btnClose]");

    state.container.addEventListener("click", handleContainerClick);
    state.btnClose.addEventListener("click", closeModal);
}

export function showModal() {
    state.container.classList.add("active");
}

function closeModal() {
    state.container.classList.remove("active");
}

function handleContainerClick(event) {
    event.preventDefault();
    if (event.target == this) {
        closeModal();
    }
}