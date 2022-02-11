import * as addressService from "../service/address-service.js";
import Address from "../model/address.js";
import * as listController from "./list-controller.js";

function State() {
    const address = new Address();

    this.inputZipcode = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorZipcode = null;
    this.errorNumber = null;

    this.btnSave = null;
    this.btnClear = null;
}

const state = new State();

export function init() {
    state.inputZipcode = document.forms.newAddress.zipcode;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.errorZipcode = document.querySelector('[data-error="zipcode"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.inputZipcode.addEventListener("change", handleInputZipcodeChange);
    state.inputNumber.addEventListener("change", handleInputNumberChange);
    state.inputNumber.addEventListener("keyup", handleInputNumberKeyUp)

    state.btnSave.addEventListener("click", handleBtnSaveClick)
    state.btnClear.addEventListener("click", handleBtnCleanClick);
}

async function handleInputZipcodeChange(event) {
    const zipcode = event.target.value;

    try{
        const address = await addressService.findByZipcode(zipcode);

        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address;
        state.inputNumber.focus();

        setError("zipcode", "");
    } catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";

        setError("zipcode", "Insira um CEP válido");
    }
}

function handleInputNumberChange(event) {
    if (event.target.value == "") {
        setError("number", "Campo requerido");
    } else {
        setError("number", "");
    }
}

function handleInputNumberKeyUp(event) {
    state.address.number = event.target.value;
}

function handleBtnSaveClick(event) {
    event.preventDefault();
    
    const errors = addressService.getErrors(state.address);

    const keys = Object.keys(errors);
    if (keys.length > 0) {
        keys.forEach(key => {
            setError(key, errors[key]);
        });
    } else {
        listController.addCard(state.address);
        clearForm();
    }
}

function handleBtnCleanClick(event) {
    event.preventDefault();
    clearForm();
}

function clearForm() {
    state.inputZipcode.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";
    
    state.inputZipcode.focus();
    state.address = new Address();

    setError("zipcode", "");
    setError("number", "");
}

function setError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}