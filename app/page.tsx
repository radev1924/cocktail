'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailCard = ({ cocktail }: { cocktail: Cocktail }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transform transition duration-500 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <Link href={`/cocktail/${cocktail.idDrink}`} className="block transform transition duration-200 hover:scale-105">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">{cocktail.strDrink}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
        setCocktails(response.data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Ordinary Drink Cocktails</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}