async function getCocktails() {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
    const data = await results.json();
    return data;
}

export default async function Cocktails() {

    return (
        <div>
            <h1>Cocktails</h1>
        </div>
    );
}