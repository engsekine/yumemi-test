"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { PrefPopulation } from "@/components/index"

export default function Home() {
  return (
    <main>
      <PrefPopulation />
    </main>
  )
}
