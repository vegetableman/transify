# Transify
Add enter and leave transitions to DOM Nodes, inspired by ReactCSSTransitionGroup addon.

## Usage

```css
.example-enter {
  opacity: 0.01;
  transition: opacity .5s ease-in;
}

.example-enter.example-enter-active {
  opacity: 1;
}

.example-leave {
  opacity: 1;
  transition: opacity .5s ease-in;
}

.example-leave.example-leave-active {
  opacity: 0.01;
}
```

```js
const t = transify(document.querySelector('.element'), {
  transitionName: 'example'
})
const child = document.createElement('div')
t.append(child) //Enter transition
r.remove(child) //Leave Transition
```

## API

#### `transify(element, opts)`

Valid options:

- `transitionName`: Name of the transition on which enter, leave and active states would be based on.
- `tick`: Interval after which to set the active class (default: 7)

## License
MIT
