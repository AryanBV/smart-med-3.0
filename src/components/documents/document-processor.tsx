'use client';

import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Process PDF file
  const processPDF = async (file) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Extract text from first page using Tesseract
      const pages = pdfDoc.getPages();
      if (pages.length === 0) {
        throw new Error('No pages found in PDF');
      }
      
      // Convert first page to image (simplified approach)
      // In a real app, you would use something like pdf.js to render the page to a canvas
      
      // Create Tesseract worker
      const worker = await createWorker({
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });
      
      // For demonstration purposes, let's assume we've converted the PDF to an image
      // and extracted text using Tesseract
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      // Simulate OCR extraction (in a real app, this would process the actual PDF content)
      // Wait for a moment to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProgress(100);
      
      // Extract medicine information (this is a simplified example)
      const medications = [];
      const bloodPressure = {};
      const bloodGlucose = {};
      const hbA1c = {};
      
      // Mock extraction result based on file name
      if (file.name.toLowerCase().includes('david')) {
        medications.push('Metformin 1000mg', 'Glimepiride 2mg');
        bloodPressure.value = '138/88 mmHg';
        bloodGlucose.value = '165 mg/dL';
        hbA1c.value = '7.8%';
      } else if (file.name.toLowerCase().includes('michael')) {
        medications.push('NovoRapid (Insulin Aspart)', 'Lantus (Insulin Glargine)');
        bloodPressure.value = '118/76 mmHg';
        bloodGlucose.value = '210 mg/dL';
        hbA1c.value = '8.5%';
      } else if (file.name.toLowerCase().includes('sarah')) {
        medications.push('Jardiance 10mg', 'Metformin 500mg');
        bloodPressure.value = '126/82 mmHg';
        bloodGlucose.value = '142 mg/dL';
        hbA1c.value = '7.2%';
      } else if (file.name.toLowerCase().includes('emma')) {
        medications.push('Multivitamin', 'Vitamin D3 1000 IU');
        bloodPressure.value = '110/70 mmHg';
        bloodGlucose.value = '95 mg/dL';
        hbA1c.value = '5.4%';
      }
      
      await worker.terminate();
      setIsProcessing(false);
      
      return {
        medications,
        bloodPressure: bloodPressure.value,
        bloodGlucose: bloodGlucose.value,
        hbA1c: hbA1c.value,
      };
    } catch (error) {
      console.error('Error processing document:', error);
      setIsProcessing(false);
      throw error;
    }
  };
  
  return {
    processPDF,
    isProcessing,
    progress,
  };
}
