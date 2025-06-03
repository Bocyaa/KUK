import { PhotoIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerBar from '../ui/SpinnerBar';
import { TrashIcon } from '@heroicons/react/24/outline';

type ImagePickerPropTypes = {
  src?: string;
  alt?: string;
  form: {
    image?: string;
  };
  updateForm: (fields: Partial<ImagePickerPropTypes['form']>) => void;
  onFileSelect?: (file: File | null) => void;
};

function ImagePicker({
  src,
  alt = 'Recipe image',
  form,
  updateForm,
  onFileSelect,
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

    // await new Promise((resolve) => setTimeout(resolve, 500));

    // Create a local URL for preview
    const imageUrl = URL.createObjectURL(file);
    setLocalImage(imageUrl);
    updateForm({ image: imageUrl }); // For preview only

    // Pass the actual file to the parent
    if (onFileSelect) {
      onFileSelect(file);
    }

    setUploading(false);
  }

  // Prefer localImage over src for preview
  const imageToShow = localImage || src;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#e6e6e6] shadow-sm transition-all dark:border-none">
      <div className="relative">
        <div
          className={`relative flex h-52 items-center justify-center transition-all dark:bg-[#212121]`}
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
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{
                  background: `radial-gradient(ellipse at center, 
      rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)
      var(--tw-gradient-from-position) 
      var(--tw-gradient-via-position) 
      var(--tw-gradient-to-position)`,
                }}
              />
            </>
          ) : uploading ? (
            <SpinnerBar />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <PhotoIcon className="h-28 w-28 text-gray-200 dark:text-[#424242]" />
              <span className="text-xs text-[#5d5d5d] dark:text-[#e3e3e3]">
                Tap to add image
              </span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic"
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-xl opacity-0"
          aria-label="Choose a profile photo"
          tabIndex={-1}
          onChange={handleFileChange}
          disabled={uploading || form.image !== ''}
        />
        {form.image && (
          <button
            className="absolute bottom-0 right-0 m-2 rounded-lg border border-transparent bg-white p-1.5 text-red-600 shadow-sm dark:border-[#424242] dark:bg-[#212121]"
            onClick={() => {
              setLocalImage(null);
              updateForm({ image: '' });
              if (onFileSelect) onFileSelect(null); // Clear the file
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ImagePicker;
