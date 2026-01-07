import React, { useEffect, useRef, useState } from 'react'
import * as lcjs from '@lightningchart/lcjs'
import { lightningChart } from '@lightningchart/lcjs'

const {
    PalettedFill,
    LUT,
    emptyLine,
    LinearGradientFill,
    ColorRGBA,
    regularColorSteps,
    Themes,
} = lcjs

const licenseKey = import.meta.env.VITE_LICENSE

const lc = lightningChart({
    license: licenseKey,
    licenseInformation: {
        appTitle: 'LightningChart JS Trial',
        company: 'LightningChart Ltd.',
    },
})

interface SweepingHeatmapProps {
    width?: number
    height?: number
}

const SweepingHeatmap: React.FC<SweepingHeatmapProps> = ({width, height}) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const [pps, setPps] = useState(0)

    const dataSampleSize = 1000

    // New data every 0.5s
    const frameIntervalMs = 500
    const frameIntervalSec = frameIntervalMs / 1000 // 0.5
    const secondsVisible = 10                      // last 10 seconds

    const sweepingHistory = 50                     // number of columns in buffer

    useEffect(() => {
        if (!chartRef.current) return

        const chart = lc
            .ChartXY({
                container: chartRef.current,
                theme: Themes.darkGold,
            })
            .setTitle('Sweeping Heatmap Spectrogram')

        // Y axis = frequency bins
        chart
            .getDefaultAxisY()
            .setTitle('Frequency')
            .setUnits('Hz')
            .setInterval({ start: 0, end: dataSampleSize })

        // X axis = time in seconds
        const axisX = chart
            .getDefaultAxisX()
            .setTitle('Time (s)')
            .setInterval({ start: 0, end: 0 }) // start with no future time

        const theme = chart.getTheme()
        if (!theme.examples) {
            throw new Error(
                'LightningChart JS Theme.examples is undefined. You are probably using an unofficial theme and attempting to access example theme properties!',
            )
        }

        const lut = new LUT({
            steps: regularColorSteps(0, 75, theme.examples.spectrogramColorPalette),
            units: 'dB',
            interpolate: true,
        })
        const paletteFill = new PalettedFill({ lut, lookUpProperty: 'value' })

        const heatmapGridSeries = chart
            .addHeatmapGridSeries({
                columns: sweepingHistory,
                rows: dataSampleSize,
            })
            .setFillStyle(paletteFill)
            .setWireframeStyle(emptyLine)

        const band = axisX
            .addBand({ onTop: true })
            .setStrokeStyle(emptyLine)
            .setFillStyle(
                new LinearGradientFill({
                    angle: 90,
                    stops: [
                        { offset: 0, color: ColorRGBA(0, 0, 0, 255) },
                        { offset: 1, color: ColorRGBA(0, 0, 0, 0) },
                    ],
                }),
            )
            .setPointerEvents(false)

        // Streaming state
        let frameIndex = 0
        let dataAmount = 0
        const tStartMs = Date.now()

        // Mock random data – replace with real data (must be 1000 values)
        const getRandomSample = (index: number): number[] => {
            const frame: number[] = new Array(dataSampleSize)
            const t = index * frameIntervalSec
            for (let freqIndex = 0; freqIndex < dataSampleSize; freqIndex++) {
                const peakFreq = 200 + Math.sin(t) * 300
                const dist = Math.abs(freqIndex - peakFreq)
                const peakStrength = Math.exp(-dist * dist * 0.00001) * 60
                const harmonics = Math.sin(freqIndex * 0.01) * 10
                const noise = (Math.random() - 0.5) * 5
                frame[freqIndex] = Math.min(75, Math.max(0, peakStrength + harmonics + noise))
            }
            return frame
        }

        const intervalId = window.setInterval(() => {
            // New data every 0.5s
            const sample: number[] = getRandomSample(frameIndex)

            // Circular column index (0..sweepingHistory-1)
            const col: number = frameIndex % sweepingHistory

            heatmapGridSeries.invalidateIntensityValues({
                iColumn: col,
                iRow: 0,
                values: [sample] as number[][],
            })

            // Time in seconds from start
            const tNowSec = (frameIndex * frameIntervalMs) / 1000

            // X-axis: always show last 10 seconds (or less before 10s)
            let windowStart: number
            let windowEnd: number

            if (tNowSec <= secondsVisible) {
                // Before 10s, grow from 0..tNowSec
                windowStart = 0
                windowEnd = tNowSec
            } else {
                // After 10s, fixed 10s sliding window
                windowStart = tNowSec - secondsVisible
                windowEnd = tNowSec
            }

            axisX.setInterval({ start: windowStart, end: windowEnd })

            // Band at current time
            band
                .setValueStart(tNowSec)
                .setValueEnd(tNowSec + frameIntervalSec)

            dataAmount += sample.length
            frameIndex += 1

            const elapsedMs = Date.now() - tStartMs
            if (dataAmount > 0 && elapsedMs > 0) {
                const newPps = Math.round((1000 * dataAmount) / elapsedMs)
                setPps(newPps)
            }
        }, frameIntervalMs)

        return () => {
            window.clearInterval(intervalId)
            chart.dispose()
        }
    }, [])

    return (
        <div style={{ position: 'relative', width, height, paddingLeft: "30px"}}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                }}
            >
                {pps} pts/s
            </div>
        </div>
    )
}

export default SweepingHeatmap
