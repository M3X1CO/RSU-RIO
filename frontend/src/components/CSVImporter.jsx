import React, { useRef, useState } from 'react';
import Papa from 'papaparse';

const CSVImport = ({ addStudent }) => {
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImporting(true);
    setImportStatus('Importing...');
    Papa.parse(file, {
      complete: handleParseComplete,
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleParseComplete = async (results) => {
    let successCount = 0;
    let failCount = 0;

    for (const row of results.data) {
      const student = {};
      for (const [key, value] of Object.entries(row)) {
        if (key !== 'name') {
          student[key] = value || '';
        }
      }
      student.name = [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' ');

      try {
        await addStudent(student);
        successCount++;
      } catch (error) {
        console.error('Error adding student:', error);
        failCount++;
      }
    }

    setImporting(false);
    setImportStatus(`Import complete. ${successCount} students added, ${failCount} failed.`);
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
        <button onClick={() => fileInputRef.current.click()} disabled={importing}>
          {importing ? 'Importing...' : 'Import Students from CSV'}
        </button>
      {importStatus && <p>{importStatus}</p>}
    </div>
  );
};

export default CSVImport;