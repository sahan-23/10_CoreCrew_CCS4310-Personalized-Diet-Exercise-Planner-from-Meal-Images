import React, { useState, useRef } from 'react';
import { UploadCloudIcon, CameraIcon, ImageIcon, SmartphoneIcon } from 'lucide-react';
export const ImageUpload = ({
  onImageUpload
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };
  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  const processFile = file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };
  const onButtonClick = () => {
    inputRef.current.click();
  };
  const exampleImages = [{
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    alt: 'Vegetable salad'
  }, {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    alt: 'Pancakes with fruits'
  }, {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    alt: 'Pizza'
  }];
  const handleExampleClick = url => {
    onImageUpload(url);
  };
  return <div>
      <div className={`border-2 border-dashed rounded-xl p-10 text-center ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'} transition-all duration-200 ease-in-out`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <UploadCloudIcon className="h-10 w-10 text-green-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Upload your food photo
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Take a clear photo of your meal to get instant nutritional analysis
            and personalized recommendations
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button type="button" onClick={onButtonClick} className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-2">
            <UploadCloudIcon className="h-6 w-6" />
            <span>Upload Image</span>
          </button>
          <button type="button" className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-2">
            <CameraIcon className="h-6 w-6" />
            <span>Take Photo</span>
          </button>
          <button type="button" className="p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all flex flex-col items-center gap-2">
            <ImageIcon className="h-6 w-6" />
            <span>Gallery</span>
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF • Max size: 10MB
        </p>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Or try with an example:
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {exampleImages.map((img, index) => <div key={index} className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleExampleClick(img.url)}>
              <img src={img.url} alt={img.alt} className="w-full h-32 object-cover rounded-lg shadow-md" />
            </div>)}
        </div>
      </div>
    </div>;
};