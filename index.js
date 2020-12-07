const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Czy program ma wygenerować własne liczby? T/N ', (answer) => {
    if (answer.toUpperCase() === 'T') {
        rl.question('Podaj wielkość zbioru do wygenerowania: ', (size) => {
            if (size > 200) {
                console.log('Ciąg zbyt duży!');
                rl.close();
            } else {
                const setOfNumbers = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
                showResults(setOfNumbers);
            }
        })
    } else {
        rl.question('Podaj wielkość zbioru: ', (size) => {
            if (size > 200) {
                console.log('Ciąg zbyt duży!');
                rl.close();
            } else {
                rl.question(`Podaj ${size} liczb, odzielając każdą przecinkiem: `, (numbers) => {
                    const setOfNumbers = numbers.split(',').map((x) => parseInt(x));

                    if (setOfNumbers.length > 200) {
                        console.log('Przekroczyłeś maksymalny dozwolony zbiór');
                        rl.close();
                    }

                    showResults(setOfNumbers);
                })
            }
        })
    }
});

const showResults = (setOfNumbers) => {
    console.log(`Zbiór liczb: ${setOfNumbers}`);
    console.log(`Maksymalna liczba punktów do uzyskania: ${countMaximumPoints(setOfNumbers)}`);
    rl.close();
}

const countMaximumPoints = (numbers) => {
    let maximumPoints = 0;

    if(numbers.length < 3) return maximumPoints;

    while(numbers.length > 2) {
        let result = findBiggestPair(numbers);
        maximumPoints += numbers.filter((x, i) => i+1 === result.idx || i === result.idx || i-1 === result.idx ).reduce((a,b) => a + b, 0);
        numbers.splice(result.idx, 1)
    }

    return maximumPoints;
}

const findBiggestPair = (numbers) => {
    let firstSum = 0;
    let secondSum = 0;
    let biggestSum = 0;
    let idx = 0;

    if (numbers.length === 3) {
        return { sum: numbers.reduce((a, b) => a + b, 0) , idx: 1}
    }

    for (let i = 0; i < numbers.length-3; i++){
        firstSum = numbers[i] + numbers[i+1] + numbers[i+2] + numbers[i] + numbers[i+2] + numbers[i+3];
        secondSum = numbers[i+1] + numbers[i+2] + numbers[i+3] + numbers[i] + numbers[i+1] + numbers[i+3];

        if(firstSum > biggestSum){
            biggestSum = firstSum;
            idx = i + 1
        } else if(secondSum > biggestSum) {
            biggestSum = secondSum;
            idx = i + 2;
        }
    }

    return { idx };
}
