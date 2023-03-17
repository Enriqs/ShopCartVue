class Product{
    constructor(pid,pname,price,amount=1){
        this.pname = pname;
        this.price = price;
        this.amount = amount;
        this.pid = pid;
    }
    calTotal(){
        return (this.price * this.amount).toFixed(2);
    }
}
export default Product;