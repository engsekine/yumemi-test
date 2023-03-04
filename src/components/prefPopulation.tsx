"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

type CheckBox = {
  prefCode: number
  prefName: string
  check: boolean
}
type PrefPopulation = {
  prefName: string
  data: { year: number; value: number }
}

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

  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])
  function prefectureCheck(prefName: string, prefCode: number, check: boolean) {
    let checkPrefPopulation = prefPopulation.slice()
    if (!check) {
      const deleteIndex = checkPrefPopulation.findIndex((value) => value.prefName === prefName)
      checkPrefPopulation.splice(deleteIndex, 1)
      setPrefPopulation(checkPrefPopulation)
    } else {
      if (checkPrefPopulation.findIndex((value) => value.prefName === prefName) !== -1) return
      axios
        .get(API_BASEURL + "population/composition/perYear?prefCode=" + String(prefCode), config)
        .then((response) => {
          let data = []
          for (let i = 0; i < 13; i++) {
            data.push(response.data.result.data[0].data[i])
          }
          checkPrefPopulation.push({
            prefName: prefName,
            data: data,
          })
          setPrefPopulation(checkPrefPopulation)
        })
        .catch((e: unknown) => {
          return null
        })
    }
  }

  let series: Highcharts.SeriesOptionsType[] = []
  let categories = []

  console.log(prefPopulation)

  for (let p of prefPopulation) {
    let data = []

    for (let pd of p.data) {
      data.push(pd.value)
      categories.push(String(pd.year))
    }

    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    })
  }

  const options: Highcharts.Options = {
    title: {
      text: "",
    },

    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    accessibility: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: series.length === 0 ? [{ type: "line", name: "都道府県名", data: [] }] : series,
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
      <HighchartsReact highcharts={Highcharts} options={options} immutable={true} />
    </main>
  )
}
