import styles from './WaterGesture.module.css'

const BODY =
  'M5.5 3H10.5V8C10.5 11 14.5 12 14.5 18V38C14.5 41.5 13.5 44 11 44H5C2.5 44 1.5 41.5 1.5 38V18C1.5 12 5.5 11 5.5 8Z'

function ColaBottle() {
  return (
    <>
      <path d={BODY} fill="#2b1612" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.6" />
      <rect x="1.5" y="22" width="13" height="9" fill="#c8323a" />
      <rect x="1.5" y="23.6" width="13" height="0.6" fill="#fff" opacity="0.7" />
      <rect x="1.5" y="28.8" width="13" height="0.6" fill="#fff" opacity="0.7" />
      <rect x="3" y="14" width="1.6" height="24" rx="0.8" fill="#fff" opacity="0.18" />
      <rect x="5.5" y="0" width="5" height="3" rx="0.8" fill="#c8323a" />
    </>
  )
}

function WaterBottle() {
  return (
    <>
      <path d={BODY} fill="#cfe8fb" fillOpacity="0.2" stroke="#9fd0f5" strokeWidth="0.8" />
      <path
        d="M1.9 19V38C1.9 41.3 3 43.6 5 43.6H11C13 43.6 14.1 41.3 14.1 38V19Z"
        fill="#8cc8f2"
        fillOpacity="0.45"
      />
      <rect x="1.5" y="22" width="13" height="0.6" fill="#fff" opacity="0.35" />
      <rect x="1.5" y="26" width="13" height="0.6" fill="#fff" opacity="0.35" />
      <rect x="1.5" y="30" width="13" height="0.6" fill="#fff" opacity="0.35" />
      <rect x="5.5" y="0" width="5" height="3" rx="0.8" fill="#4aa3e8" />
    </>
  )
}

function WaterGesture() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 160 84"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(68 8)">
        <g className={styles.water}>
          <g transform="scale(1.5)">
            <WaterBottle />
          </g>
        </g>
      </g>

      <g transform="translate(68 8)">
        <g className={styles.colaLeft}>
          <g transform="scale(1.5)">
            <ColaBottle />
          </g>
        </g>
      </g>

      <g transform="translate(68 8)">
        <g className={styles.colaRight}>
          <g transform="scale(1.5)">
            <ColaBottle />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default WaterGesture