const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = path.resolve(__dirname, '../../../../doc/F10 EL MUNDO DE LOS NIÑOS JULIO.xlsx');

if (!fs.existsSync(excelPath)) {
  console.error("File not found at:", excelPath);
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Get headers and first few rows
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

let headerRowIndex = -1;
for (let i = 0; i < 20; i++) {
  const row = data[i];
  if (!row) continue;
  const rowStr = JSON.stringify(row).toLowerCase();
  // Look for keywords
  if (rowStr.includes("nombre") && (rowStr.includes("documento") || rowStr.includes("niup") || rowStr.includes("identificacion"))) {
    headerRowIndex = i;
    console.log(`Found header at row ${i}:`, row);
    break;
  }
}

if (headerRowIndex === -1) {
  console.log("Could not find header row in first 20 rows. Printing first 10 rows to inspect:");
  for(let i=0; i<10; i++) console.log(`Row ${i}:`, data[i]);
} else {
  console.log("Inspecting subsequent rows to find data start:");
  for(let i=1; i<10; i++) {
    console.log(`Row ${headerRowIndex + i}:`, data[headerRowIndex + i]);
  }
}
