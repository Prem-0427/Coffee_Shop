// ===========================================
// Kindling Coffee Co.
// Signup Authentication
// ===========================================


const API_URL = "https://coffee-shop-uiom.onrender.com/api/auth";



const signupForm =
document.getElementById("signupForm");



if(signupForm){



    const nameInput =
    document.getElementById("signupName");


    const emailInput =
    document.getElementById("signupEmail");


    const passwordInput =
    document.getElementById("signupPassword");


    const confirmInput =
    document.getElementById("signupConfirm");


    const successBox =
    document.getElementById("signupSuccess");





    signupForm.addEventListener(
        "submit",
        async function(e){


        e.preventDefault();




        const name =
        nameInput.value.trim();


        const email =
        emailInput.value.trim();


        const password =
        passwordInput.value;


        const confirmPassword =
        confirmInput.value;





        if(
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ){

            alert(
                "Please fill all fields"
            );

            return;

        }





        if(password !== confirmPassword){


            alert(
                "Passwords do not match"
            );

            return;


        }





        try{


            const response =
            await fetch(
                `${API_URL}/signup`,
                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },


                    body:JSON.stringify({

                        name,

                        email,

                        password

                    })

                }
            );





            const data =
            await response.json();






            if(data.success){



                successBox.innerHTML =
                "Account Created Successfully";



                successBox.classList.add("show");



                setTimeout(()=>{


                    window.location.href =
                    "login.html";


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