'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strGlass: string;
  [key: string]: string | null;
}

export default function CocktailDetails() {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setCocktail(response.data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCocktailDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cocktail) {
    return <div>Cocktail not found</div>;
  }

  const ingredients = Object.keys(cocktail)
    .filter(key => key.startsWith('strIngredient') && cocktail[key])
    .map(key => cocktail[key]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{cocktail.strDrink}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={300} height={300} className="w-full rounded-lg shadow-md" />
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
            <p><strong>Category:</strong> {cocktail.strCategory}</p>
            <p><strong>Glass:</strong> {cocktail.strGlass}</p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside mb-6">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}