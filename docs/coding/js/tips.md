# Tips

## Promise

Once fulfilled, it returns the value resolved for the first time.
For an example below, we call a resolver `r` twice; `r(1)` then `r(2)`.
Eventually awaited Promise `p` in an event handler resolves to `1`, and it always returns `1` whenever the execution reaches the `p`.

```ts
import { EventEmitter } from "node:events";

export function withResolvers<T>() {
	let resolve: (value: T | PromiseLike<T>) => void;
	let reject: (reason?: unknown) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	// @ts-ignore: ts(2454)
	return { promise, resolve, reject };
}

const { promise: p, resolve: r } = withResolvers<number>();

const eventEmitter = new EventEmitter();
eventEmitter.on("event", async () => {
	console.log("event");
	const pv = await p;
	console.log(pv);
});

eventEmitter.emit("event");

r(1);

eventEmitter.emit("event");

r(2);

eventEmitter.emit("event");

// event
// event
// event
// 1
// 1
// 1
```
