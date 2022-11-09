import { useEffect, useState } from "react";
import { getBlog, getBlogpage, getcatagory, getrecent, getSluCat } from "../Service/api";
import { Link, } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./loader";
import moment from "moment/moment";



const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [cat, setcat] = useState([]);
  const [recent, setRecent] = useState([])
  const [page, setPage] = useState(2);
  const [more, setMore] = useState(true);

  const getAllBlog = async () => {
    let response = await getBlog();
    setBlog(response.data.data);
  };

  const getallrecent = async () => {
    let res = await getrecent();
    setRecent(res.data.data)
    console.log(recent)
  }

  const getAllcatagories = async () => {
    let response = await getcatagory();
    setcat(response.data.data)
  }

  const getcatagoryslug = async (slug) => {
    let response = await getSluCat(slug);
    setBlog(null)
    setBlog(response.data.data)
  }

  const fetchmoredata = async () => {
    let res = await getBlogpage(page);

    setTimeout(() => {
      if (res.data.data.length == 0) {
        setMore(false);
      }
      setBlog(blog.concat(res.data.data))
      console.log(res.data.data)



    }, 1000);

    setPage(page + 1)

  }

  useEffect(() => {
    getAllBlog();
    getAllcatagories();
    getallrecent();
  }, []);
  console.log(blog);
  console.log(page)

  return (
    <div>
      {blog ? (
        <div>
          <InfiniteScroll
            dataLength={blog.length}
            next={fetchmoredata}
            hasMore={more}
            loader={<Loader />}
            endMessage={<h1 className="setAll">You Are All Set!</h1>}
          >
            <div class="body">
              <div role="main" class="main">
                <div class="container py-4">
                  <div class="row">
                    <div class="col-lg-9 order-lg-1">
                      <div class="blog-posts">
                        {blog.map(
                          ({
                            attributes: {
                              title,
                              fulltext,
                              createdAt,
                              featuredimage,
                              catagories,
                              slug
                            }, id
                          }) => {
                            return (
                              <article key={id} class="post post-medium">
                                <div class="row mb-3">
                                  <div class="col-lg-5">
                                    <div class="post-image">
                                      <a>
                                        <img
                                          src={`http://localhost:1337${featuredimage.data.attributes.formats.small.url}`}
                                          class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div class="col-lg-7">
                                    <div class="post-content">
                                      <h2 class="font-weight-semibold pt-4 pt-lg-0 text-5 line-height-4 mb-2">
                                        <Link to={`/blog/${slug}`}>
                                          <a >
                                            {title}
                                          </a>
                                        </Link>
                                      </h2>
                                      <p class="mb-0">
                                        {fulltext}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="post-meta">
                                      <span>
                                        <i class="far fa-calendar-alt"></i>{" "}
                                        {moment(createdAt).format('ll')}
                                      </span>
                                      {catagories.data.map((el) => (
                                        <span key={el.id}>
                                          <i class="far fa-folder"></i>{ }
                                          <a href="#">{el.attributes.name}</a>
                                        </span>
                                      ))}
                                      <span class="d-block d-sm-inline-block float-sm-end mt-3 mt-sm-0">
                                        <Link to={`/blog/${slug}`}>

                                          <a class="btn btn-xs btn-light text-1 text-uppercase">
                                            Read More
                                          </a>
                                        </Link>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div class="col-lg-3 order-lg-2">
                      <aside class="sidebar" style={{ position: "fixed" }}>
                        <h5 class="font-weight-semi-bold pt-4">
                          Categories
                        </h5>
                        {
                          cat ? (
                            <ul class="nav nav-list flex-column mb-5">
                              <li class="nav-item" >
                                {
                                  cat.map((el) => (
                                    <Link to={`/${el.attributes.slug}`}>
                                      <a key={el.id} onClick={() => (getcatagoryslug(el.attributes.slug))}
                                        class="nav-link active"
                                        href="#"
                                      >
                                        {el.attributes.name}
                                      </a>
                                    </Link>
                                  ))
                                }
                              </li>
                            </ul>
                          ) : (
                            <div> </div>
                          )
                        }
                        <div class="tabs tabs-dark mb-4 pb-2  " >
                          <ul class="nav nav-tabs">
                            <li class="nav-item">
                              <a
                                class="nav-link text-2 font-weight-bold text-uppercase"
                                href="#recentPosts"
                                data-bs-toggle="tab"
                              >
                                RECENT   POST
                              </a>
                            </li>
                          </ul>
                          <div class="tab-content">
                            <div
                              class="tab-pane active"
                              id="popularPosts"
                            >
                              <ul class="simple-post-list">
                                {
                                  recent ? (
                                    recent.map(({ attributes: { title, createdAt, featuredimage, slug } }, id) => (
                                      <li key={id}>
                                        <div class="post-image">
                                          <div class="img-thumbnail img-thumbnail-no-borders d-block">
                                            <a >
                                              <img src={`http://localhost:1337${featuredimage.data.attributes.formats.small.url}`}
                                                alt="" style={{ height: "50px" }} />
                                            </a>
                                          </div>
                                        </div>
                                        <div class="post-info">
                                          <Link to={`/blog/${slug}`}>
                                            <a >{title}</a>
                                          </Link>
                                          <div class="post-meta">
                                            {moment(createdAt).format('lll')}
                                          </div>
                                        </div>
                                      </li>

                                    ))

                                  ) : (
                                    <div>
                                    </div>
                                  )
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default Blog;
