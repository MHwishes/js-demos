const guess_number = (answer, input) => {
    const answerArray = answer.split(' ');
    const inputArray = input.split(' ');
    let numberA = 0;
    let numberB = 0;
    answerArray.forEach(answerElement => {
        const isSameNumber = inputArray.find(inputElement => answerElement === inputElement);
        if (isSameNumber) {
            if (answerArray.indexOf(answerElement) === inputArray.indexOf(answerElement)) {
                numberA++;
            } else {
                numberB++;
            }

        }
    });
    console.log(`${numberA}A${numberB}B`)
}
guess_number('1 2 3 4', '1 2 5 3')