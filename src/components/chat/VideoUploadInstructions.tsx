import { motion } from 'framer-motion'

interface VideoUploadInstructionsProps {
  isVisible: boolean
  onClose: () => void
}

export default function VideoUploadInstructions({ isVisible, onClose }: VideoUploadInstructionsProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-32 right-6 bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm z-50"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-slate-800">Upload Clara Video</h4>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="text-sm text-slate-600 space-y-2">
        <p>To use your Clara video as the avatar:</p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Click the Clara voice button</li>
          <li>Click the video upload button in the header</li>
          <li>Select your clara.mp4 file</li>
          <li>Clara will animate when speaking!</li>
        </ol>
        
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mt-3">
          <p className="text-xs text-amber-800">
            <strong>Tip:</strong> Place your clara.mp4 file in an easy-to-find location for quick upload.
          </p>
        </div>
      </div>
    </motion.div>
  )
}