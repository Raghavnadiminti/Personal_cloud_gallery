import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ImageUpload from "./imageupload";
import Gallery from "./displayimages";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);

 
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
     
      const { data } = await axios.get("http://localhost:8000/images");
      setImages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSelect = (key) => {
    
    setSelected(prev => prev === key ? null : key);
  };

  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm("Delete this image?")) return;

    try {
      setDeleting(true);
      await axios.delete("http://localhost:8000/delete-image", {
        data: { key: selected }
      });


      setImages(images.filter((img) => img.key !== selected));
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="App">
 
      <nav className="navbar">
        <div className="brand">Cloud Gallery</div>
        
        <div className="nav-actions">
        
          <button 
            className="btn-delete" 
            onClick={handleDelete}
            disabled={!selected || deleting}
            style={{ display: selected ? 'flex' : 'none' }} 
          >
            {deleting ? "Deleting..." : "Delete Selected"}
          </button>

     
          <ImageUpload onUploadSuccess={fetchImages} />
        </div>
      </nav>

   
      <main className="main-content">
        <Gallery 
          images={images} 
          loading={loading}
          selected={selected}
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
}

export default App;