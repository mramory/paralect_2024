
interface downChevronProps {
    className?: string
}

export const DownChevron = ({className}: downChevronProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.33325 6L7.47929 9.55374C7.77888 9.81054 8.22096 9.81054 8.52055 9.55374L12.6666 6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
