import React, { useEffect, useState } from "react"
type CheckBox = {
  prefectures:
    | {
        prefCode: number
        prefName: string
      }[]
  onChange: (name: string, prefName: number, check: boolean) => void
}
export function CheckBox({ prefectures, onChange }: CheckBox) {
  return (
    <div>
      <h2>都道府県リスト</h2>
      <div>
        {prefectures.map((prefecture) => (
          <label key={prefecture.prefName}>
            <input
              type="checkbox"
              name="PrefectureName"
              id={"checkbox" + prefecture.prefCode}
              onChange={(event) =>
                onChange(prefecture.prefName, prefecture.prefCode, event.target.checked)
              }
            />
            {prefecture.prefName}
          </label>
        ))}
      </div>
    </div>
  )
}
