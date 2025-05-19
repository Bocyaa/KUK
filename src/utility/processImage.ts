/**
 * Processes an image file to crop to album orientation and optimize file size
 * @param file Original image file
 * @returns Promise with processed file
 */

async function processImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Target dimensions for album orientation (3:2 aspect ratio)
      const targetWidth = 1200;
      const targetHeight = 800;

      // Calculate dimensions for center crop
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      // Determine cropping based on aspect ratio
      const sourceAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      if (sourceAspect > targetAspect) {
        // Image is wider than target - crop sides
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        // Image is taller than target - crop top/bottom
        sourceHeight = img.width / targetAspect;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Create canvas for resizing/cropping
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw cropped and resized image to canvas
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      // Start with high quality and decrease until under 150KB
      const compressImage = (quality: number): void => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            if (blob.size <= 150 * 1024 || quality <= 0.2) {
              // We found a good quality or hit minimum threshold
              const optimizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(optimizedFile);
            } else {
              // Reduce quality and try again
              compressImage(quality - 0.1);
            }
          },
          'image/jpeg',
          quality,
        );
      };

      // Start compression process with high quality (0.9)
      compressImage(0.9);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export default processImage;
