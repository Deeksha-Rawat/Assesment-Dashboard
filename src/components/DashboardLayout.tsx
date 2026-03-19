import { useState, useEffect, useCallback, useRef } from "react";
import Slider from "react-slick";

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

const SlickSlider =
  (Slider as unknown as { default?: typeof Slider }).default ?? Slider;

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
    const stored = localStorage.getItem("cards");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    const defaultCard = {
      id: "1",
      holderName: "Mark Henry",
      cardNumber: "1234567812342020",
      expiryDate: "12/20",
      cvv: "123",
      isFrozen: false,
    };
    localStorage.setItem("cards", JSON.stringify([defaultCard]));
    return [defaultCard];
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mobileSliderRef = useRef<Slider | null>(null);
  const desktopSliderRef = useRef<Slider | null>(null);
  const isSyncingRef = useRef(false);

  const handleAfterChange = useCallback((index: number) => {
    if (isSyncingRef.current) return;
    setCurrentCardIndex(index);
  }, []);

  useEffect(() => {
    isSyncingRef.current = true;
    mobileSliderRef.current?.slickGoTo(currentCardIndex, true);
    desktopSliderRef.current?.slickGoTo(currentCardIndex, true);
    const raf = requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
    return () => cancelAnimationFrame(raf);
  }, [currentCardIndex]);

  const handleDotClick = useCallback((idx: number) => {
    setCurrentCardIndex(idx);
    mobileSliderRef.current?.slickGoTo(idx);
    desktopSliderRef.current?.slickGoTo(idx);
  }, []);

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
    setCurrentCardIndex(updatedCards.length - 1);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleToggleFreeze = () => {
    const updatedCards = [...cards];
    updatedCards[currentCardIndex].isFrozen =
      !updatedCards[currentCardIndex].isFrozen;
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleCancelCard = useCallback(() => {
    if (cards.length <= 1) return;

    const updatedCards = cards.filter((_, idx) => idx !== currentCardIndex);
    const nextIndex = Math.min(currentCardIndex, updatedCards.length - 1);

    setCards(updatedCards);
    setCurrentCardIndex(nextIndex);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  }, [cards, currentCardIndex]);

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
      <div className="hidden lg:block sticky top-0 h-screen z-30">
        <Sidebar />
      </div>

      <main className="flex-1 lg:px-12 lg:py-12 relative overflow-x-hidden">
        <div className="mx-auto w-full max-w-300">
          {/* MOBILE LAYOUT */}
          <div className="lg:hidden h-screen overflow-y-auto">
            {/* STICKY TOP SECTION (Account Balance, Tabs, Card) */}
            <div className="sticky top-0 bg-[#0C365A] pt-8 px-6 pb-6 z-20">
              <header className="mb-6 relative">
                <div className="absolute -top-2 right-0">
                  <img src={brandName} alt="Logo" className="h-6 w-6" />
                </div>

                <div className="flex justify-between items-start pt-6">
                  <div>
                    <p className="text-sm font-semibold text-white mb-3">
                      Account balance
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-10 items-center justify-center rounded-md bg-[#01D167] text-white text-[12px] font-bold">
                        S$
                      </div>
                      <h1 className="text-2xl font-bold text-white">3,000</h1>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-xs font-bold text-[#23CEFD] transition-all hover:opacity-80"
                  >
                    <PlusCircle size={16} />
                    New card
                  </button>
                </div>

                {/* TABS */}
                <div className="flex gap-8 border-b border-white/10 mt-8">
                  <button className="border-b-2 border-[#23CEFD] pb-2 text-sm font-bold text-white">
                    My debit cards
                  </button>
                  <button className="pb-2 text-sm font-semibold text-white/30">
                    All company cards
                  </button>
                </div>
              </header>

              {/* CARD CAROUSEL */}
              <div className="flex flex-col items-center pt-8 pb-6">
                <div className="w-full">
                  <SlickSlider
                    ref={mobileSliderRef}
                    arrows={false}
                    dots={false}
                    infinite={false}
                    speed={350}
                    slidesToShow={1}
                    slidesToScroll={1}
                    swipeToSlide
                    centerMode
                    centerPadding="24px"
                    afterChange={handleAfterChange}
                  >
                    {cards.map((cardItem) => (
                      <div key={cardItem.id} className="px-3">
                        <Card card={cardItem} />
                      </div>
                    ))}
                  </SlickSlider>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                  {cards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentCardIndex
                          ? "w-4 bg-[#01D167]"
                          : "w-2 bg-[#01D167]/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* SCROLLABLE BOTTOM SHEET (Overlaps Card on Scroll) */}
            <div className="bg-white rounded-t-3xl -mt-6 relative z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] min-h-screen pb-24">
              {/* Optional Drag Handle */}
              <div className="pt-3 pb-3 flex justify-center">
                <div className="h-1 w-12 bg-gray-300 rounded-full" />
              </div>

              <div className="px-6 mb-6">
                <CardActions
                  isFrozen={currentCard.isFrozen}
                  onToggleFreeze={handleToggleFreeze}
                  onCancelCard={handleCancelCard}
                />
              </div>
              <Transactions card={currentCard} />
            </div>
          </div>

          {/* DESKTOP LAYOUT (UNCHANGED) */}
          <div className="hidden lg:block">
            <header className="mb-10">
              <p className="text-sm font-semibold text-[#222222] mb-4">
                Available balance
              </p>
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

            {/* TABS */}
            <div className="mb-6 flex gap-8 border-b border-[#f0f0f0]">
              <button className="border-b-2 border-[#23CEFD] pb-2 text-sm font-bold text-[#222222]">
                My debit cards
              </button>
              <button className="pb-2 text-sm font-semibold text-[#222222] opacity-30">
                All company cards
              </button>
            </div>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-2 gap-20 rounded-lg border border-[#FCFCFC] bg-white p-12 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              {/* LEFT: CARD */}
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <SlickSlider
                    ref={desktopSliderRef}
                    arrows={false}
                    dots={false}
                    infinite={false}
                    speed={350}
                    slidesToShow={1}
                    slidesToScroll={1}
                    swipeToSlide
                    centerMode
                    centerPadding="32px"
                    afterChange={handleAfterChange}
                  >
                    {cards.map((cardItem) => (
                      <div key={cardItem.id} className="px-2 py-0.5 mt-8 mb-4">
                        <Card card={cardItem} />
                      </div>
                    ))}
                  </SlickSlider>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {cards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentCardIndex
                          ? "w-4 bg-[#01D167]"
                          : "w-2 bg-[#01D167]/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="w-full mt-10">
                  <CardActions
                    isFrozen={currentCard.isFrozen}
                    onToggleFreeze={handleToggleFreeze}
                    onCancelCard={handleCancelCard}
                  />
                </div>
              </div>

              {/* RIGHT: TRANSACTIONS */}
              <div>
                <Transactions card={currentCard} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t flex justify-between px-6 items-center lg:hidden z-50">
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
      className={`flex flex-col items-center ${active ? "text-[#01D167]" : "text-[#dddddd]"}`}
    >
      <img src={icon} className="h-6 w-6 brightness-80" />
      <span className="text-[10px] font-bold">{label}</span>
    </div>
  );
}
