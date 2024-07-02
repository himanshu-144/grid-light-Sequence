
import './App.css'
import Shape from './Shape';

function App() {
  const data = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  return (
    <div className='App'>
      Shape Light grid
      <Shape data={data} />
    </div>
  )
}

export default App
