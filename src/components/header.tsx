import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

type HeaderProps = {
  onAddAssignment: () => void;
};

export default function Header({ onAddAssignment }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
          PlanItRight
        </h1>
      </div>
      <div className="ml-auto">
        <Button onClick={onAddAssignment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </div>
    </header>
  );
}
