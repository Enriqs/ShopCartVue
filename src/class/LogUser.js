import CryptoJS from 'crypto-js';
class LogUser{ //register user class
    constructor(uid,name,email,city,pass=null){
        this.uid=uid;
        this.name=name;
        this.email=email;
        this.city=city;
        this.pass=pass;
    }
    store(uObj){
        uObj=JSON.stringify(uObj);
        let x=this.encrypt(uObj);
        localStorage.setItem(this.uid,x);
    }
    sessionstore(uObj){
        uObj=JSON.stringify(uObj);
        let x=this.encrypt(uObj);
        sessionStorage.setItem(this.uid,x);
    }
    encrypt(data){
        return CryptoJS.AES.encrypt(data,'liquor').toString();
    }
    decrypt(encData){
        let decData = CryptoJS.AES.decrypt(encData,'liquor');
        return decData.toString(CryptoJS.enc.Utf8);
    }
}
export default LogUser;