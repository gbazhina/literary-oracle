import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { quotes } from "./data/quotes";
import { Quote, Screen, PredictionHistory, QuoteCategory } from "./components/types";
import LoadingScreen from "./components/LoadingScreen";
import QuoteCard from "./components/QuoteCard";
import BurgerMenu from "./components/BurgerMenu";
import { useTelegram } from "./hooks/useTelegram";

const HISTORY_KEY = "oracleHistory";

const getStoredHistory = (): PredictionHistory[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToHistory = (quote: Quote): void => {
  const history = getStoredHistory();
  const newEntry: PredictionHistory = {
    ...quote,
    date: new Date().toISOString(),
  };
  const newHistory = [newEntry, ...history].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

const getRandomQuote = (
  excludeIds: number[] = [],
  category: QuoteCategory | null = null,
): Quote => {
  let pool = quotes;

  if (category) {
    pool = quotes.filter((q) => q.category === category);
  }

  // Если после фильтрации по категории pool пустой — берём из всех
  if (pool.length === 0) {
    pool = quotes;
  }

  const available = pool.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) {
    // Если все исключены — берём любую из pool
    return pool[Math.floor(Math.random() * pool.length)];
  }

  return available[Math.floor(Math.random() * available.length)];
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<QuoteCategory | null>(null);
  const { user } = useTelegram();

  const handleGetPrediction = useCallback((): void => {
    setScreen("loading");

    setTimeout(() => {
      const history = getStoredHistory();
      const excludeIds = history.slice(0, 20).map((h) => h.id);
      const quote = getRandomQuote(excludeIds, selectedCategory);

      saveToHistory(quote);
      setCurrentQuote(quote);
      setScreen("result");
    }, 3000);
  }, [selectedCategory]);

  const handleShare = useCallback((): void => {
    if (!currentQuote) return;

    const text = `"${currentQuote.text}"\n— ${currentQuote.author}, «${currentQuote.book}»\n\n✨ Литературный Оракул`;

    if (navigator.share) {
      navigator.share({ title: "Моё предсказание", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Скопировано в буфер обмена!");
      });
    }
  }, [currentQuote]);

  // Экран приветствия
  if (screen === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center min-w-screen min-h-screen p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
        <BurgerMenu
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <svg
              className="w-20 h-20 mx-auto text-amber-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>

          <p className="text-amber-200/60 font-body text-lg mb-2">
            Привет{user?.first_name ? `, ${user.first_name}` : ""} 👋
          </p>

          <h1 className="text-5xl font-serif text-amber-50 mb-3 tracking-tight">
            Литературный
            <br />
            <span className="text-amber-400">Оракул</span>
          </h1>

          <p className="text-amber-200/50 font-body text-xl mb-2 italic">
            "Книги — зеркала души"
          </p>
          <p className="text-amber-200/40 font-body text-base mb-12 max-w-xs mx-auto">
            Задайте вопрос и получите ответ из великих произведений
          </p>

          {/* Индикатор выбранной категории */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full"
            >
              <span className="text-sm">
                {selectedCategory === "wisdom" && "📖"}
                {selectedCategory === "love" && "💫"}
                {selectedCategory === "fate" && "🔮"}
                {selectedCategory === "action" && "⚡"}
                {selectedCategory === "courage" && "🦁"}
                {selectedCategory === "finance" && "💰"}
                {selectedCategory === "life" && "🍃"}
                {selectedCategory === "freedom" && "🌊"}
                {selectedCategory === "happiness" && "🌸"}
                {selectedCategory === "graf" && "⚔️"}
              </span>
              <span className="text-amber-200 text-sm font-body">
                {selectedCategory === "wisdom" && "Мудрость"}
                {selectedCategory === "love" && "Любовь"}
                {selectedCategory === "fate" && "Судьба"}
                {selectedCategory === "action" && "Действие"}
                {selectedCategory === "courage" && "Смелость"}
                {selectedCategory === "finance" && "Финансы"}
                {selectedCategory === "life" && "Жизнь"}
                {selectedCategory === "freedom" && "Свобода"}
                {selectedCategory === "happiness" && "Счастье"}
                {selectedCategory === "graf" && "Граф Монте-Кристо"}
              </span>
            </motion.div>
          )}

          <motion.button
            onClick={handleGetPrediction}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-full font-medium text-lg shadow-lg shadow-amber-900/50 transition-all"
          >
            Получить предсказание
          </motion.button>

          <p className="mt-6 text-amber-200/30 text-sm font-body">
            Уже {quotes.length} мудрых цитат в библиотеке
          </p>
        </motion.div>
      </div>
    );
  }

  // Экран загрузки
  if (screen === "loading") {
    return (
      <>
        <BurgerMenu
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <LoadingScreen />
      </>
    );
  }

  // Экран результата
  if (screen === "result" && currentQuote) {
    return (
      <>
        <BurgerMenu
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <QuoteCard
          quote={currentQuote}
          onNewQuote={handleGetPrediction}
          onShare={handleShare}
          selectedCategory={selectedCategory}
        />
      </>
    );
  }

  return null;
};

export default App;
