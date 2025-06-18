import React from 'react';
import { FoodCultureDoc } from '../types/FoodCulture';
import { motion } from 'framer-motion';
import { X, MapPin, Clock, Beaker, Heart, Utensils } from 'lucide-react';

interface FoodCardProps {
  food: FoodCultureDoc;
  onClose: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-200/50 max-w-4xl mx-auto"
    >
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.foodName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-3xl font-bold mb-1">{food.foodName}</h2>
          <div className="flex items-center space-x-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{food.location}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-orange-500" />
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{food.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Cultural Significance
              </h3>
              <p className="text-gray-700 leading-relaxed">{food.culturalSignificance}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold text-gray-800">Origin</span>
                </div>
                <p className="text-gray-700">{food.timeOrigin}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Beaker className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-800">Process</span>
                </div>
                <p className="text-gray-700 text-sm">{food.fermentationType}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Location Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Region:</strong> {food.region}</p>
                <p><strong>Country:</strong> {food.country}</p>
                <p><strong>Coordinates:</strong> {food.latitude.toFixed(4)}°, {food.longitude.toFixed(4)}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;