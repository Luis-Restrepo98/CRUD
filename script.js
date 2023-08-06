import { createProduct,fetchProducts,deleteProduct,saveProduct } from "./services/api.js"

const productListElement = document.getElementById('product-list');

const editNameInput = document.getElementById('edit-name');

const editPriceInput = document.getElementById('edit-price');

const editIdInput = document.getElementById('edit-id');

const editFormElement = document.getElementById('edit-form')


window.createProductForm = async function createProductForm() {
    const createNameInput = document.getElementById('create-name').value;
    const createPriceInput = document.getElementById('create-price').value;
    const product = {
      name: createNameInput,
      price: createPriceInput
    }
    await createProduct(product);
    alert("producto creado exitosamente")
    refreshProducts();
  }
  async function refreshProducts() {
    const productsData = await fetchProducts();
    displayProducts(productsData);
  }
  
  refreshProducts();  

  function displayProducts(productsData) {
    
    const productHTML = productsData.map(product => `
      <li>
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <button onclick="editProduct(${product.id})">Editar</button>
        <button onclick="deleteProductF(${product.id})">Eliminar</button>
      </li>
    `).join('');
  
    productListElement.innerHTML = `<ul>${productHTML}</ul>`;
  }
  
window.deleteProductF = async function deleteProductF (id) {
    deleteProduct(id)
  }

window.editProduct = async function editProduct(productId) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      showEditForm(product);
    }
  }

  window.saveProductForm = async function saveProductForm() {
    const product = {
      id: editIdInput.value,
      name: editNameInput.value,
      price: editPriceInput.value
    }
    await saveProduct(product);
    refreshProducts();
    alert("Producto editado exitosamente")
  }
  function showEditForm(product) {
    editNameInput.value = product.name;
    editPriceInput.value = product.price;
    editIdInput.value = product.id;
    editFormElement.style.display = 'block';
  }
  
  function hideEditForm() {
    editFormElement.style.display = 'none';
  }
  
  window.cancelEdit = function cancelEdit() {
    hideEditForm();
  }