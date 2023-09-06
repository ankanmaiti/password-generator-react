import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordContainer() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    // update select ui in password input fields
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);

    // select to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let newPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!@#$%^&*(){}";

    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * str.length);
      newPassword += str.charAt(randIndex);
    }

    setPassword(newPassword);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialCharAllowed]);

  return (
    <>
      <div className="mx-auto my-8 w-full max-w-lg rounded-lg bg-gray-700 px-4 py-3 text-orange-500 shadow-md">
        <h2 className="my-3 text-center text-white">Password Generator</h2>

        <div className="mb-4 flex overflow-hidden rounded-lg shadow">
          <input
            type="text"
            value={password}
            className=" w-full px-3 py-1 outline-none"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="w-2/12 bg-blue-700 text-white outline-none"
          >
            copy
          </button>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-x-2 text-sm">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                id="length"
                min={8}
                max={20}
                value={length}
                className=" cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberAllowed"
              defaultChecked={numberAllowed}
              onChange={(e) => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numberAllowed" className=" cursor-pointer">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="specialCharAllowed"
              defaultChecked={specialCharAllowed}
              onChange={(e) => setSpecialCharAllowed((prev) => !prev)}
              className=" cursor-pointer"
            />
            <label htmlFor="specialCharAllowed" className=" cursor-pointer">
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
