import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function downloadFile(url:string, fileName:string) {
  // Create temporary anchor element
  const link = document.createElement('a');
  
  // Set URL and filename

  link.href = url;
  link.download = fileName || 'downloaded-file';

  // console.log("inside downloadFile", url);

  // Handle different browser behaviors
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 100)
}
