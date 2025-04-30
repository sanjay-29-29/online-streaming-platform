export default async function Test() {
  const data = await new Promise((res) =>
    setTimeout(() => { res("hello") }, 3000)
  );

  return (
    <>
      <div className="text-5xl">
        Welcome to home {data}
      </div>
    </>
  )
}
