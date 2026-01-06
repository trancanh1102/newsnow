import type { SourceID } from "@shared/types"
import { useTranslation } from "react-i18next"
import { useUpdateQuery } from "./query"

export function useRefetch() {
  const { t } = useTranslation()
  const { enableLogin, loggedIn, login } = useLogin()
  const toaster = useToast()
  const updateQuery = useUpdateQuery()
  /**
   * force refresh
   */
  const refresh = useCallback((...sources: SourceID[]) => {
    if (enableLogin && !loggedIn) {
      toaster(t("auth.loginToRefresh"), {
        type: "warning",
        action: {
          label: t("auth.login"),
          onClick: login,
        },
      })
    } else {
      refetchSources.clear()
      sources.forEach(id => refetchSources.add(id))
      updateQuery(...sources)
    }
  }, [loggedIn, toaster, login, enableLogin, updateQuery])

  return {
    refresh,
    refetchSources,
  }
}
