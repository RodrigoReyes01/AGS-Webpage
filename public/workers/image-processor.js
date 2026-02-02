// Web Worker for heavy image processing tasks
// Offloads computation from main thread to improve performance

self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'PROCESS_IMAGE':
      processImage(data);
      break;
    case 'RESIZE_IMAGE':
      resizeImage(data);
      break;
    case 'OPTIMIZE_IMAGE':
      optimizeImage(data);
      break;
    default:
      self.postMessage({ error: 'Unknown task type' });
  }
});

function processImage(data) {
  try {
    // Simulate heavy image processing
    const { imageData, width, height } = data;
    
    // Example: Apply filters, transformations, etc.
    // This is where you'd put actual image processing logic
    
    self.postMessage({
      type: 'PROCESS_IMAGE_COMPLETE',
      result: { processed: true, width, height },
    });
  } catch (error) {
    self.postMessage({
      type: 'PROCESS_IMAGE_ERROR',
      error: error.message,
    });
  }
}

function resizeImage(data) {
  try {
    const { width, height, targetWidth, targetHeight } = data;
    
    // Calculate aspect ratio and resize
    const aspectRatio = width / height;
    let newWidth = targetWidth;
    let newHeight = targetHeight;
    
    if (targetWidth / targetHeight > aspectRatio) {
      newWidth = targetHeight * aspectRatio;
    } else {
      newHeight = targetWidth / aspectRatio;
    }
    
    self.postMessage({
      type: 'RESIZE_IMAGE_COMPLETE',
      result: { width: newWidth, height: newHeight },
    });
  } catch (error) {
    self.postMessage({
      type: 'RESIZE_IMAGE_ERROR',
      error: error.message,
    });
  }
}

function optimizeImage(data) {
  try {
    // Optimization logic here
    self.postMessage({
      type: 'OPTIMIZE_IMAGE_COMPLETE',
      result: { optimized: true },
    });
  } catch (error) {
    self.postMessage({
      type: 'OPTIMIZE_IMAGE_ERROR',
      error: error.message,
    });
  }
}
