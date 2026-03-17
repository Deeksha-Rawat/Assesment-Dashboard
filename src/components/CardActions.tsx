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
}

type ActionProps = {
  icon: ReactNode | string;
  label: string;
  onClick?: () => void;
};

export default function CardActions({
  isFrozen,
  onToggleFreeze,
}: CardActionsProps) {
  return (
    <div className="flex justify-between items-start bg-[#EDF3FF] md:bg-[#EDF3FF] p-6 rounded-[16px] md:rounded-lg">
      <Action
        icon={freezeicon}
        label={isFrozen ? "Unfreeze card" : "Freeze card"}
        onClick={onToggleFreeze}
      />
      <Action icon={spendlimit} label="Set spend limit" />
      <Action icon={gpay} label="Add to GPay" />
      <Action icon={replacecard} label="Replace card" />
      <Action icon={deactivatecard} label="Cancel card" />
    </div>
  );
}

function Action({ icon, label, onClick }: ActionProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center text-center gap-2 group hover:opacity-80 transition-opacity flex-1 min-w-0"
    >
      <div className="flex items-center justify-center text-white">
        {typeof icon === "string" ? (
          <img src={icon} alt={label} className="w-8 h-8 md:w-8 md:h-8 object-contain" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[10px] md:text-[11px] font-medium text-[#0C365A] leading-tight text-center">
        {label}
      </span>
    </div>
  );
}
