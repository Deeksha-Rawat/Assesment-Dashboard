import { useState } from "react";
import { Eye } from "lucide-react";
import { logoWhite, visa } from "../utils/images";
import type { CardData } from "./DashboardLayout";

interface CardProps {
  card: CardData;
}

export default function Card({ card }: CardProps) {
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
    <section className="relative w-full mx-auto pt-12 lg:pt-0">
      {/* Toggle Button */}
      <div
        className={`flex justify-end absolute top-6  lg:-top-8 right-0 z-0 w-full ${card.isFrozen ? "pointer-events-none opacity-50" : ""}`}
      >
        <button
          onClick={() => setShowNumber((prev) => !prev)}
          className={`inline-flex pb-3 items-center gap-2 text-[10px] lg:text-xs font-bold text-[#01D167] bg-white py-2 px-3 lg:px-4 rounded-t-lg cursor-pointer ${card.isFrozen ? "pointer-events-none opacity-50 bg-[darkslategrey]" : ""}`}
        >
          <Eye size={12} className="lg:w-3.5 lg:h-3.5" />
          <span className="whitespace-nowrap">
            {showNumber ? "Hide card number" : "Show card number"}
          </span>
        </button>
      </div>

      {/* Card */}
      <div
        className={`w-full aspect-[1.58/1] rounded-2xl bg-[#01D167] p-5 lg:p-6 text-white shadow-lg flex flex-col justify-between relative transition-opacity duration-300 ${
          card.isFrozen ? "opacity-50" : "opacity-100"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-end">
          <img src={logoWhite} alt="Aspire Logo" className="h-5 lg:h-6" />
        </div>

        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-xl lg:text-2xl font-bold tracking-wide">
            {card.holderName}
          </h2>

          {/* Card Number */}
          <div className="flex items-center gap-3 lg:gap-4 text-base lg:text-lg font-bold">
            {formattedNumber.map((group, idx) => (
              <div key={idx} className="flex gap-1 min-w-10 lg:min-w-12">
                {showNumber || idx === 3
                  ? // SHOW DIGITS
                    group.split("").map((digit, i) => (
                      <span
                        key={i}
                        className="inline-block w-[0.5em] text-center"
                      >
                        {digit}
                      </span>
                    ))
                  : // MASKED DOTS
                    [...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className="inline-block w-[0.5em] text-center"
                      >
                        •
                      </span>
                    ))}
              </div>
            ))}
          </div>

          {/* Expiry + CVV */}
          <div className="flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-bold">
            <span className="whitespace-nowrap">Thru: {card.expiryDate}</span>
            <span className="flex items-baseline gap-1 whitespace-nowrap">
              CVV:
              <span className="text-base lg:text-lg leading-none">
                {showNumber ? card.cvv : "***"}
              </span>
            </span>
          </div>
        </div>

        {/* Visa */}
        <div className="flex justify-end">
          <img
            src={visa}
            alt="Visa"
            className="h-5 lg:h-8 w-16 lg:w-20 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
