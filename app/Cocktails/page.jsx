export default async function Page() {
    let data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
    let posts = await data.json()
    return (
      <div>
        <h1>Cocktails</h1>
          {posts.drinks.map((cocktail) => (
            <div key={cocktail.idDrink}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />  
              <h2>{cocktail.strDrink}</h2>
              <h3>{cocktail.strCategory}</h3>
            </div>
          ))}
      </div>
    )
  }