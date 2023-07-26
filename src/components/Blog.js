import { useEffect, useState } from "react";
import { getBlog, getBlogpage, getcatagory, getrecent, getSluCat, serachBlog } from "../Service/api";
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
  const[searchtext,setSearchtext] = useState();
  console.log(searchtext)

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

  const serachBlogs=async()=>{
    let response=await serachBlog(searchtext)
    console.log("response.data.data",response.data.data);
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
              <header id="header" className="header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
                <div className="header-body border-top-0">
                  <div className="header-container container-fluid px-lg-4">
                    <div className="header-row">
                      <div className="header-column header-column-border-right flex-grow-0">
                        <div className="header-row pe-4">
                          <div className="header-logo">
                            <a href="/">
                              <img alt="Porto" width={73} height={72} data-sticky-width={52} data-sticky-height={40} src="https://i.ibb.co/gJGdNT1/logo.png" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="header-column">
                        <div className="header-row">
                          <div className="header-nav header-nav-links justify-content-center">
                            <div className="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
                              <nav className="collapse header-mobile-border-top">
                                <ul className="nav nav-pills" id="mainNav">
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle" href="index.html">
                                      Home
                                    </a>
                                    
                                  </li>
                                  <li className="dropdown dropdown-mega">
                                    <a className="dropdown-item dropdown-toggle" href="elements.html">
                                      Elements
                                    </a>
                                    
                                  </li>
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle" href="#">
                                      Features
                                    </a>
                                    
                                  </li>
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle" href="#">
                                      Pages
                                    </a>
                                    
                                  </li>
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle" href="#">
                                      Portfolio
                                    </a>
                                   
                                  </li>
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle active" href="#">
                                      Blog
                                    </a>
                                   
                                  </li>
                                  <li className="dropdown">
                                    <a className="dropdown-item dropdown-toggle" href="#">
                                      Shop
                                    </a>
                                  
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="header-column header-column-border-left flex-grow-0 justify-content-center">
                        <div className="header-row ps-4 justify-content-end">
                          <ul className="header-social-icons social-icons d-none d-sm-block social-icons-clean m-0">
                            <li className="social-icons-facebook"><a href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                            <li className="social-icons-twitter"><a href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter" /></a></li>
                            <li className="social-icons-linkedin"><a href="https://www.linkedin.com/company/thewebpatriot/" target="_blank" title="Linkedin"><i className="fab fa-linkedin-in" /></a></li>
                          </ul>
                          <button className="btn header-btn-collapse-nav ms-0 ms-sm-3" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
                            <i className="fas fa-bars" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <div role="main" class="main">
                <section className="page-header page-header-modern bg-color-light-scale-1 page-header-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 align-self-center p-static order-2 text-center">
                        <h1 className="text-dark font-weight-bold text-8">The Webpatriot Blog Website</h1>
                        <span className="sub-title text-dark">Check out our Latest  Blog Here!</span>
                      </div>
                      <div className="col-md-12 align-self-center order-1">
                        <ul className="breadcrumb d-block text-center">
                          <li><a href="#">Home</a></li>
                          <li className="active">Blog</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <div class="container py-4">
                  <div class="row">
                    
                    <div class="col-lg-4 order-lg-1">
                      <aside class="sidebar" >
                        <form action="page-search-results.html" method="get">
                          <div className="input-group mb-3 pb-1">
                            <input  className="form-control text-1" placeholder="Search..." name="s" id="s"  type="text"  onChange={(e) => {
                                setSearchtext(e.target.value);
                              }}
 />
                            <button type="submit" className="btn btn-dark text-1 p-2" onClick={
                              (event)=>{
                                event.preventDefault();
                                serachBlogs()
                              }
                            } ><i className="fas fa-search m-2" /></button>
                          </div>
                        </form>
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
                                              <img src={`${process.env.REACT_APP_URL}${featuredimage.data.attributes.formats.small.url}`}
                                                alt="" style={{ height: "40px" }} />
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
                    <div class="col-lg-8 order-lg-2">
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
                                          src={`${process.env.REACT_APP_URL}${featuredimage.data.attributes.formats.small.url}`}
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
                  </div>
                </div>
              </div>
              
            </div>
          </InfiniteScroll>
          <footer id="footer">
                <div className="container">
                  <div className="footer-ribbon">
                    <span>Get in Touch</span>
                  </div>
                  <div className="row py-5 my-4">
                    <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                      <h5 className="text-3 mb-3">ABOUT THE BLOG</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu pulvinar magna semper scelerisque.</p>
                      <p className="mb-2">Praesent venenatis turpis vitae purus semper, eget sagittis velit venenatis ptent taciti sociosqu ad litora...</p>
                      <p className="mb-0"><a href="#" className="btn-flat btn-xs text-color-light p-relative top-5"><strong className="text-2">VIEW MORE</strong><i className="fas fa-angle-right p-relative top-1 ps-2" /></a></p>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
                      <h5 className="text-3 mb-3">RECENT POSTS</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="d-flex mb-3 pb-1">
                          <article className="d-flex">
                            <a href="#">
                              <img className="me-3 rounded-circle" src="img/office/our-office-4-square.jpg" alt style={{ "max-width": "70px" }} />
                            </a>
                            <div className="media-body">
                              <a href="#">
                                <h6 className="text-3 text-color-light opacity-8 ls-0 mb-1">Lorem ipsum dolor sit, consectetur adipiscing elit.</h6>
                                <p className="text-2 mb-0">12:53 AM Dec 19th</p>
                              </a>
                            </div>
                          </article>
                        </li>
                        <li className="d-flex">
                          <article className="d-flex">
                            <a href="#">
                              <img className="me-3 rounded-circle" src="img/office/our-office-5-square.jpg" alt style={{ "max-width": "70px" }} />
                            </a>
                            <div className="media-body">
                              <a href="#">
                                <h6 className="text-3 text-color-light opacity-8 ls-0 mb-1">Lorem ipsum dolor sit, consectetur adipiscing elit.</h6>
                                <p className="text-2 mb-0">12:53 AM Dec 19th</p>
                              </a>
                            </div>
                          </article>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-5 mb-md-0">
                      <h5 className="text-3 mb-3">RECENT COMMENTS</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3 pb-1">
                          <a href="#">
                            <p className="text-3 text-color-light opacity-8 mb-1"><i className="fas fa-angle-right text-color-primary" /><strong className="ms-2">John Doe</strong> commented on <strong className="text-color-primary">lorem ipsum dolor sit amet.</strong></p>
                            <p className="text-2 mb-0">12:55 AM Dec 19th</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <p className="text-3 text-color-light opacity-8 mb-1"><i className="fas fa-angle-right text-color-primary" /><strong className="ms-2">John Doe</strong> commented on <strong className="text-color-primary">lorem ipsum dolor sit amet.</strong></p>
                            <p className="text-2 mb-0">12:55 AM Dec 19th</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6 col-lg-2">
                      <h5 className="text-3 mb-3">CATEGORIES</h5>
                      <p>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Gadgets</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Photography</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Lifestyle</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Fashion</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Recipes</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Travel</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Business</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Architecture</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Reviews</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Sports</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Videos</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Technology</span></a>
                        <a href="#"><span className="badge badge-dark bg-color-black badge-sm py-2 me-1 mb-2 text-uppercase">Design</span></a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer-copyright">
                  <div className="container py-2">
                    <div className="row py-4">
                      <div className="col-lg-1 d-flex align-items-center justify-content-center justify-content-lg-start mb-2 mb-lg-0">
                        <a href="index.html" className="logo pe-0 pe-lg-3">
                          <img alt="The Web Patriot Blog" src="https://i.ibb.co/gJGdNT1/logo.png" className="opacity-5" height={32} />
                        </a>
                      </div>
                      <div className="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0">
                        <p>© Copyright 2022. All Rights Reserved.</p>
                      </div>
                      <div className="col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-end">
                        <nav id="sub-menu">
                          <ul>
                            <li><i className="fas fa-angle-right" /><a href="page-faq.html" className="ms-1 text-decoration-none"> FAQ's</a></li>
                            <li><i className="fas fa-angle-right" /><a href="sitemap.html" className="ms-1 text-decoration-none"> Sitemap</a></li>
                            <li><i className="fas fa-angle-right" /><a href="contact-us.html" className="ms-1 text-decoration-none"> Contact Us</a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
        </div>
      ) : (
        <div>

        </div>
      )}
    </div>
  );
};

export default Blog;



