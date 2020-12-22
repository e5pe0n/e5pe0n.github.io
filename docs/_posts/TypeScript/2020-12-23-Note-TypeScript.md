---
title: "Note: TypeScript"
categories:
  - Note
tags:
  - TypeScript
---

# Class

In TypeScript, class is not only *Type* but also *Function*.   
When a class is defined, these two are declared.  
  - Interface type of the class instance
  - Constructor function


```ts
class Point {
  x: number = 0;
  y: number = 0;
}

const pointA = new Point(); // class is treated as constructor function
const pointB: Point = { x: 2, y: 4 }; // class is treated as type

interface Point3d extends Point {
  z: number;
}

const pointC: Point3d = { x: 5, y: 5, z: 10 };
```

## Inheritance vs Composition

Composition is better than inheritance in maintainability.  
