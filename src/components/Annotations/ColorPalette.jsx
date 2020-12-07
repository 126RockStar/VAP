export const baseStyle = {
  height: "24px",
  width: "24px",
  borderRadius: "20px",
  margin: "2px",
};

const bgLightOrange = { backgroundColor: "#E4A934" };
const bgRed = { backgroundColor: "#FF0000" };
const bgOrange = { backgroundColor: "#E48A34" };
const bgYellow = { backgroundColor: "#C2DE4A" };
const bgTeal = { backgroundColor: "#34E4B7" };
const bgBlue = { backgroundColor: "#1E8DC8" };
const bgPurple = { backgroundColor: "#8B34E4" };
const bgPink = { backgroundColor: "#DA34E4" };
const bgWhite = { backgroundColor: "#D9DDE6" };
const bgBlack = { backgroundColor: "#0B0C10" };

const lightOrange = { ...baseStyle, ...bgLightOrange };
const red = { ...baseStyle, ...bgRed };
const orange = { ...baseStyle, ...bgOrange };
const yellow = { ...baseStyle, ...bgYellow };
const teal = { ...baseStyle, ...bgTeal };
const blue = { ...baseStyle, ...bgBlue };
const purple = { ...baseStyle, ...bgPurple };
const pink = { ...baseStyle, ...bgPink };
const white = { ...baseStyle, ...bgWhite };
const black = { ...baseStyle, ...bgBlack };

const colorOption = [
  { name: "black", hex: "#000000", style: black },
  { name: "ltorange", hex: "#E4A934", style: lightOrange },
  { name: "red", hex: "#FF0000", style: red },
  { name: "orange", hex: "#E48A34", style: orange },
  { name: "yellow", hex: "#C2DE4A", style: yellow },
  { name: "teal", hex: "#34E4B7", style: teal },
  { name: "blue", hex: "#1E8DC8", style: blue },
  { name: "purple", hex: "#8B34E4", style: purple },
  { name: "pink", hex: "#DA34E4", style: pink },
  { name: "white", hex: "#D9DDE6", style: white },
];

export function getColors() {
  return colorOption.filter((c) => c);
}
