import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  className?: string;
  text?: string;
}

export function ImagePlaceholder({ className = '', text = 'No Image' }: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-gradient-to-br from-blue-100 to-teal-100 flex flex-col items-center justify-center ${className}`}
    >
      <ImageIcon className="w-12 h-12 text-blue-400 mb-2" />
      <span className="text-sm text-gray-600 font-medium">{text}</span>
    </div>
  );
}


