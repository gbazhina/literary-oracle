import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  // Параметры лепестков цветка
  const petalCount = 6;
  const petals = Array.from({ length: petalCount }, (_, i) => i);

  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Контейнер цветка */}
      <div className="relative w-48 h-48 mb-12">
        {/* Вращающиеся лепестки */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {petals.map((i) => {
            const angle = (360 / petalCount) * i;
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8"
                style={{
                  transform: `rotate(${angle}deg) translateY(-40px)`,
                }}
              >
                <div
                  className="w-full h-full rounded-full bg-gradient-to-t from-amber-600/80 to-amber-300/60 backdrop-blur-sm"
                  style={{
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    transform: "rotate(-90deg)",
                    boxShadow:
                      "0 0 20px rgba(251, 191, 36, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Центр цветка (ядро) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 z-10"
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 30px rgba(251, 191, 36, 0.4)",
              "0 0 60px rgba(251, 191, 36, 0.7)",
              "0 0 30px rgba(251, 191, 36, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Внутреннее свечение ядра */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-200/40 to-transparent" />
        </motion.div>

        {/* Внешнее свечение */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Плавающие частицы вокруг */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/70"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [
                0,
                Math.cos((i * Math.PI * 2) / 8) * 80,
                Math.cos((i * Math.PI * 2) / 8) * 100,
                0,
              ],
              y: [
                0,
                Math.sin((i * Math.PI * 2) / 8) * 80,
                Math.sin((i * Math.PI * 2) / 8) * 100,
                0,
              ],
              opacity: [0, 1, 0, 0],
              scale: [0, 1, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Текст загрузки */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-amber-200/80 font-serif text-2xl mb-3 tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {"Оракул читает страницы...".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.04 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          className="text-amber-200/40 font-body text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Подождите немного
        </motion.p>
      </motion.div>

      {/* Прогресс-индикатор в виде линии */}
      <motion.div
        className="mt-8 w-48 h-0.5 bg-slate-700/50 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
