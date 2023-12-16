import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setfile] = useState();
  const [img, setimg] = useState([]);
  console.log("ans",img);

  const getItems = async() => {
    try {
      const res = await axios.get("http://localhost:3001/getdata");
      console.log("effect", res.data);
      setimg(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  const handleImage = async (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = axios
      .post("http://localhost:3001/upload", formdata)
      .then((res) => {
        console.log("After upload",res);
        getItems()
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
   getItems()
  }, []);
  return (
    <div className="p-4 max-w-[1150px] mx-auto">
      <div className="">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white"
          onClick={handleImage}
        >
          Upload
        </button>
        <div className="flex space-x-11 flex-wrap mt-5">
        {img.map((i)=>{
          console.log("i",i.image);
          return <div >
           <img key={i._id} src={`http://localhost:3001/Images/${i.image}`} alt="profile" className="w-72 h-64 object-cover" /> 
          </div>
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
