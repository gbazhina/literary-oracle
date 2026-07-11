import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Книга, которая открывается */}
      <div className="relative w-72 h-40 mb-8">
        {/* Левая страница */}
        <motion.div
          className="absolute left-0 top-0 w-36 h-40 bg-amber-100 rounded-l-sm origin-right"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, -30, -160, -140, -160] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.8, 1],
          }}
        >
          <div className="p-2 text-[16px] text-amber-800/40 leading-tight font-body">
            Lorem ipsum dolor sit amet...
          </div>
        </motion.div>

        {/* Правая страница */}
        <motion.div
          className="absolute right-0 top-0 w-36 h-40 bg-amber-50 rounded-r-sm origin-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 30, 160, 140, 160] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.8, 1],
          }}
        >
          <div className="p-2 text-[16px] text-amber-800/40 leading-tight font-body text-right">
            ...consectetur adipiscing elit
          </div>
        </motion.div>

        {/* Корешок */}
        <div className="absolute left-1/2 top-0 w-1 h-40 bg-amber-900 -translate-x-1/2 z-10" />
      </div>

      {/* Падающие частицы */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
          initial={{
            x: 0,
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: [0, 100, 200],
            x: [0, (i - 3) * 20, (i - 3) * 40],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Текст загрузки с побуквенным появлением */}
      <motion.p
        className="text-amber-200/60 font-body text-lg tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {"Оракул читает страницы...".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
