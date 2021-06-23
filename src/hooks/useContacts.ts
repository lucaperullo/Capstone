import { useQuery } from "react-query"
import { backend } from "../config"
import { Contact } from "../types/"

export function useContacts(userNumber?: string) {
  return useQuery<Contact[], Error>("contacts", async () => {
    const { data } = await backend.get(`/contacts`)
    return data
  })
}
