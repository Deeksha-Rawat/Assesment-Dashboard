import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import CardActions from "./CardActions";
import Transactions from "./Transactions";
import AddCardModal from "./AddCardModal";
import {
  brandName,
  account,
  card,
  payments,
  credit,
  brandNameWhite,
} from "../utils/images";
import { PlusCircle } from "lucide-react";

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
        // fallback
        return [];
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
      cardNumber: Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 10),
      ).join(""),
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
    updatedCards[currentCardIndex].isFrozen =
      !updatedCards[currentCardIndex].isFrozen;
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };
  // Keep localStorage in sync if cards change
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flex min-h-screen w-full bg-[#0C365A] lg:bg-[#f5f7fb]">
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 lg:px-16 lg:py-12 relative">
        <div className="mx-auto w-full max-w-300">
          {/* MOBILE HEADER (Dark Blue, Fixed) */}
          <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0C365A] z-0 h-125" />

          <div className="relative z-10">
            {/* TOP SECTION (Balance + Tabs + Card) */}
            <div className="lg:static sticky top-0 bg-[#0C365A] lg:bg-transparent pt-8 lg:pt-0 px-6 lg:px-0 pb-4 lg:pb-0 z-10">
              <header className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-white lg:text-[#222222] mb-3">
                      Account balance
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-10 items-center justify-center rounded-md bg-[#01D167] text-white text-[12px] font-bold">
                        S$
                      </div>
                      <h1 className="text-2xl font-bold text-white lg:text-[#222222]">
                        3,000
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="lg:hidden mb-4">
                      <img
                        src={brandName}
                        alt="brandName"
                        className="h-6 w-6"
                      />
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 text-xs font-bold text-[#23CEFD] lg:bg-[#325BAF] lg:px-4 lg:py-2.5 lg:text-white lg:rounded-md transition-all hover:opacity-80"
                    >
                      <PlusCircle size={16} />
                      New card
                    </button>
                  </div>
                </div>

                {/* TABS */}
                <div className="flex gap-8 border-b border-white/10 lg:border-[#f0f0f0] mt-8">
                  <button className="border-b-2 border-[#23CEFD] pb-2 text-sm font-bold text-white lg:text-[#222222]">
                    My debit cards
                  </button>
                  <button className="pb-2 text-sm font-semibold text-white/30 lg:text-[#222222]/30">
                    All company cards
                  </button>
                </div>
              </header>

              {/* CARD SECTION (Fixed on mobile until scroll) */}
              <div className="lg:hidden flex flex-col items-center pt-8 pb-4">
                <Card
                  card={currentCard}
                  cardsCount={cards.length}
                  currentIndex={currentCardIndex}
                  onPageChange={setCurrentCardIndex}
                />
              </div>
            </div>

            {/* MAIN CONTENT AREA / MOBILE TRAY */}
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 rounded-lg lg:border lg:border-[#FCFCFC] bg-[#0C365A] lg:bg-white lg:p-10 lg:shadow-[0_2px_12px_rgba(0,0,0,0.04)] mt-0 lg:mt-0">
              {/* DESKTOP CARD VIEW */}
              <div className="hidden lg:flex flex-col items-center">
                <Card
                  card={currentCard}
                  cardsCount={cards.length}
                  currentIndex={currentCardIndex}
                  onPageChange={setCurrentCardIndex}
                />
                <div className="w-full mt-10">
                  <CardActions
                    isFrozen={currentCard.isFrozen}
                    onToggleFreeze={handleToggleFreeze}
                  />
                </div>
              </div>

              {/* MOBILE TRAY (WHITE BOTTOM SHEET) */}
              <div className="lg:hidden bg-white rounded-t-4xl shadow-[0_-8px_30px_rgba(0,0,0,0.1)] pt-6 pb-24 relative z-20 min-h-screen">
                <div className="px-6 mb-6">
                  <CardActions
                    isFrozen={currentCard.isFrozen}
                    onToggleFreeze={handleToggleFreeze}
                  />
                </div>
                <Transactions card={currentCard} />
              </div>

              {/* DESKTOP TRANSACTIONS VIEW */}
              <div className="hidden lg:block">
                <Transactions card={currentCard} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#f0f0f0] lg:hidden flex items-center justify-between px-6 z-50">
        <NavItem icon={brandNameWhite} label="Home" />
        <NavItem icon={card} label="Cards" active />
        <NavItem icon={payments} label="Payments" />
        <NavItem icon={credit} label="Credit" />
        <NavItem icon={account} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-[#01D167]" : "text-[#dddddd]"}`}
    >
      <img src={icon} alt={label} className="h-6 w-6 filter brightness-90" />
      <span className="text-[10px] font-bold">{label}</span>
    </div>
  );
}
