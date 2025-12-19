const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = path.resolve(__dirname, '../../../../doc/F10 EL MUNDO DE LOS NIÑOS JULIO.xlsx');
const outputPath = path.resolve(__dirname, '../../mobile-app/src/lib/beneficiaries_seed.json');

if (!fs.existsSync(excelPath)) {
  console.error("File not found at:", excelPath);
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
const beneficiaries = [];
const startRow = 9; // Based on analysis

for (let i = startRow; i < data.length; i++) {
  const row = data[i];
  // Stop if row is empty or doesn't have a name
  if (!row || !row[1]) continue;
  
  // Check if it's a summary row (sometimes they appear at bottom) based on having no ID
  // But Row 11 had 'SD' as ID.
  
  const rawId = row[2];
  const documentId = (rawId === undefined || rawId === null) ? 'SD' : rawId.toString();
  
  const beneficiary = {
    excelId: i.toString(),
    fullName: row[1] ? row[1].toString().trim() : 'Unknown',
    documentId: documentId,
    groupType: 'Gestante/Lactante', // Default based on header
    zone: 'Zona 3', // Hardcoded for now as per image
    centerName: 'EL MUNDO DE LOS NIÑOS' // Inferred from filename
  };
  
  beneficiaries.push(beneficiary);
}

console.log(`Extracted ${beneficiaries.length} beneficiaries.`);
fs.writeFileSync(outputPath, JSON.stringify(beneficiaries, null, 2));
console.log(`Saved to ${outputPath}`);
