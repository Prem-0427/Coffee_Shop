// ===========================================
// Kindling Coffee Co.
// Login Authentication
// ===========================================


const API_URL = "https://coffee-shop-uiom.onrender.com/api/auth";



const loginForm = document.getElementById("loginForm");


if(loginForm){


    const emailInput =
    document.getElementById("loginEmail");


    const passwordInput =
    document.getElementById("loginPassword");


    const successBox =
    document.getElementById("loginSuccess");



    loginForm.addEventListener(
        "submit",
        async function(e){


        e.preventDefault();



        const email =
        emailInput.value.trim();


        const password =
        passwordInput.value;



        if(!email || !password){

            alert("Please enter email and password");

            return;

        }



        try{


            const response =
            await fetch(
                `${API_URL}/login`,
                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },


                    body:JSON.stringify({

                        email,
                        password

                    })

                }
            );



            const data =
            await response.json();




            if(data.success){


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );



                successBox.innerHTML =
                "Login Successful...";

                successBox.classList.add("show");



                setTimeout(()=>{


                    window.location.href =
                    "menu.html";


                },1000);



            }
            else{


                alert(data.message);


            }




        }
        catch(error){


            console.log(error);


            alert(
                "Unable to connect to server"
            );


        }



    });



}