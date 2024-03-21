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
  const [color, setColor] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function handleGenerateColor() {
    // generate random chars
    // join together
    // set color state to generated character
    let max = 6;
    let hexidecimalChars = "ABCDEF0123456789";
    let newColor = "#";

    for (let i = 0; i < max; i++) {
      newColor += hexidecimalChars.charAt(
        Math.random() * hexidecimalChars.length
      );
    }

    setColor(newColor);
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
          <button onClick={handleGenerateColor}>Generate Color</button>
          {color && (
            <button onClick={handleCopyColor} disabled={isCopied}>
              {isCopied ? "Copied!" : `Copy this color: ${color}`}
            </button>
          )}
          {color && <button onClick={() => setColor("")}>Reset</button>}
        </div>
        <h1 className="title">RANDOM COLOR GENERATOR</h1>

        <div className="color-name">
          <p>Color:</p>
          <div>
            {color ? <h2>{color}</h2> : <h2>Select a color to generate</h2>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
