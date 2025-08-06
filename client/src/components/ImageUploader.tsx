import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, XIcon } from 'lucide-react';
const ImageUploader = ({
  onUpload,
  isLoading,
  onCancel
}) => {
  const [preview, setPreview] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  }, [onUpload]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    disabled: isLoading
  });
  return <div className="space-y-4">
      {!preview ? <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`} data-aos="fade-up">
          <input {...getInputProps()} />
          <div className="space-y-2">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? 'Drop the image here' : 'Drag & drop a meal photo'}
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPEG, PNG (max 10MB)
            </p>
          </div>
        </div> : <div className="relative" data-aos="zoom-in">
          <img src={preview} alt="Meal preview" className="w-full h-64 object-cover rounded-lg" />
          {isLoading && <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-indigo-600">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing your meal...
              </div>
            </div>}
        </div>}
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isLoading}>
          Cancel
        </button>
        {preview && !isLoading && <button type="button" onClick={() => setPreview(null)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <XIcon className="-ml-1 mr-2 h-5 w-5" />
            Remove
          </button>}
      </div>
    </div>;
};
export default ImageUploader;