const buttons = document.querySelectorAll(".num");
const output = document.querySelector("#output");
let expression = "";

const convertExpression = (expr) => {
  expr = expr.replace(/x/g, "*");
  expr = expr.replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)");
  expr = expr.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
  expr = expr.replace(/sqrt(\d+(\.\d+)?)/g, "Math.sqrt($1)");
  expr = expr.replace(/log(\d+(\.\d+)?)/g, "Math.log10($1)");
  expr = expr.replace(
    /(\d+(\.\d+)?)(?:\s*)pow(?:\s*)(\d+(\.\d+)?)/g,
    "Math.pow($1,$3)"
  );

  return expr;
};

for (let btn of buttons) {
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    if (val === "AC") {
      expression = "";
      output.innerText = "";
    } else if (val === "=") {
      try {
        const safeExpr = convertExpression(expression);
        const result = eval(safeExpr);
        output.innerText = result;
        expression = result.toString();
      } catch (err) {
        output.innerText = "Error";
        expression = "";
      }
    } else {
      expression += val;
      output.innerText += val;
    }
  });
}
