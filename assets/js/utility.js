function handleFileUpload() {
    const fileInput = document.getElementById('school_id_file');
    const uploadText = document.querySelector('.upload-text');
    const imagePreview = document.getElementById('image-preview');


    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]; 
      const fileName = file.name; 
      uploadText.textContent = `Uploaded: ${fileName}`;
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        imagePreview.src = e.target.result; 
        imagePreview.style.display = 'block'; 
        imagePreview.style.maxWidth = '100px'; 
        imagePreview.style.height = 'auto'; 
        imagePreview.style.marginTop = '10px';
        imagePreview.style.border = '1px solid #ccc'; 
        imagePreview.style.borderRadius = '4px'; 
      };
      fileReader.readAsDataURL(file); 
    } else {
      uploadText.textContent = 'Upload your school ID';
      imagePreview.style.display = 'none';
    }
  }