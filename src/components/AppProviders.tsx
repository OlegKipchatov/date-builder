import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function AppProviders({
  children,
  queryClient,
}: {
  children: ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
