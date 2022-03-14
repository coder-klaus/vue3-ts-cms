import { useLoginStore } from '/src/store/'

const store = useLoginStore()

export function checkPremission(page: string, opt: 'create' | 'query' | 'update' | 'delete') {
  const { pressmissionsRef } = store

  if (pressmissionsRef.includes(`system:${page}:${opt}`)) {
    return true
  }
}
