// import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        close: () => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          start_param?: string;
        };
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          setText: (text: string) => void;
          setParams: (params: { color?: string; text_color?: string }) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: "light" | "medium" | "heavy") => void;
          notificationOccurred: (type: "error" | "success" | "warning") => void;
        };
      };
    };
  }
}

// export const useTelegram = () => {
//   const [user, setUser] = useState<
//     Window["Telegram"]["WebApp"]["initDataUnsafe"]["user"] | null
//   >(null);
//   const [isReady, setIsReady] = useState(false);

//   const tg = window.Telegram?.WebApp;

//   useEffect(() => {
//     if (!tg) return;

//     tg.ready();
//     tg.expand();
//     tg.enableClosingConfirmation();

//     if (tg.initDataUnsafe?.user) {
//       setUser(tg.initDataUnsafe.user);
//       // Сохраняем user_id для бэкенда (пока в localStorage)
//       localStorage.setItem("tg_user_id", String(tg.initDataUnsafe.user.id));
//     }

//     setIsReady(true);
//   }, [tg]);

//   const haptic = {
//     light: () => tg?.HapticFeedback?.impactOccurred("light"),
//     success: () => tg?.HapticFeedback?.notificationOccurred("success"),
//     error: () => tg?.HapticFeedback?.notificationOccurred("error"),
//   };

//   return {
//     tg,
//     user,
//     isReady,
//     haptic,
//     close: () => tg?.close(),
//     setMainButton: (text: string, onClick: () => void, color?: string) => {
//       if (!tg) return;
//       tg.MainButton.setText(text);
//       if (color) tg.MainButton.setParams({ color });
//       tg.MainButton.onClick(onClick);
//       tg.MainButton.show();
//     },
//     hideMainButton: () => tg?.MainButton.hide(),
//     showBackButton: (onClick: () => void) => {
//       tg?.BackButton.show();
//       tg?.BackButton.onClick(onClick);
//     },
//     hideBackButton: () => tg?.BackButton.hide(),
//   };
// };
