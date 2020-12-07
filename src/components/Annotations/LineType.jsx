import { isAbsolute } from "path";

export function getLinesByColor(color) {
  const baseLine = {
    width: "135px",
    display: "inline-block",
    position: "absolute",
    margin: "0px 0px 0px 10px",

  };

  const lineA = { height: "2px", backgroundColor: color, borderTop: "" };
  const lineB = { height: "4px", backgroundColor: color, borderTop: "" };
  const lineC = { height: "6px", backgroundColor: color, borderTop: "" };
  const lineD = { height: "8px", backgroundColor: color, borderTop: "" };
  const lineDotted = {
    height: "",
    backgroundColor: "#2a2a2a",
    borderTop: `2px dotted ${color}`,
  };
  const lineDashed = {
    height: "",
    backgroundColor: "#2a2a2a",
    borderTop: `2px dashed ${color}`,
  };

  const line1 = { ...baseLine, ...lineA };
  const line2 = { ...baseLine, ...lineB };
  const line3 = { ...baseLine, ...lineC };
  const line4 = { ...baseLine, ...lineD };
  const line5 = { ...baseLine, ...lineDotted };
  const line6 = { ...baseLine, ...lineDashed };

  const lineArr = [
    { name: "line1", style: line1 },
    { name: "line2", style: line2 },
    { name: "line3", style: line3 },
    { name: "line4", style: line4 },
    { name: "line5", style: line5 },
    { name: "line6", style: line6 },
  ];

  return lineArr;
}
