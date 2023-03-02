"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"

type CheckBox = {
  prefCode: number
  prefName: string
  check: boolean
}

const API_BASEURL = "https://opendata.resas-portal.go.jp/api/v1/"
const config = {
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
  },
}
type PrefPopulation = {
  prefName: string
  data: { year: number; value: number }
}

export default function Home() {
  const [prefectures, setPostPrefectures] = useState<CheckBox[]>([])
  useEffect(() => {
    axios
      .get(API_BASEURL + "prefectures", config)
      .then((response) => {
        setPostPrefectures(response.data.result)
        console.log(Object.values(response.data.result))
      })
      .catch((e: unknown) => {
        return null
      })
  }, [])

  const [prefPopulation, setPrefPopulation] = useState<PrefPopulation[]>([])
  function prefectureCheck(prefName: string, prefCode: number, check: boolean) {
    let checkPrefPopulation = prefPopulation.slice()
    if (check) {
      axios
        .get(API_BASEURL + "population/composition/perYear?prefCode=" + String(prefCode), config)
        .then((response) => {
          checkPrefPopulation.push({
            prefName: response.data.prefName,
            data: response.data.result.data[0].data,
          })
          setPrefPopulation(checkPrefPopulation)
          console.log(checkPrefPopulation)
        })
        .catch((e: unknown) => {
          return
        })
    } else {
    }
    console.log(check)
    console.log(prefName)
    console.log(prefCode)
  }

  return (
    <main>
      <h2>都道府県リスト</h2>
      <div>
        {prefectures.map((prefecture: CheckBox) => (
          <label key={prefecture.prefName}>
            <input
              type="checkbox"
              name="PrefectureName"
              id={"checkbox" + prefecture.prefCode}
              onChange={(event) =>
                prefectureCheck(prefecture.prefName, prefecture.prefCode, event.target.checked)
              }
            />
            {prefecture.prefName}
          </label>
        ))}
      </div>
    </main>
  )
}
