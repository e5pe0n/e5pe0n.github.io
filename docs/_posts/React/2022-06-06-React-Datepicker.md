---
title: "Note: React Datepicker"
categories:
  - React
tags:
  - React
  - TypeScript
last_modified_at: 2022-05-28
---

# How to Use Custom Input with Ref

- react: 17.0.2
- react-datepicker: 4.7.0

## CustomDatePicker.tsx

- disable software keyboard when the device is tablet or mobile to get the appearance better

```ts
import { FC, ComponentProps, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Input } from "@chakra-ui/react";
import { UAParser } from "ua-parser-js";

const { device } = UAParser();

type Props = ComponentProps<typeof DatePicker>;

const CustomDatePicker:FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && (device.type === "tablet" || device.type === "mobile")) {
      ref.current.readOnly = true;
    }
  }, [ref]);

  return (
    <CustomDatePicker
      customInputRef="dummyRef"
      customInput=(<Input ref={ref} />)
      {...props}
    />
  );
};

export default CustomDatePicker
```

The react-datepicker will overwrite some props of custom input internally, such as readonly and ref.  

See source code below.  

https://github.com/Hacker0x01/react-datepicker/blob/7f7c315f6b6ccbbf599a0db8b23b692ab15171cf/src/index.jsx#L1001-L1026

So we cannot simply implement like below  

```ts
// Not work
import { FC, ComponentProps, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Input } from "@chakra-ui/react";
import { UAParser } from "ua-parser-js";

const { device } = UAParser();

type Props = ComponentProps<typeof DatePicker>;

const CustomDatePicker:FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && (device.type === "tablet" || device.type === "mobile")) {
      ref.current.readOnly = true;
    }
  }, [ref]);

  return (
    <CustomDatePicker
      customInput=(<Input readOnly ref={ref} />)
      {...props}
    />
  );
};

export default CustomDatePicker
```

`ref` we passed will be overwritten by custom input ref made by react-datepicker internally, whose prop name is a string given to `customInputRef` and the default value (when we pass no string) is "ref".  
By passing a random string seemed not used as a prop name to `customInputRef`, we can prevent react-datepicker from overwriting the `ref` we specified.
