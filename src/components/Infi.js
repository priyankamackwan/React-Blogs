import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBlog, getBlogpage } from "../Service/api";


export const Infinit = () => {
  const [store, setStore] = useState([])
  var page = 1;

  const fetchmoredata = async () => {
    let res = await getBlogpage(++page);
    setTimeout(() => {
      setStore(store.concat(res.data.data))
      page++;
    }, 1000);
  }

  const getAllBlog = async () => {
    let response = await getBlog();
    setStore(response.data.data);
  };

  useEffect(() => {
    getAllBlog();

  }, [])

  console.log(store)

  return (
    <div>
      {
        store ? (
          <div>
            <InfiniteScroll
              dataLength={store.length}
              next={fetchmoredata}
              hasMore={true}
              loader={<img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />}
            >
              {store.map(({ attributes: { title, featuredimage } }) => {
                return (
                  <div style={{ border: "2px solid red", margin: "5px" }} >
                    <h3>
                      {title}
                    </h3>
                    <img
                      src={`http://localhost:1337${featuredimage.data.attributes.formats.small.url}`}
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>

        ) : (
          <div>Loading</div>
        )
      }
    </div>
  );
};