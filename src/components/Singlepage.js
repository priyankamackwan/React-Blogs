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
                                <div class="body">
                                    <header id="header" class="header-effect-shrink"
                                        data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
                                        <div class="header-body border-top-0">

                                        </div>
                                    </header>

                                    <div role="main" class="main">

                                        <section class="page-header page-header-modern bg-color-light-scale-1 page-header-md">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-md-12 align-self-center p-static order-2 text-center">
                                                        <h1 class="text-dark font-weight-bold text-8">Post Full Width</h1>
                                                        <span class="sub-title text-dark">Check out our Latest News!</span>
                                                    </div>
                                                    <div class="col-md-12 align-self-center order-1">
                                                        <ul class="breadcrumb d-block text-center">
                                                            <li><a href="#">Home</a></li>
                                                            <li class="active">Blog</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <div class="container py-4">

                                            <div class="row">
                                                <div class="col">
                                                    <div class="blog-posts single-post">

                                                        <article class="post post-large blog-single-post border-0 m-0 p-0">
                                                            <div class="post-image ms-0">
                                                                <a href="blog-post.html">
                                                                    <img src={`http://localhost:1337${featuredimage.data.attributes.formats.small.url}`}
                                                                        class="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt="" />
                                                                </a>
                                                            </div>

                                                            <div class="post-date ms-0">
                                                                <span class="day">{moment(createdAt).format('D')}</span>
                                                                <span class="month">{moment(createdAt).format('MMM')}</span>
                                                            </div>

                                                            <div class="post-content ms-0">

                                                                <h2 class="font-weight-semi-bold"><a href="blog-post.html">Class aptent taciti
                                                                    {title}</a></h2>

                                                                <div class="post-meta">

                                                                    {
                                                                        catagories.data.map((el) => (

                                                                            <span key={id}>
                                                                                <i class="far fa-folder"></i>{" "}

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
