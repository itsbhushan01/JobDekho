import { Button, TextInput } from "@mantine/core"

function Subscribe() {
  return (
    <div className="my-20 flex items-center bg-[#0c0c0c] mx-20 py-3 rounded-xl justify-around">
      <div className="text-4xl w-2/5 text-center font-semibold text-[#e7e7e7]">Newer Want to Miss any <span className="text-[#03C988]">Job News. </span></div>
      <div className="flex rounded-xl gap-4 bg-[#2d2d2d] px-3 py-2 items-center" >
        <TextInput
        className="text-[#e7e7e7] font-semibold"
        variant="unstyled"
        placeholder="Your@email.com"
        size="xl"
        />
        <Button size="lg" variant="filled" color="green" className="!rounded-lg">Subscribe</Button>
      </div>
    </div>
  )
}

export default Subscribe
