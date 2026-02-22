import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { GoalCreation } from "./pages/GoalCreation";
import { AssetAllocation } from "./pages/AssetAllocation";
import { MonteCarlo } from "./pages/MonteCarlo";
import { Rebalance } from "./pages/Rebalance";
import { MarketCrash } from "./pages/MarketCrash";
import { Leaderboard } from "./pages/Leaderboard";
import { Achievements } from "./pages/Achievements";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    Component: Layout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "goals/new", Component: GoalCreation },
      { path: "allocation", Component: AssetAllocation },
      { path: "simulation", Component: MonteCarlo },
      { path: "rebalance", Component: Rebalance },
      { path: "crash-alert", Component: MarketCrash },
      { path: "leaderboard", Component: Leaderboard },
      { path: "achievements", Component: Achievements },
    ],
  },
]);
