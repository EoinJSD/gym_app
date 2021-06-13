Vue.use(VueRouter);

const NavBar = Vue.component('navbar', {
    template: `
        <nav>
            <ul>
                <li>HOME</li>
                <li>STORE</li>
                <li>NOTE</li>
                <li>PROF</li>
            </ul>
        </nav>
        `
})


/** components for authentication screens */
const Login = Vue.component('login', {
    template: `
        <div class="container">
            <div class="flashbox">
                <img src="" alt="" srcset="">
            </div>

            <div class="authbox">
                <div class="authContainer">
                    <img :src="logoImage"> 

                    <div class="auth">
                        <h1>Log into your account</h1>
                            <input type="text" v-model="username" name="username" placeholder="Phone/Email">
                            <input type="password" v-model="password" name="password" placeholder="Password">
                            <button @click="handleLogin" type="button">Sign In</button>
                        <span>Don't have and account? <a href="#/signup">Sign Up</a></span>
                    </div>

                </div>
            </div>
        </div>
        `,
    methods: {
        handleLogin() {
            console.log(this.password);
            console.log(this.username);

            this.loggedIn = true;

            console.log(this.$parent.users);
            let user = this.$parent.users.find(user => user.name === this.username);

            if (user) {
                //this.$parent.loggedInUser = user; //trying to track the current user for other pages can access that data
                let role = user.role
                this.$parent.userLoggedIn = true;
                if (role === "trainer") {
                    this.$router.push({
                        name: 'trainer_hub',
                        params: {
                            username: this.username
                        }
                    });
                }

                if (role === "member") {
                    this.$router.push({
                        name: 'member_hub',
                        params: {
                            username: this.username
                        }
                    });
                }
            } else {
                alert("User does not exist")
            }
        }
    },
    data: function () {
        return {
            password: "",
            username: "",
            /*Define Variables here */
            logoImage: 'resources/FFPlus_Logo.png'
        }
    }
})

const SignUp = Vue.component('signup', {
    template: `
        <div class="container">
				<div class="flashbox">
					<img src="" alt="" srcset="">
				</div>

				<div class="authbox">
					<div class="authContainer">
						<img :src="logoImage"> 

                        <div class="auth">
                            <h1>Start your journey here!</h1>
                                <input type="text"      v-model="email"     name="email"    id="email"      placeholder="Email Address">
                                <input type="text"      v-model="mobile"    name="mobile"   id="mobile"     placeholder="Phone Number">
                                    <div v-if="password !== confpass"><h1>Password Doesn't Match</h1></div>                                
                                <input type="password"  v-model="password"  name="password" id="password"   placeholder="Password">
                                <input type="password"  v-model="confpass"  name="confpass" id="confpass"   placeholder="Confirm Password">
                                <button type="button" @click="handleSignUp">SIGN UP</button>
                                <span>Already have an account? <a href="#/login">Log In</a></span>
                        </div>
                    </div>
                </div>
        </div>
        `,
    methods: {
        /*add code here */
        handleSignUp() {
            this.$parent.users.push({
                name: this.email,
                role: "member"
            });
            this.$router.push("/login")
        }
    },
    data: function () {
        return {
            /*Define Variables here */
            logoImage: 'resources/FFPlus_Logo.png',
            email: "",
            mobile: "",
            password: "",
            confpass: ""
        }
    }
})




/* 
using const and component for routing reasons
const - wont change
component - the page that router will display on screen

Component for the User and Trainer Hub login screen
*/
const MemberHub = Vue.component('member_hub', {
    template: `
        <div class="hubcontainer">
            <div v-if="!hasSelectedMood" class="mood">
                <div class="welcome">
                    <h1>Hi {{username}},</h1>
                    <p>How are you feeling today?</p>
                </div>

                <div class="moodbar">
                    <ul>
                        <li v-for="mood in moods_2" :class="mood.color" @click="handleMood(mood.name)">{{mood.name}}</li>
                    </ul>
                </div>
            </div>
            <div v-else class="welcome">
                <h1>Good To Know you're feeling {{selectedMood}}</h1>
            </div>

            <div class="highlight">
                <div class="todaysworkout">
                    <div class="image">
                        <img src="resources/workout_figure.png">
                    </div>

                    <div class="workoutcontent">
                        <div class="label">
                            <p>Today's workout...</p>
                            <h1>Cardio & Mobility</h1>
                        </div>

                        <div class="workoutlink">
                            <a href="#/your_workouts">Take a look</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="menu">
                <div class="options">
                    <div class="todaysWorkouts">
                    <a href="#/your_workouts"><h3>Your todaysWorkouts</h3></a>
                    </div>
                    <div class="meals">
                        <h3>Your Meals</h3>
                    </div>
                    <div class="calendar">
                        <h3>Calendar</h3>
                    </div>
                    <div class="trainer">
                        <h3>Your Trainer</h3>
                    </div>
                </div>
            </div>

            <div class="event">
                <div class="nextevent">
                    <h1>NEXT EVENT</h1>
                    <a href="#">See more</a>
                </div>
            </div>
            <navbar></navbar>
        </div>
        `,
    data: function () {
        return {
            /*Define Variables */
            moods: [
                "Excellent",
                "Happy",
                "Anxious",
                "Tired",
                "Bored",
                "Not-Arsed",
                "Piss Off",
                "123",
                "456"
            ],
            moods_2: [
                { name: "Excellent", color: "yellow" },
                { name: "Happy", color: "blue" },
                { name: "Anxious", color: "green" },
            ],
            hasSelectedMood: false,
            selectedMood: ""
        }
    },
    methods: {
        handleMood(mood) {
            this.selectedMood = mood;
            this.hasSelectedMood = true;
        }
    },
    props: {
        //if another page going to pass variable. i.e. login page
        username: String
    }
})

const TrainerHub = Vue.component('trainer_hub', {
    template: `
    <div class="hubcontainer">
        <div class="mood">
            <div class="welcome">
                <h1>Hi Trainer,</h1>
                <p>How are you feeling today?</p>
            </div>
            <div class="moodbar">
                <ul>
                    <li>Excellent</li>
                    <li>Excellent</li>
                </ul>
            </div>
        </div>

        <div class="event">
            <div class="nextevent">
                <h1>NEXT EVENT</h1>
                <a href="#">See more</a>
            </div>
        </div>

        <div class="menu">
            <div class="options">
                <div class="todaysWorkouts">
                    <h3>Your Clients</h3>
                </div>
                <div class="meals">
                    <h3>Your Meals</h3>
                </div>
                <div class="calendar">
                    <h3>Calendar</h3>
                </div>
                <div class="trainer">
                    <h3>Your Trainer</h3>
                </div>
            </div>
        </div>
        <navbar></navbar>
    </div>
        `,
    methods: {

    },
    data: function () {
        return {

        }
    },
    props: {

    }
})



/** Component for create your own */

/** Component for YourtodaysWorkouts Page */
const YourWorkouts = Vue.component('your_workouts', {
    template: `
        <div class="ywcontainer">
        <div class="todaysworkout">

            <div class="content">
                <a href="#/member_hub">Back</a>
                <div class="label">
                    <p>Today's workout...</p>
                    <h1>Cardio & Mobility</h1>
                </div>
                <div class="image">
                    <img src="resources/workout_figure.png">
                </div>
            </div>

            <div v-for="workout in todaysWorkouts" class="workoutcard">
                <div class="workout">
                    <span>{{workout.name}}</span>
                    <table>
                        <tr>
                            <th>Set</th>
                            <th>Exercise</th>
                            <th>Reps/Time</th>
                        </tr>
                        <tr v-for="exercise in workout.exercises">
                            <td>{{exercise.exercise_number}}</td>
                            <td>{{exercise.exercise_name}}</td>
                            <td>{{exercise.length}}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>

        <div class="menu">
            <h1>Your todaysWorkouts</h1>
            <div class="workoutfeed">
                <div class="createworkout">
                    <div class="createcard">
                        <h1>Create your own</h1>
                        <button @click="toggleEditor">+</button>
                    </div>
                </div>
                

                <div v-if="showEditor" class="workouteditor">
                    <input v-model="new_workout.name"/>
                    <table>
                        <tr>
                            <th>Set</th>
                            <th>Exercise</th>
                            <th>Reps/Time</th>
                        </tr>
                        <tr v-for="exercise in new_workout.exercises">
                            <td>{{exercise.exercise_number}}</td>
                            <td><input v-model="exercise.exercise_name"/></td>
                            <td><input v-model="exercise.length"/></td>
                        </tr>
                    </table>
                    <button @click="handleSaveWorkout">Add</button>
                </div>

                <div v-for="workout in yourWorkouts" class="workoutcard">
                <div class="workout">
                    <span>{{workout.name}}</span>
                    <table>
                        <tr>
                            <th>Set</th>
                            <th>Exercise</th>
                            <th>Reps/Time</th>
                        </tr>
                        <tr v-for="exercise in workout.exercises">
                            <td>{{exercise.exercise_number}}</td>
                            <td>{{exercise.exercise_name}}</td>
                            <td>{{exercise.length}}</td>
                        </tr>
                    </table>
                </div>
            </div>

            </div>
            </div>
        </div>
        `,
    data: function () {
        return {
            showEditor: false,
            new_workout: {
                name: "",
                exercises: [
                    {
                        exercise_number: 1,
                        exercise_name: "",
                        length: ""
                    },
                    {
                        exercise_number: 2,
                        exercise_name: "",
                        length: ""
                    },

                    {
                        exercise_number: 3,
                        exercise_name: "",
                        length: ""
                    }
                ]
            },
            todaysWorkouts: [{
                name: "Conditioning",
                exercises: [
                    {
                        exercise_number: 1,
                        exercise_name: "Bike Sprint",
                        length: "4 mins"
                    },
                    {
                        exercise_number: 2,
                        exercise_name: "Rowing",
                        length: "10 mins"
                    },

                    {
                        exercise_number: 3,
                        exercise_name: "Prowler",
                        length: "1 mins"
                    }
                ]
            },
            {
                name: "Mobility",
                exercises: [
                    {
                        exercise_number: 1,
                        exercise_name: "Bodyweight Squat",
                        reps: "20"
                    },
                    {
                        exercise_number: 2,
                        exercise_name: "Rev lunges",
                        reps: "15"
                    },

                    {
                        exercise_number: 3,
                        exercise_name: "Hip Thrusts",
                        reps: "12"
                    }
                ]
            }],
            yourWorkouts: []
        }
    },
    methods: {
        toggleEditor() {
            this.showEditor = !this.showEditor;
        },
        handleSaveWorkout() {

            this.yourWorkouts.push(this.new_workout);
            //taking workout in from input and adding to list of todaysWorkouts

            //clearing new workout from the form used in the page
            this.new_workout = {
                name: "",
                exercises: [
                    {
                        exercise_number: 1,
                        exercise_name: "",
                        length: ""
                    },
                    {
                        exercise_number: 2,
                        exercise_name: "",
                        length: ""
                    },
                    {
                        exercise_number: 3,
                        exercise_name: "",
                        length: ""
                    }
                ]
            }
            console.log(this.yourWorkouts);
        }
    },
    mounted: function () {
        this.$forceUpdate();
    }
})

/* creating routes for linking and navigation    */
const routes = [
    { path: "/", name: "login", component: Login, props: true },
    { path: "/signup", name: "signup", component: SignUp, props: true },
    { path: "/member_hub", name: "member_hub", component: MemberHub, props: true },
    { path: "/trainer_hub", name: "trainer_hub", component: TrainerHub, props: true },
    { path: "/your_workouts", name: "your_workouts", component: YourWorkouts, props: true }
];

//Instantiating the Vue Router 
const router = new VueRouter({
    routes
})


var app = new Vue({
    router,
    el: '#app',
    data: {
        users: [
            { name: "Eoin", role: "trainer" },
            { name: "Damien", role: "member" }
        ],
        isTrainer: false,
        loggedInUser: {},
        userLoggedIn: false,
        username: ""
    }
})