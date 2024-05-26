import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@modals", replacement: "/src/components/modals" },
      { find: "@ui", replacement: "/src/components/ui" },
      { find: "@auth-interface", replacement: "/src/interfaces/auth.ts" },
      {
        find: "@services-interface",
        replacement: "/src/interfaces/services.ts",
      },
      { find: "@orders-interface", replacement: "/src/interfaces/orders.ts" },
      {
        find: "@dashboard-interface",
        replacement: "/src/interfaces/dashboard.ts",
      },
      { find: "@global-interface", replacement: "/src/interfaces/global.ts" },
      { find: "@service", replacement: "/src/service" },
      { find: "@router", replacement: "/src/router" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@store", replacement: "/src/store/index" },
      { find: "@validation", replacement: "/src/utils/validations.ts" },
      { find: "@notification", replacement: "/src/utils/notification.ts" },
      { find: "@data-service", replacement: "/src/utils/data-service.ts" },
      { find: "@table-headers", replacement: "/src/utils/table-header-data.ts" },
      { find: "@query", replacement: "/src/utils/query-params.ts" },
    ],
  },
});
