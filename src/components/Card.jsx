import { useState, useEffect } from 'react';
import productsData from '../data/DataProduits.json';

export default function Card() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Pour gérer l'ouverture du formulaire
  const [formData, setFormData] = useState({ name: '', quantity: 1 }); // État pour le formulaire

  useEffect(() => {
    const firstThirtyProducts = productsData.slice(0, 15);
    setFilteredProducts(firstThirtyProducts);

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

  const handleCategoryChange = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);

    const filtered = productsData.filter(product =>
      updatedSelectedCategories.length === 0 || updatedSelectedCategories.includes(product.categorie)
    ).slice(0, 30);

    setFilteredProducts(filtered);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);
    closeFormModal();
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
          <div className="card" key={product.id} onClick={() => openModal(product)}>
            <img src={product.url} alt={product.categorie} />
            <p className="price">€ {product.prix}</p>
          </div>
        ))}
      </div>

      {/* Modal for product details */}
      {isModalOpen && selectedProduct && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedProduct.url} alt={selectedProduct.categorie} className="modal-img" />
            <div className="product-details">
              <select className="product-type">
                <option>Canvas</option>
                <option>Aluminium</option>
                <option>Plexiglas</option>
              </select>
              <select className="product-size">
                <option>30x30</option>
                <option>50x50</option>
                <option>70x70</option>
                <option>100x100</option>
                <option>120x120</option>
              </select>
              <hr className='hr' />
              <p className="price"><div>Price:</div><div> € {selectedProduct.prix}</div></p>
              <button className="add-to-cart" onClick={openFormModal}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add to Cart form */}
      {isFormModalOpen && (



        <center>
          <div className="modal" onClick={closeFormModal}>
            <div className="modal-content " onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeFormModal}>&times;</span>
              <form onSubmit={handleFormSubmit} className='modal-forms-content'>
                <h1>Canvas Order Form</h1>
                <label>
                  {/* Voornaam: */}
                  <input
                    placeholder='First Name '
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  {/* Achternaam: */}
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                    placeholder='Last Name'
                  />
                </label>
                <br />
                <br />
                <label>
                  {/* Email: */}
                  <input
                    placeholder='Email:'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  {/* Telefoon: */}
                  <input
                    placeholder='Phone  '
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  {/* Bezorgadres: */}
                  <input
                    placeholder='Delivery Address '
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  {/* Stad: */}
                  <input
                    // Stad:
                    placeholder='City  '
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  {/* Provincie: */}
                  <input
                    placeholder='Province  '
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  {/* Postcode: */}
                  <input
                    placeholder='Postal Code'
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleFormChange}
                    required
                  />
                </label><br /> <br />
                <label>
                  {/* Extra Opmerkingen: */}
                  <textarea
                    placeholder='Additional Remarks'
                    name="extraComments"
                    value={formData.extraComments}
                    onChange={handleFormChange}
                  />
                </label>
                <br />
                <br />

                <button type="submit" className="add-to-cart2">Place Order</button>
              </form>
            </div>
          </div>
        </center>

      )}
    </div>
  );
}
