import { MapPin } from 'lucide-react';
import Image from 'next/image';

const GalleryCard = ({ title, image, location, price, }) => {

    return (
        <div
            className="gallery-card group cursor-pointer border-0 p-0 h-72 bg-transparent w-full"
        >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
                {/* Image */}
                <div className="w-full h-full relative">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-all duration-300 group-hover:scale-105`}
                        priority={false}
                    />
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-lg font-bold">{title}</h3>
                            <div className="flex items-center text-sm mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold">₹{price}</div>
                            <div className="text-xs">per hour</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GalleryCard;
