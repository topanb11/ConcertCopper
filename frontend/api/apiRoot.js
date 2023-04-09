import axios from "axios"

export const apiRoot = axios.create({
	baseURL: "http://localhost:8000"
})