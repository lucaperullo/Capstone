import { useQuery } from "react-query"
import { backend } from "../config"
import { Group } from "../types/"

export function useAllGroups(userNumber?: string) {
  return useQuery<Group[], Error>("contacts", async () => {
    const { data } = await backend.get(`/api/groups/${userNumber}`)
    return data
  })
}
