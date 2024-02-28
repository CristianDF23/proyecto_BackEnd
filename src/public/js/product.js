
const category = document.getElementById("category")
const xxs = document.getElementById("size-choice-0-label")
const xs = document.getElementById("size-choice-1-label")
const s = document.getElementById("size-choice-2-label")
const m = document.getElementById("size-choice-3-label")
const l = document.getElementById("size-choice-4-label")
const xl = document.getElementById("size-choice-5-label")
const xxl = document.getElementById("size-choice-6-label")
const xxxl = document.getElementById("size-choice-7-label")

if (category.textContent === "Zapatillas" || category.textContent === "Botines") {
    xxs.textContent = "38"
    xs.textContent = "39"
    s.textContent = "40"
    m.textContent = "41"
    l.textContent = "42"
    xl.textContent = "43"
    xxl.textContent = "44"
    xxxl.textContent = "45"
}
