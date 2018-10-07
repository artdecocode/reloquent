const answer = async (a) => {
  await new Promise(r => setTimeout(r, 350))
  const an = `${a}\n`
  process.stdin.push(an)
  process.stdout.write(an)
}

export default answer