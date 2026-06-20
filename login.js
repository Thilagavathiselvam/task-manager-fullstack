function login() {

    const data = {

        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch("http://localhost:8080/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(res => res.text())

    .then(response => {

        if(response.includes("Success")) {

            if(response.includes("ADMIN")) {
                sessionStorage.setItem("role","ADMIN");
            }
            else{
                sessionStorage.setItem("role","USER");
            }

            window.location.href="dashboard.html";
        }
        else{
            alert(response);
        }
    });
}