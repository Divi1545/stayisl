import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative h-48 w-full">
          <Image
            src={service.images[0] || '/placeholder-image.jpg'}
            alt={service.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-2 right-2 bg-white text-gray-900">
            {service.type}
          </Badge>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{service.name}</h3>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{service.businessName}</p>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {service.description}
          </p>
          
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{service.location}</span>
            </div>
            
            {service.maxCapacity && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Up to {service.maxCapacity} guests</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-2xl font-bold">
                {service.currency} {service.basePrice.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
            
            {service.available ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Available
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Unavailable
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}


