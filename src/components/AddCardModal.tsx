import React, { useState } from "react";
import { X } from "lucide-react";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (name: string) => void;
}

export default function AddCardModal({
  isOpen,
  onClose,
  onAddCard,
}: AddCardModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCard(name);
      setName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0C365A]">Add New Card</h2>
          <button onClick={onClose} className="text-[#222222] hover:opacity-70">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="cardName"
              className="mb-2 block text-sm font-semibold text-[#222222]"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#f0f0f0] px-4 py-3 text-sm focus:border-[#01D167] focus:outline-none"
              placeholder="Enter name"
              autoFocus
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#f0f0f0] py-3 text-sm font-bold text-[#222222] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#01D167] py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
