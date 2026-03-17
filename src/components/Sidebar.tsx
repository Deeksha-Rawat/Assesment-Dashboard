import { brandNameWhite, logo, account, card, payments, credit } from "../utils/images";

const navItems = [
  { icon: brandNameWhite, label: "Home" },
  { icon: card, label: "Cards", active: true },
  { icon: payments, label: "Payments" },
  { icon: credit, label: "Credit" },
  { icon: account, label: "Settings" },
];  

export default function Sidebar() {
  return (
    <section className="flex p-12 flex-col bg-[#0C365A] text-white min-h-screen lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:z-30 lg:w-80">
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
        {navItems.map(({ icon, label, active }) => (
          <div
            key={label}
            className={`group flex items-center gap-6 text-lg font-medium transition-all duration-200 cursor-pointer
              ${active ? "text-[#01D167]" : "text-white hover:text-[#01D167]"}
            `}
          >
            <div
              className={`flex items-center justify-center ${active ? "text-[#01D167]" : "text-white"}`}
            >
              <img src={icon} alt={label} className="h-6 w-6" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </section>
  );
}
