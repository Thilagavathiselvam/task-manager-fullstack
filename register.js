function register() {

    const user = {

        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        role: document.getElementById("role").value

    };

    // Validation

    if (
        user.username === "" ||
        user.email === "" ||
        user.password === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    console.log("Sending Data:", user);

    fetch("http://localhost:8080/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })

    .then(response => {

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }

        return response.json();
    })

    .then(data => {

        console.log("Success:", data);

        alert("Registration Successful!");

        window.location.href = "login.html";

    })

    .catch(error => {

        console.error("Registration Error:", error);

        alert("Registration Failed!\n" + error.message);

    });
}