// import './style.css'
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
// <div class="main ">
//     <table class="table table-striped table-bordered result">
//     </table>
// </div>
// `
// const tabledata = document.querySelector<HTMLTableElement>(".result")!; 

// type methodes={
//   method:string
// }
// let url:string="https://fakestoreapi.com/products/1";
// function fetchData(url:string,resolve:any,reject:any){
//   console.log("fetchData");
//         const methodes:methodes={
//           method:'GET'
//         }
//         fetch(url,methodes)
//         .then((result)=>result.text())
//         .then((success)=>resolve(success))
//         .catch((error)=>reject(error));
// }
// function resolve(success:any){
//     let data=JSON.parse(success);
//     show(data);
//     // console.log("sadasd: ", tabledata)
//     function show(data:any):void{
//       console.log("hi");
//       let heading=`
//       <tr>
//           <th colspan="6"></th>
//           <th colspan="2">rating</th>
//       </tr>
//       <tr>
//           <th>id</th>
//           <th>title</th>
//           <th>price</th>
//           <th>description</th>
//           <th>category</th>
//           <th>image</th>>
//           <th>rate</th>
//           <th>count</th>
//       </tr>
//       `; 
//       const entries=Object.entries(data);
//       console.log(entries);
//       for(let x of entries) {
//         console.log(x);
//         x.forEach((i:any)=>{
//             heading+=`<tr>
//                 <td>${i}</td>
//                 <td>${i}</td>
//                 <td>${i}</td>
//                 <td>${i}</td>
//                 <td>${i}</td>
//                 <td>${i}</td>
//             </tr>`
//         })
//       };
//       tabledata.innerHTML = heading;
//   }
// }
// function reject(error:any){
//   console.log("The Error is ",error);
// }
// fetchData(url,resolve,reject);

// // <td>${i[1].rate}</td>
// // <td>${i[1].count}</td>
        





import "./style.css"
// import { requestOption } from "./function";

const rootElement = document.querySelector<HTMLDivElement>("#app")!;

rootElement.innerHTML = `
<div class="container">
    <h2>Form To Add New Products</h2> 
        <form action="" id="loginform">

            <label for="title">Title:</label>
            <input type="text" id="prodTitle" required><br><br>

            <label for="price">Price:</label>
            <input type="text" id="prodPrice" required><br><br>

            <label for="category">Category:</label>
            <input type="text" id="prodCat" required><br><br>

            <label for="description">Description:</label>
            <input type="text" id="prodDes" required><br><br>

            <label for="image">Image:</label>
            <input type="text" id="prodImg" required><br><br>

            <button type="submit" id="submitButton">Submit</button>
        </form>
</div>
<div class="container">
    <h3>Table for Fetching Data</h3>
        <table id="tableData" class="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Catagory</th>
                <th>Description</th>
                <th>Image</th>
                </tr>
            </thead>
    <tbody id="bodyData"></tbody>
    <tbody id="newBodyData"></tbody>
    </table>
</div>
`;
const pTitle = document.querySelector<HTMLInputElement>("#prodTitle")!;
const pPrice = document.querySelector<HTMLInputElement>("#prodPrice")!;
const pCat = document.querySelector<HTMLInputElement>("#prodCat")!;
const pDes = document.querySelector<HTMLInputElement>("#prodDes")!;
const pImg = document.querySelector<HTMLInputElement>("#prodImg")!;
const logForm = document.querySelector<HTMLInputElement>("#loginform")!;
let tableId = document.querySelector<HTMLTableElement>("#bodyData")!;

let url : string = ('https://fakestoreapi.com/products');

function fetchData(url : string, successCallBack : any, errorCallBack : any) {
    let requestOption : any = {
        method : 'GET'
    };

    fetch (url, requestOption)
        .then((response) => response.text())
        .then((result) => successCallBack(result))
        .catch((error) => errorCallBack(error));
}

function onSuccess(result : any) {
    let data = JSON.parse(result);
    
    let x : string = "";
    data.forEach((element : any) => {
        x += `<tr>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td>${element.category}</td>
            <td>${element.description}</td>
            <td><img src="${element.image}" width="180" height="100"/></td>
        </tr>` ;
    });
    tableId.innerHTML = x;
}

function onError(error : any) {
    console.log("From error call", error);
}

fetchData (url, onSuccess, onError);

logForm.addEventListener("submit", (a) => {
    a.preventDefault();
    // const ptitle : string = pTitle.value;
    const pprice : string = pPrice.value;
    const pcat : string = pCat.value;
    const pdes : string = pDes.value;
    const pimg : string = pImg.value;

    let obj : any = {
        title : pTitle.value,
        price : pprice,
        category : pcat,
        description : pdes,
        image : pimg
    };

    addData(obj)


}); 

function addData(request: any) {
    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(request)
        })
            .then(res=>res.json())
            .then((json)=>{

                if (json.id) {
                    fetchData (url, onSuccess, onError)
                }
            }).catch(e => console.log(e));
}