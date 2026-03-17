import type { ReactNode } from "react";
import { freezeicon, gpay, replacecard, deactivatecard, spendlimit } from "../utils/images";
interface CardActionsProps {
  isFrozen: boolean;
  onToggleFreeze: () => void;
}

type ActionProps = {
  icon: ReactNode | string;
  label: string;
  onClick?: () => void;
};

export default function CardActions({ isFrozen, onToggleFreeze }: CardActionsProps) {
  return (
    <div className="mt-8 flex justify-between rounded-[16px] bg-[#EDF3FF] p-6 max-w-[414px] mx-auto">
      <Action
        icon={freezeicon}
        label={isFrozen ? "Unfreeze card" : "Freeze card"}
        onClick={onToggleFreeze}
      />
      <Action icon={spendlimit} label="Set spend limit" />
      <Action
        icon={gpay}
        label="Add to GPay"
      />
      <Action icon={replacecard} label="Replace card" />
      <Action icon={deactivatecard} label="Cancel card" />
    </div>
  );
}

function Action({ icon, label, onClick }: ActionProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center text-center gap-2 group hover:opacity-80 transition-opacity"
    >
      <div className=" items-center justify-center rounded-full  text-white">
        {typeof icon === "string" ? (
          <img src={icon} alt={label} className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[11px] font-medium text-[#0C365A] max-w-[60px] leading-tight">{label}</span>
    </div>
  );
}
