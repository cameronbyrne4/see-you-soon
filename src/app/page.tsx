"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import React from "react"

const TimeTracker = () => {
  const [now, setNow] = useState(new Date())

  // Define your departure and return dates in PST
  const departureDate = new Date("2025-01-04T14:00:00-08:00")
  const returnDate = new Date("2025-05-13T12:00:00-07:00") // Note: PDT in May

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 10) // Update every 10ms for smooth decimals

    return () => clearInterval(timer)
  }, [])

  const calculateTime = (start, end) => {
    const diff = Math.abs(end - start)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    const milliseconds = diff % 1000

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    }
  }

  const timeSinceDeparture = calculateTime(departureDate, now)
  const timeUntilReturn = calculateTime(now, returnDate)

  // Calculate overall progress percentage
  const totalDuration = returnDate - departureDate
  const elapsed = now - departureDate
  const progress = (elapsed / totalDuration) * 100

  const formatNumber = (num, decimals = 0) => {
    return num.toFixed(decimals).padStart(2, "0")
  }

  const formatMilliseconds = (ms) => {
    return (ms / 1000).toFixed(3).slice(2)
  }

  // Calculate total days and days passed
  const totalDays = Math.ceil((returnDate - departureDate) / (1000 * 60 * 60 * 24))
  const daysPassed = Math.floor((now - departureDate) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-12">Time Tracker</h1>

      <div className="text-center mb-16">
        <h2 className="text-2xl mb-4">Journey Progress</h2>
        <div className="text-8xl font-mono font-bold text-blue-400 mb-4">{progress.toFixed(1)}%</div>
        <Progress value={progress} className="w-64 h-2 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl mb-16">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Time Since Departure</h2>
          <div className="font-mono text-4xl">
            <span className="text-yellow-400">{formatNumber(timeSinceDeparture.days)}</span>
            <span className="text-gray-500 mx-1">days</span>
            <span className="text-yellow-400">{formatNumber(timeSinceDeparture.hours)}</span>
            <span className="text-gray-500 mx-1">:</span>
            <span className="text-yellow-400">{formatNumber(timeSinceDeparture.minutes)}</span>
            <span className="text-gray-500 mx-1">:</span>
            <span className="text-yellow-400">{formatNumber(timeSinceDeparture.seconds)}</span>
            <span className="text-gray-500 mx-1">.</span>
            <span className="text-yellow-400">{formatMilliseconds(timeSinceDeparture.milliseconds)}</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl mb-4">Time Until Return</h2>
          <div className="font-mono text-4xl">
            <span className="text-green-400">{formatNumber(timeUntilReturn.days)}</span>
            <span className="text-gray-500 mx-1">days</span>
            <span className="text-green-400">{formatNumber(timeUntilReturn.hours)}</span>
            <span className="text-gray-500 mx-1">:</span>
            <span className="text-green-400">{formatNumber(timeUntilReturn.minutes)}</span>
            <span className="text-gray-500 mx-1">:</span>
            <span className="text-green-400">{formatNumber(timeUntilReturn.seconds)}</span>
            <span className="text-gray-500 mx-1">.</span>
            <span className="text-green-400">{formatMilliseconds(timeUntilReturn.milliseconds)}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl mb-4 text-center">Days Passed</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: totalDays }).map((_, index) => (
              <div key={index} className={`w-12 h-12 rounded-full ${index < daysPassed ? "bg-blue-400" : "bg-gray-700"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTracker

