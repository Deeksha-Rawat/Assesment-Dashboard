import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionItem from "./TransactionItem.tsx";
import { cardDetails, recent } from "../utils/images";
import type { CardData } from "./DashboardLayout";

const transactions = [
  // ... (transactions list remains the same)
  {
    name: "Hamleys",
    amount: "+ S$ 150",
    type: "credit" as const,
    category: "shopping" as const,
    note: "Refund on debit card",
  },
  {
    name: "Hamleys",
    amount: "- S$ 150",
    type: "debit" as const,
    category: "travel" as const,
    note: "Charged to debit card",
  },
  {
    name: "Hamleys",
    amount: "- S$ 150",
    type: "debit" as const,
    category: "marketing" as const,
    note: "Charged to debit card",
  },
  {
    name: "Hamleys",
    amount: "- S$ 150",
    type: "debit" as const,
    category: "shopping" as const,
    note: "Charged to debit card",
  },
];

interface TransactionsProps {
  card?: CardData;
}

export default function Transactions({ card }: TransactionsProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isTransactionsExpanded, setIsTransactionsExpanded] = useState(true);

  return (
    <aside className="bg-transparent px-0 md:px-8">
      <div className="mx-auto flex h-full flex-col gap-6 px-6 lg:px-0">
        {/* Card Details Accordion */}
        <div className="overflow-hidden rounded-sm border border-[#f0f0f0] bg-white shadow-sm">
          <AccordionHeader
            icon={<img src={cardDetails} alt="Card details" className="h-6" />}
            title="Card details"
            expanded={isDetailsExpanded}
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            insideCard
          />
          <AnimatePresence initial={false}>
            {isDetailsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#222222]/60 font-medium">Card Holder</span>
                    <span className="text-[#0C365A] font-bold">{card?.holderName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#222222]/60 font-medium">Card Number</span>
                    <span className="text-[#0C365A] font-bold tracking-wider">
                      {card?.cardNumber ? `${card.cardNumber}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#222222]/60 font-medium">Expiry Date</span>
                    <span className="text-[#0C365A] font-bold">{card?.expiryDate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#222222]/60 font-medium">Status</span>
                    <span className={`font-bold ${card?.isFrozen ? "text-red-500" : "text-[#01D167]"}`}>
                      {card?.isFrozen ? "Frozen" : "Active"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Transactions Accordion */}
        <div className="overflow-hidden rounded-sm border border-[#f0f0f0] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
          <AccordionHeader
            icon={<img src={recent} alt="Recent transactions" className="h-6" />}
            title="Recent transactions"
            expanded={isTransactionsExpanded}
            onClick={() => setIsTransactionsExpanded(!isTransactionsExpanded)}
            insideCard
          />

          <AnimatePresence initial={false}>
            {isTransactionsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6">
                  {transactions.map((transaction, index) => (
                    <TransactionItem key={`${transaction.name}-${index}`} {...transaction} />
                  ))}
                </div>

                <button className="w-full bg-[#EDFFF5] py-4 text-xs font-bold text-[#01D167] border-t border-[#f0f0f0]">
                  View all card transactions
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

type AccordionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  expanded: boolean;
  onClick: () => void;
  insideCard?: boolean;
};

function AccordionHeader({
  icon,
  title,
  expanded,
  onClick,
  insideCard = false,
}: AccordionHeaderProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between border border-[#f0f0f0] opacity-100 bg-[#F5F9FF] px-6 py-5 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-[#F0F6FF] transition-colors ${
        insideCard ? "rounded-none border-0 border-b bg-[#F5F9FF] shadow-none" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full">
          {icon}
        </div>
        <h2 className="text-sm font-bold text-[#0C365A]">{title}</h2>
      </div>

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D7E1F3] text-white">
        {expanded ? <ChevronUp size={16} className="text-[#7F9BB7]" /> : <ChevronDown size={16} className="text-[#7F9BB7]" />}
      </div>
    </div>
  );
}
