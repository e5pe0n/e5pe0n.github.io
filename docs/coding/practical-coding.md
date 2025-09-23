# Practical Coding

## Pub/Sub

- nack only when redelivering the message may solve the error
- handle errors occurred on processing message at client code as possible
- otherwise the same message is redelivered unnecessarily repeatedly; accumulating that makes throughput down and may eventually overwhelm client's capacity

```ts
import { Message, PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();

const subscription = pubsub.subscription("my-subscription");

subscription.on("message", (message) => {
  try {
    processMessage(message);
    message.ack();
  } catch (error) {
    if (shouldRedeliverMessage(error)) {
      message.nack();
    }
  }
});
```
