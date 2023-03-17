<template>
<section>
<h1>Login Page</h1>
<div class="login">
    <!-- Login input forms -->
    <!-- <form class="sign" ng-submit="loginClick($event)"> -->
    <form class="sign" @submit.prevent="loginHandler" v-if="secFlag">
        <div class="mb-3 row justify-content-start">
            <div class="col-8">
                <label for="email" class="col-form-label">Email</label>
                <input v-model="email" type="email" class="form-control" name="email" id="email" placeholder="Enter your email" required :maxlength="maxLength"/>
            </div>
            <div class="col-8">
                <label for="pass" class="col-form-label">Password</label>
                <input v-model="pass" type="password" class="form-control" name="pass" id="pass" placeholder="Enter your Password" required :maxlength="maxLengthPass"/>
            </div>
        </div>
        <fieldset class="mb-3 row justify-content-start">
            <div class="col-8">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" required/>
                  <label class="form-check-label">
                    Yes, I am <span>19 years</span> or over.
                  </label>
                </div>
                
            </div>
        </fieldset>
        <div class="mb-3 row justify-content-start">
            <div class="col-sm-8">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </div>
    </form>
    <!-- Create new Account  -->
    <form class="new" @submit.prevent="goReg">
        <div class="mb-3 row justify-content-start">
            <div class="col-sm-8">
                <button id="open-register" type="submit" class="btn btn-success" style="height:fit-content;">Register</button>
                <br>
                <br>
            </div>
        </div>
    </form>
</div>
<br/><br/>
<!-- ********************************* -->
<div id="myModal" class="modal" v-if="regFlag">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close" @click="closingX">&times;</span>
        <div class="newaccount" id="dialog-form" title="&#128525; Enjoy Your Life With Us" >
            <p class="validateTips" style="padding:4vh;">To register for our MyLiquer Store, which gives you access to multiple products and services, please fill in the below registration form.</p>
            <form @submit.prevent="accCreated">
                <div class="mb-5 dialog col-5"  style="padding-left:3vh;padding-bottom:3vh;">
                <label class="form-label">Name</label>
                <input v-model="namereg" type="text" class="form-control" id="name" placeholder="Enter your name" required :maxlength="maxLength"/>

                <label class="form-label">Email</label>
                <input v-model="emailreg" type="text" class="form-control" id="emailreg" placeholder="Enter your email" required :maxlength="maxLength"/>

                <label class="form-label">Password</label> <button type="button" @click="showHandler" id="btnshow">{{btntxt}}</button>
                <input v-model="passreg" :type="passtype" class="form-control" id="passreg" placeholder="Enter your password" required :maxlength="maxLength"/>
               

                <label class="form-label">City</label>
                <input v-model="city" type="text" class="form-control" id="city" placeholder="Enter your city" required :maxlength="maxLength"/>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" required/>
                    <label class="form-check-label">Yes, I am <span>19 years</span> or over.</label>
                </div>
                <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" required/>
                        <label class="form-check-label">
                            Yes, I have read and accept the Privacy Policy and Terms of Use
                        </label>
                    </div>

                <button id="create-user" type="submit" class="btn btn-success" style="height:fit-content;">Create Account</button>

                </div>
            </form>
        </div>

  </div>
</div>
<!-- <button @click="clr" >Clear</button> -->
</section>
</template>
<script>
import UserData from '../data/users.json';
import LogUser from '../class/LogUser.js';
import DecLog from '../class/DecLog.js';

    export default {
        name:'LoginForm',
        data(){
            return{
                regFlag:false,
                email:'',
                pass:'',
                uidreg:0,
                namereg:'',
                emailreg:'',
                passreg:'',
                city:'',
                users:UserData,
                localusers:[],
                newuser:null,
                trys:0,
                secFlag:true, //security flag attempts
                maxLength:20,
                maxLengthPass:300,
                passtype:'password',
                btntxt:'Show'
            }   
        },
        methods:{
            loginHandler(){
                let lflag=false;
                let loggedU=null;
                for(let x of this.users){
                    if (this.email ==x.email && this.pass==x.pass){
                        loggedU=new LogUser(x.uid,x.name,x.email,x.city);
                        lflag=true;
                    }
                }
                for(let x of this.localusers){
                    if (this.email ==x.email && this.pass==x.pass){
                        loggedU=new LogUser(x.uid,x.name,x.email,x.city);
                        lflag=true;
                    }
                }
                if (lflag===true){
                    this.trys=0;
                    sessionStorage.setItem('trys',0);
                    // console.log('logged in');
                    // console.log(loggedU);
                    // loggedU.sessionstore(loggedU);
                    this.$emit('login',loggedU);
                    this.$router.push({name:'home'});
                }else{
                    sessionStorage.setItem('trys',this.trys++);
                    if(sessionStorage.getItem('trys')>3){
                        alert('Attempts Exceeded');
                        this.secFlag=false;
                        setTimeout(() => {
                            this.secFlag=true;
                            this.trys=0;
                        }, 10000);
                    }else{
                        alert('Incorrect email or password, try again');
                    }
                }
            },
            goReg(){
                this.regFlag=true;
                this.uidreg=1+this.uidreg;
                // console.log(this.users[this.users.length-1]);
            },
            showHandler(){
                if (this.passtype=='password'){
                    this.passtype='text';
                    this.btntxt='Hide';
                }else{
                    this.btntxt='Show';
                    this.passtype='password';
                }
            },
            accCreated(){
                let flagReg=false;
                this.getlocal();
                for(let x of this.users){
                    if (this.emailreg ==x.email){
                        alert('this email already in use');
                        flagReg=true;
                        return
                    }
                }
                for(let x of this.localusers){
                    if (this.emailreg ==x.email){
                        alert('this email already in use');
                        flagReg=true;
                        return
                    }
                }
                let validations={num:false,specChar:false,lowerCase:false,upperCase:false};
                if (this.passreg.length<8){
                    alert('Password must have at least 8 characters');
                    flagReg=true;
                    return
                }
                for(let x of this.passreg){
                    if (x.charCodeAt()>=48&&x.charCodeAt()<=57){
                        validations.num=true;
                    } else if (x.charCodeAt()>=65&&x.charCodeAt()<=90){
                        validations.upperCase=true;
                    } else if(x.charCodeAt()>=97&&x.charCodeAt()<=122){
                        validations.lowerCase=true;
                    } else if(x.charCodeAt()>=33&&x.charCodeAt()<=126){
                        validations.specChar=true;
                    }
                }
                for (let x in validations){
                    if(validations[x]===false){
                        flagReg=true;
                        alert('Password must contain at least one uppercase, one lowercase, one special character and one number');
                        return;
                    }
                }
                if (flagReg===false){
                    this.newuser=new LogUser(this.uidreg,this.namereg,this.emailreg,this.city,this.passreg)
                    this.newuser.store(this.newuser);
                    this.namereg='';
                    this.emailreg='';
                    this.passreg='';
                    this.city='';
                    this.regFlag=false;   
                }
            },
            closingX(){
                this.regFlag=false;   
                this.uidreg=this.uidreg-1;
            },
            clr(){
                localStorage.clear();
                sessionStorage.clear();
            },
            validatemail(val){
                let str='';
                    for(let x of val){
                        if (x.charCodeAt()>=48&&x.charCodeAt()<=57 || x.charCodeAt()>=64&&x.charCodeAt()<=90 || x.charCodeAt()>=97&&x.charCodeAt()<=122 || x=='+' || x=='~' || x=='-' || x=='_' || x=='.'){
                            str+=x;
                        }
                    }
                return str;
            },
            validateinpass(val){
                let str='';
                    for(let x of val){
                        if (x.charCodeAt()>=33&&x.charCodeAt()<=126){
                            if (x!='<' || x!='>' || x!='&' || x!='`' || x!='"' || x!='%' || x!='!'){
                                str+=x;
                            }
                        }
                    }
                return str;
            },
            validatename(val){
                    let str='';
                    for(let x of val){
                        if (x.charCodeAt()>=65&&x.charCodeAt()<=90 || x.charCodeAt()>=61&&x.charCodeAt()<=122 || x.charCodeAt()==32){
                            str+=x;
                        }
                    }
                return str;
            },
            getlocal(){
                this.localusers=[];
                let keys = Object.keys(localStorage),
                i = keys.length;
                while ( i-- ) {
                    let values=new DecLog(keys[i]);
                    this.localusers.push( JSON.parse(values.decrypt(localStorage.getItem(keys[i]))));
                }
            }
        },
        watch:{
            email(val){
                this.email=this.validatemail(val);
            },
            emailreg(val){
                this.emailreg=this.validatemail(val);
            },
            pass(val){
                this.pass=this.validateinpass(val);
            },
            passreg(val){
                this.passreg=this.validateinpass(val);
            },
            namereg(val){
                this.namereg=this.validatename(val);
            },
            city(val){
                this.city=this.validatename(val);
            }   
        },
        mounted(){
            this.uidreg=this.users[this.users.length-1].uid;
            //********* Getting users from localstorage, decrypting data */
            this.getlocal();
            // console.log(this.localusers);
            if(sessionStorage.getItem('trys')>3){
                this.secFlag=false;
                setTimeout(() => {
                    this.secFlag=true;
                    this.trys=0;
                    sessionStorage.setItem('trys',this.trys);
                }, 10000);
            }
        }
    }
</script>

<style>
@import url('../css/style.css');
</style>