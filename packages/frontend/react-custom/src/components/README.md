## State Management

### useState
The simplest hook is the useState hook, which takes as an argument the initial state.

Setting states with useState hook causes the component to rerender (Note, React detects whether a change / rerender is required)

useState is a function that returns an array with two items in it:
1. First is the initialization of the state

2. She second is the updater function that sets / updates the state.
```javascript
// syntax
const [state, updaterFn] = useState('')

// exampole
const [input, setInput] = useState('')
```

#### Spread Operator use
You have a couple of choices when using multiple state values in a single functional component.
```javascript
setUser({...user, username: "example"});
```
This creates a new object with the existing properties of user. It then updates the username property to its new value. It’s important you create a new object, instead of directly mutating the existing object, so React’s state reconciliation can identify the change.

### useEffect
Another of the built-in hooks is useEffect, which is for running side effects in your React function components. For example, if you have a shopping cart with a button to add a banana, when a banana is added you might want the document title to be updated as a side effect. With useEffects, you define the dependencies – you can think of it like defining the array and how often you want to run the function. If you leave it as an empty array, it will only run once, after the initial render; otherwise, it will run after every render of the function, unless you define the dependencies. So, when the state changes, React just calls this function again. And from a useEffect function, you can return a cleanup function.

To understand the useEffect cleanup, try this analogy from Ryan Florence. Imagine you have only one bowl in your house to eat cereal from. You wake up in the morning and eat cereal whether you're hungry or not – that's the initial render. Time passes, the state changes, and you become hungry again. Now you need to clean the bowl because it's dirty from when you ate earlier. You clean it up first and then you eat again – this is the same as React running a cleanup before running the effect again, which is also why when a component is unmounted it runs the cleanup when it's removed.

The useEffect hook has two parameters, the first parameter is the function we want to run while the second parameter is an array of dependencies. If the second parameter is not provided, the hook will run continuously.

By passing an empty square bracket to the hook’s second parameter, we instruct React to run the useEffect hook only once, on the mount.

#### IMPORTANT
1. Ensure you add the dependency array to avoid causing the effect to run on every render, as it can create an infinite loop (i.e. every time data is fetched)
2. Have a useEffect that depends on the state that is saved inside of it

```javascript
// empty bracket ensures the logic only runs once vs continually
useEffect(() =>{
    setCount(count + 1)
  }, [])


// Can set to run only on mount, and when input changes
const [input, setInput] = useState('');
useEffect(() => {
    console.log(count);
}, [count])

```
