<template>
<section>
<h1>Detail Info</h1>
<div v-if="selFlag">
<h4>{{selElement.pname}}</h4>
<div class="detail">
    <section>
        <!-- Item Detail Display Section  -->
        <figure class="itemdetail">
            <img :src="require(`../img/pid_${selElement.pid}.jpg`)" alt="error_img">
            <figcaption>
                <div>
                    <h4>{{selElement.pname}}</h4>
                    <small>{{selElement.size}}ml</small>
                </div>
                <p>$ {{selElement.price}}</p>
                <div class="mb-3 qty">
                    <span>Quantity : </span>
                    <select class="form-select" name="qty" id="qty" v-model="qty">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <aside>
                    <h5>COUNTRY : {{selElement.country}}</h5>
                    <h5>YEAR    :{{selElement.year}}</h5>
                    <h5>ALCOHOL : <span>{{selElement.alcohol}} %</span></h5>
                </aside>
            </figcaption>
            <!-- Add Cart Section -->
            <div class="buybtn">
                <button type="button" class="btn btn-danger" @click="addHandler">Add Cart</button>
                <button type="button" class="btn btn-warning" v-if="userVerify">Buy Now</button>
                <button type="button" class="btn btn-warning" v-if="!userVerify" @click="goToSign">Sign in</button>
                <button type="button" class="btn btn-success" @click="continueShop">Continue Shopping</button>
            </div>
            <!-- Cart Display Section -->
            <div class="availstore" style="display:flex; flex-direction:column; justify-content:start; align-items:center;" v-if="userVerify">
                <h6>Your Items</h6>
                <ul>
                    <li>xd ds</li>
                    <li>xd d</li>
                    <li>xd d</li>
                </ul>
            </div>
        </figure>
        <hr/>
        <!-- Recommend Section  -->
        <article class="recommend">
            <h2>YOU MIGHT ALSO LIKE</h2>
            <div>                
            </div>
        </article>
    </section>
</div>
</div>
</section>

</template>
<script>

import ProductList from '../class/ProductList.js';
export default {
    name:'DetailPage',
    props:['selElement','userVerify','loggedUser'],
    data(){
        return{
            selFlag:false,
            qty:1,
            shoppingCart:null,
        }
    },
    methods:{
        continueShop(){
            this.$emit('category',0);
            this.$router.push({name:'home'});
            return;
        },
        addHandler(){
            if(this.userVerify===false){
                alert('To create shopping cart you have to sign in first');
            }else{
                if(this.shoppingCart==null){
                    this.shoppingCart= new ProductList(this.loggedUser.uid);
                }
                this.shoppingCart.shop(this.selElement,this.qty);
            }
        },
        goToSign(){
            this.$router.push({name:'login'});
        },
        getSessionItems(){
            this.shoppingCart = new ProductList(this.loggedUser.uid);
            let x= this.shoppingCart.getsData();
            if (x!=null){
                for(let i of x){
                    this.shoppingCart.setting(i[1]);
                }
            }else{
                this.shoppingCart=null;
            }
        }
            
        
        // userVerify(){
        //     this.localusers=[];
        //     let keys = Object.keys(localStorage),
        //     i = keys.length;
        //     while ( i-- ) {
        //         let values=new DecLog(keys[i]);
        //         this.localusers.push( JSON.parse(values.decrypt(localStorage.getItem(keys[i]))));
        //     }
        // }

    },
    mounted(){
        if(this.selElement!=null){
            this.selFlag=true;
        }
        this.getSessionItems();
        

        // console.log(this.userVerify);
    }
}
</script>