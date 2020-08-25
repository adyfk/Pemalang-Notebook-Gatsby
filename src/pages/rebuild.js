import React, { useState } from "react"
export default function Rebuild() {
  const [state, setState] = useState(false)
  const action = async () => {
    setState("loading")
    await fetch(
      "https://api.netlify.com/build_hooks/5f4526c801f765598734a5f6",
      {
        method: "POST",
      }
    )
    setState("sukses")
  }
  return (
    <>
      <button onClick={action}>Rebuild App</button>
      <br></br>
      {state === "loading" && "Loading"}
      {state === "sukses" && `Berhasil build pada ${new Date()}`}
    </>
  )
}
