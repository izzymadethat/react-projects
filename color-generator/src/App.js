/**
 *  Random color generator - NO API
 *
 *
 * a page that generates a random hexidecimal color
 * user clicks button to generate
 * a string of 6 random characters (A-F,0-9) are generated
 * If the color exists, switch the background to the color
 * User can copy the color
 */

import { useState } from "react";
import "./App.css";

function App() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function randomColorMultiplier(length) {
    return Math.floor(Math.random() * length);
  }

  function handleGenerateHexColor() {
    // generate random chars
    // join together
    // set color state to generated character
    let max = 6;
    let hexidecimalChars = "0123456789ABCDEF";
    let newColor = "#";

    for (let i = 0; i < max; i++) {
      newColor += hexidecimalChars.charAt(
        randomColorMultiplier(hexidecimalChars.length)
      );
    }

    setColor(newColor);
  }

  function handleGenerateRGBColor() {
    const r = randomColorMultiplier(256);
    const g = randomColorMultiplier(256);
    const b = randomColorMultiplier(256);

    setColor(`rgb(${r},${g},${b})`);
  }

  function handleCopyColor() {
    setIsCopied(true);
    navigator.clipboard.writeText(color);

    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <div className="App" style={{ background: color ?? "" }}>
      {/* Color Picker Component */}
      <div>
        <div className="buttons">
          <button onClick={() => setColorType("hex")}>
            Use Hexidecimal Value
          </button>
          <button onClick={() => setColorType("rgb")}>Use RGB Value</button>
          <button
            onClick={
              colorType === "hex"
                ? handleGenerateHexColor
                : handleGenerateRGBColor
            }
          >
            Generate Color
          </button>
          {color && (
            <button onClick={handleCopyColor} disabled={isCopied}>
              {isCopied ? "Copied!" : `Copy this color: ${color}`}
            </button>
          )}
          {color && <button onClick={() => setColor("")}>Reset</button>}
        </div>
        <h1 className="title">RANDOM COLOR GENERATOR</h1>

        <div className="color-name">
          <p>Color Type: {colorType.toUpperCase()}</p>
          <div>
            {color ? <h2>{color}</h2> : <h2>Select a color to generate</h2>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
