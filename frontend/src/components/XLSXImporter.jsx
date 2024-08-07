import React, { useRef, useState } from 'react';
import * as ExcelJS from 'exceljs';

const ExcelImporter = ({ addStudent }) => {
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setImporting(true);
      setImportStatus('Importing...');
      
      const workbook = new ExcelJS.Workbook();
      try {
        await workbook.xlsx.load(file);
        const worksheet = workbook.worksheets[0];
        const jsonData = [];

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber > 1) { // Assuming first row is headers
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              const header = worksheet.getRow(1).getCell(colNumber).value;
              rowData[header] = cell.value;
            });
            jsonData.push(rowData);
          }
        });

        await handleParseComplete(jsonData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        setImportStatus('Error parsing Excel file. Please try again.');
      }
    } else {
      setImportStatus('Please upload an Excel file (.xlsx or .xls).');
    }
    setImporting(false);
  };

  const handleParseComplete = async (data) => {
    let successCount = 0;
    let failCount = 0;

    for (const row of data) {
      const student = {};
      for (const [key, value] of Object.entries(row)) {
        if (key !== 'name') {
          student[key] = value !== undefined ? String(value) : '';
        }
      }
      student.name = [row.firstName, row.middleName, row.lastName].filter(Boolean).join(' ');

      try {
        await addStudent(student);
        successCount++;
      } catch (error) {
        console.error('Error adding student:', error);
        failCount++;
      }
    }

    setImportStatus(`Import complete. ${successCount} students added, ${failCount} failed.`);
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()} disabled={importing}>
        {importing ? 'Importing...' : 'Import Students from Excel'}
      </button>
      {importStatus && <p>{importStatus}</p>}
    </div>
  );
};

export default ExcelImporter;