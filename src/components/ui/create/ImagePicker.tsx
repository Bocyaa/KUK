import { PhotoIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerBar from '../SpinnerBar';

type ImagePickerPropTypes = {
  src?: string;
  alt?: string;
  form: {
    title: string;
    description?: string;
    difficulty: string;
    image?: string;
  };
  updateForm: (fields: Partial<ImagePickerPropTypes['form']>) => void;
};

function ImagePicker({
  src,
  alt = 'Recipe image',
  updateForm,
}: ImagePickerPropTypes) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);

  // Clean up object URL when component unmounts or localImage changes
  useEffect(() => {
    return () => {
      if (localImage) {
        URL.revokeObjectURL(localImage);
      }
    };
  }, [localImage]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or HEIC images are allowed.');
      return;
    }

    setUploading(true);

    // Clean up previous object URL if any
    if (localImage) {
      URL.revokeObjectURL(localImage);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create a local URL for preview
    const imageUrl = URL.createObjectURL(file);
    setLocalImage(imageUrl);
    updateForm({ image: imageUrl }); // sync with parent form

    setUploading(false);
  }

  // Prefer localImage over src for preview
  const imageToShow = localImage || src;

  return (
    <div className="flex flex-col transition-all">
      <div className="relative">
        <div
          className={`relative flex h-52 items-center justify-center overflow-hidden rounded-2xl border bg-white transition-all hover:ring-1 hover:ring-blue-400 dark:border dark:border-[#1c1c1c] dark:bg-[#1c1c1e]`}
        >
          {imageToShow ? (
            <>
              <img
                src={imageToShow}
                alt={alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {/* Vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0, 0, 0, 0.7) 100%)',
                }}
              />
            </>
          ) : uploading ? (
            <SpinnerBar />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <PhotoIcon className="h-28 w-28 text-gray-200 dark:text-[#5454625b]" />
              <span className="text-xs text-[#6b7280] dark:text-[#545462]">
                Click to add image
              </span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic"
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0"
          aria-label="Choose a profile photo"
          tabIndex={-1}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      {localImage && (
        <button
          className="flex justify-end"
          onClick={() => {
            setLocalImage(null);
            updateForm({ image: '' });
          }}
        >
          <span className="mt-2 pr-2 text-xs font-semibold text-[#0094f6]">
            Remove
          </span>
        </button>
      )}
    </div>
  );
}

export default ImagePicker;
