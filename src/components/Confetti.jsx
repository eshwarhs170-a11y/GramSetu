import React, { useEffect, useRef } from 'react'

// Pure CSS/JS confetti — no external library needed
export default function Confetti({ active, onDone }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const colors = ['#16a34a', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']
    const pieces = []

    for (let i = 0; i < 120; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 10 + 6
      const color = colors[Math.floor(Math.random() * colors.length)]
      const x = Math.random() * 100 // vw
      const delay = Math.random() * 0.6
      const duration = Math.random() * 1.5 + 1.5
      const rotation = Math.random() * 720 - 360
      const shape = Math.random() > 0.5 ? '50%' : '2px'

      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape};
        animation: confettiFall ${duration}s ${delay}s ease-in forwards;
        transform: rotate(0deg);
        opacity: 1;
      `
      container.appendChild(el)
      pieces.push(el)
    }

    const style = document.createElement('style')
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    const timer = setTimeout(() => {
      pieces.forEach(p => p.remove())
      style.remove()
      if (onDone) onDone()
    }, 3000)

    return () => {
      clearTimeout(timer)
      pieces.forEach(p => p.remove())
      style.remove()
    }
  }, [active, onDone])

  if (!active) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
