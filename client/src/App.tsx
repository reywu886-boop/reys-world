import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import AiStoryboard from "@/pages/AiStoryboard";
import AiPreviz from "@/pages/AiPreviz";
import ModelDataStrategy from "@/pages/ModelDataStrategy";
import DataProductionProducts from "@/pages/DataProductionProducts";
import RuleLoopCaseStudy from "@/pages/RuleLoopCaseStudy";
import CaptionFourRolesCaseStudy from "@/pages/CaptionFourRolesCaseStudy";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { WorldProvider } from "./contexts/WorldContext";
import Home from "./pages/Home";

/* ── Page transition variants ──────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">
          <PageWrapper><Home /></PageWrapper>
        </Route>
        <Route path="/projects/ai-storyboard">
          <PageWrapper><AiStoryboard /></PageWrapper>
        </Route>
        <Route path="/projects/ai-previz">
          <PageWrapper><AiPreviz /></PageWrapper>
        </Route>
        <Route path="/projects/model-data-strategy">
          <PageWrapper><ModelDataStrategy /></PageWrapper>
        </Route>
        <Route path="/projects/data-production-products">
          <PageWrapper><DataProductionProducts /></PageWrapper>
        </Route>
        <Route path="/projects/ruleloop">
          <PageWrapper><RuleLoopCaseStudy /></PageWrapper>
        </Route>
        <Route path="/projects/caption-four-roles">
          <PageWrapper><CaptionFourRolesCaseStudy /></PageWrapper>
        </Route>
        <Route path="/404">
          <PageWrapper><NotFound /></PageWrapper>
        </Route>
        {/* Final fallback route */}
        <Route>
          <PageWrapper><NotFound /></PageWrapper>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <WorldProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </WorldProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
