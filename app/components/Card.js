
export default function Card() {
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="font-bold text-blue-300 text-center">Muhaha</h1>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card">
                        <img src="/images/Card/Mu.jpeg" className="card-img-top" alt="Mu Image"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card">
                        <img src="/images/Card/Bones.jpeg" className="card-img-top" alt="Bones Image" />
                        <div className="card-body">
                            <h5 className="card-title">To Claim Their Bones</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card">
                        <img src="/images/Card/Roland.jpg" className="card-img-top" alt="Mu Image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
