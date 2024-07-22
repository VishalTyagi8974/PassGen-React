import { useCallback, useEffect, useRef, useState } from "react";

export default function PassGen() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [numberAllow, setNumberAllow] = useState(false);
    const [chacAllow, setChacAllow] = useState(false);
    const PassGenerator = useCallback(() => {
        let pass = '';
        let strr = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
        if (numberAllow) {
            strr += "1234567890";
        }
        if (chacAllow) {
            strr += "@#$%^&*";
        }
        for (let i = 0; i < length; i++) {
            pass += strr[Math.floor(Math.random() * strr.length)];
        }
        return setPassword(pass);
    }, [length, chacAllow, numberAllow, setPassword]);

    useEffect(() => {
        PassGenerator();
    }, [length, chacAllow, numberAllow]);

    const refPassword = useRef(null);

    const CopyPassToClip = useCallback(() => {
        refPassword.current?.select()
        window.navigator.clipboard.writeText(password);
    }, [password]);

    return (

        <div style={{ backgroundColor: "#333333", color: "white", width: "600px" }} className="d-flex justify-content-center flex-column p-3">
            <h1>Random Password Generator</h1>
            <div>

                <input type="text" style={{ height: "40px", width: "400px" }} value={password} name="" ref={refPassword} id="" readOnly /> <button style={{ height: "42px" }} className="rounded-pill btn btn-light" onClick={() => PassGenerator()}>↺</button>
            </div>
            <div>

                <button className="btn btn-success w-50" onClick={CopyPassToClip}>Copy</button>
            </div>
            <div>
                <input type="range" value={length} min={6} max={20} onChange={(e) => setLength(e.target.value)} name="" id="numbs" />

                <label htmlFor="length">Length {length}</label>
            </div>
            <div>
                <input type="checkbox" onChange={() => setNumberAllow(!numberAllow)} name="" id="numbs" />
                <label htmlFor="numbs">Numbers</label>
            </div>
            <div>
                <input type="checkbox" onChange={() => setChacAllow(!chacAllow)} name="" id="chac" />
                <label htmlFor="chac">Characters</label>
            </div>

        </div >
    )

}