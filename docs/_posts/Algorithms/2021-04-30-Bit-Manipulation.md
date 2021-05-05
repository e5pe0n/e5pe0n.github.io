---
title: "Note: Bit Manipulation"
categories:
  - Note
tags:
  - Algorithm
  - Competitive Programming
  - C++
  - Python
last-modified-at: 2021-04-30
---

```cpp
#include <bitset>
#include <string>
using namespace std;
using ll = long long;

bool get_bit(ll n, ll i) {
  return (n & (1LL << i)) != 0;
}

ll set_bit(ll n, ll i) {
  return n | (1LL << i);
}

ll toggle_bit(ll n, ll i) {
  return n ^ (1LL << i);
}

ll clear_bit(ll n, ll i) {
  ll mask = ~(1LL << i);
  return n & mask;
}

ll clear_bits_msb_though_i(ll n, ll i) {
  ll mask = (1LL << i) - 1;
  return n & mask;
}

ll clear_bits_i_through_0(ll n, ll i) {
  ll mask = -1LL << (i + 1);
  return n & mask;
}

ll update_bit(ll n, ll i, bool i_th_bit) {
  ll mask = ~(1LL << i);
  return (n & mask) | (i_th_bit << i);
}

int main() {
  ll n = 7;
  bitset<4> before(n);

  bitset<4> b(get_bit(n, 2));
  puts(before.to_string().c_str()); // 0111
  printf("%d\n", get_bit(n, 2));    // 1
  puts("");

  bitset<4> after1(set_bit(n, 3));
  puts(before.to_string().c_str()); // 0111
  puts(after1.to_string().c_str()); // 1111
  puts("");

  bitset<4> after2(toggle_bit(n, 1));
  puts(before.to_string().c_str()); // 0111
  puts(after2.to_string().c_str()); // 0101
  puts("");

  bitset<4> after3(clear_bit(n, 1));
  puts(before.to_string().c_str()); // 0111
  puts(after3.to_string().c_str()); // 0101
  puts("");

  bitset<4> after4(clear_bits_msb_though_i(n, 2));
  puts(before.to_string().c_str()); // 0111
  puts(after4.to_string().c_str()); // 0011
  puts("");

  bitset<4> after5(clear_bits_i_through_0(n, 1));
  puts(before.to_string().c_str()); // 0111
  puts(after5.to_string().c_str()); // 0100
  puts("");

  bitset<4> after6(update_bit(n, 1, 0));
  puts(before.to_string().c_str()); // 0111
  puts(after6.to_string().c_str()); // 0101
  puts("");
}
```
