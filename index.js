// // <!DOCTYPE html>
// // <html lang="en">
// //   <head>
// //     <meta charset="UTF-8" />
// //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// //     <title>Document</title>
//     <script>
      const products = [
        { id: 1, name: "P1", price: 34 },
        { id: 2, name: "P2", price: 50 },
        { id: 3, name: "P3", price: 40 },
      ];
      const cart = {};
      const addToCart = (id) => {
        if(!cart[id])//condition 
        cart[id] = 1;
        items.innerHTML=0;
        showCart();
      };
      const increment=(id)=>{
        //let value = 0;
        items.innerHTML=100;
        cart[id]=cart[id]+1;
        showCart();
      }
      const decrement=(id)=>{
        //let value = 0;
        items.innerHTML=50;
        cart[id]=cart[id]-1;
        showCart();
      }
      const del=(id)=>{
        delete cart[id];
        showCart();

      }
      const showCart = () => {
        let str = "";
        products.map((value) => {
          if (cart[value.id]) {
            str += `<div>${value.id}-${value.name}-${value.price}-
            <button onclick='decrement(${value.id})'>-</button>
            ${cart[value.id]}
            <button onclick='increment(${value.id})'>+</button>
            -${value.price*cart[value.id]}-
            <button onclick='del(${value.id})'>delete</button></div>`;
          }
        });
        divCart.innerHTML = str;
      };
      const showProducts = () => {
        let str = "";
        products.map((value) => {
          str += `<div>${value.id}-${value.name}-${value.price}-
        <button onclick='addToCart(${value.id})'>Add</button></div>`;
        });
        divProducts.innerHTML = str;
      };
//     </script>
//   </head>
//   <body onload="showProducts()">
//     <h1>My Store</h1>
//     <hr />
//     <h3>Products</h3>
//     <div id="divProducts"></div>
//     <h3>My Cart</h3>
//     <div id="divCart"></div>
//   </body>
// </html>