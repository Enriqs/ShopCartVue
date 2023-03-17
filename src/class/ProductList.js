import Product from "./Product.js";
import CryptoJS from 'crypto-js';
class ProductList{
    pList=new Map();
    constructor(uid){
        this.uid=uid;
    }
    shop(pObj,qty){
        // if(this.pList.has(pObj.pid)){
        //     this.pList.get(pObj.pid).amount++;
        // }else{
        //     let product = new Product(pObj.pid,pObj.pname,pObj.price,qty);
        //     this.pList.set(product.pid,product);
        // }
        let product = new Product(pObj.pid,pObj.pname,pObj.price,qty);
        this.pList.set(product.pid,product);
        console.log(this.pList);
        sessionStorage.setItem('shopcart2',JSON.stringify(Array.from(this.pList)));
        sessionStorage.setItem('shopcart',this.encrypt(JSON.stringify(Array.from(this.pList))));
    }
    updating(pObj){
        this.pList.get(pObj.id).amount;
        sessionStorage.setItem(this.uid,JSON.stringify(Array.from(this.pList)));
    }
    invoiceTotal(){
        let sum = 0;
        this.pList.forEach((product)=>{
            sum += parseFloat(product.calTotal());
        });
        return sum.toFixed(2);
    }
    delete(key){
        this.pList.delete(key);
        sessionStorage.setItem(this.uid,JSON.stringify(Array.from(this.pList)));
    }
    getsData(){
        let x=sessionStorage.getItem('shopcart');
        if(x==null){
            x=[];
        }else{
            x=JSON.parse(this.decrypt(sessionStorage.getItem('shopcart')));
        }
    return x
        // this.pList= new Map(JSON.parse(sessionStorage.getItem('username')));
        // this.pList= new Map(JSON.parse(localStorage.myMap));
        // console.log(this.pList);
    }
    setting(pObj){
        let product = new Product(pObj.pid,pObj.pname,pObj.price,pObj.amount);
        this.pList.set(product.pid,product);
    }
    encrypt(data){
        return CryptoJS.AES.encrypt(data,'liquor').toString();
    }
    decrypt(encData){
        let decData = CryptoJS.AES.decrypt(encData,'liquor');
        return decData.toString(CryptoJS.enc.Utf8);
    }
}
export default ProductList;