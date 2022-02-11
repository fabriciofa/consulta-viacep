import * as requestService from "./request-service.js";
import Address from "../model/address.js";

export async function findByZipcode(zipcode) {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`
    const result = await requestService.getJson(url);

    const address = new Address(result.cep, result.logradouro, null, result.localidade);
    return address;
}

export function getErrors(address) {
    const errors = {};
    
    if (!address.zipcode || address.zipcode == "") {
        errors.zipcode = "Campo requerido";
    }

    if (!address.number || address.number == "") {
        errors.number = "Campo requerido";
    }

    return errors;
}