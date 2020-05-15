// @ts-nocheck

import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from "recoil";

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

const itemsInCart = atom({
  key: "itemsInCart",
  default: 0,
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CartInfoDebug() {
  const [numItemsInCart, setNumItemsInCart] = useRecoilState(itemsInCart);

  const logCartItems = useRecoilCallback(async ({ getPromise }) => {
    const res = await fetch("http://localhost:3000/test");
    const json = await res.json();

    setNumItemsInCart(json.test);

    console.log("Items in cart: ", numItemsInCart);
  });

  console.log("render");

  return (
    <div>
      <button onClick={logCartItems}>Log Cart Items</button>
      <p>{numItemsInCart}</p>
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <CartInfoDebug />
    </RecoilRoot>
  );
}

export default App;
