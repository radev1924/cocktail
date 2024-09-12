async function getCocktails() {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
    const data = await results.json();
    return data;
}

export default async function Cocktails() {
    const cocktails = await getCocktails();

    return (
        <div>
            {cocktails.map((cocktail) => {
                return (
                    <div key={cocktail.idDrink}>
                        <h3>{cocktail.strDrink}</h3>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                    </div>
                )
            })
            }
            )
        </div>
    );
}