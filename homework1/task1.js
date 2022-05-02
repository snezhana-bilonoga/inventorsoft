function calculate(dots) {
    const reg = dots.match(/(\.*) (.*) (\.*)/);

    const operand1 = reg[1].length;
    const operand2 = reg[3].length;
    const operator = reg[2];

    let result = 0;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;

        case '-':
            if (operand2 > operand1) {
                throw new Error(
                    `Can't be substracted.\nFirst Operand '${operand1}' is less than the Second '${operand2}'!`
                );
            }
            result = operand1 - operand2;
            break;

        case '//':
            result = operand1 / operand2;
            break;

        case '*':
            result = operand1 * operand2;
            break;

        default:
            throw new Error(`Operator '${operator}' is not supported!`);
    }

    return '.'.repeat(result);
}
