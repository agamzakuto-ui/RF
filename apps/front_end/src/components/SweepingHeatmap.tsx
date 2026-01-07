import React, { useEffect, useRef, useState } from 'react'
import * as lcjs from '@lightningchart/lcjs'
import { createSpectrumDataGenerator } from '@lightningchart/xydata'
import { lightningChart } from '@lightningchart/lcjs'

const { 
    PalettedFill, 
    LUT, 
    emptyLine, 
    LinearGradientFill, 
    ColorRGBA, 
    regularColorSteps, 
    Themes 
} = lcjs

const licenseKey = import.meta.env.VITE_LICENSE 

const lc = lightningChart({

    license: licenseKey,

   licenseInformation: {

      appTitle: "LightningChart JS Trial",

      company: "LightningChart Ltd."

   },

})


interface SweepingHeatmapProps {
    width?: number
    height?: number
}

const SweepingHeatmap: React.FC<SweepingHeatmapProps> = ({ width = 800, height = 600 }) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const [pps, setPps] = useState(0)

    const dataSampleSize = 1000
    const sweepingHistory = 250

    useEffect(() => {
        if (!chartRef.current) return

        // ✅ USE lc.ChartXY() instead of lightningChart().ChartXY()
        const chart = lc.ChartXY({
            container: chartRef.current,
            theme: Themes.darkGold,
        }).setTitle('Sweeping Heatmap Spectrogram')

        // ... rest of your code stays EXACTLY THE SAME ...
        chart.getDefaultAxisY()
            .setTitle('Frequency')
            .setUnits('Hz')
            .setInterval({ start: 0, end: dataSampleSize })

        // Setup PalettedFill with official TypeScript safety check
        const theme = chart.getTheme()
        if (!theme.examples) {
            throw new Error(`LightningChart JS Theme.examples is undefined. You are probably using an unofficial theme and attempting to access example theme properties!`)
        }
        const lut = new LUT({
            steps: regularColorSteps(0, 75, theme.examples.spectrogramColorPalette),
            units: 'dB',
            interpolate: true,
        })
        const paletteFill = new PalettedFill({ lut, lookUpProperty: 'value' })

        // Create heatmap series
        const heatmapGridSeries = chart
            .addHeatmapGridSeries({ columns: sweepingHistory, rows: dataSampleSize })
            .setFillStyle(paletteFill)
            .setWireframeStyle(emptyLine)

        // Create sweeping band
        const band = chart
            .getDefaultAxisX()
            .addBand({ onTop: true })
            .setStrokeStyle(emptyLine)
            .setFillStyle(new LinearGradientFill({
                angle: 90,
                stops: [
                    { offset: 0, color: ColorRGBA(0, 0, 0, 255) },
                    { offset: 1, color: ColorRGBA(0, 0, 0, 0) }
                ],
            }))
            .setPointerEvents(false)

        // Streaming data - SIMPLIFIED (no subscription cleanup needed)
        let iSample = 0
        let dataAmount = 0
        let tStart = Date.now()

        createSpectrumDataGenerator()
            .setSampleSize(dataSampleSize)
            .setNumberOfSamples(12340)
            .setVariation(15)
            .setFrequencyStability(0.7)
            .generate()
            .setStreamRepeat(true)
            .setStreamInterval(25)
            .setStreamBatchSize(1)
            .toStream()
            .map((sample) => sample.map((intensity) => intensity * 80))
            .forEach((sample) => {
                heatmapGridSeries.invalidateIntensityValues({
                    iColumn: iSample % sweepingHistory,
                    iRow: 0,
                    values: [sample],
                })

                band.setValueStart(iSample % sweepingHistory)
                    .setValueEnd(band.getValueStart() + 10)

                dataAmount += sample.length
                iSample += 1

                // Update PPS display
                if (dataAmount > 0 && Date.now() - tStart > 0) {
                    const newPps = Math.round((1000 * dataAmount) / (Date.now() - tStart))
                    setPps(newPps)
                }
            })

        // Cleanup - CHART ONLY
        return () => {
            chart.dispose()
        }
    }, [])

    return (
        <div style={{ position: 'relative', width, height }}>
            <div 
                ref={chartRef} 
                style={{ width: '100%', height: '100%' }} 
            />
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
                    borderRadius: '4px'
                }}
            >
                {pps} pts/s
            </div>
        </div>
    )
}

export default SweepingHeatmap
