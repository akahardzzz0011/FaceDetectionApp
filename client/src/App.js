import './App.css';
import './components/ImageUpload/ImageUpload'
import ImageUpload from './components/ImageUpload/ImageUpload';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <ImageUpload />
      <Footer />
    </div>
  );
}

export default App;
