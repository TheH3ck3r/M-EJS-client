import axios from "axios";
import { kBaseEndpoint } from "./app";

export const BaseFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: kBaseEndpoint,
    })
    .then((res) => res.data);

export const StudentFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/student`,
    })
    .then((res) => res.data);

export const JournalFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/journal`,
    })
    .then((res) => res.data);

export const AttendanceFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/attendance`,
    })
    .then((res) => res.data);

export const CertificatesFetcher = (url: string) =>
  axios
    .get(url, {
      baseURL: `${kBaseEndpoint}/certificate`,
    })
    .then((res) => res.data);
