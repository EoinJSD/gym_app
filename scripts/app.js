    Vue.component('mynavbar',{
        template: `
        <header id="navContainer">
            <nav>
                <ul class="links">
                    <li><a href="C:/Users/Owner/Documents/DiD_UX_Frontend/Development/Vue_Tutorial/index.html">Home</a></li>
                    <li><a href="C:/Users/Owner/Documents/DiD_UX_Frontend/Development/Vue_Tutorial/pages/about.html">About</a></li>
                    <li><a href="#"><i class="fa fa-envelope" style="font-size:18px"></i></a></li>
                    <li class="loggedIn" v-html="userLoggedIn"></li>
                    <li><a href="#"><i style="font-size:18px">&#x2691;</i></a></li>
                </ul>
            </nav>
        </header>
        `
        })

    Vue.component('logn',{
        template:`
        <div class="auth">
            <h1>Log into your account</h1>
                <input type="text" name="username" placeholder="Phone/Email">
                <input type="password" name="password" placeholder="Passsworrd">
                <button type="button">Sign In</button>
            <span>Don't have and account? <a href="#">Sign Up</a></span>
        </div>
        `
    })

    Vue.component('signup',{
        template:`
        <div class="auth">
            <h1>Start your journey here!</h1>
                <input type="text" name="email" id="email" placeholder="Email Address">
                <input type="text" name="mobile" id="mobile" placeholder="Phone Number">
                <input type="password" name="password" id="password" placeholder="Password">
                <input type="password" name="confpass" id="confpass" placeholder="Confirm Password">
                <button type="button">SIGN UP</button>
        </div>
        `
    })

    /* creating routes for linking and navigation 
    const routes = [
        { path: "index.html", name: "index" },
        { path: "onboarding.html", name: "onboarding" }
    ];

    //Instantiating the Vue Router 
    const router = new VueRouter({
        routes
    })
    */
    var app = new Vue({
		router,
        el:             '#app',
		data:{
            loggedIn:   true,
            logoImage:  'resources/FFPlus_Logo.png'
		}
    })