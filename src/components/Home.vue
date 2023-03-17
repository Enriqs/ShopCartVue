<template>
<section>
<!-- #################################### -->
<!-- Slideshow Part                       -->
<!-- #################################### -->
<Carousel  :autoplay="5000" :wrap-around="true" :items-to-show="1" id="thumbnails">
    <Slide v-for="slide in 3" :key="slide">
        <div class="slide slideshow-container">
            <div class="mySlides carousel__item">
                <div class="numbertext">{{slide}} / 3</div>
                <img :src="require(`../img/slide${slide}.${slide==3?'webp':'jpg'}`)">
            </div>
        </div>
    </Slide>
    <template #addons>
        <Navigation />
        <!-- <Pagination /> -->
    </template>
</Carousel>   
<!-- #################################### -->    
<!-- Search Bar Part                      -->
<!-- #################################### -->
<div class="search mb-3">
    <form class="search_form" @submit.prevent="searchHandler">
        <input type="text" class="form-control-sm" placeholder="Search" v-model="srchInp">
        <button type="submit" class="btn-srch"> <i class="fi fi-br-search"></i> </button>
    </form>
</div>
<!-- #################################### -->    
<!-- Product Filter Part                  -->
<!-- #################################### -->
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-2 filter">
            <span>
                Filter Functions
            </span>
            <!-- Type Filter Part -->
            <div @click="filterHandler('type')">
                <i v-show="!typeFlag" class="fi fi-bs-angle-small-right"></i>
                <i v-show="typeFlag" class="fi fi-bs-angle-small-down"></i>
                TYPE
            </div>
            <ul v-show="typeFlag">
                <div class="list-group">
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="1" v-model="typeBeverage">Wine
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="2" v-model="typeBeverage">Beer
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="3" v-model="typeBeverage">Ciders
                    </label>
                </div>
            </ul>
            <!-- Price Filter Part -->
            <div @click="filterHandler('price')">
                <i v-show="!priceFlag" class="fi fi-bs-angle-small-right"></i>
                <i v-show="priceFlag" class="fi fi-bs-angle-small-down"></i>
                PRICE
            </div>
            <ul v-show="priceFlag">
                <div class="list-group">
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="0" v-model="pricerange"> $0.0 - $9.99
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="10" v-model="pricerange"> $10 - $19.99
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="20" v-model="pricerange"> $20 - $49.99
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="50" v-model="pricerange"> $50 - $99.99
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="100" v-model="pricerange"> $100 - $199.99
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="200" v-model="pricerange"> $200 +
                    </label>
                </div>
            </ul>
            <!-- Country Filter Part -->
            <div @click="filterHandler('country')">
                <i v-show="!countryFlag" class="fi fi-bs-angle-small-right"></i>
                <i v-show="countryFlag" class="fi fi-bs-angle-small-down"></i>
                COUNTRY
            </div>
            <ul v-show="countryFlag">
                <div class="list-group">
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Canada" v-model="countryOrigin">Canada
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="USA" v-model="countryOrigin">USA
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Mexico" v-model="countryOrigin">Mexico
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Brazil" v-model="countryOrigin">Brazil
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Japan" v-model="countryOrigin">Japan
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Korea" v-model="countryOrigin">Korea
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="France" v-model="countryOrigin">France
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Italy" v-model="countryOrigin">Italy
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Spain" v-model="countryOrigin">Spain
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Portugal" v-model="countryOrigin">Portugal
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Chile" v-model="countryOrigin">Chile
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Austria" v-model="countryOrigin">Austria
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Belgium" v-model="countryOrigin">Belgium
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="United Kingdom" v-model="countryOrigin">United Kingdom
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Trinidad And Tobago" v-model="countryOrigin">Trinidad And Tobago
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Germany" v-model="countryOrigin">Germany
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="Netherlands" v-model="countryOrigin">Netherlands
                    </label>
                </div>
            </ul>
            <!-- Alcohol Volume Filter Part -->
            <div @click="filterHandler('volume')">
                <i v-show="!volumeFlag" class="fi fi-bs-angle-small-right"></i>
                <i v-show="volumeFlag" class="fi fi-bs-angle-small-down"></i>
                VOLUME
            </div>
            <ul v-show="volumeFlag">
                <div class="list-group">
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="200" v-model="volumerange">200 mL - 354 mL
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="355" v-model="volumerange">355 mL - 499 mL
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="500" v-model="volumerange">500 mL - 749 mL
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="750" v-model="volumerange">750 mL - 999 mL
                    </label>
                    <label class="list-group-item">
                      <input class="form-check-input me-1" type="checkbox" value="1000" v-model="volumerange">1.00 L +
                    </label>
                </div>
            </ul>
        </div>
<!-- #################################### -->    
<!-- Products Display Part                -->
<!-- #################################### -->    
        <div class="col-xl-10 product" aria-label="Page navigation">
            <div class="container-fluid row2">
                <div class="detail col">
                    <ul class="pagination justify-content-center" id="back">
                      <li><button @click="goprev" :disabled="prevFlag">Prev</button></li>
                      <li><button :class="{'selected':selArr[0]}" :disabled="selArr[0]" @click="pagHandler($event)" v-if="btnFlag[0]">1</button></li>
                      <li><button :class="{'selected':selArr[1]}" :disabled="selArr[1]" @click="pagHandler($event)" v-if="btnFlag[1]">2</button></li>
                      <li><button :class="{'selected':selArr[2]}" :disabled="selArr[2]" @click="pagHandler($event)" v-if="btnFlag[2]">3</button></li>
                      <li><button :class="{'selected':selArr[3]}" :disabled="selArr[3]" @click="pagHandler($event)" v-if="btnFlag[3]">4</button></li>
                      <li><button :class="{'selected':selArr[4]}" :disabled="selArr[4]" @click="pagHandler($event)" v-if="btnFlag[4]">5</button></li>
                      <li><button @click="gonext" :disabled="nextFlag">Next</button></li>
                    </ul>
                    <h1 v-if="findFlag">No Items Found</h1>
                    <div class="table-responsive">
                        <table class="table align-middle" cellspacing="0" cellpadding="0">
                            <tbody class="main_tb">
                              <tr  v-for="(num,s) in 3" :key="s">
                                <td v-for="(pr,idx) in squareProducts[s]" :key="idx" @click="selItem(pr)" onclick="window.location.hash='menu-bar';"> 
                                  <aside class='item'>
                                    <p><span>{{pr.pid}})</span><span>{{pr.country}}</span></p>
                                    <figure>
                                        <img :src="require(`../img/pid_${pr.pid}.jpg`)" alt="error_img">
                                        <h6>{{pr.pname}}</h6>
                                        <p>${{pr.price}} - {{pr.size}}ml</p>
                                    </figure>
                                  </aside >
                                </td>
                              </tr>  
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>    
</section>
</template>


<!-- #################################### -->    
<!-- #################################### -->    
<!-- Scripts Logic Part (Jquery)          -->
<!-- #################################### -->
<!-- #################################### -->        
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import stockProducts from '../data/products.json';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default{
    name:'HomePage',
    components:{
        Carousel,
        Slide,
        // Pagination,
        Navigation,
    },
    props:['cat'],
    data(){
        return{
            fullname:{fname:'',lname:''},
            priceFlag:false,
            typeFlag:false,
            countryFlag:false,
            volumeFlag:false,
            originalp:stockProducts,
            products:stockProducts,
            squareProducts:[],
            btnFlag:[true,true,true,true,true],
            selArr:[true,false,false,false,false],
            prevFlag:true,
            nextFlag:false,
            typeBeverage:[],
            countryOrigin:[],
            pricerange:[],
            defaultPriceRange:[0,10,20,50,100,200],
            volumerange:[],
            defaultVolumeRange:[200,355,500,750,1000],
            findFlag:false,
            srchInp:'',
            blockFlag:[],
            // searchFlag:false,
        }
    },
    methods:{
        update(){
            this.$emit('update',this.fullname)
        },
        filterHandler(x){
            switch(x){
                case 'price': if (this.priceFlag===true){this.priceFlag=false;}else{this.priceFlag=true;}break;
                case 'type': if (this.typeFlag===true){this.typeFlag=false;}else{this.typeFlag=true;}break;
                case 'country': if (this.countryFlag===true){this.countryFlag=false;}else{this.countryFlag=true;}break;
                case 'volume': if (this.volumeFlag===true){this.volumeFlag=false;}else{this.volumeFlag=true;}break;
                // case 'search': if (this.searchFlag===true){this.searchFlag=false;}else{this.searchFlag=true;}break;
            }
        },
        selItem(product){
            this.$router.push({name:'detail'});
            this.$emit('selItem',product);
        },
        block(val=4,lim=0){
          let counter=0;
          let objCounter=0;
          let elarr=[[]];
          lim=lim*12;
          // for(let x of this.originalp){
          for(let x of this.products){
            counter++;
            if(counter<=lim){
              continue;
            }
            elarr[objCounter].push({...x});
            if (counter>0 && counter%val==0){
              objCounter++;
              elarr.push([]);
            }
          }
          this.squareProducts=elarr;
          // console.log(this.squareProducts[1]);
        },
        pagHandler(e){
          let x=e.target.innerText-1;
          this.pag(x);
        },
        gonext(){
          let counter=0;
          for(let x of this.selArr){
            if(x===true){
              counter++;
              break;
            }
            counter++;
          }
          this.pag(counter);
        },
        goprev(){
          let counter=0;
          for(let x of this.selArr){
            if(x===true){
              counter--;
              break;
            }
            counter++;
          }
          this.pag(counter);
        },
        pag(x){
          for(let i=0;i<5;i++){
            this.selArr[i]=false; //set false all array
          }
          this.selArr[x]=true; //true only selected
          if(x==0){
            this.prevFlag=true;
          }else{
            this.prevFlag=false;
          }
          let counter=0;
          for(let x of this.btnFlag){
            if(x===true){
              counter++;
            }
          }
          if(x==(counter-1)){
            this.nextFlag=true;
          }else{
            this.nextFlag=false;
          }
          this.block(4,x);
        },
        filtering(){
          this.srchInp='';
          this.findFlag=false;
          let newarr=[];
          let ctrlArr=[];
          let counter=0;
          // console.log(this.typeBeverage);
          if(Object.keys(this.typeBeverage).length === 0){
            ctrlArr=[...this.originalp]
            counter++;
          }else{
            for(let x of this.originalp){
              for(let y of this.typeBeverage){
                if(x.type==y){
                  newarr.push(x)
                }
              }
            }
            ctrlArr=[...newarr];
          }
          if(Object.keys(this.countryOrigin).length === 0){
            counter++;
          }else{
            newarr=[];
            for(let x of ctrlArr){
              for(let y of this.countryOrigin){
                if(x.country==y){
                  newarr.push(x)
                }
              }
            }
            ctrlArr=[...newarr];
          }
          //***PRICE FILTER */
          if(Object.keys(this.pricerange).length === 0){
            counter++;
          }else{
            newarr=[];
            for(let x of ctrlArr){
              for(let y of this.pricerange){
                y=parseInt(y);
                if (y==200){
                  if(x.price>=200){
                    newarr.push(x)
                  }
                }else{
                  let c=0;
                  for(let j of this.defaultPriceRange){
                    if(y==j){
                      c++;
                      break;
                    }
                    c++;
                  }
                  if(x.price>=y&& x.price<this.defaultPriceRange[c]){
                    newarr.push(x)
                  }
                }
              }
            }
            ctrlArr=[...newarr];
          }
          //***VOLUME FILTER */
          if(Object.keys(this.volumerange).length === 0){
            counter++;
          }else{
            newarr=[];
            for(let x of ctrlArr){
              for(let y of this.volumerange){
                y=parseInt(y);
                if (y==1000){
                  if(x.size>=1000){
                    newarr.push(x)
                  }
                }else{
                  let c=0;
                  for(let j of this.defaultVolumeRange){
                    if(y==j){
                      c++;
                      break;
                    }
                    c++;
                  }
                  if(x.size>=y&& x.size<this.defaultVolumeRange[c]){
                    newarr.push(x)
                  }
                }
              }
            }
          }
          if(newarr.length==0){
            this.products=[];
            this.findFlag=true;
          }else{
            this.products=[...newarr];
          }
          if(counter==4){
            this.products=[...this.originalp];
            this.findFlag=false;
          }
          this.block();
          this.blockFlag=this.squareProducts;
          this.btnFlagsHandler();
        },
        btnFlagsHandler(){
          let btnCounter=0;
           if(this.blockFlag[0].length>0){
            for(let i=0;i<5;i++){/////btn flags handler
              this.btnFlag[i]=false; //set false all array
            }
            for(let x in this.blockFlag){
              if(this.blockFlag[x].length>0){
                if(x%3==0){
                  this.btnFlag[btnCounter]=true;
                  this.pag(0);
                  btnCounter++;
                }
              }
            }
          }
        },
        searchHandler(){
          this.findFlag=false;
          let str=this.srchInp.toLowerCase();
          let newarr=[];
          for(let x of this.originalp){
            let a=x.pname.toLowerCase();
            let b=x.country.toLowerCase();
            if(a.includes(str)){
              newarr.push(x);
            }else if(b.includes(str)){
              newarr.push(x);
            }
          }
          if(newarr.length==0){this.findFlag=true;}
          this.products=[...newarr];
          this.block();
          this.blockFlag=this.squareProducts;
          this.btnFlagsHandler();
        },
        validatesrch(val){
          let str='';
          for(let x of val){
            if (x.charCodeAt()>=48&&x.charCodeAt()<=57 || x.charCodeAt()>=64&&x.charCodeAt()<=90 || x.charCodeAt()>=97&&x.charCodeAt()<=122 || x=='+' || x=='~' || x=='-' || x=='_' || x=='.'){
                str+=x;
            }
          }
          return str;
        },
        catHandler(val){
          if (val==1){
            this.typeBeverage=['1'];
          } else if(val==2){
            this.typeBeverage=['2'];
          }else if(val==3){
            this.typeBeverage=['3'];
          }else{
            this.typeBeverage=[];
          }
        }
    },
    mounted() {
      this.block();
      this.catHandler(this.cat);
      // console.log(this.cat);
    },
    watch:{
      typeBeverage(val) {
        this.typeBeverage=val;
        this.filtering();
      },
      countryOrigin(val) {
        this.countryOrigin=val;
        this.filtering();
      },
      pricerange(val){
        this.pricerange=val;
        this.filtering();
      },
      volumerange(val){
        this.volumerange=val;
        this.filtering();
      },
      srchInp(val){
        if(val==''){
          this.searchHandler();
        }
        this.srchInp=this.validatesrch(val);
      },
      cat(val){
        this.catHandler(val);
      }
    }
};


///////////////////////////////////////////    
</script>
