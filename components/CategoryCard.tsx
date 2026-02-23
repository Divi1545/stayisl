import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export function CategoryCard({ title, description, icon: Icon, href, color }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-6">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}


