import { motion } from "motion/react";
import { QuoteCategory, Quote } from "./types";

interface QuoteCardProps {
  quote: Quote;
  onNewQuote: () => void;
  onShare: () => void;
  selectedCategory: QuoteCategory | null;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onNewQuote,
  onShare,
  selectedCategory,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Основная карточка */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotateY: 180 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative max-w-md w-full"
      >
        {/* Свечение позади карточки */}
        <motion.div
          className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Сама карточка */}
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm overflow-hidden">
          {/* Декоративные уголки */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/40" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/40" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/40" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/40" />

          {/* Иконка книги */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <svg
              className="w-8 h-8 text-amber-400/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>

          {/* Цитата с побуквенным появлением */}
          <blockquote className="text-center mb-6">
            <motion.p
              className="text-2xl font-serif text-amber-50 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {quote.text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.02,
                    duration: 0.3,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </blockquote>

          {/* Автор и книга */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-16 h-px bg-amber-500/40 mx-auto mb-4" />
            <p className="text-amber-200 font-body text-lg">— {quote.author}</p>
            <p className="text-amber-200/50 font-body text-sm italic">
              «{quote.book}»
            </p>
          </motion.div>

          {/* Толкование */}
          {quote.interpretation && (
            <motion.div
              className="bg-amber-950/30 border border-amber-500/10 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <p className="text-amber-100/70 font-body text-sm leading-relaxed text-center">
                {quote.interpretation}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Кнопки действий */}
      <motion.div
        className="flex gap-4 mt-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
      >
        <button
          onClick={onNewQuote}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-medium transition-all active:scale-95"
        >
          Ещё раз
        </button>
        {/* Индикатор выбранной категории */}
        {/* {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full"
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
            </span>&nbsp;
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
        )} */}
        <button
          onClick={onShare}
          className="px-6 py-3 border border-amber-500/50 hover:bg-amber-500/10 text-amber-200 rounded-full font-medium transition-all active:scale-95"
        >
          Поделиться
        </button>
      </motion.div>
    </div>
  );
};

export default QuoteCard;
