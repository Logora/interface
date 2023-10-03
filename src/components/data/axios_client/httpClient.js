// HTTP CLIENT
import axios from "axios";

const HTTP_TIMEOUT = 10000;

const httpClient = axios.create({
    timeout: HTTP_TIMEOUT
});

export { httpClient };