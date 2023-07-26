import moment from "moment";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getBlog, getBlogid } from "../Service/api";

export const Singlepage = () => {
    const [singlepost, setSinglepost] = useState([]);
    const { slug } = useParams();

    const getsingleblog = async () => {
        let response = await getBlogid(slug);
        setSinglepost(response.data)
    }
    useEffect(() => {
        getsingleblog()
    }, [])

    if (getBlog == null) {
        return null;
    }


    return (
        <div>
            {
                singlepost.data ? (
                    <div>
                        {
                            singlepost.data.map(({ attributes: { title, fulltext, featuredimage, catagories, createdAt
                            } }, id) => (
                                <div className="body">
                                    <header id="header" className="header-effect-shrink"
                                        data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
                                        <div className="header-body border-top-0">

                                        </div>
                                    </header>

                                    <div role="main" className="main">

                                        <section className="page-header page-header-modern bg-color-light-scale-1 page-header-md">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12 align-self-center p-static order-2 text-center">
                                                        <h1 className="text-dark font-weight-bold text-8">Post Details</h1>
                                                        <span className="sub-title text-dark">Check out our Latest News!</span>
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

                                        <div className="container py-4">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="blog-posts single-post">

                                                        <article className="post post-large blog-single-post border-0 m-0 p-0">
                                                            <div className="post-image ms-0">
                                                                <a href="blog-post.html">
                                                                    <img src={`${process.env.REACT_APP_URL}${featuredimage.data.attributes.formats.small.url}`}
                                                                        className="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt=""
                                          style={{width:"100%"}}
                                                                        
                                                                        />
                                                                </a>
                                                            </div>
                                                            <div className="post-date ms-0">
                                                                <span className="day">{moment(createdAt).format('D')}</span>
                                                                <span className="month">{moment(createdAt).format('MMM')}</span>
                                                            </div>
                                                            <div className="post-content ms-0">

                                                                <h2 className="font-weight-semi-bold"><a href="blog-post.html">className aptent taciti
                                                                    {title}</a></h2>

                                                                <div className="post-meta">

                                                                    {
                                                                        catagories.data.map((el) => (

                                                                            <span key={id}>
                                                                                <i className="far fa-folder"></i>{" "}

                                                                                <a href="#">{el.attributes.name}</a>

                                                                            </span>
                                                                        ))
                                                                    }


                                                                </div>

                                                                <p>{fulltext}</p>
                                                            </div>
                                                        </article>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            )
                            )
                        }
                    </div>

                ) : (
                    <div></div>
                )
            }



        </div>
    )


}
