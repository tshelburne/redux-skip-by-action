redux-skip-by-action
====================

Store enhancer for [redux](https://github.com/gaearon/redux) that enables skipping subscriber notifications for individual actions.

```js
npm install --save redux-skip-by-action
```

## Usage

```js
import {createStore, compose} from 'redux';
import skipByAction, {skip} from 'redux-skip-by-action';

const store = compose(skipByAction)(createStore)(reducer, intialState);

// note: skip adds FSA-compliant metadata to the action
store.dispatch(skip({type: SOME_ACTION, payload: somePayload}))

// the above is equivalent to
store.dispatch({type: SOME_ACTION, payload: somePayload, meta: {skip: true}})
```

## Thanks

Thanks to [Terry Appleby](https://github.com/tappleby) for [redux-batched-subscribe](https://github.com/tappleby/redux-batched-subscribe).
