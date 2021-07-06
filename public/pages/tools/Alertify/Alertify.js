const alertifyElement = document.querySelector("#alertify");

class Alertify {
    showAlert = (type, data) => {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;

        const h4 = document.createElement("h4");
        h4.textContent = data.sender._id;

        const p = document.createElement("p");
        p.textContent = data.message;

        alert.appendChild(h4);
        alert.appendChild(p);

        alertifyElement.appendChild(alert);
        window.setTimeout(function () {
            alert.remove()
        }, 7000);
    }
}