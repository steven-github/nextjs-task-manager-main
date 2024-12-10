// Problem 2: String Compression

// Task: Write a function to compress a string using counts of consecutive repeated characters.
// 	•	Requirements:
// 	•	Input: A string.
// 	•	Output: The compressed string.
// 	•	Example Input:
// "aaabbcccc"
// 	•	Example Output:
// "a3b2c4"

function compressString(input: string) {
    let compressed = "";
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        } else {
            compressed += input[i - 1] + count;
            count = 1;
        }
    }

    return compressed.length < input.length ? compressed : input;
}

// Example Usage
const input2 = "aaabbcccc";
console.log(compressString(input2)); // Output: "a3b2c4"
