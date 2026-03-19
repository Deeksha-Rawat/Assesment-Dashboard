import type { ReactNode } from "react";
import {
  freezeicon,
  gpay,
  replacecard,
  deactivatecard,
  spendlimit,
} from "../utils/images";

interface CardActionsProps {
  isFrozen: boolean;
  onToggleFreeze: () => void;
  onCancelCard: () => void;
}

type ActionProps = {
  icon: ReactNode | string;
  label: string;
  onClick?: () => void;
};

export default function CardActions({
  isFrozen,
  onToggleFreeze,
  onCancelCard,
}: CardActionsProps) {
  return (
    <div className="grid grid-cols-5 gap-1 md:gap-2 bg-[#EDF3FF] p-4 lg:p-6 rounded-2xl lg:rounded-lg w-full">
      <Action
        icon={freezeicon}
        label={isFrozen ? "Unfreeze card" : "Freeze card"}
        onClick={onToggleFreeze}
      />
      <Action icon={spendlimit} label="Set spend limit" />
      <Action icon={gpay} label="Add to GPay" />
      <Action icon={replacecard} label="Replace card" />
      <Action icon={deactivatecard} label="Cancel card" onClick={onCancelCard} />
    </div>
  );
}

function Action({ icon, label, onClick }: ActionProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center text-center gap-2 group hover:opacity-80 transition-opacity w-full max-w-16.25 mx-auto wrap-break-word"
    >
      <div className="flex items-center justify-center text-white">
        {typeof icon === "string" ? (
          <img src={icon} alt={label} className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[10px] lg:text-[11px] font-medium text-[#0C365A] leading-tight text-center">
        {label}
      </span>
    </div>
  );
}
