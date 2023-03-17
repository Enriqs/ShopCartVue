<template>
   <nav>
        <h6 class="marquee" v-if="!logFlag">Welcome <span>{{loggedUser.name}}</span> !!</h6>
        <br>
        <div class="nav_up">
            <ul class="login_menu">
                <li v-show="logFlag">
                    <router-link to="/login"><i class="fi fi-rs-user"></i> Sign in</router-link>
                </li>
                <li v-show="!logFlag">
                    <router-link to="/billing">Cart <i class="fi fi-rr-shopping-cart"></i></router-link>
                </li>
                <li v-show="!logFlag">|</li>
                <li v-show="!logFlag">
                    <p @click="logoutHandler" id="logout">
                    Log<i class="fi fi-sr-user"></i>out</p>
                </li>
            </ul>
        </div>
        <div class="nav_down">
            <figure>
                <router-link to="/" @click="gral" onclick="window.location.hash='thumbnails';">
                    <img src="../img/logo.png"/> 
                    <span>My-Liquer(Team A)</span>
                </router-link>
            </figure>
            <ul class="menu" id="menu-bar">
                <li>
                    <router-link to="/about">About</router-link>
                </li>
                <li>
                    <router-link to="/" @click="beer" onclick="window.location.hash='back';">Beer</router-link>
                    <!-- <p @click="beer">Beer</p> -->
                </li>
                <li>
                    <router-link to="/" @click="wine" onclick="window.location.hash='back';">Wine</router-link>
                </li>
                <li>
                    <router-link to="/" @click="cider" onclick="window.location.hash='back';">Cider</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name:'NavCompo',
    props:['logFlag','loggedUser'],
    methods:{
        logoutHandler(){
            sessionStorage.clear();
            location.reload();
        },
        beer(){
            this.$emit('category',2);
            return;
        },
        wine(){
            this.$emit('category',1);
            return;
        },
        cider(){
            this.$emit('category',3);
            return;
        },
        gral(){
            this.$emit('category',0);
            return;
        }
    }
}
</script>