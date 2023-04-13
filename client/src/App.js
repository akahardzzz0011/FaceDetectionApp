import './App.css';
import './components/ImageUpload/ImageUpload'
import ImageUpload from './components/ImageUpload/ImageUpload';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <ImageUpload />
    </div>
  );
}

export default App;
