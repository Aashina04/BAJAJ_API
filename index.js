import express from "express";

const app = express();
app.use(express.json());

//dummy data
const FULL_NAME = "aashina_saxena";
const DOB = "14012004"; 
const EMAIL = "aashinasaxena14@gmail.com";
const ROLL_NUMBER = "22BCE10114";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let concatLetters = "";
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatLetters += item;
      } else {
        special_characters.push(item);
      }
    });

    let reversed = concatLetters.split("").reverse().join("");
    let concat_string = reversed
      .split("")
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
