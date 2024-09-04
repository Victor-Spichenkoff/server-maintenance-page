"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const OldSitePage = () => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/v1/index.html'
      router.push("/v1/index.html")
    }
  }, [router])

  return null
}

export default OldSitePage;
