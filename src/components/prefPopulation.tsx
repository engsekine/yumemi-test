"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"

const API_BASEURL = "https://opendata.resas-portal.go.jp/api/v1/"
const config = {
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
  },
}

export function PrefPopulation() {
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
    if (!check) {
      const deleteIndex = checkPrefPopulation.findIndex((value) => value.prefName === prefName)
      checkPrefPopulation.splice(deleteIndex, 1)
    } else {
      axios
        .get(API_BASEURL + "population/composition/perYear?prefCode=" + String(prefCode), config)
        .then((response) => {
          checkPrefPopulation.push({
            prefName: prefName,
            data: response.data.result.data[0].data,
          })
        })
        .catch((e: unknown) => {
          return null
        })
    }
    setPrefPopulation(checkPrefPopulation)
    console.log(checkPrefPopulation)
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
