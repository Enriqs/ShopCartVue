<template>
<section>
<!-- #################################### -->
<!-- Nav Menu Part                        -->
<!-- #################################### -->
    <nav-compo :logFlag="logFlag" :loggedUser="loggedUser" @category="categoryHandler"/>
    
    <br/>
<!-- #################################### -->
<!-- Main Page Part                       -->
<!-- #################################### -->
    <main>
      <router-view @login="loginHandler" @logout="logoutHandler" @selItem="selectHandler" @category="categoryHandler" :cat="cat" :selElement="selElement" :userVerify="userVerify" :loggedUser="loggedUser"> 
      </router-view>
    </main>

<!-- #################################### -->
<!-- Footer Part                          -->
<!-- #################################### -->
    <footer>
        <section>
            <aside>
                <h5>contact</h5>
                <small>
                    <p><a href="#">+ 123 456 7890</a></p>
                    <a href="mailto:team_A_myliquer@mail.com">team_A_myliquer@mail.com</a>
                </small>
                <address><a href="#">5678 West Penda Street, Vancouver, BC, Canada</a></address>
            </aside>
            <aside>
                <h5>follow us</h5>
                <blockquote>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                </blockquote>
            </aside>
        </section>
    <article>
        <aside class="copyright">
            <span>Copyright &copy; 2023 Tamwood College Careers Web Development | JS Advanced Final Project | Team A</span>
            <p>Design by <span><a>Nao Aoyama</a> | <a>Claire Na</a> | <a>Junseop Shin</a> | <a>José Enrique Jiménez Rojas</a></span></p>
        </aside>
    </article>        
    </footer>
</section>
</template>


<script>
import NavCompo from './components/NavCompo.vue';
import DecLog from './class/DecLog.js';

export default {
  name: 'App',
  components: {
    NavCompo
  },
  data(){
    return{
      fullName:{fname:'',lname:''},
      curPage:'',
      logFlag:true,
      loggedUser:{name:''},
      cat:0,
      selElement:null,
      userVerify:false,
    }
  },
  methods:{
    updateData(value){
      this.fullName = value;
    },
    loginHandler(user){
        this.logFlag = false;
        // console.log(user);
        let uObj= new DecLog(user.uid,user.name);
        uObj.store(user);
        this.loggedUser=uObj;
        this.userVerify=true;
        // this.productList = new ProductList(this.loggedUser.uid,this.loggedUser.fname,this.loggedUser.lname);
    },
    logoutHandler(x){
        this.logFlag=true;
        console.log(x);
        console.log('logout attempt')
    },
    categoryHandler(x){
        this.cat=x; 
    },
    selectHandler(x){
        // console.log(x);
        this.selElement=x;
    }
  },
  mounted(){
    this.cat=0;
    let keys = Object.keys(sessionStorage),
    i = keys.length;
    // console.log(keys);
    while ( i-- ) {
        if (keys[i]=='trys' || keys[i]=='shopcart'){
            continue
        }
        let values=new DecLog(keys[i]);
        this.loginHandler(JSON.parse(values.decrypt(sessionStorage.getItem(keys[i]))));
    }
  }
}
</script>
<style>
@import url('./css/style.css');
</style>