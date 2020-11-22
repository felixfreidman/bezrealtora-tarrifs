let k, sum = 0;

for(k = 1; k < Number.MAX_SAFE_INTEGER; k++) {
    sum = sum + (k*Math.pow(10, k-1));
    console.log(sum);
}

sum *= 9;
console.log(sum);