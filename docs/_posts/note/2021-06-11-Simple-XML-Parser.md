---
title: Simple XML Parser
categories:
  - Note
tags:
  - Programming Language
  - C++
  - Python
last_modified_at: 2021-06-11
---

C++

```cpp
#include <fstream>
#include <iostream>
#include <regex>
#include <stack>
#include <string>
#include <vector>
using namespace std;
using ll = long long;

namespace XMLParser {

struct Element;
struct Elem;
struct Attribute;
struct Body;

struct Attribute {
  string name;
  string value;
  string repr() {
    return name + "=\"" + value + "\"";
  }
  Attribute(string _name, string _value) : name(_name), value(_value) {}
};

struct Elem {
  virtual string repr() = 0;
};

struct Element : public Elem {
  string name;
  vector<Attribute> attributes;
  vector<shared_ptr<Elem>> children;
  Element(string _name, vector<Attribute> _attributes)
      : name(_name), attributes(_attributes) {}
  void close() {
    _closed = true;
  }
  bool closed() {
    return _closed;
  }
  string repr() override {
    string s{"<" + name};
    if (attributes.size()) {
      s += ' ';
      for (auto attr : attributes) {
        s += attr.repr();
      }
    }
    s += '>';
    if (children.size()) {
      for (auto child : children) {
        s += child->repr();
      }
    }
    return s += "</" + name + ">";
  }

private:
  bool _closed = false;
};

struct Body : public Elem {
  string text;
  string repr() override {
    return text;
  }
  Body(string _text) : text(_text) {}
};

const string TAG_PAT_R{R"(<.*?>)"};
const string BODY_PAT_R{R"(\s*[^\s<>][^<>]*[^\s<>]\s*)"};

const regex TAG_PAT{TAG_PAT_R};
const regex BODY_PAT{BODY_PAT_R};
const regex END_TAG_PAT{R"(/<.*?>)"};
const regex ELEM_PAT{TAG_PAT_R + "|" + BODY_PAT_R};

const regex TAG_GRP_PAT{R"(<(\w+)\s*?(.*?)>)"};
const regex END_TAG_GRP_PAT{R"(</(\w+)>)"};
const regex ATTR_GRP_PAT{R"(([\w-]+)=\"(.*?)\")"};

vector<Attribute> attr_parser(const string &s) {
  vector<Attribute> attrs;
  sregex_iterator end{};
  for (sregex_iterator p{s.begin(), s.end(), ATTR_GRP_PAT}; p != end; ++p) {
    attrs.emplace_back((*p)[1], (*p)[2]);
  }
  return attrs;
}

Element parser(const string &s) {
  stack<shared_ptr<Elem>> stk;
  sregex_iterator end{};
  for (sregex_iterator p{s.begin(), s.end(), ELEM_PAT}; p != end; ++p) {
    smatch m{};
    string _s = (*p)[0].str();
    if (regex_search(_s, m, END_TAG_GRP_PAT)) {
      vector<shared_ptr<Elem>> children;
      while (stk.size()) {
        if (auto elem = dynamic_cast<Element *>(stk.top().get())) {
          if (elem->name == m[1].str() && !elem->closed()) break;
        }
        children.push_back(stk.top());
        stk.pop();
      }
      reverse(children.begin(), children.end());
      if (auto elem = dynamic_cast<Element *>(stk.top().get())) {
        elem->children = children;
        elem->close();
      }
    } else if (regex_search(_s, m, TAG_GRP_PAT)) {
      stk.push(make_shared<Element>(m[1].str(), attr_parser(m[2].str())));
    } else {
      stk.push(make_shared<Body>((*p)[0].str()));
    }
  }
  if (auto elem = dynamic_cast<Element *>(stk.top().get())) {
    return *elem;
  } else {
    throw "parse failed";
  }
}

}; // namespace XMLParser

int main() {
  using namespace XMLParser;
  ifstream ifs("../testcases/16_11/03.xml");
  string s;
  for (string line; getline(ifs, line);) {
    s += line;
  }
  cout << s << '\n' << endl;
  Element e = parser(s);
  cout << e.repr() << endl;
}
// <elemZ><elemA attr1-1="outer"attr1-2="v1-2"><elemA attr2-1="inner">Inner elem1</elemA></elemA><elemB>Elem2</elemB><elemC attr3-1="v3-1"attr3-2="v3-2"attr3-3="v3-3"><elemD><elemE>Choose one!!</elemE><elemF selected="op1"><elemG id="op1">Option 1</elemG><elemG id="op2">Option 2</elemG><elemG id="op3">Option 3</elemG><elemG id="op4">Option 4</elemG></elemF></elemD><elemH style="margin: 5px;">Click me!!</elemH></elemC></elemZ>
```

03.xml

```xml
<elemZ>
  <elemA attr1-1="outer" attr1-2="v1-2">
    <elemA attr2-1="inner">Inner elem1</elemA>
  </elemA>
  <elemB>Elem2</elemB>
  <elemC attr3-1="v3-1" attr3-2="v3-2" attr3-3="v3-3">
    <elemD>
      <elemE>Choose one!!</elemE>
      <elemF selected="op1">
        <elemG id="op1">Option 1</elemG>
        <elemG id="op2">Option 2</elemG>
        <elemG id="op3">Option 3</elemG>
        <elemG id="op4">Option 4</elemG>
      </elemF>
    </elemD>
    <elemH style="margin: 5px;">Click me!!</elemH>
  </elemC>
</elemZ>
```

Python

```py
from __future__ import annotations
from typing import List
from functools import partial
import re

cmpl = partial(re.compile, flags=re.DOTALL)

TAG_PAT_R = r"<.*?>"
END_TAG_PAT_R = r"</.*?>"
BODY_PAT_R = r"\s*[^\s<>][^<>]*[^\s<>]\s*"
ELEM_PAT_R = r"(" + TAG_PAT_R + "|" + BODY_PAT_R + ")"
TAG_PAT_C = cmpl(TAG_PAT_R)
END_TAG_PAT_C = cmpl(END_TAG_PAT_R)
BODY_PAT_C = cmpl(BODY_PAT_R)
ELEM_PAT_C = cmpl(ELEM_PAT_R)

TAG_GRP_PAT_R = r"<(\w+)\s*?(.*?)>"
END_TAG_GRP_PAT_R = r"</(\w+)>"
ATTR_GRP_PAT_R = r"([\w-]+)=\"(.*?)\""
TAG_GRP_PAT_C = cmpl(TAG_GRP_PAT_R)
END_TAG_GRP_PAT_C = cmpl(END_TAG_GRP_PAT_R)
ATTR_GRP_PAT_C = cmpl(ATTR_GRP_PAT_R)


class Elem:
    pass


class Element(Elem):
    def __init__(self, name: str, attributes: List[Attribute]):
        self.name = name
        self.attributes = attributes
        self.children = None

    def __repr__(self) -> str:
        return f"<{self.name} {self.attributes}>{self.children}</{self.name}>"


class Body(Elem):
    def __init__(self, text: str):
        self.text = text

    def __repr__(self) -> str:
        return self.text


class Attribute:
    def __init__(self, name: str, value: str):
        self.name = name
        self.value = value

    def __repr__(self) -> str:
        return f'{self.name}="{self.value}"'


def attr_parser(s: str) -> Attribute:
    attrs = []
    for m in ATTR_GRP_PAT_C.finditer(s):
        attrs.append(Attribute(m[1], m[2]))
    return attrs


def parser(s: str) -> Elem:
    stack: List[Elem] = []
    for m in ELEM_PAT_C.finditer(s):
        if _m := END_TAG_GRP_PAT_C.match(m[0]):
            children = []
            while stack and (
                not isinstance(stack[-1], Element)
                or stack[-1].name != _m[1]
                or stack[-1].children is not None
            ):
                children.append(stack.pop())
            stack[-1].children = children[::-1] if len(children) else children
        elif _m := TAG_GRP_PAT_C.match(m[0]):
            stack.append(Element(_m[1], attr_parser(_m[2])))
        else:
            stack.append(Body(m[0]))
    return stack[-1]


def main():
    with open("../testcases/16_11/03.xml") as f:
        s = f.read()

    print(s)
    print()

    elem = parser(s)
    print(elem)


if __name__ == "__main__":
    main()

# <elemZ []>[<elemA [attr1-1="outer", attr1-2="v1-2"]>[<elemA [attr2-1="inner"]>[Inner elem1]</elemA>]</elemA>, <elemB []>[Elem2]</elemB>, <elemC [attr3-1="v3-1", attr3-2="v3-2", attr3-3="v3-3"]>[<elemD []>[<elemE []>[Choose one!!]</elemE>, <elemF [selected="op1"]>[<elemG [id="op1"]>[Option 1]</elemG>, <elemG [id="op2"]>[Option 2]</elemG>, <elemG [id="op3"]>[Option 3]</elemG>, <elemG [id="op4"]>[Option 4]</elemG>]</elemF>]</elemD>, <elemH [style="margin: 5px;"]>[Click me!!]</elemH>]</elemC>]</elemZ>
```
