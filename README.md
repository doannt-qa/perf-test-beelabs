## Install K6


## Run script
1. Check the workload that's configured in script.js file
```javascript
export const options = {
    vus: 1,
    duration: '10s',
};
```
2. Go to Orders folder
> cd orders

3. run	Executes a k6 script	
> k6 run script.js