/*
    Convert HEXADECIMAL to RGB
    function that accepts a 6 character hexadecimal value (FF0A2B)

    Steps:
    1. numbers are worth their value, letters A-F are assigned values 10-15
    2. the value is split into pairs of 2: (FF0A2B looks like 'FF', '0A', '2B')
    3. check if first or second char is number or letter
    4. first char's value is multiplied by 16, the second char is original value 0-15
    5. r value is now sum of first char and second char
    6. repeat steps 3-5 to get g and b value
    7. return array of rgb values [255, 10, 43]

    Edges:
    - if the number is more than 6 chars (indicating alpha code) -- not needed, this is directly implemented in the react code

    - if the number is 0, as 0 is a falsy non-number value
*/
export function convertHexToRGB(hex) {
  const letterVals = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
  let rgbValue = [];

  for (let i = 0; i < hex.length; i += 2) {
    let sum = 0;
    let firstChar = hex[i];
    let secondChar = hex[i + 1];

    // add zero if number is 0 (zero is not classified as a number...)
    if (firstChar === "0" || secondChar === "0") sum += 0;

    // the first value is either the number or the letter value of A-F * 16
    if (Number(firstChar)) {
      sum += Number(firstChar) * 16;
    } else if (firstChar !== "0") {
      sum += letterVals[firstChar.toUpperCase()] * 16;
    }

    if (Number(secondChar)) {
      sum += Number(secondChar);
    } else if (secondChar !== "0") {
      sum += letterVals[secondChar.toUpperCase()];
    }

    // after both numbers are added to
    rgbValue.push(sum);
  }

  return rgbValue;
}
// console.log(convertHexToRGB("54AF20"));
// let rgbValue = convertHexToRGB("6A450a");
// let rgbValue2 = convertHexToRGB("ff89E5");
// let rgbValue3 = convertHexToRGB("ff0a2b");

// console.log(rgbValue);
// console.log(rgbValue2);
// console.log(rgbValue3);

/*
    Convert RGB to HEX

    function that accepts array of 3 numbers [255, 10, 43]

    Steps
    1. for each number in array, divide the entire number by 16 -- this will more than likely return a decimal
    2. split into string so that I can split based on the decimal
    3. find a way to convert split[1] back to .value -- parseFloat allows me to concatenate 0. with split[1]

    4. multiply the split[1] (number after decimal) by 16 then floor it (round down so I don't have to subtract 1)
    5. since hexidecimal has 16 chars we need char at whatever number was divided

    6. get index of first value and second value
    7. when all 3 numbers return 6 hexidecimal chars, the hexidecimal string is returned
*/
export function convertRGBToHex(rgbVals) {
  let hexChars = "0123456789ABCDEF";
  let hexValue = "#";
  for (let i = 0; i < rgbVals.length; i++) {
    let decValue = rgbVals[i] / 16;
    let valuePair = decValue.toString().split(".");

    let firstValue = parseInt(valuePair[0]);
    let secondValue = Math.floor(parseFloat("0." + valuePair[1]) * 16);

    hexValue += hexChars.charAt(firstValue);
    hexValue += hexChars.charAt(secondValue);
  }

  return hexValue;
}
