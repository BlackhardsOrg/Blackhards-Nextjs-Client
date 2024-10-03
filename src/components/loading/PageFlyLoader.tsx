import FLyLoad from "./FLyLoad"

const PageFlyLoader = () => {
    return <section className="page-fly-loader d-flex flex-column">
        <FLyLoad />
        <span className="text-light">please wait...</span>
    </section>
}

export default PageFlyLoader