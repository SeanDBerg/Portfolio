import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Summary from "@/pages/summary";
import Resume from "@/pages/resume";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Summary} />
      <Route path="/summary" component={Summary} />
      <Route path="/resume" component={Resume} />
      <Route path="/projects" component={Resume} />
      <Route component={Summary} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Router />
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
