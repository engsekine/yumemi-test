"use client"
import React from "react"
import axios from "axios"
const API_BASEURL = "https://opendata.resas-portal.go.jp/api/v1/"
const config = {
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
  },
}

export default function Home() {
  const [prefectures, setPostPrefectures] = React.useState(null)
  React.useEffect(() => {
    axios.get(API_BASEURL + "prefectures", config).then((response) => {
      setPostPrefectures(response.data.result)
      console.log(Object.values(response.data.result))
    })
  }, [])
  if (!prefectures) return null
  return (
    <main>
      <h2>都道府県リスト</h2>
    </main>
  )
}
