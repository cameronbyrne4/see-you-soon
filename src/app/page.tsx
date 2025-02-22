"use client"

import { useState, useEffect } from "react"
import React from "react"

const TimeTracker = () => {
  const [now, setNow] = useState(Date.now())

  // Define your departure and return dates in PST
  const departureDate: number = new Date("2025-01-04T14:00:00-08:00").getTime()
  const returnDate: number = new Date("2025-05-18T12:00:00-07:00").getTime() // Note: PDT in May

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 10) // Update every 10ms for smooth decimals

    return () => clearInterval(timer)
  }, [])

  const calculateTime = (start: number, end: number) => {
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

  const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toFixed(decimals).padStart(2, "0")
  }

  const formatMilliseconds = (ms: number) => {
    return (ms / 1000).toFixed(3).slice(2)
  }

  // Calculate total days and days passed
  const totalDays = Math.ceil((returnDate - departureDate) / (1000 * 60 * 60 * 24))
  const daysPassed = Math.floor((now - departureDate) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-12 fixed top-0 left-0 w-full bg-[var(--foreground)] text-[var(--background)] shadow z-10 text-center p-4">
        When will Cameron come home?
      </h1>

      <div className="text-center mb-48 mt-64">
        <h2 className="text-2xl mb-4">Journey Progress</h2>
        <div className="text-8xl font-mono font-bold text-[var(--foreground)] mb-12">{progress.toFixed(1)}%</div>
        
      </div>

      <div className="text-center">
        <h2 className="text-2xl mb-4">Time Until Return</h2>
        <div className="font-mono text-4xl mb-16 text-[var(--foreground)]">
          <span className="text-[var(--foreground)]">{formatNumber(timeUntilReturn.days)}</span>
          <span className="text-gray-500 mx-2 mr-6">days</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeUntilReturn.hours)}</span>
          <span className="text-gray-500 mx-1">:</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeUntilReturn.minutes)}</span>
          <span className="text-gray-500 mx-1">:</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeUntilReturn.seconds)}</span>
          <span className="text-gray-500 mx-1">.</span>
          <span className="text-[var(--foreground)]">{formatMilliseconds(timeUntilReturn.milliseconds)}</span>
        </div>

        <h2 className="text-2xl mb-4">Time Since Departure</h2>
        <div className="font-mono text-4xl mb-16 text-[var(--foreground)]">
          <span className="text-[var(--foreground)]">{formatNumber(timeSinceDeparture.days)}</span>
          <span className="text-gray-500 mx-2 mr-6">days</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeSinceDeparture.hours)}</span>
          <span className="text-gray-500 mx-1">:</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeSinceDeparture.minutes)}</span>
          <span className="text-gray-500 mx-1">:</span>
          <span className="text-[var(--foreground)]">{formatNumber(timeSinceDeparture.seconds)}</span>
          <span className="text-gray-500 mx-1">.</span>
          <span className="text-[var(--foreground)]">{formatMilliseconds(timeSinceDeparture.milliseconds)}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-48">
        <h2 className="text-2xl mb-4 text-center text-[var(--foreground)]">Days Passed</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: totalDays }).map((_, index) => (
              <div key={index} className={`w-12 h-12 rounded-full ${index < daysPassed ? "bg-[var(--foreground)]" : "bg-[var(--darkerback)]"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Gradient Overlay as Footer */}
      <div className={`fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t 'from-white to-transparent' pointer-events-none`}></div>
    </div>
  )
}

export default TimeTracker

