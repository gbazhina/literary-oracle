import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuoteCategory, CategoryOption } from "./types";

interface BurgerMenuProps {
  selectedCategory: QuoteCategory | null;
  onCategoryChange: (category: QuoteCategory | null) => void;
}

const categories: CategoryOption[] = [
  { id: "wisdom", label: "Мудрость", icon: "📖" },
  { id: "love", label: "Любовь", icon: "💫" },
  { id: "fate", label: "Судьба", icon: "🔮" },
  { id: "action", label: "Действие", icon: "⚡" },
  { id: "courage", label: "Смелость", icon: "🦁" },
  { id: "finance", label: "Финансы", icon: "💰" },
  { id: "life", label: "Жизнь", icon: "🌿" },
  { id: "freedom", label: "Свобода", icon: "🕊️" },
  { id: "happiness", label: "Счастье", icon: "☀️" },
  { id: "graf", label: "Граф Монте-Кристо", icon: "⚔️" },
];

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleCategoryClick = (categoryId: QuoteCategory | null) => {
    onCategoryChange(categoryId);
    closeMenu();
  };

  return (
    <>
      {/* Кнопка бургер */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/80 border border-amber-500/30 backdrop-blur-sm transition-all hover:bg-slate-700/80 active:scale-95"
        aria-label="Меню"
      >
        <div className="flex flex-col gap-1.5 w-5">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 bg-amber-300 rounded-full origin-center"
          />
          <motion.span
            animate={
              isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            className="block h-0.5 bg-amber-300 rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 bg-amber-300 rounded-full origin-center"
          />
        </div>
      </button>

      {/* Оверлей */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Панель меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-40 h-screen w-72 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-amber-500/20 shadow-2xl shadow-black/50 flex flex-col"
          >
            {/* Заголовок меню — фиксированный */}
            <div className="flex-shrink-0 pt-20 pb-4 px-6 border-b border-amber-500/10">
              <h2 className="text-amber-100 font-serif text-xl">
                Темы предсказаний
              </h2>
              <p className="text-amber-200/40 text-sm font-body mt-1">
                Выберите, о чём спросить Оракула
              </p>
            </div>

            {/* Список категорий — скроллится */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
              {/* Все категории */}
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  selectedCategory === null
                    ? "bg-amber-600/20 border border-amber-500/40 text-amber-100"
                    : "bg-slate-800/50 border border-transparent text-amber-200/70 hover:bg-slate-700/50 hover:text-amber-100"
                }`}
              >
                <span className="text-xl">🌟</span>
                <span className="font-body">Все темы</span>
                {selectedCategory === null && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-amber-400 rounded-full"
                  />
                )}
              </button>

              <div className="h-px bg-amber-500/10 my-2" />

              {/* Категории */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? "bg-amber-600/20 border border-amber-500/40 text-amber-100"
                      : "bg-slate-800/50 border border-transparent text-amber-200/70 hover:bg-slate-700/50 hover:text-amber-100"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-body">{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-amber-400 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Нижняя часть — фиксированная */}
            <div className="flex-shrink-0 p-4 border-t border-amber-500/10 bg-slate-900/50">
              <p className="text-amber-200/30 text-xs font-body text-center">
                Литературный Оракул
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
