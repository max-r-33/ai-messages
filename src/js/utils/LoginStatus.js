import Cookies from 'js-cookie';

module.exports = {
    //gets saved cookie with logged in user object
    getLoggedInUser: function(){
        var user = Cookies.get('user');
        if(user){
            return JSON.parse(user);
        }else{
            return {error: 'not logged in'};
        }
    },
    //returns boolean based on if a user is logged in or not
    userLoggedIn: function(){
        var user = Cookies.get('user');
        if(user){
            return true;
        }else{
            return false;
        }
    }
};
