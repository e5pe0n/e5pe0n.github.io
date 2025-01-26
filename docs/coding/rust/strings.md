# Strings

## String

- roughly speaking, a wrapper of `Vec<u8>`
- `Sized`

## str

- string slice
- not `Sized`
  - DST; dynamically sized type
  - can't allocate to stack
    ```rust
    let mut s = String::with_capacity(5);
    s.push_str("Hello");
    let t: str = s[1..];

    // error[E0277]: the size for values of type `str` cannot be known at compilation time
    //   |
    // 8 |     let t: str = s[1..];
    //   |         ^ doesn't have a size known at compile-time
    //   |
    //   = help: the trait `Sized` is not implemented for `str`
    //   = note: all local variables must have a statically known size
    //   = help: unsized locals are gated as an unstable feature
    // help: consider borrowing here
    //   |
    // 8 |     let t: &str = s[1..];
    //   |            +
    ```

## &str

- fat reference
  - reference storing metadata; a pointer and length of the `str`
- `Sized`

## Example

```rust
let mut s = String::with_capacity(5);
s.push_str("Hello");
let t: &str = &s[1..];
```


```
                                                                                               
              ┌──────────────────────────────────────────┐                                     
              │                                          │                                     
              │        s: String                         │               t: &str               
       ┌──────▼──────┬────────────┬────────────┐   ┌─────┼─────┐   ┌───────────┬───────────┐   
 Stack │   pointer   │   length   │  capacity  │   │  pointer  │   │  pointer  │  length   │   
       │      │      │     5      │     5      │   │           │   │     │     │    4      │   
       └──────┼──────┴────────────┴────────────┘   └───────────┘   └─────┼─────┴───────────┘   
              │                                     &s: &String          │                     
              │                                                          │                     
              │        str                                               │                     
              │ ┌───────────────┐                                        │                     
              │                                                          │                     
            ┌─▼─┬───┬───┬───┬───┐                                        │                     
       Heap │ H │ e │ l │ l │ o │                                        │                     
            └───┴─▲─┴───┴───┴───┘                                        │                     
                  │                                                      │                     
                  │                                                      │                     
                  └──────────────────────────────────────────────────────┘                     
                                                                                               
```

## References

- https://rust-exercises.com/100-exercises/03_ticket_v1/09_heap.html
- https://rust-exercises.com/100-exercises/04_traits/06_str_slice.html
- https://rust-exercises.com/100-exercises/04_traits/08_sized.html
