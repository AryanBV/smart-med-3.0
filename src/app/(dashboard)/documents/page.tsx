'use client';

import { useState, useRef } from 'react';
import { Upload, File, FilePlus, Trash2, Search, Info, FileText, AlertCircle } from 'lucide-react';
import { useDocumentProcessor } from '@/components/documents/document-processor';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'David Prescription.pdf', 
      type: 'prescription', 
      date: 'Jan 15, 2024',
      extracted: {
        medications: ['Metformin 1000mg', 'Glimepiride 2mg'],
        bloodPressure: '138/88 mmHg',
        bloodGlucose: '165 mg/dL',
        hbA1c: '7.8%'
      }
    },
    { 
      id: 2, 
      name: 'Michael Prescription.pdf', 
      type: 'prescription', 
      date: 'Jan 28, 2024',
      extracted: {
        medications: ['NovoRapid (Insulin Aspart)', 'Lantus (Insulin Glargine)'],
        bloodPressure: '118/76 mmHg',
        bloodGlucose: '210 mg/dL',
        hbA1c: '8.5%'
      }
    },
    { 
      id: 3, 
      name: 'Sarah Prescription.pdf', 
      type: 'prescription', 
      date: 'Feb 5, 2024',
      extracted: {
        medications: ['Jardiance 10mg', 'Metformin 500mg'],
        bloodPressure: '126/82 mmHg',
        bloodGlucose: '142 mg/dL',
        hbA1c: '7.2%'
      }
    },
    { 
      id: 4, 
      name: 'Emma Prescription.pdf', 
      type: 'prescription', 
      date: 'Feb 10, 2024',
      extracted: {
        medications: ['Multivitamin', 'Vitamin D3 1000 IU'],
        bloodPressure: '110/70 mmHg',
        bloodGlucose: '95 mg/dL',
        hbA1c: '5.4%'
      }
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocumentDetails, setShowDocumentDetails] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);
  
  const { processPDF, isProcessing, progress } = useDocumentProcessor();
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.extracted.medications && doc.extracted.medications.some(med => 
      med.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setExtractedData(null);
    }
  };
  
  const handleProcessFile = async () => {
    if (!uploadedFile) return;
    
    try {
      const data = await processPDF(uploadedFile);
      setExtractedData(data);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };
  
  const handleSaveDocument = () => {
    if (!uploadedFile || !extractedData) return;
    
    const newDocument = {
      id: documents.length + 1,
      name: uploadedFile.name,
      type: 'prescription',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      extracted: {
        medications: extractedData.medications,
        bloodPressure: extractedData.bloodPressure,
        bloodGlucose: extractedData.bloodGlucose,
        hbA1c: extractedData.hbA1c
      }
    };
    
    setDocuments([...documents, newDocument]);
    setShowUploadModal(false);
    setUploadedFile(null);
    setExtractedData(null);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={18} />
          <span>Upload Document</span>
        </button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search documents by name, type, or medication..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] p-4 border-b border-gray-200 font-medium text-gray-500">
          <div className="pr-4">Type</div>
          <div>Name</div>
          <div className="px-4">Date</div>
          <div className="pl-4">Actions</div>
        </div>
        
        {filteredDocuments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="grid grid-cols-[auto_1fr_auto_auto] p-4 items-center hover:bg-gray-50">
                <div className="pr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {doc.extracted.medications ? 
                      doc.extracted.medications.join(', ') : 
                      'No medications extracted'
                    }
                  </p>
                </div>
                <div className="px-4 text-sm text-gray-500">{doc.date}</div>
                <div className="pl-4 flex gap-2">
                  <button 
                    className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
                    onClick={() => setShowDocumentDetails(doc)}
                  >
                    <Info size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FilePlus className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 
                `No documents matching "${searchQuery}"` : 
                'Upload your first document to get started'
              }
            </p>
            {!searchQuery && (
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={18} />
                <span>Upload Document</span>
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Document Details Modal */}
      {showDocumentDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{showDocumentDetails.name}</h2>
                    <p className="text-gray-500">{showDocumentDetails.date}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDocumentDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ?
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Extracted Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Medications</p>
                      <ul className="list-disc list-inside">
                        {showDocumentDetails.extracted.medications.map((med, index) => (
                          <li key={index} className="text-gray-900">{med}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">Blood Pressure</p>
                        <p className="text-gray-900">{showDocumentDetails.extracted.bloodPressure}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500 mb-1">Blood Glucose</p>
                        <p className="text-gray-900">{showDocumentDetails.extracted.bloodGlucose}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">HbA1c</p>
                        <p className="text-gray-900">{showDocumentDetails.extracted.hbA1c}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowDocumentDetails(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">Upload Medical Document</h2>
                  <p className="text-gray-500">Upload a prescription or medical report for analysis</p>
                </div>
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFile(null);
                    setExtractedData(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ?
                </button>
              </div>
              
              <div className="mb-6">
                {!uploadedFile ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#24E5C6]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                    />
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Upload className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Click to upload a document</h3>
                    <p className="text-gray-500 mb-4">
                      PDF files up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">{uploadedFile.name}</h3>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    
                    {isProcessing ? (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Processing document...</span>
                          <span className="text-sm text-gray-500">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#24E5C6]" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : extractedData ? (
                      <div className="mb-4">
                        <div className="flex items-center text-green-500 mb-2">
                          <AlertCircle size={18} className="mr-2" />
                          <span>Document processed successfully</span>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-2">Extracted Information:</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Medications</p>
                              <ul className="list-disc list-inside">
                                {extractedData.medications.map((med, index) => (
                                  <li key={index} className="text-gray-900">{med}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-1">Blood Pressure</p>
                                <p className="text-gray-900">{extractedData.bloodPressure}</p>
                              </div>
                              <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-1">Blood Glucose</p>
                                <p className="text-gray-900">{extractedData.bloodGlucose}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">HbA1c</p>
                                <p className="text-gray-900">{extractedData.hbA1c}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad] mb-4"
                        onClick={handleProcessFile}
                      >
                        Process Document
                      </button>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        onClick={() => {
                          setUploadedFile(null);
                          setExtractedData(null);
                        }}
                      >
                        Cancel
                      </button>
                      
                      {extractedData && (
                        <button
                          className="px-4 py-2 bg-[#24E5C6] text-white rounded-md hover:bg-[#20c9ad]"
                          onClick={handleSaveDocument}
                        >
                          Save Document
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
