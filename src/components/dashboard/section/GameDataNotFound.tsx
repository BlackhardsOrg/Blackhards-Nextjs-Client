const GameDataNotFound = () => {

    return (
        <section className="our-error">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-6 wow fadeInRight d-flex alig-items-center justify-content-center" data-wow-delay="300ms">
                        <div className="animate_content text-center text-xl-start">
                            <div className="animate_thumb">
                                <img
                                    className="w-60"
                                    src="/images/icon/AfricanGameNotFound.png"
                                    alt="error-page-img"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-5 offset-xl-1 wow fadeInLeft"
                        data-wow-delay="300ms"
                    >
                        <div className="error_page_content text-center text-xl-start">
                            {/* <div className="erro_code">
                            40<span className="text-thm">4</span>
                          </div> */}
                            <div className="h2 error_title">
                                Omo!
                            </div>
                            <p className="text fz15 mb20">
                                Something went wrong!
                            </p>
                            {/* <Link href="/" className="ud-btn btn-thm">
                            Go back to home
                            <i className="fal fa-arrow-right-long" />
                          </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GameDataNotFound