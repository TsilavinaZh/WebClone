mport { useState, useEffect } from 'react';

import productsData from '../data/DataProduits.json';

export default function Card() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Charger les 30 premiers produits
    const firstThirtyProducts = productsData.slice(0, 15);
    setFilteredProducts(firstThirtyProducts);

    // Compter les catégories
    const categoryCount = {};
    productsData.forEach(product => {
      if (categoryCount[product.categorie]) {
        categoryCount[product.categorie]++;
      } else {
        categoryCount[product.categorie] = 1;
      }
    });
    setCategories(categoryCount);
  }, []);

  // Fonction pour filtrer par catégorie
  const handleCategoryChange = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);

    // Filtrer les produits par les catégories sélectionnées
    const filtered = productsData.filter(product =>
      updatedSelectedCategories.length === 0 || updatedSelectedCategories.includes(product.categorie)
    ).slice(0, 30); // Limite à 30 images

    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="filter-group">
          <h3>Price</h3>
          <div className="price-slider">
            <span>3</span>
            <input type="range" min="3" max="30" />
            <span>30</span>
          </div>
        </div>

        <div className="filter-group categories">
          <h3>Categories</h3>
          <ul>
            {Object.keys(categories).map(category => (
              <li key={category}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category} ({categories[category]})
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid">
        {filteredProducts.map(product => (
          <div className="card" key={product.id}>
            <img src={product.url} alt={product.categorie} />
            <p className="price">€ {product.prix}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

                                         
