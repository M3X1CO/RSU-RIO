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

        // Get headers from the first row
        const headers = worksheet.getRow(1).values.slice(1);  // slice to remove the first empty cell

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber > 1) { // Skip the header row
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              const header = headers[colNumber - 1];
              if (header) {
                rowData[header] = cell.value || '';
              }
            });
            if (Object.keys(rowData).length > 0) {
              jsonData.push(rowData);
            }
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
      const student = { ...row };
      
      // Combine firstName, middleName, and lastName into name
      student.name = [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' ');
      
      // Remove individual name fields if you don't want to keep them
      delete student.firstName;
      delete student.middleName;
      delete student.lastName;

      // Remove any fields with '[object Object]' or 'null' values
      for (const [key, value] of Object.entries(student)) {
        if (value === '[object Object]' || value === 'null') {
          delete student[key];
        }
      }

      // Only add student if there's actual data
      if (Object.keys(student).length > 1) {  // > 1 because we always have 'name'
        try {
          await addStudent(student);
          successCount++;
        } catch (error) {
          console.error('Error adding student:', error);
          failCount++;
        }
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