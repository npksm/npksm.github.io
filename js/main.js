const s = io.connect(window.location.origin);
s.on('x', x => typeof x == "string" ? eval(x) : console.log(x));

function pop(m) {
    let n = el("n");
    if (!n) {
        n = document.createElement('div');
        n.setAttribute("id", "n");
        document.body.appendChild(n);
    }
    n.innerHTML = m;
    setTimeout(() => {
        n.style.transform = "translateY(0)";
    }, 50)
    setTimeout(() => {
        n.style.transform = "";
    }, n.innerText.length * 50 + 2000)

}

function el(n) {
    return document.getElementById(n);
}