---
title: "Note: React"
categories:
  - Note
tags:
  - React
  - TypeScript
last_modified_at: 2021-01-02
---

# Concepts

- Declarative  
- Component-Based
  - **Compenent-Based Arch** is to make parts of an application capsuling appearance and function, and composite them to build complex UI  
- Just The UI
- Virtual DOM
  - React holds virtual DOM in cache, and works by rendering virtual DOM to real DOM.  
- One-Way Dataflow
- Learn Once, Write Anywhere

<br>


# Components

Components
- like functions in JavaScript which are given **props** as args and return React Elements  
- Each component can hold **state** (like closure).

React Elements
- compose virtual DOM
- executable link to call a component with a props

## Error Boundary

- Component to catch an error in child-component tree and display UI of `fallback` instead of a crashed component tree.

- `getDerivedStateFromError()`
  - update state when catching error
- `componentDidCatch()`
  - do something except changing state when catching error

src/ErrorBoundary.tsx

```tsx
import { ErrorInfo, PureComponent, ReactNode } from 'react';
import ky from 'ky';
import { Message } from 'semantic-ui-react';

type StatusMessages = { [status: number]: string };
type Props = { statusMessages?: StatusMessages };
type State = { hasError: boolean; error: Error | null };
const DEFAULT_MESSAGES: StatusMessages = { 0: 'Server Error' };

class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError = (error: Error): State => ({
    hasError: true,
    error,
  });

  componentDidCatch = (error: Error, info: ErrorInfo): void => {
    console.error(error, info); // eslint-disable-line no-console
  };

  render = (): ReactNode => {
    const { children, statusMessages = {} } = this.props;
    const { hasError, error } = this.state;
    const messages = { ...DEFAULT_MESSAGES, ...statusMessages };

    if (hasError) {
      const statusCode = (error as ky.HTTPError)?.response?.status;

      if (statusCode && Object.keys(messages).includes(String(statusCode))) {
        return <Message warning>{messages[statusCode]}</Message>;
      }

      return <Message error>{messages[0]}</Message>;
    }

    return children;
  };
}

export default ErrorBoundary;
```

<br>


# Life Cycle

![react_lifecycle_methods]({{ site.url }}{{site.baseurl}}/assets/React_images/react_lifecycle_methods.png)

- Mounting Step
- Updating Step
- Unmounting Step
- Error Handling Step


## Mounting Step

Initialize, mount components on virtual DOM, and Render them.  

|                     methods                     |     return     |                          description                           |
| :---------------------------------------------: | :------------: | :------------------------------------------------------------: |
|              `constructor(props)`               |     `void`     |                                                                |
| `static getDerivedStateFromProps(props, state)` | `State | null` | Be called just before executing `render()` and set new `state` |
|                   `render()`                    | `ReactElement` |                                                                |
|              `componentDidMount()`              |     `void`     |          Called just after the component was mounted           |

## Updating Step

Detecting-diff-process engine detects changes and components are re-rendered.   
Changes are
  - props
  - state

|                       methods                        |      return       |                                                                description                                                                |
| :--------------------------------------------------: | :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|   `static getDerivedStateFromProps(props, state)`    |  `State | null`   |                                        Called just before executing `render()` and set new `state`                                        |
|    `shouldComponentUpdates(nextProps, nextState)`    |     `boolean`     |                         Be called just before re-rendering and be able to cancel re-render with returning `false`                         |
|                      `render()`                      |  `ReactElement`   |                                                                                                                                           |
|   `getSnapShotBeforeUpdate(nextProps, nextState)`    | `Snapshot | null` | Called just before reflecting re-rendering on DOM. <br> We can capture snapshot by the return value and give it to `componentDidUpdate()` |
| `componentDidUpdate(prevProps, prevState, snapshot)` |      `void`       |                                                      Called just after re-rendering                                                       |

## Unmounting Step

Removes components from virtual DOM

|         methods          | return |                       description                       |
| :----------------------: | :----: | :-----------------------------------------------------: |
| `componentWillUnmount()` | `void` | Called just before unmounting and destroying components |

## Error Handling Step

Detects and handle errors caused in successor components.  

|                  method                  |     return     |                                              description                                              |
| :--------------------------------------: | :------------: | :---------------------------------------------------------------------------------------------------: |
|     `componentDidCatch(error, info)`     |     `void`     |                       Called when an exception caused in a successor component                        |
| `static getDerivedStateFromError(error)` | `State | null` | Be called when an exception caused in a successor component and set new `state` with the return value |

<br>

# Presentation components and container components

Divide functions of components into *presentation*  and *container* to reduce the implements  
- Container components
  - Hold props and state
  - As body
- Presentation components
  - About appearance
  - As attachment

## HOC; High Order Component

- Coutainer components
  - withCounter.tsx
- Presentation components
  - CounterComponent.tsx

Deviding components into presentations and containers makes building various appearance counter easy because things to do is reduce a container component (WithCounter) and exchange a presentation component (CounterComponent) for another only.   

```tsx
import React, { FC, Component, ReactElement } from 'react';

type InjectedProps = {
  count: number;
  reset: () => void;
  increment: () => void;
};
type Props = { max: number };
type State = { count: number };

const withCounter = (WrappedComponent: FC<Props & Partial<InjectedProps>>) =>
  class EnhancedComponent extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { count: 0 };
    }

    reset = (): void => this.setState({ count: 0 });
    increment = (): void =>
      this.setState((state) => ({ count: state.count + 1 }));

    componentDidUpdate = (): void => {
      if (this.state.count > this.props.max) this.reset();
    };

    render = (): ReactElement => (
      <WrappedComponent
        max={this.props.max}
        count={this.state.count}
        reset={this.reset}
        increment={this.increment}
      />
    );
  };

const CounterComponent: FC<Props & Partial<InjectedProps>> = ({
  max,
  count = 0,
  reset = () => undefined,
  increment = () => undefined,
}) => (
  <div>
    <div>
      {count} / {max}
    </div>
    <button onClick={reset} type="button">
      Reset
    </button>
    <button onClick={increment} type="button">
      +1
    </button>
  </div>
);

export default withCounter(CounterComponent);
```

## Render Props

```tsx
import React, { Component, FC, ReactElement } from 'react';

type ChildProps = {
  count: number;
  reset: () => void;
  increment: () => void;
};

type Props = {
  max: number;
  children: (props: ChildProps) => ReactElement;
};

type State = { count: number };

class CounterProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { count: 0 };
  }

  reset = (): void => this.setState({ count: 0 });
  increment = (): void =>
    this.setState((state) => ({ count: state.count + 1 }));
  componentDidUpdate = (): void => {
    if (this.state.count > this.props.max) this.reset();
  };

  render = (): ReactElement =>
    this.props.children({
      count: this.state.count,
      reset: this.reset,
      increment: this.increment,
    });
}

const Counter: FC<{ max: number }> = ({ max }) => (
  <CounterProvider max={max}>
    {({ count, reset, increment }) => (
      <div>
        <div>
          {count} / {max}
        </div>
        <button onClick={reset} type="button">
          Reset
        </button>
        <button onClick={increment} type="button">
          +1
        </button>
      </div>
    )}
  </CounterProvider>
);
```

## Hooks

- useState()
- useEffect()
- useMemo()
- useCallback()
- useRef()
- useReducer()
- Custom Hooks

### State Hooks

```tsx
const [count, setCount] = useState(0);
const increment = () => setCount((c) => c + 1);
```

```ts
const [count, setCount] = useState(0);  // number type is inferred by passed 0
const [author, setAuthor] = useState<User>(); // init val of state is undefined
const [author, setAuthor] = useState<USer | null>(null);  // init val of state is null
const [articles, setArticles] = useState<Article[]>([]);
```

```ts
import React, { FC, useState } from 'react';
import { Button, Card, Statistic } from 'semantic-ui-react';
import './Counter.css';

const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(0);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>count</Statistic.Label>
        <Statistic.Value>{count}</Statistic.Value>
      </Statistic>
      <Card.Content>
        <div className="ui two buttons">
          <Button color="red" onClick={reset}>
            Reset
          </Button>
          <Button color="green" onClick={increment}>
            +1
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Counter;
```

### Effect Hooks

A Hooks API to deal with side-effect.  
Side-effect is a process to change state of component and output of FC.  
-> Effect Hooks is Hooks API to change output of FC even though a props is the same.  

```ts
useEffect(func, dependencies array);
```

```tsx
const SampleComponent: FC = () => {
  const [data, setData] = useState(null);
  ...
  useEffect(() => { // passed method is called when any element of depencencies array is changed
    doSomething();

    return () => clearSomething();  // clearSomething() is called when the component is unmounted
  },
  [someDeps]  // dependencies array
  );
  ...
};
```

|       useEffect       |   lifecycle methods    |
| :-------------------: | :--------------------: |
| `useEffect(func, [])` | `componentDidMount()`  |
|   `useEffect(func)`   | `componentDidUpdate()` |

```tsx
import { FC, useEffect, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import './Timer.css';

const Timer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const reset = (): void => setTimeLeft(limit);
  const tick = (): void => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(limit);
  }, [timeLeft, limit]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value>{timeLeft}</Statistic.Value>
      </Statistic>
      <Card.Content>
        <Button color="red" fluid onClick={reset}>
          <Icon name="redo" />
          Reset
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Timer;
```

### Memoizing

- `useMemo()`
- `useCallback()`

- sample: https://github.com/e5pe0n/rea-ct/tree/main/09-hooks/04-memoize

src/utils/math-tool.ts  

```ts
/* eslint-disable import/prefer-default-export */

export const getPrimes = (maxRange: number): number[] =>
  [...Array(maxRange + 1).keys()].slice(2).filter((n) => {
    for (let i = 2; i < n; i += 1) {
      if (n % i === 0) return false;
    }

    return true;
  });
```

src/Timer.tsx  

```tsx
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

type TimerProps = {
  limit: number;
};

const Timer: FC<TimerProps> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);  // getPrimes() is called when limit is changed. i.e. the same return value is reused until limit is changed.
  const reset = useCallback(() => setTimeLeft(limit), [limit]); // useCallback() keeps a passed funtion and reuses it after re-rendering too.
  const tick = () => setTimeLeft((t) => t - 1); // tick() cannot be given to useCallback() because setTimeLeft() is made by useState() every re-rendering.

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
      </Statistic>
      <Card.Content>
        <Button color="red" fluid onClick={reset}>
          <Icon name="redo" />
          Reset
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Timer;
```

### useRef()

|  Hooks API   |           state updated           |
| :----------: | :-------------------------------: |
| `useState()` |   the component is re-renderred   |
|  `useRef()`  | the component is not re-renderred |

```tsx
import { FC, SyntheticEvent, useEffect, useRef } from 'react';

const TextInput: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (inputRef.current) alert(inputRef.current.value);
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick} type="button">
        Click
      </button>
    </>
  );
};

export default TextInput;
```

```tsx
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

const Timer3: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const timerId = useRef<NodeJS.Timeout>(); // call useRef(), not useState()
  const tick = () => setTimeLeft((t) => t - 1);

  const clearTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
  };

  const reset = useCallback(() => {
    clearTimer();
    timerId.current = setInterval(tick, 1000);
    setTimeLeft(limit);
  }, [limit]);

  useEffect(() => {
    reset();

    return clearTimer;
  }, [reset]);

  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
      </Statistic>
      <Card.Content>
        <Button color="red" fluid onClick={reset}>
          <Icon name="redo" />
          Reest
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Timer3;
```

### Custom Hooks

src/hooks/use-timer.tsx

```tsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getPrimes } from 'utils/math-tool';

const useTimer = (limit: number): [number, boolean, () => void] => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const timerId = useRef<NodeJS.Timeout>();
  const tick = () => setTimeLeft((t) => t - 1);

  const clearTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
  };

  const reset = useCallback(() => {
    clearTimer();
    timerId.current = setInterval(tick, 1000);
    setTimeLeft(limit);
  }, [limit]);

  useEffect(() => {
    reset();

    return clearTimer;
  }, [reset]);

  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return [timeLeft, primes.includes(timeLeft), reset];
};

export default useTimer;
```

src/components/Timer.tsx

```tsx
import { FC } from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import './Timer.css';

type Props = {
  timeLeft?: number;
  isPrime?: boolean;
  reset?: () => void;
};

const Timer: FC<Props> = ({
  timeLeft = 0,
  isPrime = false,
  reset = () => undefined,
}) => (
  <Card>
    <Statistic className="number-board">
      <Statistic.Label>time</Statistic.Label>
      <Statistic.Value className={isPrime ? 'prime-number' : undefined}>
        {timeLeft}
      </Statistic.Value>
    </Statistic>
    <Card.Content>
      <Button color="red" fluid onClick={reset}>
        <Icon name="redo" />
        Reset
      </Button>
    </Card.Content>
  </Card>
);

export default Timer;
```

src/container/Timer.tsx

```tsx
import { FC } from 'react';
import useTimer from 'hooks/use-timer';
import Timer from 'components/Timer';

const EnhancedTimer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, isPrime, reset] = useTimer(limit);

  return <Timer timeLeft={timeLeft} isPrime={isPrime} reset={reset} />;
};

export default EnhancedTimer;
```

src/App.tsx

```tsx
import { FC } from 'react';
import Timer from 'containers/Timer';
import './App.css';

const App: FC = () => (
  <div className="container">
    <header>
      <h1>Timer</h1>
    </header>
    <Timer limit={60} />
  </div>
);

export default App;
```

### useReducer()

```tsx
const [state, dispatch] = useReducer(reducer, initValue, initFunc);
// initFunc initialize the state with initValue
```

```tsx
import { FC, useReducer } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CounterWidget from 'components/templates/CounterWidget';

type CounterState = { count: number };
const initialState: CounterState = { count: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decremented: (state) => ({ ...state, count: state.count - 1 }),
    incremented: (state) => ({ ...state, count: state.count + 1 }),
  },
});

const EnhancedCounterWidget: FC<{ initialCount?: number }> = ({
  initialCount = 0,
}) => {
  const [state, dispatch] = useReducer(
    counterSlice.reducer,
    initialCount,
    (count: number): CounterState => ({ count }),
  );
  const { added, decremented, incremented } = counterSlice.actions;

  return (
    <CounterWidget
      count={state.count}
      add={(amount: number) => dispatch(added(amount))}
      decrement={() => dispatch(decremented())}
      increment={() => dispatch(incremented())}
    />
  );
};

export default EnhancedCounterWidget;
```


<br>

# React Router (v5)

- BrowserRouter
- Route
- Switch
- Redirect
- Link

- Hooks API
  - useHistory()
  - useLocation()
  - useParams()
  - useRouteMatch()

## BrowserRouter

- enable *Route*s

index.tsx

```tsx
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
```

## Route

### path

prefix match basically.  

|  props  |  description  |
| :-----: | :-----------: |
| `exact` | perfect match |

## Switch

## Redirect

## Link

## Hooks

### useHistory()

`useHistory()` returns history object defined by React Router.  

|   properties    |                  description                   |
| :-------------: | :--------------------------------------------: |
|    `length`     |             Num of stacked history             |
|    `action`     | Latest action (`"PUSH"`, `"REPLACE"`, `"POP"`) |
|  `push(PATH)`   |                  Go to `PATH`                  |
| `replace(PATH)` |               redirect to `PATH`               |
|   `goBack()`    |              go to previous page               |
|  `goForward()`  |                go to next page                 |
|     `go(N)`     |         go to a history whose num is N         |

### useLocation

```tsx
const { search } = useLocation(); // get value of key: search

// when URL = https://exampleapp.com/user/patty?from=user-list#friends
// location object is
//{
//  pathname: '/user/patty',
//  search: '?from=user-list',
//  hash: '#friends',
//  state: {
//    [secretKey]: '9qWV408Zyr',
//  },
//  key: '1j3qup',
//}

```

### useParams() / useRouteMatch()

```tsx
import { FC } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

const User: FC = () => {
  const { userId } = useParams(); // get params in match object
  const match = useRouteMatch();  // get match object

  console.log(userId);  // patty
  console.log(match);
  // when path is /user/:userId
  // match object
  // {
  //   path: "/user/:userId",
  //   url: "/user/patty",
  //   isExact: true,
  //   params: {
  //    userId: "patty",
  // }
```

<br>

# React Router (v6)

- BrowserRouter
- Routes
- Route
- Navigate

- Hooks API
  - useNavigation
  - useLocation
  - useParams
  - useRouteMatch

## BrowserRouter

- enable *Route*s

index.tsx

```tsx
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
```

## Routes

- *nested routes* comes back
- relative path in nested routes is enabled

```tsx
import { FC } from 'react';

import { Routes, Route, Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users" element={<Users />}>
      <Route path="me" element={<SelfProfile />} />
      <Route path=":id" element={<UserProfile />} />
    </Route>
  </Routes>
);

const Users: FC = () => (
  <div>
    <nav>
      <Link to="me">My Profile</Link>
    </nav>
    <Outlet />
  </div>
);
```

## Route

- `element={<MyComponent />}`
- perfect matching basically  
  - `exact`, `stract` are abolished
  - `caseSensitive` is introduced to distinguish upper between lower
  - regular expression is disabled


- **History object is abolished** -> use `navigation` function returned `useNavigation()` instead.  
  - `history.replace("/")` -> `navigate({ path: "/" }, { replace: true })`

  
## Navigate

- abolished -> use `<Navigate />` instead  
  - `<Redirect to="/Home" push />` -> `<Navigate to="/Home">`: not overwrite history
  - `<Redirect to="/Home" />` -> `<Navigate to="/Home" replace />`: overwrite history


# Redux

## Concepts

- Single source of truth
  - Redux represents an application state by a tree structure of just only one *store* object
- State is read-only
  - Dispatching *action*s to change state of store
  - *action* is a plain object to represent what an event occurred
- Changes are made with pure functions
  - *reducer()* updates state tree
    - `(prevState, action) => newState`

![redux_dataflow]({{ site.url }}{{site.baseurl}}/assets/React_images/redux_dataflow.png)

## Store

src/index.tsx

```tsx
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { counterReducer, initialState } from 'reducer';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(counterReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
```

## Action

src/actions.ts

```ts
export const CounterActionType = {
  ADD: 'ADD',
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
} as const;

type ValueOf<T> = T[keyof T];

export type CounterAction = {
  type: ValueOf<typeof CounterActionType>;
  amount?: number;
};


// action creators
export const add = (amount: number): CounterAction => ({
  type: CounterActionType.ADD,
  amount,
});

export const decrement = (): CounterAction => ({
  type: CounterActionType.DECREMENT,
});

export const increment = (): CounterAction => ({
  type: CounterActionType.INCREMENT,
});
```


## Reducer

src/reducer.ts

```ts
import { Reducer } from 'redux';
import { CounterAction, CounterActionType as Type } from 'actions';

export type CounterState = { count: number };
export const initialState: CounterState = { count: 0 };

export const counterReducer: Reducer<CounterState, CounterAction> = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case Type.ADD:
      return {
        ...state,
        count: state.count + (action.amount || 0),
      };
    case Type.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case Type.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    default: {
      const _: never = action.type;

      return state;
    }
  }
};
```


## Hooks APIs

- `useSelector()`
- `useDispath()`

### useSelector()

- extract values of state from store

```tsx
import { useSelector } from 'react-redux';

const useSelector<StateType, KeyType>(selector: Function)
```

### useDispatch()

- get function to dispatch actions

```tsx
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { add, decrement, increment } from 'actions';
import { CounterState } from 'reducer';
import CounterBoard from 'components/organisms/CounterBoard';

const EnhancedCounterBoard: FC = () => {
  const count = useSelector<CounterState, number>((state) => state.count);
  const dispatch = useDispatch();

  return (
    <CounterBoard
      count={count}
      add={(amount: number) => dispatch(add(amount))}
      decrement={() => dispatch(decrement())}
      increment={() => dispatch(increment())}
    />
  );
};

export default EnhancedCounterBoard;
```

## Style Guide

### Priority: A

- Do not update state directly
- reducer must not have side-effect
  - processies causing side-effect are
    - connect to outer system
    - overwrite value of variable out of reducer
    - pass values not to be reproduced to store
- Do not put not serializable values in state or action
- store is just only one per one app

### about Action

- Model action as event, not setter
- Name action to represent mean precisely
- Name action to follow format "domain model / event type"
- Make action conform to FSA (Flux Standard Action)
  - FSA: standard of structure of action
- Do not write action to dispatch, use action creator

### about Tools or Design Pattern

- Use Redux Toolkit to write logic of Redux
- Use Immer to update immutable state
- Use Redux DevTools extension to debug
- Apply Feature Folder or Ducks pattern to file structure

```
// Feature Folder
src/
  features/   // divide by domain
    user/
      user-actions.ts
      user-reducer.ts
    article/
      article-actions.ts
      article-reducer.ts
    ...

// Ducks Pattern
src/
  ducks/
    user.ts     // put actions and reducer for user domain together
    article.ts  // put actions and reducer for article domain together
    ...
```

### about Design

- Consider what should have what state flexibly
- Do not put state of form in Redux
  - should 
- Exclude complex logic from component
- Use Redux Thunk for async processes

<br>

## Redux Toolkits

- `createSlice()`
- PayloadAction

- sample: https://github.com/e5pe0n/rea-ct/tree/main/11-redux/04-toolkit

src/index.tsx

```ts
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { counterSlice } from 'features/counter';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = configureStore({ reducer: counterSlice.reducer });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
```

src/features/counter.ts

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterState = { count: number };
const initialState: CounterState = { count: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decremented: (state) => ({ ...state, count: state.count - 1 }),
    incremented: (state) => ({ ...state, count: state.count + 1 }),
  },
});
```

# React Query

- fetch, cache and update data in React app without touching `global state` such a Redux  

- QueryClient, QueryClientProvider
- `useQuery()`

## QueryClient / QueryClientProvider

- sample: https://github.com/e5pe0n/rea-ct/tree/main/13-suspense/02-ready-libs/02-react-query

src/index.tsx

```tsx
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      // useErrorBoundary: true,
    },
    mutations: {
      retry: 0,
      // useErrorBoundary: true,
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
```

## useQuery()

- `useQuery()` throws the Promise until the process is done, and return the result component including fetched data if `suspense: true` in QueryClient.
- Suspense component catches the Promise and display fallback component until `useQuery` return result, and renders the result component `useQuery` returned.

src/components/pages/Members.tsx

```tsx
import { FC, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import capitalize from 'lodash/capitalize';
import { Divider } from 'semantic-ui-react';

import Spinner from 'components/molecules/Spinner';
import HomeButton from 'components/molecules/HomeButton';
import MemberList from 'containers/organisms/MemberList';
import ErrorBoundary from 'ErrorBoundary';

const Members: FC<{ orgCode: string }> = ({ orgCode = 'UnknownCompany' }) => {
  const title = `Dev members of ${capitalize(orgCode)}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <header className="app-header">
        <h1>{title}</h1>
      </header>
      <ErrorBoundary
        statusMessages={{
          404: `Code: ‘${orgCode}’ not Found`,
        }}
      >
        <Suspense fallback={<Spinner size="big" />}>
          <MemberList orgCode={orgCode} />
        </Suspense>
      </ErrorBoundary>
      <Divider hidden />
      <HomeButton />
    </>
  );
};

export default Members;
```

src/containers/organisms/MemberList.tsx

```tsx
import { FC } from 'react';
import { useQuery } from 'react-query';

import MemberList from 'components/organisms/MemberList';
import { getMembers } from 'domains/github';

const EnhancedMemberList: FC<{ orgCode: string }> = ({ orgCode }) => {
  const { data: users = [] } = useQuery(
    [orgCode, 'members'],       // key of cache
    () => getMembers(orgCode),  // fetcher; async function to fetch data
  );

  return <MemberList users={users} />;
};

export default EnhancedMemberList;
```

# Concurrent Mode

## How to Introduce

```
$ yarn add react@experimental react-dom@experimental
```

src/react-app-env.d.ts
- append last two lines

```
/// <reference types="react-scripts" />
+ /// <reference types="react-dom/experimental" />
+ /// <reference types="react/experimental" />
```

Use `createRoot()` (`unstable_createRoot()`) method instead of using `ReactDOM.render()` directly.

```tsx
// const root = document.getElementById('root');

// ReactDOM.render(<App />, root);


const root = document.getElementById('root') as HTMLElement;

// ReactDOM.createRoot(root).render(<App />);
ReactDOM.unstable_createRoot(root).render(<App />); // "unstable_" prefix is needed currently.
```

## Concurrent Mode API

- SuspenseList
- `useTransition()`
- `useDefferedValue()`

### SuspenseList

|    props    |                 params                  |
| :---------: | :-------------------------------------: |
| revealOrder | `"forwards" | "backwards" | "together"` |
|    tail     |  `undefined | "collapsed" | "hidden"`   |

|tail params|description|
|`undefined`|show `fallback`s of all child `Suspense` components|
|`"collapsed"`|show `fallback` of the next chlid `Suspense` component in order to reveal|
|`"hidden"`|show no component that hasn't been loaded|

```tsx
<SuspenseList revealOrder="forwards">
  <Suspense fallback={<div>Loading...</div>}>
    <UserProfile userId={1} />
  </Suspense>
  <Suspense fallback={<div>Loading...</div>}>
    <UserProfile userId={2} />
  </Suspense>
  <Suspense fallback={<div>Loading...</div>}>
    <UserProfile userId={3} />
  </Suspense>
</SuspenseList>

```

### `useTransition()`

- Disable showing `fallback` until re-rendering is done to keep current appearance

```tsx
const App = () => {
  const [userId, setUserId] = useState(1);
  const [startTransition, isPending] = useTransition();

  return (
    <>
      <div style={isPending ? { opacity: 0.5 } : undefined}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile userId={userId} />
        </Suspense>
      </div>
      <button
        onClick={() => startTransition(() => setUserId(id => id + 1))}
        disabled={isPending}
      >
        次のユーザー
      </button>
    </>
  );
};
```

### useDeferredValue()

- Delay updating values

In sample below, `useDeferredValue()` delay changing word to search (`searchWord`) to give priority to rendering by that input word is changed.  
i.e. To update `searchWord` waits for that busy rendering of input gets stable.


```tsx
const App = () => {
  const [word, setWord] = useState('');
  const deferredWord = useDeferredValue(word);

  return (
    <>
      <input value={word} onChange={(e) => setWord(e.target.value)} />
      <SearchResult searchWord={deferredWord} />
    </>
  );
};
```

## UI Patterns

https://reactjs.org/docs/concurrent-mode-patterns.html


## Error Handling

- Use `useRef()` to hold error count.
  - if you use `useState()`, app falls into infinit loops
    1. Members component is renderred with ebKey = 0
    1. Error occurs
    1. ErrorBounds component catches it and increments ebKey by `onError()`
    1. Members component is re-renderred because ebKey in state is changed
    1. ebKey is set to 0
    1. ebKey is not changed so the same ErrorBoundary component calls `onError()`
    1. Members component is re-renderred again
    2. ....


src/components/pages/Members.tsx

```tsx
import {
  FC,
  FormEvent,
  Suspense,
  unstable_SuspenseList as SuspenseList,
  useRef,
  useState,
  unstable_useTransition as useTransition,
} from 'react';
import { Button, Divider, Input, Menu } from 'semantic-ui-react';
import capitalize from 'lodash/capitalize';

import ErrorBoundary from 'ErrorBoundary';
import Spinner from 'components/molecules/Spinner';
import OrgInfo from 'containers/organisms/OrgInfo';
import MemberList from 'containers/organisms/MemberList';
import './Members.css';

type Props = {
  orgCodeList: string[];
  prefetch?: (orgCode: string) => void;
};

const Members: FC<Props> = ({ orgCodeList, prefetch = () => undefined }) => {
  const [orgCode, setOrgCode] = useState('');
  const [input, setInput] = useState('');
  const [startTransition, isPending] = useTransition();
  const ebKey = useRef(0);

  const menuItems = orgCodeList.map((code) => ({
    key: code,
    name: capitalize(code),
    onClick: () => {
      setInput('');

      if (orgCode) {
        startTransition(() => setOrgCode(code));
      } else {
        setOrgCode(code);
      }
    },
    onMouseOver: () => prefetch(code),
    active: code === orgCode,
  }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setOrgCode(input.toLowerCase().trim());
  };

  return (
    <>
      <header className="app-header">
        <h1>Member List</h1>
      </header>
      <form className="search-form" onSubmit={handleSubmit}>
        <Input
          placeholder="type org code..."
          type="text"
          value={input}
          onChange={(_, data) => setInput(data.value)}
        />
        <Button type="submit" disabled={isPending} primary>
          Search
        </Button>
      </form>
      <Menu items={menuItems} text />
      <Divider />
      <div className={isPending ? 'loading' : ''}>
        <ErrorBoundary
          statusMessages={{
            404: `Code: ${orgCode} not Found`,
          }}
          onError={() => {
            ebKey.current += 1;
          }}
          key={ebKey.current}
        >
          <SuspenseList revealOrder="forwards">
            <Suspense fallback={<Spinner size="small" />}>
              <OrgInfo orgCode={orgCode} />
            </Suspense>
            <Suspense fallback={<Spinner size="large" />}>
              <MemberList orgCode={orgCode} />
            </Suspense>
          </SuspenseList>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Members;
```

src/ErrorBoundary.tsx

```tsx
import { ErrorInfo, PureComponent, ReactNode } from 'react';
import ky from 'ky';
import { Message } from 'semantic-ui-react';

type StatusMessages = { [status: number]: string };
type Props = { statusMessages?: StatusMessages; onError?: () => void };
type State = { hasError: boolean; error: Error | null };
const DEFAULT_MESSAGES: StatusMessages = { 0: 'Server Error' };

class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError = (error: Error): State => ({
    hasError: true,
    error,
  });

  componentDidCatch = (error: Error, info: ErrorInfo): void => {
    const { onError } = this.props;
    if (onError) onError();

    console.error(error, info); // eslint-disable-line no-console
  };

  render = (): ReactNode => {
    const { children, statusMessages = {} } = this.props;
    const { hasError, error } = this.state;
    const messages = { ...DEFAULT_MESSAGES, ...statusMessages };

    if (hasError) {
      const statusCode = (error as ky.HTTPError)?.response?.status;

      if (statusCode && Object.keys(messages).includes(String(statusCode))) {
        return <Message warning>{messages[statusCode]}</Message>;
      }

      return <Message error>{messages[0]}</Message>;
    }

    return children;
  };
}

export default ErrorBoundary;
```



# Difficult Points

- Logics for appearance and data used inside app are mixed in a React Component
- It is difficult to understand data flow and timing to update it
  - Hooks
- Functional
