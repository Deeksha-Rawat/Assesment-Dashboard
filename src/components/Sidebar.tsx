import {
  Home,
  CreditCard,
  Repeat,
  ArrowUp,
  User,
} from "lucide-react";
import { logo } from "../utils/images";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: CreditCard, label: "Cards", active: true },
  { icon: Repeat, label: "Payments" },
  { icon: ArrowUp, label: "Credit" },
  { icon: User, label: "Settings" },
];

export default function Sidebar() {
  return (
    <section className="flex px-12 py-12 flex-col bg-[#0C365A] text-white min-h-screen lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:z-30 lg:w-80">
      
      {/* TOP SECTION */}
      <div className="mb-16">
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-4">
          <img src={logo} alt="Aspire Logo" className="h-8 w-24" />
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm leading-relaxed text-[#7F9BB7] opacity-70">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-10">
        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`group flex items-center gap-6 text-lg font-medium transition-all duration-200 cursor-pointer
              ${active 
                ? "text-[#01D167]" 
                : "text-white hover:text-[#01D167]"
              }
            `}
          >
            <div className={`flex items-center justify-center ${active ? "text-[#01D167]" : "text-white"}`}>
              <Icon
                size={28}
                strokeWidth={2.5}
              />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </section>
  );
}
