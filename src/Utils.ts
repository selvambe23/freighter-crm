import { PostType } from "./interfaces";

export function postData(url: string = "", data: any = {}, type: PostType) {
  return fetch(url, {
    method: type,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export function getData(url: string = "") {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
  }).then(response => response.json());
}

export function deleteData(url: string = "") {
  return fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
  }).then(response => response.json());
}

export const API_URL = process.env.REACT_APP_PUBLIC_URL;
