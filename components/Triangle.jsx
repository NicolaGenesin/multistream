import React from "react";

const Triangle = ({
  w = "20",
  h = "20",
  direction = "right",
  color = "#44a6e8",
}) => {
  const points = {
    top: [`${w / 2},0`, `0,${h}`, `${w},${h}`],
    right: ["0,0", `0,${h}`, `${w},${h / 2}`],
    bottom: ["0,0", `${w},0`, `${w / 2},${h}`],
    left: [`${w},0`, `${w},${h}`, `0,${h / 2}`],
  };

  return (
    <svg width={w} height={h}>
      <polygon points={points[direction].join(" ")} fill={color} />
    </svg>
  );
};

export default Triangle;
