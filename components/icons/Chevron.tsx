interface ChevronIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ChevronIcon({ className, style }: ChevronIconProps) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M8.00001 6.74094L14.2929 0.299789C14.6834 -0.0999298 15.3166 -0.0999298 15.7071 0.299789C16.0976 0.699519 16.0976 1.34759 15.7071 1.74732L9.06071 8.55038C8.47491 9.14987 7.52511 9.14987 6.93931 8.55038L0.29289 1.74732C-0.0976301 1.34759 -0.0976301 0.699519 0.29289 0.299789C0.683421 -0.0999298 1.31658 -0.0999298 1.70711 0.299789L8.00001 6.74094Z"
        fill="currentColor"
      />
    </svg>
  );
}
