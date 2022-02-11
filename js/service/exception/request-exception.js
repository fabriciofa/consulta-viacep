export default function RequestException(msg) {
    const error = new Error(msg);
    return error;
}

RequestException.prototype = Object.create(Error.prototype);