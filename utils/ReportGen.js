const puppeteer = require("puppeteer");
const excel = require("exceljs");
const fs = require("fs");
const csv = require("fast-csv");
const Character = require("../Character/character.schema");
const { Router } = require("express");

const router = Router();

// Step 1: Retrieve Character Data (Assuming you have a function to fetch character data)
async function fetchCharacterData() {
  const characters = await Character.find();
  return characters;
}

// Step 2: Generate PDF Report
async function generatePDFReport(characters) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <html>
      <body>
        <h1>Character Report</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Relations</th>
            <th>Photos</th>
          </tr>
          ${characters
            .map(
              (character) => `
            <tr>
              <td>${character.name}</td>
              <td>${character.age}</td>
              <td>${character.gender}</td>
              <td>${character.occupation}</td>
              <td>${character.relations.join(", ")}</td>
              <td>${character.photos.join(", ")}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
    </html>
  `;

  await page.setContent(content);
  await page.pdf({ path: "character_report.pdf", format: "A4" });

  await browser.close();
}

// Step 3: Generate Excel Report
function generateExcelReport(characters) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Character Report");

  // Add headers
  worksheet.addRow([
    "Name",
    "Age",
    "Gender",
    "Occupation",
    "Relations",
    "Photos",
  ]);

  // Add data
  characters.forEach((character) => {
    worksheet.addRow([
      character.name,
      character.age,
      character.gender,
      character.occupation,
      character.relations.join(", "),
      character.photos.join(", "),
    ]);
  });

  // Save the workbook
  workbook.xlsx.writeFile("character_report.xlsx");
}

// Step 4: Generate CSV Report
function generateCSVReport(characters) {
  const csvData = characters.map((character) => ({
    Name: character.name,
    Age: character.age,
    Gender: character.gender,
    Occupation: character.occupation,
    Relations: character.relations.join(", "),
    Photos: character.photos.join(", "),
  }));

  csv.writeToPath("character_report.csv", csvData, { headers: true });
}

// Step 5: Deliver Reports via API (Assuming you have an Express.js or similar setup)
router.get("/generate-reports", async (req, res) => {
  try {
    const characters = await fetchCharacterData();
    generatePDFReport(characters);
    generateExcelReport(characters);
    generateCSVReport(characters);

    res.json({ success: true, message: "Reports generated and saved." });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Reports could not be generated." });
  }
});

module.exports = router;
