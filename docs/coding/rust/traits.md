# Traits

## Generics vs. Associated Types

use associated type to bind a type to a trait implementation; get the type uniquely determined by the trait implementation.

e.g.

[`Add` trait](https://doc.rust-lang.org/nightly/std/ops/trait.Add.html) binds `Output` type to a trait implementation so that when a `RHS` type is given then can determine the return type of `add()` uniquely.

```rust
pub trait Add<RHS = Self> {
    type Output;  // associated type
    
    fn add(self, rhs: RHS) -> Self::Output;
}
```

```rust
impl Add<u32> for u32 {
    type Output = u32;
    
    fn add(self, rhs: u32) -> u32 {
      // [...]
    }
}

impl Add<&u32> for u32 {
    type Output = u32;
    
    fn add(self, rhs: &u32) -> u32 {
      // [...]
    }
}
// let result: u32 = 1u32 + 1u32
// let result: u32 = 1u32 + &1u32
```

if `Output` is generics instead of associated type like below,

```rust
pub trait Add<RHS = Self, Output> {
    fn add(self, rhs: RHS) -> Output;
}
```

we can get implementations for `RHS`, which could result in multiple result types.
using associated type disallows to do so.

```rust
impl Add<u32, u32> for u32 {
    fn add(self, rhs: u32) -> u32 {
      // [...]
    }
}

impl Add<u32, &u32> for u32 {
    fn add(self, rhs: u32) -> &u32 {
        // [...]
    }
}
// let result: u32 = 1u32 + 1u32
// let result: &u32 = 1u32 + 1u32
```
