---
title: "Note: React"
categories:
  - Note
tags:
  - React
  - TypeScript
last_modified_at: 2020-12-29
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
  const primes = useMemo(() => getPrimes(limit), [limit]);  // getPrimes is called when limit is changed. i.e. the same return value is reused until limit is changed.
  const reset = useCallback(() => setTimeLeft(limit), [limit]);
  const tick = () => setTimeLeft((t) => t - 1);

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

### Ref

- `useRef()`

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
