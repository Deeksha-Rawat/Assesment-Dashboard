import { useState } from "react";
import { Eye } from "lucide-react";
import { logoWhite, visa } from "../utils/images";
import type { CardData } from "./DashboardLayout";

interface CardProps {
  card: CardData;
  cardsCount: number;
  currentIndex: number;
  onPageChange: (index: number) => void;
}

export default function Card({
  card,
  cardsCount,
  currentIndex,
  onPageChange,
}: CardProps) {
  const [showNumber, setShowNumber] = useState(false);

  const formatCardNumber = (number: string) => {
    return [
      number.slice(0, 4),
      number.slice(4, 8),
      number.slice(8, 12),
      number.slice(12, 16),
    ];
  };

  const formattedNumber = formatCardNumber(card.cardNumber);

  return (
    <section className="relative w-full max-w-103.5">
      {/* Toggle Button */}
      <div className="flex justify-end absolute -top-11 right-0 z-10 ">
        <button
          onClick={() => setShowNumber((prev) => !prev)}
          className="inline-flex items-center gap-2 text-[10px] lg:text-xs font-bold text-[#01D167] bg-white pt-2 pb-4 px-4 rounded-t-xl cursor-pointer translate-y-4"
        >
          <Eye size={14} />
          {showNumber ? "Hide card number" : "Show card number"}
        </button>
      </div>

      {/* Card */}
      <div
        className={`w-full aspect-[1.58/1] rounded-2xl bg-[#01D167] p-6 text-white shadow-lg flex flex-col justify-between relative z-20 transition-opacity duration-300 ${
          card.isFrozen ? "opacity-50" : "opacity-100"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-end">
          <img src={logoWhite} alt="Aspire Logo" className="h-6" />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-wide">
            {card.holderName}
          </h2>

          {/* Card Number */}
          <div className="flex items-center gap-6 text-lg font-bold">
            {formattedNumber.map((group, idx) => (
              <div key={idx} className="flex gap-1.5">
                {showNumber || idx === 3
                  ? // SHOW DIGITS
                    group
                      .split("")
                      .map((digit, i) => <span key={i}>{digit}</span>)
                  : // MASKED DOTS
                    [...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2.5 w-2.5 rounded-full bg-white"
                      />
                    ))}
              </div>
            ))}
          </div>

          {/* Expiry + CVV */}
          <div className="flex items-center gap-8 text-sm font-bold">
            <span>Thru: {card.expiryDate}</span>
            <span className="flex items-baseline gap-1">
              CVV:
              <span className="text-lg leading-none pt-1">
                {showNumber ? card.cvv : "***"}
              </span>
            </span>
          </div>
        </div>

        {/* Visa */}
        <div className="flex justify-end">
          <img src={visa} alt="Visa" className="h-6 lg:h-8 w-18 lg:w-20" />
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: cardsCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-4 bg-[#01d167]" : "w-2 bg-[#01d167]/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
