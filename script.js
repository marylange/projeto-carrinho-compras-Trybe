window.onload = function onload() {
  const API_MercadoLivre = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const getData = () => {
    const myObjct = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };
    fetch(API_MercadoLivre, myObjct)
      .then(response => response.json())
      .then(data => {
        renderizarConteudo(data);
      })
  }

  const mapearDada = (data) => {
    const mapearAPI = data.results.map((elemento) => {
      return {
        sku: elemento.id,
        name: elemento.title,
        image: elemento.thumbnail,
      }
    })
    console.log(mapearAPI);
    return mapearAPI;
  }

  function createProductImageElement(imageSource) {
    const img = document.createElement('img');
    img.className = 'item__image';
    img.src = imageSource;
    return img;
  }

  function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
  }

  function createProductItemElement({ sku, name, image }) {
    const section = document.createElement('section');
    section.className = 'item';

    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

    return section;
  }

  const addElementosAoHtml = (mapeiaData) => {
    const sectionPai = document.getElementsByClassName('items')[0];
    for (let i = 0; i < mapeiaData.length; i += 1) {
      sectionPai.appendChild(createProductItemElement(mapeiaData[i]))
    }
  }

  const renderizarConteudo = (data) => {
    const mapeiaData = mapearDada(data);
    console.log(addElementosAoHtml(mapeiaData));
    funcBtnAdicinar();
  }

  getData();
};


// const getSKU = (sku) => {
//   const carrinhoAPI = `https://api.mercadolibre.com/items/${sku}`;
//   const myObjct = {
//     method: 'GET',
//     headers: { 'Accept': 'application/json' }
//   };
//   fetch(carrinhoAPI, myObjct)
//     .then(response => response.json())
//     .then(data => {
//       return data;
//     });
// }

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: ${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const funcBtnAdicinar = () => {
  const botoes = document.getElementsByClassName('item__add');
  for (let i = 0; i < botoes.length; i += 1) {
    const btnAdicionar = botoes[i];
    btnAdicionar.addEventListener('click', (event) => {
      console.log(event);
    });
  }
}
