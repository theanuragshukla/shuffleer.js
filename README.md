# ShufflerJS

ShufflerJS is a simple and lightweight javascript library to setup a Auto-Typing animation on your website. It is simple yet very customizable to suit your needs.

# Features

- loop through an array of strings
- add constant prefix before each string
- random shuffling through a set of characters, which gives it a resolving feel
- define the delay between character shuffling
- define the no. of iterations before the actual character shows up
- infinite loop
- and many more...

---

## Installation

#### Choose One

```
npm install shufflerJS
or
yarn add shufflerJS
```

#### CDN

```html
<script src="https://unpkg.com/shufflerjs@1.0.0/shuffler.min.js"></script>
```

#### Setup

This is all you need to get started: 

```javascript
// requires cdn to be included with a regular script tag

var options = {
    strings: ['Hello world' , 'This is sentance 2' , 'and this is another sentance' ],
    loop: true,
    delay: 20,
    iterations: 5,
    element: document.querySelector('.autoType'),
    constant: 'this will be prefixed to all strings '
};

const typing1 = new Resolver(options);
```


