


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

    Vue.component('aboutsection',{
        template: `
            <div class="BlueText">
                <h1>This is the about section</h1>
            </div>
            `
    })

    var app = new Vue({
		el:             'main',
		data:{
            fname:      'Eoin',
			lname:      'Dolan',
            newContent: '<h2>This is from the app instance<//h2>',

            homeLink:       'Home',
            aboutLink:      'About',
            mailIcon:       '<a href="#"><i class="fa fa-envelope" style="font-size:18px"></i></a>',
            userLoggedIn:   '<a href="#">EoinyPony</a>',
            flagIcon:       '<a href="#"><i style="font-size:18px">&#x2691;</i></a>'
		}
    })