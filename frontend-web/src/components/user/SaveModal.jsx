import { X, CheckCircle, AlertTriangle } from "lucide-react"

const SaveModal = ({ isOpen, onClose, onConfirm, userName, isConfirmation = false }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-['Baloo']">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#042C3C] flex items-center">
            {isConfirmation ? (
              <>
                <AlertTriangle className="h-5 w-5 mr-2 text-[#F0B542]" />
                Confirm Changes
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2 text-[#8A973F]" />
                Profile Updated Successfully
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#EA6C7B] rounded-full p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isConfirmation ? (
            <>
              <p className="text-gray-700 mb-6">Are you sure you want to save these changes to your profile?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border-2 border-[#8A973F] text-[#8A973F] rounded-md hover:bg-[#8A973F]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-[#EA6C7B] text-white rounded-md hover:bg-[#EA6C7B]/90 transition-colors"
                >
                  Yes, Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-6">
                {userName ? `${userName}, your` : "Your"} profile information has been successfully updated!
              </p>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#8A973F] text-white rounded-md hover:bg-[#8A973F]/90 transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SaveModal
