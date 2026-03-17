import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import CardActions from "./CardActions";
import Transactions from "./Transactions";
import AddCardModal from "./AddCardModal";
import { PlusCircle, Home, CreditCard, Repeat, ArrowUp, User } from "lucide-react";

export interface CardData {
  id: string;
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isFrozen: boolean;
}

export default function DashboardLayout() {
  const [cards, setCards] = useState<CardData[]>(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem("cards");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback to default if parse fails
      }
    }
    // Default card if nothing in storage
    const defaultCard = {
      id: "1",
      holderName: "Mark Henry",
      cardNumber: "1234567812342020",
      expiryDate: "12/20",
      cvv: "123",
      isFrozen: false,
    };
    // Save default to localStorage
    localStorage.setItem("cards", JSON.stringify([defaultCard]));
    return [defaultCard];
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = (name: string) => {
    const newCard: CardData = {
      id: Math.random().toString(36).substr(2, 9),
      holderName: name,
      cardNumber: Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(""),
      expiryDate: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 24}`,
      cvv: Math.floor(Math.random() * 900 + 100).toString(),
      isFrozen: false,
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setCurrentCardIndex(updatedCards.length - 1); // Switch to the new card
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleToggleFreeze = () => {
    const updatedCards = [...cards];
    updatedCards[currentCardIndex].isFrozen = !updatedCards[currentCardIndex].isFrozen;
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };
  // Keep localStorage in sync if cards change (for edits/removals in future)
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flex min-h-screen bg-white lg:bg-[#f5f7fb]">
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MOBILE HEADER (Dark Blue) */}
      <div className="fixed top-0 left-0 right-0 bg-[#0C365A] lg:hidden -z-10" />

      <main className="grid flex-1 lg:pl-80 lg:pr-16 lg:py-12 relative">
        <div className="mx-auto w-[90%]">
          
          {/* DESKTOP HEADER */}
          <header className="mb-10 hidden lg:block">
            <p className="text-sm font-semibold text-[#222222] mb-4">Available balance</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-10 items-center justify-center rounded-md bg-[#01D167] text-white text-xs font-bold">
                  S$
                </div>
                <h1 className="text-2xl font-bold text-[#222222]">3,000</h1>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-md bg-[#325BAF] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#29476c]"
              >
                <PlusCircle size={16} />
                New card
              </button>
            </div>
          </header>

          {/* MOBILE HEADER CONTENT */}
          <div className="lg:hidden px-6 pt-12 pb-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm font-semibold text-white">Account balance</p>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#01D167]/20">
                <div className="h-3.5 w-3.5 rotate-45 border border-b-2 border-[#01D167]" />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-10 items-center justify-center rounded-md bg-[#01D167] text-white text-xs font-bold">
                  S$
                </div>
                <h1 className="text-2xl font-bold text-white">3,000</h1>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-[#23CEFD]"
              >
                <PlusCircle size={16} />
                New card
              </button>
            </div>

            {/* TABS (Mobile) */}
            <div className="flex gap-8">
              <button className="border-b-2 border-[#23CEFD] pb-1 text-sm font-bold text-white">
                My debit cards
              </button>
              <button className="pb-1 text-sm font-semibold text-white opacity-30">
                All company cards
              </button>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="relative">
            {/* TABS (Desktop) */}
            <div className="mb-6 hidden lg:flex gap-8 border-b border-[#f0f0f0]">
              <button className="border-b-2 border-[#23CEFD] pb-2 text-sm font-bold text-[#222222]">
                My debit cards
              </button>
              <button className="pb-2 text-sm font-semibold text-[#222222] opacity-30">
                All company cards
              </button>
            </div>

            {/* MAIN GRID / MOBILE TRAY */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 rounded-lg lg:border lg:border-[#FCFCFC] lg:bg-white lg:p-10 lg:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              
              {/* CARD SECTION */}
              <div className="flex flex-col mb-4 lg:mb-0">
                <Card
                  card={currentCard}
                  cardsCount={cards.length}
                  currentIndex={currentCardIndex}
                  onPageChange={setCurrentCardIndex}
                />
                {/* Desktop Actions */}
                <div className="hidden lg:block">
                  <CardActions
                    isFrozen={currentCard.isFrozen}
                    onToggleFreeze={handleToggleFreeze}
                  />
                </div>
              </div>

              {/* MOBILE TRAY (WHITE BOTTOM SHEET) */}
              <div className="lg:hidden bg-white rounded-t-3xl mt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] pt-6 pb-24">
                <div className="px-6 mb-8">
                  <CardActions
                    isFrozen={currentCard.isFrozen}
                    onToggleFreeze={handleToggleFreeze}
                  />
                </div>
                <Transactions card={currentCard} />
              </div>

              {/* DESKTOP TRANSACTIONS */}
              <div className="hidden lg:block">
                <Transactions card={currentCard} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#f0f0f0] lg:hidden flex items-center justify-between px-6 z-50">
        <NavItem icon={Home} label="Home" />
        <NavItem icon={CreditCard} label="Cards" active />
        <NavItem icon={Repeat} label="Payments" />
        <NavItem icon={ArrowUp} label="Credit" />
        <NavItem icon={User} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-[#01D167]" : "text-[#dddddd]"}`}>
      <Icon size={24} />
      <span className="text-[10px] font-bold">{label}</span>
    </div>
  );
}
