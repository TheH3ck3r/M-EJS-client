import useSWR from "swr";
import { BaseFetcher } from "./fetchers";

const RedirectToAuth = () => {
  window.location.href = "/auth";
};

export default function getAvailableJournal() {
  const VkId = window.localStorage.getItem("VkId");
  if (!VkId) {
    return RedirectToAuth();
  }
  const { data, error } = useSWR(
    `/journal/v1/rights/${VkId}`,
    BaseFetcher
  );

  if (error || error?.status == 500 || error?.status == 403) {
    return RedirectToAuth();
  }
  if (!data || error) return "";

  return data.rights[0].journalId;
}
