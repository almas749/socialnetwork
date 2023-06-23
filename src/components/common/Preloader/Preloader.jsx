import loading from './../../../assets/images/loading-icon.gif';

const Preloader = () => {
    return (
        <img
            style={{ width: "50px", display: "block", margin: "20px auto" }}
            src={loading}
            alt="loading" />
    );
}

export default Preloader;