import './style.css'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="container">
        <div class="formDiv">
            <h1 class="heading">Add New Products</h1>
            <input type="text" name="id" id="id" class="inp" placeholder="Enter The id"><br>
            <input type="text" name="title" id="title"class="inp" placeholder="Enter The title"><br>
            <input type="text" name="price" id="price"class="inp"placeholder="Enter The price"><br>
            <input type="text" name="category" id="category"class="inp"placeholder="Enter The category"><br>
            <input type="text" name="description" id="description"class="inp"placeholder="Enter The description"><br>
            <input type="text" name="image" id="image"class="inp"placeholder="Enter The image link "><br>
            <button type="submit" id="submit">Submit</button>
            <button type="reset" id="reset">Reset</button>

        </div>
    </div>
<div class="main ">
    <table class="table result">
    </table>
</div>
`
const tabledata = document.querySelector<HTMLTableElement>(".result")!;
// const id=document.querySelector<HTMLInputElement>("#id")!; 
const title=document.querySelector<HTMLInputElement>("#title")!; 
const price=document.querySelector<HTMLInputElement>("#price")!; 
const category=document.querySelector<HTMLInputElement>("#category")!; 
const description=document.querySelector<HTMLInputElement>("#description")!; 
const image=document.querySelector<HTMLInputElement>("#image")!; 
const submit=document.querySelector<HTMLButtonElement>("#submit")!; 
const reset=document.querySelector<HTMLButtonElement>("#reset")!; 

type methodes={
  method:string
}
let ur:string=('https://fakestoreapi.com/products');
var heading=`
      <tr>
          <th colspan="6"></th>
          <th colspan="2">rating</th>
      </tr>
      <tr>
          
          <th>title</th>
          <th>price</th>
          <th>category</th>
          <th>description</th>
          <th>image</th>
          <th>rate</th>
          <th>count</th>
      </tr>
      `;
function fetchData(ur:string,resolve:any,reject:any){
  // console.log("fetchData");
        const methodes:methodes={
          method:'GET'
        }
        fetch(ur,methodes)
        .then((result)=>result.text())
        .then((success)=>resolve(success))
        .catch((error)=>reject(error));
}

function resolve(success:any){
    let data=JSON.parse(success);
    show(data);
    function show(data:any):void{ 
      data.forEach((i:any) => {
        heading+=`<tr>
        
        <td>${i.title}</td>
        <td>${i.price}</td>
        <td>${i.description}</td>
        <td>${i.category}</td>
        <td><img src="${i.image}" width="200"height=100></td>
        <td>${i.rating.rate}</td>
        <td>${i.rating.count}</td>        
        </tr>`
      });
      tabledata.innerHTML = heading;
  }
}

function reject(error:any){
  console.log("The Error is ",error);
}

fetchData(ur,resolve,reject);

submit.addEventListener("click",(a)=>{
  a.preventDefault();
  console.log("Add event listenner");
    const cart:any={
      // id:id.value,
      title:title.value,
      price:price.value,
      description:description.value,
      category:category.value,
      image:image.value
    };
    addobj(cart);

    });

function addobj(obj:any){
  let ul='https://fakestoreapi.com/products';
    fetch(ul,{
      method:"POST",
      body:JSON.stringify(
          obj
      )
  })
      .then(res=>res.json())
      .then((json)=>{
        console.log(json.id)
        if(json.id){
          fetchData(ul,resolve,reject);
        }
      })
      .catch(e=>console.log(e));

      
}

reset.addEventListener("click",()=>{
  console.log("hi")
  // id.value="";
  title.value="";
  price.value="";
  description.value="";
  category.value="";
  image.value="";

})

// <th>id</th>
    // <td>${i.id}</td>
    // data.push(cart);
    // fetch('https://fakestoreapi.com/products',{
    //         method:"POST",
    //         body:JSON.stringify(
    //             cart
    //         )
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
    // data.forEach((i:any) => {
    //   heading+=`<tr>
    //   <td>${i.id}</td>
    //   <td>${i.title}</td>
    //   <td>${i.price}</td>
    //   <td>${i.description}</td>
    //   <td>${i.category}</td>
    //   <td><img src="${i.image}" width="200"height=100></td>      
    //   </tr>`

// data.forEach((i:any) => {
// heading+=`<tr>
// <td>${i.id}</td>
// <td>${i.title}</td>
// <td>${i.price}</td>
// <td>${i.description}</td>
// <td>${i.category}</td>
// <td><img src="${i.image}" width="200"height=100></td>      
// </tr>`
// });



//     console.log(data);
//     tabledata.innerHTML = heading;
// });

// heading+=`<tr>
//         <td>${id.value}</td>
//         <td>${title.value}</td>
//         <td>${price.value}</td>
//         <td>${description.value}</td>
//         <td>${category.value}</td>
//         <td><img src="${image.value}" width="200"height=100></td>`