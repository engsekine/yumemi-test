'use client'
import React from 'react'
import axios from "axios";
const API_BASEURL = "https://opendata.resas-portal.go.jp/api/v1/";
const config = {
  headers:{
    'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY,
  }
};


export default function Home() {
  const [prefectures, setPostPrefectures] = React.useState(null);
  React.useEffect(() => {
    axios.get(API_BASEURL + "prefectures", config).then((response) => {
      setPostPrefectures(response.data.result);
    });
  }, []);
  if (!prefectures) return null;
  return (
    <>
    <header className="header">
      <h1>株式会社ゆめみフロントエンドコーディング試験</h1>
    </header>
    <main>
      <h2>都道府県リスト</h2>
    </main>
    <footer className="footer">
      <small>@Daichi Sekine</small>
    </footer>
    </>
  )
}
