import AppIdeaGenerator from "@/components/AppIdeaGenerator";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  return (
    <TooltipProvider>
      <div className="text-center">
        <Card className="p-6">
          <AppIdeaGenerator />
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default Index;