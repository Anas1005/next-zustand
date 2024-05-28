
# Redux vs Zustand vs Context API: Their Pros, Cons, and Usage

| Feature          | Redux                                     | Zustand                                   | Context API                                 |
|------------------|-------------------------------------------|-------------------------------------------|---------------------------------------------|
| **Pros**         | - Centralized state management            | - Minimal setup                           | - Built-in React feature                    |
|                  | - Predictable state changes               | - Lightweight                             | - Simplicity                                |
|                  | - Large community support                 | - Easy integration                        | - Easy to use with small applications       |
| **Cons**         | - Boilerplate code                        | - Limited ecosystem                       | - Performance concerns                      |
|                  | - Steeper learning curve                  | - Not suitable for complex applications   | - Global state management challenges        |
| **Usage**        | - Large-scale applications                | - Smaller applications                    | - Small applications                        |
|                  | - Complex state management needs          | - Specific components with localized state| - State management within individual components |
|                  | - Standardized state management practices | - Projects requiring simplicity and performance | - Projects without complex state needs     |
| **Performance**  | - Can optimize with tools like Reselect or Redux Toolkit | - Generally outperforms Redux and Context API due to simplicity | - May lead to unnecessary re-renders in larger apps |
|                  |                                           |                                           | - Can mitigate with memoization techniques  |



# Best ways to avoid unnecessary rerenders with zustand are:

**Direct selectors:** (Good for Atomic Pickups)
```javascript
const amount = useBookStore(state => state.amount);
const updateAmount = useBookStore(state => state.updateAmount);
```

**Object destructuring with useShallow** (Good for Object/Array Pickups)
```javascript
import { useShallow } from 'zustand/react/shallow';
const { amount } = useBookStore(useShallow((state) => ({ amount: state.amount })));
```

**Other ways are wrong (unless re-renders / performance is not a problem):** (Usless as it leads to unnecessary re-renders due to the other state change)
```javascript
const state = useBookStore(); 
const { amount } = useBookStore();
const { amount } = useBookStore((state) => ({ amount: state.amount }));
```


