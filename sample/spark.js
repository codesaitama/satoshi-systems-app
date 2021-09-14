let array = [2, 4, 3, 6, 1, 5, 7];
/*
return
{
  even: [2, 4, 6],
  odd: [3, 1, 5, 7],
}
*/
function evenOddReturn(data) {
    let obj = { even: [], odd: [] };
    for (let x of data) {
        if (x % 2 === 0)
            obj.even.push(x);
        else
            obj.odd.push(x)
    }
    return obj;
}

console.log(evenOddReturn(array));

let arrayObject = [
    { name: 'Ollie', type: 'cat' },
    { name: 'Wezzie', type: 'cat' },
    { name: 'Tina', type: 'dog' },
    { name: 'Noodles', type: 'snake' },
    { name: 'Marius', type: 'dog' },
];

/*
{
  cat: [
    { name: 'Ollie', type: 'cat'}, 
    { name: 'Wezzie', type: 'cat'},
  ],
  dog: [
    { name: 'Tina', type: 'dog'}, 
    { name: 'Marius', type: 'dog'},
  ],
  snake: [
    { name: 'Noodles', type: 'snake'},
  ], 
}
*/

function objectCreator(data) {
    let temp = [], results = {};

    for (let obj of data) temp.push(obj.type);
    temp = [...new Set(temp)];

    /*
     Dynamically create an object with the temp array values as keys.
    */
    temp.forEach((item, index) => {
        results[item] = [];
        for (let obj of data) {
            if (obj.type == item) {
                results[item].push(obj);
            }
        }
    });

    return results;
}

console.log(objectCreator(arrayObject));
