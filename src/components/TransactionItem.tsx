
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { filestorage, plane, megaphone, wallet } from "../utils/images";
type TransactionItemProps = {
  name: string;
  amount: string;
  type: "credit" | "debit";
  category: "shopping" | "travel" | "marketing";
  note: string;
};

export default function TransactionItem({
  name,
  amount,
  type,
  category,
  note,
}: TransactionItemProps) {
  const categoryMeta: Record<
    TransactionItemProps["category"],
    { icon: ReactNode; circleClass: string; iconClass: string }
  > = {
    shopping: {
      icon: <img src={filestorage} alt="File storage" className="h-4" />,
      circleClass: "bg-[#009DFF]/10",
      iconClass: "text-[#009DFF]",
    },
    travel: {
      icon: <img src={plane} alt="Plane" className="h-4" />,
      circleClass: "bg-[#00D6B5]/10",
      iconClass: "text-[#00D6B5]",
    },
    marketing: {
      icon: <img src={megaphone} alt="Megaphone" className="h-4" />,
      circleClass: "bg-[#F25195]/10",
      iconClass: "text-[#F25195]",
    },
  };

  const meta = categoryMeta[category];

  return (
    <div className="flex items-start gap-3 py-5 border-b border-[#edf1f7] last:border-0">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${meta.circleClass} ${meta.iconClass}`}
      >
        {meta.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-[#222222]">{name}</p>
            <p className="mt-0.5 text-xs text-[#aaaaaa]">20 May 2020</p>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm font-bold ${
                type === "credit" ? "text-[#01d167]" : "text-[#222222]"
              }`}
            >
              {amount}
            </span>
            <ChevronRight size={14} className="text-[#d7dce7]" />
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#325BAF]">
          <div className="flex h-5 w-6 items-center justify-center rounded-lg bg-[#325BAF] text-white">
            <img src={wallet} alt="Wallet" className="h-2" />
          </div>
          <span>{note}</span>
        </div>
      </div>
    </div>
  );
}
