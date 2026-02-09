
const Navbar = ({count}) => {
  return (
    <div className='navbar bg-violet-400 text-white h-16 flex items-center justify-around'>
      <span>Home</span>
      <span>About</span>
      <span>{count}</span>
      <span>Sign In</span>
    </div>
  )
}

export default Navbar
