export const StarIcon = ({ color = "grey" }: { color?: "grey" | "purple" }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9999 20.7083L6.79926 24.4941L8.17476 16.4756L2.34143 10.7974L10.3914 9.63077L13.9918 2.3356L17.5921 9.63077L25.6421 10.7974L19.8088 16.4756L21.1843 24.4941L13.9999 20.7083Z"
        fill={color === "grey" ? "#D5D6DC" : "#9854F6"}
        stroke={color === "grey" ? "#D5D6DC" : "#9854F6"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
